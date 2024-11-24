

import { useContext } from 'react';

import { AppTheme, AppViewContext } from '@/providers/AppViewProvider';
import { Switch } from '@/components/FormControls/Switch/Switch';

import styles from './ThemeSwitch.module.scss';


export const ThemeSwitch: React.FC = () => {
    const { appTheme, setAppTheme } = useContext(AppViewContext);

    const handleDarkThemeSwitch = (isChecked: boolean) => {
        if (isChecked) {
            setAppTheme(AppTheme.Dark);
            return;
        }

        setAppTheme(AppTheme.Light);
    }

    return ( 
        <div className={styles.container}>
            <div className={styles.title}>Включить темную тему</div>
            <div className={styles.switch}>
                <Switch
                    isChecked={appTheme === AppTheme.Dark}
                    onChange={handleDarkThemeSwitch}
                />
            </div>
        </div>
    );
}
