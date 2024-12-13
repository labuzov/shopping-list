import { ShoppingItem } from '@/models/shoppingListModels';


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

const isNumber = (value: number) => {
    return !isNaN(value) && typeof value === 'number';
}