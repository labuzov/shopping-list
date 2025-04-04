import { FC } from 'react';

import styles from './Checkbox.module.scss';


type CheckboxProps = {
	className?: string;
    value?: boolean;
    label?: string;
    name?: string;
    onChange?: (value: boolean) => void;
};

export const Checkbox: FC<CheckboxProps> = ({ value, label, name, onChange }) => {

	return (
        <div className={styles.container} onClick={() => onChange?.(!value)}>
            <input className={styles.checkbox} checked={value} type="checkbox" name={name} readOnly />
            <span className={styles.checkmark}></span>
            {label && <div className={styles.label}>{label}</div>}
        </div>
	);
};
