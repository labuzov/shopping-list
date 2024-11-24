import { DatabaseData } from '@/hooks/firebaseDatabaseHooks';


export const parseDatabaseData = <T>(data?: { [id: string]: T }) => {
    if (!data) return [];

    const items: DatabaseData<T>[] = [];

    for (const key in data) {
        items.push({
            id: key,
            ...data[key]
        });
    }

    return items;
}