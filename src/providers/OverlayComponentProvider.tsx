import { PropsWithChildren, createContext, useState } from 'react';


const ANIM_DURATION = 250;

export type OverlayComponent = {
    id: string;
    component: React.FunctionComponent<unknown>;
    props: unknown;
}

type OverlayComponentContextValue = {
    overlayComponents: OverlayComponent[];
    visibleComponentIds: string[];
    addComponent: (component: OverlayComponent) => void;
    removeComponent: (id: string) => void;
}

export const OverlayComponentContext = createContext<OverlayComponentContextValue>(null!);

const OverlayComponentProvider = ({ children }: PropsWithChildren) => {
    const [overlayComponents, setOverlayComponents] = useState<OverlayComponent[]>([]);
    const [visibleComponentIds, setVisibleComponentIds] = useState<string[]>([]);

    const addComponent = (component: OverlayComponent) => {
        setOverlayComponents(data => {
            if (data.find(item => item.id === component.id)) return data;

            return [...data, component];
        });

        setTimeout(() => {
            setVisibleComponentIds(ids => {
                if (ids.includes(component.id)) return ids;
    
                return [...ids, component.id];
            });
        }, 0);
    };

    const removeComponent = (componentId: string) => {
        const byId = (item: OverlayComponent) => item.id !== componentId;

        setVisibleComponentIds(ids => ids.filter(id => id !== componentId))

        setTimeout(() => {
            setOverlayComponents(data => data.filter(byId));
        }, ANIM_DURATION);
    };

    const contextValue = {
        overlayComponents,
        visibleComponentIds,
        addComponent,
        removeComponent
    };

    return <OverlayComponentContext.Provider value={ contextValue }>{ children }</OverlayComponentContext.Provider>;
};

export default OverlayComponentProvider;
