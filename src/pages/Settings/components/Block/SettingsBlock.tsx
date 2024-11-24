import styles from './SettingsBlock.module.scss';


type SettingsBlockProps = {
    title?: string;
    children?: React.ReactNode;
}

export const SettingsBlock: React.FC<SettingsBlockProps> = ({ title, children }) => {

    return ( 
        <div className={styles.wrapper}>
            {!!title && <div className={styles.title}>{title}</div>}
            {children}
        </div>
    );
}
