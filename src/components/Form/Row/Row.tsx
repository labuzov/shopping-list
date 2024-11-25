


import { PropsWithChildren } from 'react';
import classNames from 'classnames';

import styles from './Row.module.scss';


type RowProps = PropsWithChildren & {
    className?: string;
}

export const Row: React.FC<RowProps> = ({ className, children }) => {

    return (
        <div className={classNames(styles.row, className)}>
            {children}
        </div>
    );
}
