import { FirestoreData } from '@/hooks/firestoreHooks';
import { ShoppingList } from '@/models/shoppingListModels';


export const getVisibleLists = (lists: FirestoreData<ShoppingList>[], userId?: string) => {
    return lists.filter(list => {
        if (list.isPublic) return true;
        if (list.createdBy === userId) return true;
        if (list.sharedWith?.includes(userId ?? '')) return true;

        return false;
    })
}