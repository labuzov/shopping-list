import { IoMdListBox } from 'react-icons/io';

import { ShoppingListIcon } from '@/models/shoppingListModels';

import { FixIcon } from '@/components/Icons/FixIcon';
import { KoronaIcon } from '@/components/Icons/KoronaIcon';
import { WBIcon } from '@/components/Icons/WBIcon';


export const getShoppingListIcon = (icon: ShoppingListIcon) => {
    switch (icon) {
        case ShoppingListIcon.Korona: return KoronaIcon;
        case ShoppingListIcon.Fix: return FixIcon;
        case ShoppingListIcon.WB: return WBIcon;
        default: return IoMdListBox;
    }
}