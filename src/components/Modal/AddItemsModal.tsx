import { useState } from 'react';

import { Modal, ModalButton, ModalProps } from '@/components/Modal/Modal';
import { ButtonType } from '../Button/Button';
import { Textarea } from '../FormControls/Textarea/Textarea';
import { ShoppingItem } from '@/models/shoppingListModels';


export type AddItemsModalProps = ModalProps;

export const AddItemsModal: React.FC<AddItemsModalProps> = ({
    onClose, ...props
}) => {
    const [value, setValue] = useState('');

    const handleCreate = () => {
        const items = value.split("\n");
        const shoppingItems: ShoppingItem[] = [];

        items.forEach((item, index) => {
            if (item) {
                shoppingItems.push({
                    title: item,
                    createdAt: new Date().getTime() + index
                })
            }
        })

        // addItems(shoppingItems);
        onClose();
    }

    const handleCancel = () => {
        onClose();
    }

    const getButtons = () => {
        const buttons: ModalButton[] = [];

        const cancelText = 'Отмена';
        const createText = 'Добавить';

        buttons.push({ text: cancelText, type: ButtonType.OutlineSecondary, onClick: handleCancel });
        buttons.push({ text: createText, onClick: handleCreate });

        return buttons;
    }

    const modalTitle = 'Добавить в список';

    return (
        <Modal
            title={modalTitle}
            buttons={getButtons()}
            onClose={onClose}
            {...props}
        >
            <Textarea
                name="items"
                value={value}
                onChange={e => setValue(e.currentTarget.value)}
            />
        </Modal>
    );
}
