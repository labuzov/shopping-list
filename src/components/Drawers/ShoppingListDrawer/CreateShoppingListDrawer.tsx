import { useState } from 'react';
import { MdArrowBack } from 'react-icons/md';

import { useLoading } from '@/hooks/loadingHooks';
import { ShoppingList, ShoppingListIcon } from '@/models/shoppingListModels';
import ListService from '@/services/ListService';

import { OverlayComponentBase } from '@/components/OverlayComponentsContainer';
import { Label } from '@/components/Label/Label';
import { Input } from '@/components/FormControls/Input/Input';
import { IconButton } from '@/components/IconButton/IconButton';
import { Button } from '@/components/Button/Button';
import { Row } from '@/components/Form/Row/Row';

import { Drawer } from '../Drawer';
import styles from './ShoppingListDrawer.module.scss';
import { ShoppingListIconSelect } from './ShoppingListIconSelect/ShoppingListIconSelect';


type CreateShoppingListDrawerProps = OverlayComponentBase;

export const CreateShoppingListDrawer: React.FC<CreateShoppingListDrawerProps> = ({
    open, onClose
}) => {
    const [title, setTitle] = useState('');
    const [icon, setIcon] = useState(ShoppingListIcon.Default);

    const { isLoading, addToLoading } = useLoading();

    const handleCreate = async () => {
        const list: ShoppingList = {
            title,
            icon
        };

        await addToLoading(() => ListService.createList(list));
        onClose();
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
                <div className={styles.title}>Создать список</div>
            </div>

            <div className={styles.content}>
                <div className={styles.form}>
                    <Row>
                        <Label text="Название" />
                        <Input
                            name="title"
                            value={title}
                            onChange={e => setTitle(e.currentTarget.value)}
                        />
                    </Row>

                    <Row>
                        <Label text="Иконка" />
                        <ShoppingListIconSelect
                            value={icon}
                            onChange={newIcon => setIcon(newIcon)}
                        />
                    </Row>
                </div>

                <div className={styles.buttons}>
                    <Button
                        isLoading={isLoading}
                        disabled={isLoading || !title}
                        text="Создать"
                        className={styles.btn}
                        onClick={handleCreate}
                    />
                </div>
            </div>
        </Drawer>
    );
}