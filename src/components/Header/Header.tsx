import { FC, useContext } from 'react';
import { MdMenu } from 'react-icons/md';

import { useOverlayComponent } from '@/hooks/overlayComponentsHooks';
import { HeaderContext } from '@/providers/HeaderProvider';

import { IconButton } from '../IconButton/IconButton';
import { MenuPanelDrawer } from './MenuPanelDrawer/MenuPanelDrawer';
import { Container } from '../Container/Container';
import styles from './Header.module.scss';


export const Header: FC = () => {
    const { title, content } = useContext(HeaderContext);
    const { showOverlayComponent, closeOverlayComponent } = useOverlayComponent();

    const handleMenuButtonClick = () => {
        showOverlayComponent(MenuPanelDrawer, { onClose: closeOverlayComponent });
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
