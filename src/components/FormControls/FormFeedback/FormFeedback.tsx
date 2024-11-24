import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';

import styles from './FormFeedback.module.scss';


type FormFeedbackProps = PropsWithChildren & {
	className?: string;
};

export const FormFeedback: FC<FormFeedbackProps> = ({ className, children }) => {

	return (
		<div className={classNames(styles.feedback, className)}>
            {children}
        </div>
	);
};
