import { Container } from '@/components/Container/Container';
import { SettingsBlock } from './components/Block/SettingsBlock';
import { PrimaryColorList } from './components/PrimaryColors/PrimaryColors';
import { ThemeSwitch } from './components/ThemeSwitch/ThemeSwitch';
import styles from './SettingsPage.module.scss';
import { Header } from '@/components/Header/Header';


const SettingsPage: React.FC = () => {

    return (
        <>
            <Header />
            <Container headerOffset maxWidth={768} className={styles.container}>
                <div className={styles.title}>Настройки</div>

                <div className={styles.blocks}>
                    <SettingsBlock title="Тема">
                        <ThemeSwitch />
                    </SettingsBlock>
                    <SettingsBlock title="Акцентный цвет">
                        <PrimaryColorList />
                    </SettingsBlock>
                </div>

            </Container>
        </>
    );
}

export default SettingsPage;
