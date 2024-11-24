import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';

import { firebaseDatabase } from '@/firebaseConfig';


export type DatabaseData<T> = T & {
    id: string;
}

export enum DatabaseDataStatus {
    None,
    Loaded,
    Error
}

export type DatabaseDataOptions = {
    disableFetching?: boolean;
}

export const useRealtimeDBData = <T>(path: string, options?: DatabaseDataOptions) => {
    const { disableFetching } = options ?? {};

    const [data, setData] = useState<DatabaseData<T>>();
    const [status, setStatus] = useState(DatabaseDataStatus.None);

    useEffect(() => {
        if (!path || disableFetching) return;

        const dataBaseRef = ref(firebaseDatabase, path);

        const unsubscribe = onValue(
            dataBaseRef,
            (snapshot) => {
                const value = snapshot.val();

                setData(value);
                setStatus(DatabaseDataStatus.Loaded);
            },
            () => setStatus(DatabaseDataStatus.Error)
        );

        return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path, disableFetching]);

    return {
        data,
        dataStatus: status,
    }
}