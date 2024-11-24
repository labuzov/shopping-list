/* eslint-disable react-refresh/only-export-components */
import { PropsWithChildren, createContext, useState } from 'react';


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

const DEFAULT_PRIMARY_COLOR = PrimaryColors.Blue;
const PRIMARY_COLOR_KEY = 'primaryColor';
const DEFAULT_APP_THEME = AppTheme.Light;
const APP_THEME_KEY = 'appTheme';

type AppViewContextValue = {
    primaryColor: PrimaryColors;
    appTheme: AppTheme;
    initAppView: () => void;
    setPrimaryColor: (color: PrimaryColors) => void;
    setAppTheme: (theme: AppTheme) => void;
}

export const AppViewContext = createContext<AppViewContextValue>(null!);

const AppViewProvider = ({ children }: PropsWithChildren) => {
    const [primaryColor, setColor] = useState(DEFAULT_PRIMARY_COLOR);
    const [appTheme, setTheme] = useState(DEFAULT_APP_THEME);

    const initAppView = () => {
        const color = localStorage.getItem(PRIMARY_COLOR_KEY) as PrimaryColors || DEFAULT_PRIMARY_COLOR;
        const theme = localStorage.getItem(APP_THEME_KEY) as AppTheme || DEFAULT_APP_THEME;

        setPrimaryColor(color);
        setAppTheme(theme);
    }

    const setPrimaryColor = (color: PrimaryColors) => {
        localStorage.setItem(PRIMARY_COLOR_KEY, color);

        document.body.dataset['color'] = color;

        setColor(color);
    }

    const setAppTheme = (theme: AppTheme) => {
        localStorage.setItem(APP_THEME_KEY, theme);

        document.body.dataset['theme'] = theme;

        setTheme(theme);
    }

    const contextValue = {
        primaryColor,
        appTheme,
        initAppView,
        setPrimaryColor,
        setAppTheme
    };

    return <AppViewContext.Provider value={ contextValue }>{ children }</AppViewContext.Provider>;
};

export default AppViewProvider;
