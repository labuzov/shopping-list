import styles from './Errors.module.scss';


const Page404: React.FC = () => {

    return (
        <div className={styles.container}>
            <div className={styles.code}>404</div>
            <div className={styles.text}>Страница не найдена</div>
        </div>
    );
}

export default Page404;
