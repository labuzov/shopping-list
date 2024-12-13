/* eslint-disable react-refresh/only-export-components */
import { PropsWithChildren, ReactNode, createContext, useState } from 'react';


type ContextValue = {
    title: string;
    content: ReactNode | null;
    setContent: (content: ReactNode) => void;
    setTitle: (title: string) => void;
    reset: () => void;
}

export const HeaderContext = createContext<ContextValue>(null!);

const HeaderProvider = ({ children }: PropsWithChildren) => {
    const [content, setHeaderContent] = useState<ReactNode | null>(null);
    const [title, setHeaderTitle] = useState('');

    const setContent = (content: ReactNode | null) => {
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
