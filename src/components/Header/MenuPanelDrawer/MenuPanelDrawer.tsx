import { AiOutlineHome, AiOutlineSetting } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import { MenuPanelButton } from './MenuPanelButton/MenuPanelButton';
import { OverlayComponentBase } from '@/components/OverlayComponentsContainer';
import { Drawer } from '@/components/Drawers/Drawer';
import styles from './MenuPanelDrawer.module.scss';


type MenuPanelDrawerProps = OverlayComponentBase;

export const MenuPanelDrawer: React.FC<MenuPanelDrawerProps> = ({ onClose, ...props }) => {
    const navigate = useNavigate();

    const handleHomeButtonClick = () => {
        navigate('/');
        onClose();
    }

    const handleSettingsButtonClick = () => {
        navigate('/settings');
        onClose();
    }

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
