import { ReactNode, useEffect } from 'react';

import { useHeaderStore } from '@/stores/HeaderStore';


type HeaderOptions = {
    contentOnRight?: ReactNode | null;
    title?: string;
}

export const useHeaderOptions = ({ contentOnRight, title }: HeaderOptions) => {
    const setTitle = useHeaderStore(state => state.setTitle);
    const setContentOnRight = useHeaderStore(state => state.setContentOnRight);
    const reset = useHeaderStore(state => state.reset);

    useEffect(() => {
        if (contentOnRight) setContentOnRight(contentOnRight);
        if (title) setTitle(title);

        return () => {
            reset();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contentOnRight, title]);
}