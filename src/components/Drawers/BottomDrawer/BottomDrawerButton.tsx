import { IconType } from 'react-icons';

import styles from './BottomDrawer.module.scss';
import classNames from 'classnames';


// eslint-disable-next-line react-refresh/only-export-components
export enum BottomDrawerButtonColors {
    Default,
    Danger,
}

type BottomDrawerButtonProps = {
    text?: string;
    color?: BottomDrawerButtonColors;
    disabled?: boolean;
    Icon: IconType;
    onClick?: () => void | Promise<void>;
};

export const BottomDrawerButton: React.FC<BottomDrawerButtonProps> = ({ text, color, disabled, Icon, onClick }) => {

    return (
        <button
            disabled={disabled}
            className={classNames(
                styles.button,
                color === BottomDrawerButtonColors.Danger && styles.danger
            )}
            onClick={onClick}
        >
            <Icon size={20} />
            <span>{text}</span>
        </button>
    );
}