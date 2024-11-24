
import classNames from 'classnames';
import { IconType } from 'react-icons';
import { CSSProperties } from 'react';

import styles from './Button.module.scss';
import { Loading } from '../Loading/Loading';


// eslint-disable-next-line react-refresh/only-export-components
export enum ButtonType {
    Default,
    Outline,
    OutlineSecondary,
}

type ButtonProps = {
    text?: string;
    hint?: string;
    className?: string;
    disabled?: boolean;
    type?: ButtonType;
    isLoading?: boolean;
    style?: CSSProperties;
    Icon?: IconType;
    onClick?: () => Promise<void> | void;
};

export const Button: React.FC<ButtonProps> = ({
    hint, text, className, disabled, type, isLoading, style, Icon, onClick
}) => {

    const classes = classNames(
        styles.button,
        type === ButtonType.Outline && styles.outline,
        type === ButtonType.OutlineSecondary && styles.outlineSecondary,
        isLoading && styles.loading,
        className
    );

    return (
        <button
            title={hint}
            className={classes}
            disabled={disabled}
            style={style}
            onClick={onClick}
        >
            {Icon && <Icon className={styles.icon} />}
            {text && <div className={styles.text}>{text}</div>}

            {isLoading && (
                <div className={styles.loadingContainer}>
                    <Loading fillContainer className={styles.spinner} />
                </div>
            )}
        </button>
    );
}
