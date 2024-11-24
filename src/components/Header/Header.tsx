import { PropsWithChildren } from 'react';
import { MdMenu } from 'react-icons/md';

import { useOverlayComponent } from '@/hooks/overlayComponentsHooks';

import { IconButton } from '../IconButton/IconButton';
import { MenuPanelDrawer } from './MenuPanelDrawer/MenuPanelDrawer';
import { Container } from '../Container/Container';
import styles from './Header.module.scss';


type HeaderProps = PropsWithChildren;

export const Header: React.FC<HeaderProps> = ({ children }) => {
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

                        <div className={styles.logo}>
                            Покупки
                        </div>
                    </div>
                    <div className={styles.right}>
                        {children}
                    </div>
                </Container>
            </div>
        </>
    );
}
