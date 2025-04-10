
import classNames from 'classnames';
import { IconType } from 'react-icons';
import { CSSProperties } from 'react';

import styles from './Button.module.scss';
import { Loading } from '../Loading/Loading';
import { ButtonVariant } from './types';


type ButtonProps = {
    text?: string;
    hint?: string;
    className?: string;
    disabled?: boolean;
    variant?: ButtonVariant;
    isLoading?: boolean;
    style?: CSSProperties;
    Icon?: IconType;
    onClick?: () => Promise<void> | void;
};

export const Button: React.FC<ButtonProps> = ({
    hint, text, className, disabled, variant, isLoading, style, Icon, onClick
}) => {

    const classes = classNames(
        styles.button,
        variant === 'outline' && styles.variantOutline,
        variant === 'outlineSecondary' && styles.variantOutlineSecondary,
        variant === 'text' && styles.variantText,
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
