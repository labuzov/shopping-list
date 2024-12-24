import { useAppConfigStore } from '@/stores/AppConfigStore';

import { Container } from '@/components/Container/Container';
import { SettingsBlock } from './components/Block/SettingsBlock';
import { PrimaryColorList } from './components/PrimaryColors/PrimaryColors';
import { ThemeSwitch } from './components/ThemeSwitch/ThemeSwitch';
import styles from './SettingsPage.module.scss';


const SettingsPage: React.FC = () => {
    const appConfig = useAppConfigStore(state => state.appConfig);
    const setAppTheme = useAppConfigStore(state => state.setAppTheme);
    const setPrimaryColor = useAppConfigStore(state => state.setPrimaryColor);

    return (
        <>
            <Container maxWidth={768} className={styles.container}>
                <div className={styles.title}>Настройки</div>

                <div className={styles.blocks}>
                    <SettingsBlock title="Тема">
                        <ThemeSwitch
                            theme={appConfig.appTheme}
                            onChange={setAppTheme}
                        />
                    </SettingsBlock>
                    <SettingsBlock title="Акцентный цвет">
                        <PrimaryColorList
                            color={appConfig.primaryColor}
                            onChange={setPrimaryColor}
                        />
                    </SettingsBlock>
                </div>
            </Container>
        </>
    );
}

export default SettingsPage;
