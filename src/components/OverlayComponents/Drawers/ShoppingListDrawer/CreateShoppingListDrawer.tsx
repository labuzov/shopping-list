import { useState } from 'react';
import { MdArrowBack } from 'react-icons/md';

import { useLoading } from '@/hooks/loadingHooks';
import { ShoppingList, ShoppingListIcon } from '@/models/shoppingListModels';
import ListService from '@/services/ListService';

import { Label } from '@/components/Label/Label';
import { Input } from '@/components/FormControls/Input/Input';
import { IconButton } from '@/components/IconButton/IconButton';
import { Button } from '@/components/Button/Button';
import { Row } from '@/components/Form/Row/Row';

import { Drawer } from '../Drawer';
import styles from './ShoppingListDrawer.module.scss';
import { ShoppingListIconSelect } from './ShoppingListIconSelect/ShoppingListIconSelect';
import { OverlayComponentBase } from '../../types';
import { Switch } from '@/components/FormControls/Switch/Switch';


type CreateShoppingListDrawerProps = OverlayComponentBase;

export const CreateShoppingListDrawer: React.FC<CreateShoppingListDrawerProps> = ({
    open, onClose
}) => {
    const [title, setTitle] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [icon, setIcon] = useState(ShoppingListIcon.Default);

    const { isLoading, addToLoading } = useLoading();

    const handleIsPublicSwitch = () => {
        setIsPublic(value => !value);
    }

    const handleCreate = async () => {
        const list: ShoppingList = {
            title,
            icon,
            isPublic
        };

        await addToLoading(() => ListService.createList(list));
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

                    <Row className={styles.additionalSettings}>
                        <Label text="Доп. настройки" />
                        <div className={styles.switchContainer}>
                            <div className={styles.title}>Видимый для всех</div>
                            <div className={styles.switch}>
                                <Switch
                                    isChecked={isPublic}
                                    onChange={handleIsPublicSwitch}
                                />
                            </div>
                        </div>
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