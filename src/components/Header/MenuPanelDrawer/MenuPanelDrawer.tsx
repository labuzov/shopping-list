import { AiOutlineHome, AiOutlineSetting } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import { ShoppingList } from '@/models/shoppingListModels';

import { OverlayComponentBase } from '@/components/OverlayComponentsContainer';
import { Drawer } from '@/components/Drawers/Drawer';

import { MenuPanelButton } from './MenuPanelButton/MenuPanelButton';
import styles from './MenuPanelDrawer.module.scss';
import { useMemo } from 'react';
import { FirestoreData } from '@/hooks/firestoreHooks';
import { getShoppingListIcon } from '@/helpers/shoppingListIconHelpers';


type MenuPanelDrawerProps = OverlayComponentBase & {
    lists: FirestoreData<ShoppingList>[];
};

export const MenuPanelDrawer: React.FC<MenuPanelDrawerProps> = ({
    lists, onClose, ...props 
}) => {
    const navigate = useNavigate();

    const handleHomeButtonClick = () => {
        navigate('/');
        onClose();
    }

    const handleSettingsButtonClick = () => {
        navigate('/settings');
        onClose();
    }

    const listButtons = useMemo(() => {
        if (!lists.length) return null;

        return (
            <>
                <div className={styles.divider} />
                {lists.map(list => (
                    <MenuPanelButton
                        key={list.id}
                        text={list.title || 'Без названия'}
                        Icon={getShoppingListIcon(list.icon)}
                        onClick={() => {
                            navigate(`/list/${list.id}`);
                            onClose();
                        }}
                    />
                ))}
            </>
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lists]);

    return ( 
        <Drawer
            position="left"
            paperClassName={styles.paper}
            onClose={onClose}
            {...props}
        >
            <div className={styles.container}>
                <div className={styles.panelWrapper}>
                    <div className={styles.logo}>
                        ShoppingList
                    </div>
                    <div className={styles.list}>
                        <MenuPanelButton
                            text="Главная"
                            Icon={AiOutlineHome}
                            onClick={handleHomeButtonClick}
                        />

                        {listButtons}

                        <div className={styles.divider} />
                        <MenuPanelButton
                            text="Настройки"
                            Icon={AiOutlineSetting}
                            onClick={handleSettingsButtonClick}
                        />
                    </div>
                </div>
                <div className={styles.bg} onClick={onClose} />
            </div>
        </Drawer>
    );
};
