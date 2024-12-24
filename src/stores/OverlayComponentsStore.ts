import { create } from 'zustand';


const ANIM_DURATION = 250;

export type OverlayComponent = {
    id: string;
    component: React.FunctionComponent<unknown>;
    props: unknown;
}

type ComponentPromise = {
    componentId: string;
    resolve: (value: unknown) => void;
    reject: (value: unknown) => void;
}

type OverlayComponentsState = {
    components: OverlayComponent[];
    visibleIds: string[];
    promises: ComponentPromise[];
    showComponent: <P, T>(component: React.FunctionComponent<P>, props?: P) => Promise<T>;
    closeComponentById: (id: string, payload?: unknown) => void;
}

const generateId = () => {
    return Math.random().toString(36).substring(2, 8);
};

export const useOverlayComponentsStore = create<OverlayComponentsState>(set => ({
    components: [],
    visibleIds: [],
    promises: [],

    showComponent: async <P, T>(component: React.FunctionComponent<P>, props?: P) => {
        const id = generateId();
        const overlayComponent: OverlayComponent = {
            id,
            component: component as React.FunctionComponent<unknown>,
            props
        };
    
        return new Promise<T>((resolve, reject) => {
            set(state => ({
                promises: [...state.promises, {
                    componentId: id,
                    resolve: resolve as (value: unknown) => void,
                    reject: reject as (value: unknown) => void
                }],
                components: [...state.components, overlayComponent]
            }));

            setTimeout(() => {
                set(state => ({
                    visibleIds: [...state.visibleIds, overlayComponent.id]
                }));
            }, 0);
        }).finally(() => {
            const byId = (id: string) => id !== overlayComponent.id;
            const byComponentId = (item: OverlayComponent) => item.id !== overlayComponent.id;

            set(state => ({
                visibleIds: state.visibleIds.filter(byId)
            }));
    
            setTimeout(() => {
                set(state => ({
                    components: state.components.filter(byComponentId)
                }));
            }, ANIM_DURATION);
        });
    },

    closeComponentById: (id: string, payload?: unknown) => {
        set(state => {
            const promise = state.promises.find(i => i.componentId === id);
            promise?.resolve(payload);

            return {
                promises: state.promises.filter(i => i.componentId !== id)
            }
        });
    }
}));
