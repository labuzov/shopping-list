import { FirestoreData } from '@/hooks/firestoreHooks';
import { ShoppingItem, ShoppingList } from '@/models/shoppingListModels';


export const getListSummary = (items: ShoppingItem[]) => {
    const digits = 2;

    let totalPrice = 0;
    let remainingTotalPrice = 0;

    for (const item of items) {
        if (!item.price) continue;

        const price = Number((item.price).toString().replace(',', '.'));
        if (!isNumber(price)) continue;

        let amount = Number((item.amount)?.toString());
        if (!isNumber(amount)) amount = 1;

        const isDone = !!item.isDone;
        if (!isDone) remainingTotalPrice += price * amount;

        totalPrice += price * amount;
    }

    return {
        totalPrice: totalPrice.toFixed(digits),
        remainingTotalPrice: remainingTotalPrice.toFixed(digits)
    };
}

export const getListItemsAmount = (items: ShoppingItem[]) => {
    const total = items.length;
    const done = items.filter(({ isDone }) => !!isDone).length;

    return {
        total,
        done
    }
}

const isNumber = (value: number) => {
    return !isNaN(value) && typeof value === 'number';
}

export const getList = (lists: FirestoreData<ShoppingList>[]) => {
    if (!lists?.length) return null;

    return lists[0];
}

export const getSortedShoppingItems = (
    items: FirestoreData<ShoppingItem>[],
    list: FirestoreData<ShoppingList> | null
): FirestoreData<ShoppingItem>[] => {
    if (!items || !list) return [];

    const order = list.order;
    if (!order) return items;

    const sortedItems = [];

    for (const itemId of order) {
        const item = items.find(({ id }) => itemId === id);
        if (!item) continue;

        sortedItems.push(item);
    }

    for (const shoppingItem of items) {
        const isInList = sortedItems.find(({ id }) => id === shoppingItem.id);
        if (isInList) continue;

        sortedItems.push(shoppingItem);
    }

    return sortedItems;
}