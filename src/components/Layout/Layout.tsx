import { PropsWithChildren } from 'react';

import styles from './Layout.module.scss';


type LayoutProps = PropsWithChildren;

const Layout: React.FC<LayoutProps> = ({ children }) => {

    return (
        <div className={styles.content}>
            {children}
        </div>
    );
}

export default Layout;
