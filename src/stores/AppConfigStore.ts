import { create } from 'zustand';


export enum PrimaryColors {
    Blue = 'blue',
    Purple = 'purple',
    Orange = 'orange',
    Red = 'red'
}

export enum AppTheme {
    Light = 'light',
    Dark = 'dark'
}

enum AppConfigKeys {
    PrimaryColor = 'primaryColor',
    AppTheme = 'appTheme'
}

const defaultAppConfig = {
    [AppConfigKeys.PrimaryColor]: PrimaryColors.Blue,
    [AppConfigKeys.AppTheme]: AppTheme.Light
}

type AppConfig = typeof defaultAppConfig;

type AppConfigState = {
    appConfig: AppConfig;
    initAppConfig: () => void;
    setAppTheme: (appTheme: AppTheme) => void;
    setPrimaryColor: (primaryColor: PrimaryColors) => void;
}

export const useAppConfigStore = create<AppConfigState>(set => ({
    appConfig: defaultAppConfig,

    initAppConfig: () => {
        const config = { ...defaultAppConfig };

        for (const configKey in config) {
            const key = configKey as keyof typeof config;

            const value = localStorage.getItem(key) ?? config[key];

            localStorage.setItem(key, value);
            (config as Record<typeof key, string>)[key] = value;

            if (key === AppConfigKeys.AppTheme) {
                document.body.dataset['theme'] = value;
            }

            if (key === AppConfigKeys.PrimaryColor) {
                document.body.dataset['color'] = value;
            }
        }

        set({ appConfig: config });
    },

    setAppTheme: (appTheme: AppTheme) => {
        localStorage.setItem(AppConfigKeys.AppTheme, appTheme);

        document.body.dataset['theme'] = appTheme;

        set(state => ({ appConfig: { ...state.appConfig, appTheme } }));
    },

    setPrimaryColor: (primaryColor: PrimaryColors) => {
        localStorage.setItem(AppConfigKeys.PrimaryColor, primaryColor);

        document.body.dataset['color'] = primaryColor;

        set(state => ({ appConfig: { ...state.appConfig, primaryColor } }));
    }
}));
