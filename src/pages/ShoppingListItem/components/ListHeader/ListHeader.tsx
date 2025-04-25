import styles from './ListHeader.module.scss';


type Props = {
    title: string;
    total: number;
    done: number;
};

export const ListHeader: React.FC<Props> = ({ title, total, done }) => {
    const isAmountVisible = !!total;

    return (
        <div className={styles.header}>
            <div className={styles.left}>
                <div className={styles.title}>
                    {title}
                </div>

                {isAmountVisible && (
                    <div className={styles.amount}>
                        ({done}/{total})
                    </div>
                )}
            </div>
            <div className={styles.right}></div>
        </div>
    );
}