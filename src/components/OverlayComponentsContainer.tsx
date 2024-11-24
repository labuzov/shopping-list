import { createElement, useContext, useMemo } from 'react';
import { createPortal } from 'react-dom';

import { OverlayComponentContext } from '@/providers/OverlayComponentProvider';


export type OverlayComponentBase = {
    open?: boolean;
    onClose: () => void;
}

export const OverlayComponentsContainer: React.FC = () => {
    const { overlayComponents, visibleComponentIds } = useContext(OverlayComponentContext);

    const getZIndex = (index: number) => 100 + index * 10;

    const components = useMemo(() => {
        return overlayComponents.map((overlayComponent, index) => {
            const props = overlayComponent.props as React.Attributes & OverlayComponentBase;
            props.open = visibleComponentIds.includes(overlayComponent.id);

            const element = createElement(overlayComponent.component, props);

            return createPortal((
                <div key={index} style={{ zIndex: getZIndex(index), position: 'fixed' }}>
                    {element}
                </div>
            ), document.body);
        });
    }, [overlayComponents, visibleComponentIds]);

    return (
        <>
            {components}
        </>
    );
}
