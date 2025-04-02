import { createElement, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useShallow } from 'zustand/shallow';

import { useOverlayComponentsStore } from '@/stores/OverlayComponentsStore';
import { KeyCodes } from '@/constants/keyboard';

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
    onKeyDown?: (event: KeyboardEvent) => void;
}

export const OverlayComponentsContainer: React.FC = () => {
    const {
        components,
        visibleIds,
        closeComponentById,
        closeLastComponent
    } = useOverlayComponentsStore(useShallow(({
            components,
            visibleIds,
            closeComponentById,
            closeLastComponent
        }) => ({
            components,
            visibleIds,
            closeComponentById,
            closeLastComponent
        })));

    const scrollbarWidth = useRef<number | null>(null);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [components]);

    useEffect(() => {
        if (visibleIds.length && isScrollbarVisible()) {
            const width = scrollbarWidth.current ?? getScrollbarWidth();
            scrollbarWidth.current = width;

            addScrollbarPadding(width);
        } else {
            removeScrollbarPadding();
        }
    }, [visibleIds]);

    const handleKeyDown = (event: KeyboardEvent) => {
        if (!components?.length) return;

        const lastComponent = components[components.length - 1];
        if (!lastComponent) return;

        const props = lastComponent.props as OverlayComponentBase ?? {};
        props.onKeyDown?.(event);

        switch (event.code) {
            case KeyCodes.Escape: {
                closeLastComponent();
                break;
            }
            default: return;
        }
    }

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
