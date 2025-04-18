import { useState } from 'react';

import { FirestoreData } from '@/hooks/firestoreHooks';
import { ShoppingItem } from '@/models/shoppingListModels';
import { useLoading } from '@/hooks/loadingHooks';
import ListService from '@/services/ListService';

import { Label } from '@/components/Label/Label';
import { Input } from '@/components/FormControls/Input/Input';
import { Modal, ModalProps } from '../Modal';
import { ModalButton } from '../types';


export type EditItemModalProps = ModalProps & {
    item: FirestoreData<ShoppingItem>;
    listId: string;
};

export const EditItemModal: React.FC<EditItemModalProps> = ({
    item, listId, onClose, ...props
}) => {
    const { isLoading, addToLoading } = useLoading();

    const [title, setTitle] = useState(item.title ?? '');
    const [price, setPrice] = useState(item.price ?? '');

    const handleSubmit = async () => {
        const newData: ShoppingItem = {
            title,
            price,
            updatedAt: new Date().getTime()
        }

        await addToLoading(() => ListService.updateItem(listId, item.id, newData));
        onClose?.();
    }

    const handleCancel = () => {
        onClose?.();
    }

    const getButtons = () => {
        const buttons: ModalButton[] = [];

        buttons.push({ text: 'Отмена', variant: 'outlineSecondary', onClick: handleCancel });
        buttons.push({ text: 'Изменить', isLoading, isDisabled: isLoading, onClick: handleSubmit });

        return buttons;
    }

    const modalTitle = 'Редактировать';

    return (
        <Modal
            title={modalTitle}
            buttons={getButtons()}
            onClose={onClose}
            {...props}
        >
            <Label text="Название" />
            <Input
                name="title"
                value={title}
                onChange={e => setTitle(e.currentTarget.value)} style={{ marginBottom: '1rem' }}
            />

            <Label text="Цена" />
            <Input
                name="price"
                value={price}
                onChange={e => setPrice(e.currentTarget.value)}
            />
        </Modal>
    );
}
