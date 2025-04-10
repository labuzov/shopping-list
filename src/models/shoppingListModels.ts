export enum ShoppingListIcon {
    Default = 'default',
    Cart = 'cart',
    WB = 'wb',
    Ozon = 'ozon',
    Fix = 'fix',
    Korona = 'korona',
    Shirt = 'shirt'
}

export type ShoppingList = {
    title?: string;
    icon?: ShoppingListIcon;
    order?: string[];
    createdAt?: number;
    createdBy?: string;
    updatedAt?: number;
    sharedWith?: string[];
    isPublic?: boolean;
}

export type ShoppingItem = {
    title?: string;
    isDone?: boolean;
    price?: string | number;
    amount?: number;
    createdAt?: number;
    updatedAt?: number;
}