import styles from './Summary.module.scss';


type Props = {
    totalPrice: number | string;
    remainingTotalPrice: number | string;
};

export const Summary: React.FC<Props> = ({ totalPrice, remainingTotalPrice }) => {

    return (
        <div className={styles.summary}>
            <div className={styles.row}>
                Сумма: <span>{totalPrice}</span> р.
            </div>
            <div className={styles.row}>
                Осталось купить на: <span>{remainingTotalPrice}</span> р.
            </div>
        </div>
    );
}