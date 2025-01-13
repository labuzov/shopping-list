import { useNavigate } from 'react-router-dom';
import { MdLogin } from 'react-icons/md';

import { ROUTES } from '@/constants/routes';
import { User } from '@/stores/AuthStore';

import { Avatar } from '@/components/Avatar/Avatar';

import styles from './MenuPanelProfile.module.scss';


type Props = {
    user: User | null;
    onClick?: () => void;
    onLoginClick: () => void;
    onLogoutClick: () => void;
};

export const MenuPanelProfile: React.FC<Props> = ({
    user, onClick, onLoginClick, onLogoutClick
}) => {
    const navigate = useNavigate();
    const isAuth = !!user;

    const handleLoginClick = () => {
        onLoginClick();

        navigate(ROUTES.login.get());
        onClick?.();
    }

    const handleProfileClick = () => {
        onLogoutClick();

        navigate(ROUTES.profile.get());
        onClick?.();
    }

    return ( 
        <div className={styles.account}>
            {isAuth ? (
                <div onClick={handleProfileClick} className={styles.accountInfo}>
                    <div className={styles.accountInfoAvatar}>
                        <Avatar src={user.photoURL} />
                    </div>
                    <div className={styles.accountInfoText}>
                        <div className={styles.accountInfoTextPrimary}>{user.displayName}</div>
                        <div className={styles.accountInfoTextSecondary}>{user.email || user.phoneNumber}</div>
                    </div>
                </div>
            ) : (
                <div 
                    className={styles.accountLogin}
                    onClick={handleLoginClick}
                >
                    <div className={styles.accountLoginIcon}>
                        <MdLogin />
                    </div>
                    <div className={styles.accountLoginText}>Войти</div>
                </div>
            )}
        </div>
    );
};
