import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';

import styles from './Container.module.scss';


type ContainerProps = PropsWithChildren & {
    maxWidth?: number;
    className?: string;
};

export const Container: FC<ContainerProps> = ({ maxWidth, className, children }) => {
    const maxWidthValue = maxWidth ? `${maxWidth}px` : undefined;

    return (
        <div className={classNames(styles.container, className)} style={{ maxWidth: maxWidthValue }}>
            {children}
        </div>
    );
}

