import { FC, useContext } from 'react';
import { MdMenu } from 'react-icons/md';

import { FirestoreDataOrdering, useFirestoreData } from '@/hooks/firestoreHooks';
import { useOverlayComponent } from '@/hooks/overlayComponentsHooks';
import { HeaderContext } from '@/providers/HeaderProvider';
import { ShoppingList } from '@/models/shoppingListModels';

import { IconButton } from '../IconButton/IconButton';
import { MenuPanelDrawer } from './MenuPanelDrawer/MenuPanelDrawer';
import { Container } from '../Container/Container';
import styles from './Header.module.scss';


const ordering: FirestoreDataOrdering = { field: 'createdAt', directionStr: 'asc' };

export const Header: FC = () => {
    const { title, content } = useContext(HeaderContext);
    const { showOverlayComponent, closeOverlayComponent } = useOverlayComponent();

    const { data: lists } = useFirestoreData<ShoppingList>(`lists`, { ordering });

    const handleMenuButtonClick = () => {
        showOverlayComponent(MenuPanelDrawer, { lists, onClose: closeOverlayComponent });
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
                        {content}
                    </div>
                </Container>
            </div>
        </>
    );
}
