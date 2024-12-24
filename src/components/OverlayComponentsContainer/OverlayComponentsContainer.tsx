import { createElement, useContext, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';

import { OverlayComponentContext } from '@/providers/OverlayComponentProvider';
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
    const { components, visibleIds, closeComponentById } = useContext(OverlayComponentContext);
    const scrollbarWidth = useRef<number | null>(null);

    useEffect(() => {
        if (components.length && isScrollbarVisible()) {
            const width = scrollbarWidth.current ?? getScrollbarWidth();
            scrollbarWidth.current = width;

            addScrollbarPadding(width);
        } else {
            removeScrollbarPadding();
        }
    }, [components]);

    const content = useMemo(() => {
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
    }, [closeComponentById, components, visibleIds]);

    return (
        <>
            {content}
        </>
    );
}
