/* eslint-disable react-refresh/only-export-components */
import { PropsWithChildren, createContext, useState } from 'react';


type ContextValue = {
    title: string;
    content: JSX.Element | null;
    setContent: (content: JSX.Element) => void;
    setTitle: (title: string) => void;
    reset: () => void;
}

export const HeaderContext = createContext<ContextValue>(null!);

const HeaderProvider = ({ children }: PropsWithChildren) => {
    const [content, setHeaderContent] = useState<JSX.Element | null>(null);
    const [title, setHeaderTitle] = useState('Покупки');

    const setContent = (content: JSX.Element | null) => {
        setHeaderContent(content);
    }

    const setTitle = (title: string) => {
        setHeaderTitle(title);
    }

    const reset = () => {
        setHeaderContent(null);
        setTitle('');
    }

    const contextValue: ContextValue = {
        content,
        title,
        setContent,
        setTitle,
        reset
    };

    return <HeaderContext.Provider value={ contextValue }>{ children }</HeaderContext.Provider>;
};

export default HeaderProvider;
