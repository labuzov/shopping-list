import { ReactNode } from 'react';
import { create } from 'zustand';


const DEFAULT_TITLE = 'Покупки';

type HeaderState = {
    title: string;
    contentOnRight: ReactNode;
    setTitle: (title: string) => void;
    setContentOnRight: (contentOnRight: ReactNode) => void;
    reset: () => void;
}

export const useHeaderStore = create<HeaderState>(set => ({
    title: DEFAULT_TITLE,
    contentOnRight: null,

    setTitle: (title: string) => {
        set({ title });
    },

    setContentOnRight: (contentOnRight: ReactNode) => {
        set({ contentOnRight });
    },

    reset: () => {
        set({
            title: DEFAULT_TITLE,
            contentOnRight: null
        });
    },
}));
