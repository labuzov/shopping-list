import { useMemo } from 'react';
import { AiOutlineHome, AiOutlineSetting } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import { ShoppingList } from '@/models/shoppingListModels';
import { FirestoreData } from '@/hooks/firestoreHooks';
import { getShoppingListIcon } from '@/helpers/shoppingListIconHelpers';
import { ROUTES } from '@/constants/routes';
import { User } from '@/stores/AuthStore';

import { Drawer } from '@/components/OverlayComponents/Drawers';
import { OverlayComponentBase } from '@/components/OverlayComponents';

import { MenuPanelButton } from './MenuPanelButton/MenuPanelButton';
import styles from './MenuPanelDrawer.module.scss';
import { MenuPanelProfile } from './Profile/MenuPanelProfile';
import { Button } from '@/components/Button';
import { useOverlayComponentsStore } from '@/stores/OverlayComponentsStore';
import { CreateShoppingListDrawer } from '@/components/OverlayComponents/Drawers/ShoppingListDrawer/CreateShoppingListDrawer';


type MenuPanelDrawerProps = OverlayComponentBase & {
    lists: FirestoreData<ShoppingList>[];
    user: User | null;
    onLoginClick: () => void;
    onLogoutClick: () => void;
};

export const MenuPanelDrawer: React.FC<MenuPanelDrawerProps> = ({
    user, lists, onLoginClick, onLogoutClick, onClose, ...props 
}) => {
    const showComponent = useOverlayComponentsStore(state => state.showComponent);

    const navigate = useNavigate();

    const canCreateList = !!user;

    const handleNavigateAndClose = (path: string) => {
        navigate(path);
        onClose?.();
    }

    const handleHomeButtonClick = () => {
        handleNavigateAndClose('/');
    }

    const handleCreateListClick = () => {
        onClose?.();
        showComponent(CreateShoppingListDrawer);
    }

    const handleSettingsButtonClick = () => {
        handleNavigateAndClose(ROUTES.settings.get());
    }

    const handleLoginClick = () => {
        onLoginClick();

        onClose?.();
    }

    const handleLogoutClick = () => {
        onLogoutClick();

        onClose?.();
    }

    const listButtons = useMemo(() => {
        if (!lists.length) return null;

        return (
            <div className={styles.lists}>
                <div className={styles.divider} />
                {lists.map(list => (
                    <MenuPanelButton
                        key={list.id}
                        text={list.title || 'Без названия'}
                        Icon={getShoppingListIcon(list.icon)}
                        onClick={() => {
                            handleNavigateAndClose(ROUTES.list.get(list.id));
                        }}
                    />
                ))}
            </div>
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
                    <div className={styles.content}>
                        <MenuPanelButton
                            text="Главная"
                            Icon={AiOutlineHome}
                            onClick={handleHomeButtonClick}
                        />

                        {listButtons}

                        {canCreateList && (
                            <Button
                                className={styles.addListButton}
                                text="+ Создать список"
                                variant="text"
                                onClick={handleCreateListClick}
                            />
                        )}
                    </div>
                    <div className={styles.bottom}>
                        <MenuPanelButton
                            text="Настройки"
                            Icon={AiOutlineSetting}
                            onClick={handleSettingsButtonClick}
                        />
                        
                        <MenuPanelProfile
                            user={user}
                            onLoginClick={handleLoginClick}
                            onLogoutClick={handleLogoutClick}
                        />
                    </div>
                </div>
                <div className={styles.bg} onClick={onClose} />
            </div>
        </Drawer>
    );
};
