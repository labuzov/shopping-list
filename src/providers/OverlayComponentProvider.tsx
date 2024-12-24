import { PropsWithChildren, createContext, useRef, useState } from 'react';


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

type OverlayComponentContextValue = {
    components: OverlayComponent[];
    visibleIds: string[];
    showComponent: <P, T>(component: React.FunctionComponent<P>, props?: P) => Promise<T>;
    closeComponentById: (id: string, payload?: unknown) => void;
}

export const OverlayComponentContext = createContext<OverlayComponentContextValue>(null!);

const OverlayComponentProvider = ({ children }: PropsWithChildren) => {
    const [components, setComponents] = useState<OverlayComponent[]>([]);
    const [visibleIds, setVisibleIds] = useState<string[]>([]);
    const promises = useRef<ComponentPromise[]>([]);

    const showComponent = async <P, T>(component: React.FunctionComponent<P>, props?: P) => {
        const id = generateId();
        const overlayComponent: OverlayComponent = {
          id,
          component: component as React.FunctionComponent<unknown>,
          props
        };
    
        return new Promise<T>((resolve, reject) => {
            promises.current.push({
                componentId: id,
                resolve: resolve as (value: unknown) => void,
                reject: reject as (value: unknown) => void
            });

            addComponent(overlayComponent);
        }).finally(() => {
            removeComponent(id);
        });
    };

    const closeComponentById = (id: string, payload?: unknown) => {
        const promiseIndex = promises.current.findIndex(i => i.componentId === id);
        if (promiseIndex === -1) return;

        promises.current[promiseIndex]?.resolve(payload);
        promises.current.splice(promiseIndex, 1);
    };

    const addComponent = (component: OverlayComponent) => {
        setComponents(data => {
            const isExist = data.some(item => item.id === component.id);
            if (isExist) return data;

            return [...data, component];
        });

        setTimeout(() => {
            setVisibleIds(ids => {
                if (ids.includes(component.id)) return ids;
    
                return [...ids, component.id];
            });
        }, 0);
    };

    const removeComponent = (componentId: string) => {
        const byId = (id: string) => id !== componentId;
        const byComponentId = (item: OverlayComponent) => item.id !== componentId;

        setVisibleIds(ids => ids.filter(byId))

        setTimeout(() => {
            setComponents(data => data.filter(byComponentId));
        }, ANIM_DURATION);
    };

    const generateId = () => {
        return Math.random().toString(36).substring(2, 8);
    };

    const contextValue = {
        components,
        visibleIds,
        showComponent,
        closeComponentById
    };

    return <OverlayComponentContext.Provider value={ contextValue }>{ children }</OverlayComponentContext.Provider>;
};

export default OverlayComponentProvider;
