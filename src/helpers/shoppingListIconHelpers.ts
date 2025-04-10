import { MdShoppingCart } from 'react-icons/md';
import { IoMdListBox } from 'react-icons/io';
import { IoShirtSharp } from 'react-icons/io5';

import { ShoppingListIcon } from '@/models/shoppingListModels';

import { FixIcon } from '@/components/Icons/FixIcon';
import { KoronaIcon } from '@/components/Icons/KoronaIcon';
import { WBIcon } from '@/components/Icons/WBIcon';
import { OzonIcon } from '@/components/Icons/OzonIcon';


export const getShoppingListIcon = (icon?: ShoppingListIcon) => {
    switch (icon) {
        case ShoppingListIcon.Cart: return MdShoppingCart;
        case ShoppingListIcon.WB: return WBIcon;
        case ShoppingListIcon.Ozon: return OzonIcon;
        case ShoppingListIcon.Fix: return FixIcon;
        case ShoppingListIcon.Korona: return KoronaIcon;
        case ShoppingListIcon.Shirt: return IoShirtSharp;
        default: return IoMdListBox;
    }
}