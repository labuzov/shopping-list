import { ElementType, memo } from 'react';
import { IconType } from 'react-icons/lib';
import classNames from 'classnames';

import styles from './MenuPanelButton.module.scss';


type MenuPanelButtonProps = {
    text: string;
    className?: string;
    Icon?: IconType | ElementType | null;
    onClick?: () => void;
}

export const MenuPanelButton: React.FC<MenuPanelButtonProps> = memo(({
    text, className, Icon, onClick
}) => {

    return (
        <div className={classNames(styles.wrapper, className)} onClick={onClick}>
            <div className={styles.icon}>
                {!!Icon && <Icon />}
            </div>

            <div className={styles.text}>{text}</div>
        </div>
    );
});
