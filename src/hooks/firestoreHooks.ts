import { useEffect, useState } from 'react';
import { collection, CollectionReference, FieldPath, onSnapshot, orderBy, OrderByDirection, query, Query, where, WhereFilterOp } from 'firebase/firestore';

import { firebaseFirestore } from '@/firebaseConfig';


export type FirestoreData<T> = T & {
    id: string;
}

export enum FirestoreDataStatus {
    Loading,
    Loaded,
    Error
}

export type FirestoreDataOptions = {
    filters?: FirestoreDataFilter[];
    ordering?: FirestoreDataOrdering;
    disableFetching?: boolean;
}

export type FirestoreDataFilter = null | {
    field: string | FieldPath;
    operationStr?: WhereFilterOp;
    value: unknown;
}

export type FirestoreDataOrdering = null | {
    field: string | FieldPath;
    directionStr?: OrderByDirection;
}

export const useFirestoreData = <T>(path: string, options?: FirestoreDataOptions) => {
    const { filters, disableFetching, ordering } = options ?? {};

    const [data, setData] = useState<FirestoreData<T>[]>([]);
    const [status, setStatus] = useState(FirestoreDataStatus.Loading);

    useEffect(() => {
        if (!path || disableFetching) return;

        setStatus(FirestoreDataStatus.Loading);

        let q: CollectionReference | Query = collection(firebaseFirestore, path);
        if (filters?.length) {
            for (const filter of filters) {
                if (!filter || !filter.value) continue;
                const { field, operationStr, value } = filter;
    
                q = query(q, where(field, operationStr ?? '==', value));
            }
        }

        if (ordering) {
            q = query(q, orderBy(ordering.field, ordering.directionStr));
        }

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const incomingData: FirestoreData<T>[] = [];

                for (const doc of snapshot.docs) {
                    const { id } = doc;

                    const item = { id, ...doc.data() as T };
                    incomingData.push(item);
                }

                setData(incomingData);
                setStatus(FirestoreDataStatus.Loaded);
            },
            () => setStatus(FirestoreDataStatus.Error)
        );

        return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path, disableFetching, filters]);

    return {
        data,
        dataStatus: status,
        setData
    }
}
