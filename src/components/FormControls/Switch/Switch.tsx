import classNames from 'classnames';

import styles from './Switch.module.scss';


type SwitchProps = {
    isChecked: boolean;
    className?: string;
    onChange?: (isChecked: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({ className, isChecked, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.currentTarget.checked);
    }

    return ( 
        <label className={classNames(styles.switch, className)}>
            <input
                className={styles.input}
                checked={isChecked}
                type="checkbox"
                onChange={handleChange}
            />
            <span className={styles.slider} />
        </label>
    );
}
