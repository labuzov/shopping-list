import { useContext, useEffect } from 'react';

import { HeaderContext } from '@/providers/HeaderProvider';


type HeaderOptions = {
    content?: JSX.Element | null;
    title?: string;
}

export const useHeaderOptions = ({ content, title }: HeaderOptions) => {
    const { setContent, setTitle, reset } = useContext(HeaderContext);

    useEffect(() => {
        if (content) setContent(content);
        if (title) setTitle(title);

        return () => {
            reset();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content, title]);
}