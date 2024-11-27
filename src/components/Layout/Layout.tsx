import { PropsWithChildren } from 'react';

import { Header } from '../Header/Header';
import styles from './Layout.module.scss';


type LayoutProps = PropsWithChildren;

const Layout: React.FC<LayoutProps> = ({ children }) => {

    return (
        <>
            <Header />
            <div className={styles.content}>
                {children}
            </div>
        </>
    );
}

export default Layout;
