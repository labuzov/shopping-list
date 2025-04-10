import { FC, useMemo } from 'react';
import { MdMenu } from 'react-icons/md';
import { useShallow } from 'zustand/shallow';

import { FirestoreDataOrdering, useFirestoreData } from '@/hooks/firestoreHooks';
import { ShoppingList } from '@/models/shoppingListModels';
import { useOverlayComponentsStore } from '@/stores/OverlayComponentsStore';
import { useHeaderStore } from '@/stores/HeaderStore';
import { useAuthStore } from '@/stores/AuthStore';

import { IconButton } from '../IconButton/IconButton';
import { MenuPanelDrawer } from './MenuPanelDrawer/MenuPanelDrawer';
import { Container } from '../Container/Container';
import styles from './Header.module.scss';
import { getVisibleLists } from './utils';


const ordering: FirestoreDataOrdering = { field: 'createdAt', directionStr: 'asc' };

export const Header: FC = () => {
    const { title, contentOnRight } = useHeaderStore(useShallow(({
        title, contentOnRight
    }) => ({
        title, contentOnRight
    })));
    const { user, loginWithGoogle, logout } = useAuthStore(useShallow(({
        user, loginWithGoogle, logout
    }) => ({
        user, loginWithGoogle, logout
    })));
    const showComponent = useOverlayComponentsStore(state => state.showComponent);

    const { data } = useFirestoreData<ShoppingList>(`lists`, { ordering });

    const handleMenuButtonClick = () => {
        showComponent(MenuPanelDrawer, {
            lists,
            user,
            onLoginClick: loginWithGoogle,
            onLogoutClick: logout
        });
    }

    const lists = useMemo(() => getVisibleLists(data, user?.uid), [data, user?.uid]);

    return (
        <>
            <div className={styles.header}>
                <Container className={styles.container}>
                    <div className={styles.left}>
                        <IconButton Icon={MdMenu} onClick={handleMenuButtonClick} />

                        <div className={styles.title}>
                            {title || 'Покупки'}
                        </div>
                    </div>
                    <div className={styles.right}>
                        {contentOnRight}
                    </div>
                </Container>
            </div>
        </>
    );
}
