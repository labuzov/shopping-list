import { FC } from 'react';
import { MdMenu } from 'react-icons/md';

import { FirestoreDataOrdering, useFirestoreData } from '@/hooks/firestoreHooks';
import { ShoppingList } from '@/models/shoppingListModels';
import { useOverlayComponentsStore } from '@/stores/OverlayComponentsStore';
import { useHeaderStore } from '@/stores/HeaderStore';

import { IconButton } from '../IconButton/IconButton';
import { MenuPanelDrawer } from './MenuPanelDrawer/MenuPanelDrawer';
import { Container } from '../Container/Container';
import styles from './Header.module.scss';


const ordering: FirestoreDataOrdering = { field: 'createdAt', directionStr: 'asc' };

export const Header: FC = () => {
    const title = useHeaderStore(state => state.title);
    const contentOnRight = useHeaderStore(state => state.contentOnRight);
    const showComponent = useOverlayComponentsStore(state => state.showComponent);

    const { data: lists } = useFirestoreData<ShoppingList>(`lists`, { ordering });

    const handleMenuButtonClick = () => {
        showComponent(MenuPanelDrawer, { lists });
    }

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
