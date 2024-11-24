import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';

import styles from './Container.module.scss';


type ContainerProps = PropsWithChildren & {
    maxWidth?: number;
    headerOffset?: boolean;
    className?: string;
};

export const Container: FC<ContainerProps> = ({ maxWidth, headerOffset, className, children }) => {
    const maxWidthValue = maxWidth ? `${maxWidth}px` : undefined;

    return (
        <div className={classNames(styles.container, headerOffset && styles.headerOffset, className)} style={{ maxWidth: maxWidthValue }}>
            {children}
        </div>
    );
}

