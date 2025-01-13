import { createElement, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useOverlayComponentsStore } from '@/stores/OverlayComponentsStore';

import {
    addScrollbarPadding,
    getScrollbarWidth,
    getZIndex,
    isScrollbarVisible,
    removeScrollbarPadding
} from './helpers';


export type OverlayComponentBase = {
    open?: boolean;
    onClose?: (payload?: unknown) => void;
}

export const OverlayComponentsContainer: React.FC = () => {
    const components = useOverlayComponentsStore(state => state.components);
    const visibleIds = useOverlayComponentsStore(state => state.visibleIds);
    const closeComponentById = useOverlayComponentsStore(state => state.closeComponentById);

    const scrollbarWidth = useRef<number | null>(null);

    useEffect(() => {
        if (visibleIds.length && isScrollbarVisible()) {
            const width = scrollbarWidth.current ?? getScrollbarWidth();
            scrollbarWidth.current = width;

            addScrollbarPadding(width);
        } else {
            removeScrollbarPadding();
        }
    }, [visibleIds]);

    const renderContent = () => {
        return components.map((component, index) => {
            const props = component.props as React.Attributes & OverlayComponentBase ?? {};

            props.open = visibleIds.includes(component.id);
            props.onClose = (payload: unknown) => closeComponentById(component.id, payload);

            const element = createElement(component.component, props);

            return createPortal((
                <div key={index} style={{ zIndex: getZIndex(index), position: 'fixed' }}>
                    {element}
                </div>
            ), document.body);
        });
    };

    return (
        <>
            {renderContent()}
        </>
    );
}
