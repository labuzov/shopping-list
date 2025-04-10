import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, writeBatch } from 'firebase/firestore';

import { firebaseAuth, firebaseFirestore } from '@/firebaseConfig';
import { ShoppingItem, ShoppingList } from '@/models/shoppingListModels';
import { generateId } from '@/helpers/numberHelpers';


class ListService {
    private _listPath = 'lists';

    public async createList(list: ShoppingList) {
        list.createdAt = new Date().getTime();
        list.createdBy = firebaseAuth.currentUser?.uid ?? '';
        await addDoc(this._getListCollectionRef(), list);
    }

    public async updateList(listId: string, list: ShoppingList) {
        list.updatedAt = new Date().getTime();
        await updateDoc(this._getListRef(listId), list);
    }

    public async deleteList(listId: string) {
        await this.clearList(listId);
        await deleteDoc(this._getListRef(listId));
    }

    public async addItems(listId: string, items: ShoppingItem[]) {
        const batch = writeBatch(firebaseFirestore);
        const startTs = new Date().getTime();

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const itemId = generateId();

            const createdAt = startTs + i;
            item.createdAt = createdAt;

            batch.set(this._getListItemRef(listId, itemId), item);
        }

        await batch.commit();
    }

    public async updateItem(listId: string, itemId: string, item: ShoppingItem) {
        item.updatedAt = new Date().getTime();
        await updateDoc(this._getListItemRef(listId, itemId), item);
    }

    public async deleteItem(listId: string, itemId: string) {
        await deleteDoc(this._getListItemRef(listId, itemId));
    }

    public async clearList(listId: string) {
        const query = this._getListItemCollectionRef(listId);
        const { docs } = await getDocs(query);

        const batch = writeBatch(firebaseFirestore);

        for (const doc of docs) {
            batch.delete(doc.ref);
        }
        
        await batch.commit();
    }

    private _getListCollectionRef() {
        return collection(firebaseFirestore, `${this._listPath}`);
    }

    private _getListRef(listId: string) {
        return doc(firebaseFirestore, `${this._listPath}/${listId}`);
    }

    private _getListItemCollectionRef(listId: string) {
        return collection(firebaseFirestore, `${this._listPath}/${listId}/items`);
    }

    private _getListItemRef(listId: string, itemId: string) {
        return doc(firebaseFirestore, `${this._listPath}/${listId}/items/${itemId}`);
    }
}

export default new ListService();
