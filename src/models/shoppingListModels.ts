export enum ShoppingListIcon {
    Default = 'default',
    Cart = 'cart',
    WB = 'wb',
    Ozon = 'ozon',
    Fix = 'fix',
    Korona = 'korona',
}

export type ShoppingList = {
    title?: string;
    icon?: ShoppingListIcon;
    createdAt?: number;
    updatedAt?: number;
}

export type ShoppingItem = {
    title?: string;
    isDone?: boolean;
    price?: string | number;
    amount?: number;
    createdAt?: number;
    updatedAt?: number;
}