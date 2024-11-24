
import { MdDeleteOutline, MdOutlineMode } from 'react-icons/md';

import { ShoppingItem } from '@/models/shoppingListModels';

import { BottomDrawer, BottomDrawerButton, BottomDrawerProps } from '@/components/Drawers/BottomDrawer/BottomDrawer';
import { BottomDrawerButtonColors } from '@/components/Drawers/BottomDrawer/BottomDrawerButton';


type ItemDrawerProps = BottomDrawerProps & {
    item: ShoppingItem;
    onEditClick?: () => void;
    onDeleteClick?: () => void;
}

export const ItemDrawer: React.FC<ItemDrawerProps> = ({ open, item, onEditClick, onDeleteClick, onClose }) => {

    const getButtons = () => {
        const buttons: BottomDrawerButton[] = [
            { text: 'Редактировать', Icon: MdOutlineMode, onClick: onEditClick },
            { text: 'Удалить', color: BottomDrawerButtonColors.Danger, Icon: MdDeleteOutline, onClick: onDeleteClick },
        ];

        return buttons;
    }

    return (
        <BottomDrawer
            open={open}
            header={item.title}
            buttons={getButtons()}
            onClose={onClose}
        />
    );
}
