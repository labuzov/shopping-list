import { FC, TextareaHTMLAttributes } from 'react';
import classNames from 'classnames';

import { FormFeedback } from '../FormFeedback/FormFeedback';
import styles from './Textarea.module.scss';


export type InputProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
	invalid?: boolean;
	errors?: string | string[];
};

export const Textarea: FC<InputProps> = (props) => {
	const { className, invalid, errors, value, ...rest } = props;

	const isInvalid = invalid || errors?.length;

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
				<textarea
                    rows={10}
					{...rest}
					className={classNames(styles.input, isInvalid && styles.invalid, className)}
					title={value?.toString()}
					value={value}
				/>
			</div>
			{renderFeedback()}
		</>
	);
};
