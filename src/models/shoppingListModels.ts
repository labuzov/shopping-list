export type ShoppingList = {
    items?: { [id: string]: ShoppingItem };
}

export type ShoppingItem = {
    title?: string;
    isDone?: boolean;
    price?: string | number;
    amount?: number;
    createdAt?: number;
    updatedAt?: number;
}