import { MdLogin, MdLogout } from 'react-icons/md';

import { User } from '@/stores/AuthStore';

import { Avatar } from '@/components/Avatar/Avatar';

import styles from './MenuPanelProfile.module.scss';


type Props = {
    user: User | null;
    onLoginClick: () => void;
    onLogoutClick: () => void;
    onProfileClick?: () => void;
};

export const MenuPanelProfile: React.FC<Props> = ({
    user, onLoginClick, onLogoutClick, onProfileClick
}) => {
    const isAuth = !!user;

    return ( 
        <div className={styles.account}>
            {isAuth ? (
                <div onClick={onProfileClick} className={styles.accountInfo}>
                    <div className={styles.accountInfoLeft}>
                        <div className={styles.accountInfoAvatar}>
                            <Avatar src={user.photoURL} />
                        </div>
                        <div className={styles.accountInfoText}>
                            <div className={styles.accountInfoTextPrimary}>{user.displayName}</div>
                            <div className={styles.accountInfoTextSecondary}>{user.email || user.phoneNumber}</div>
                        </div>
                    </div>
                    <div className={styles.accountInfoRight}>
                        <div className={styles.logoutIcon} onClick={onLogoutClick}>
                            <MdLogout />
                        </div>
                    </div>
                </div>
            ) : (
                <div 
                    className={styles.accountLogin}
                    onClick={onLoginClick}
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
