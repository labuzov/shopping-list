import { useState } from 'react';
import { MdArrowBack } from 'react-icons/md';

import { ShoppingItem } from '@/models/shoppingListModels';

import { Drawer } from '../Drawer';
import { OverlayComponentBase } from '../../OverlayComponentsContainer/OverlayComponentsContainer';
import styles from './AddListItemsDrawer.module.scss';
import { Textarea } from '../../FormControls/Textarea/Textarea';
import { Button } from '../../Button/Button';
import { IconButton } from '../../IconButton/IconButton';
import { Label } from '../../Label/Label';
import { useLoading } from '@/hooks/loadingHooks';
import ListService from '@/services/ListService';


type AddListItemsDrawerProps = OverlayComponentBase & {
    listId: string;
};

export const AddListItemsDrawer: React.FC<AddListItemsDrawerProps> = ({ listId, open, onClose }) => {
    const [value, setValue] = useState('');

    const { isLoading, addToLoading } = useLoading();

    const handleCreate = async () => {
        const titles = value.split("\n");
        const shoppingItems: ShoppingItem[] = [];

        titles.forEach(title => {
            if (title) {
                shoppingItems.push({ title });
            }
        })

        await addToLoading(() => ListService.addItems(listId, shoppingItems));
        onClose?.();
    }

    return (
        <Drawer
            open={open}
            paperClassName={styles.paper}
            position="right"
            onClose={onClose}
        >
            <div className={styles.header}>
                <IconButton Icon={MdArrowBack} onClick={onClose} />
                <div className={styles.title}>Добавить в список</div>
            </div>

            <div className={styles.content}>
                <Label text='Список' />
                <Textarea value={value} onChange={e => setValue(e.currentTarget.value)} />
            </div>

            <div className={styles.divider} />

            <div className={styles.buttons}>
                <Button
                    isLoading={isLoading}
                    disabled={isLoading || !value.length}
                    text="Добавить"
                    className={styles.btn}
                    onClick={handleCreate}
                />
            </div>
        </Drawer>
    );
}