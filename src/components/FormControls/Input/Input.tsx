import { FC, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { IconType } from 'react-icons';

import { FormFeedback } from '../FormFeedback/FormFeedback';
import styles from './Input.module.scss';


export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	invalid?: boolean;
	errors?: string | string[];
	iconClassName?: string;
	Icon?: IconType;
	onIconClick?: () => void;
};

export const Input: FC<InputProps> = (props) => {
	const { className, invalid, errors, value, iconClassName, Icon, onIconClick, ...rest } = props;

	const isInvalid = invalid || errors?.length;

	const renderIcon = () => {
		if (!Icon) return null;

		return (
			<div className={classNames(styles.icon, iconClassName)} onClick={onIconClick}>
                {<Icon />}
			</div>
		)
	}

	const renderFeedback = () => {
		if (!errors?.length) return null;

		const errorValue = Array.isArray(errors) ? errors.join('. ') : errors;

		return (
			<FormFeedback>
				{errorValue}
			</FormFeedback>
		)
	}

	return (
		<>
			<div className={styles.wrapper}>
				<input
					{...rest}
					className={classNames(styles.input, !!Icon && styles.hasIcon, isInvalid && styles.invalid, className)}
					title={value?.toString()}
					value={value}
				/>
				{renderIcon()}
			</div>
			{renderFeedback()}
		</>
	);
};
