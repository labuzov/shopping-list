import { AppTheme } from '@/stores/AppConfigStore';

import { Switch } from '@/components/FormControls/Switch/Switch';

import styles from './ThemeSwitch.module.scss';


type Props = {
    theme: AppTheme;
    onChange: (theme: AppTheme) => void;
}

export const ThemeSwitch: React.FC<Props> = ({ theme, onChange }) => {
    const handleDarkThemeSwitch = (isChecked: boolean) => {
        if (isChecked) {
            onChange(AppTheme.Dark);
            return;
        }

        onChange(AppTheme.Light);
    }

    return ( 
        <div className={styles.container}>
            <div className={styles.title}>Включить темную тему</div>
            <div className={styles.switch}>
                <Switch
                    isChecked={theme === AppTheme.Dark}
                    onChange={handleDarkThemeSwitch}
                />
            </div>
        </div>
    );
}
