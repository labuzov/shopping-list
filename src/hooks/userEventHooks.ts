import { UIEvent, useRef } from 'react';

import { vibrateSmall } from '@/helpers/mobileHelpers';


const DEFAULT_DELAY = 300;

const isTouchEvent = (event: Event) => {
    return "touches" in event;
};

const preventDefault = (event: Event) => {
    if (!isTouchEvent(event)) return;

    const ev = event as TouchEvent;
    if (ev.touches.length >= 2) return;

    event.preventDefault();
};

export const useLongPress = (onLongPress?: () => void, onClick?: (event: UIEvent) => void | Promise<void>, delay = DEFAULT_DELAY) => {
    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const target = useRef<EventTarget | null>(null);
    const isLongPress = useRef(false);

    const start = (event: UIEvent) => {
        isLongPress.current = false;

        event.target?.addEventListener('touchend', preventDefault, {
            passive: false
        });

        target.current = event.target;

        timeout.current = setTimeout(() => {
            isLongPress.current = true;
            onLongPress?.();

            vibrateSmall();
        }, delay);
    }

    const clear = (event: UIEvent, shouldTriggerClick = true) => {
        if (timeout.current) clearTimeout(timeout.current);

        if (shouldTriggerClick && !isLongPress.current) onClick?.(event);
        isLongPress.current = false;

        target.current?.removeEventListener('touchend', preventDefault);
    }
  
    return {
        onMouseDown: (event: UIEvent) => start(event),
        onMouseUp: (event: UIEvent) => clear(event),
        onMouseLeave: (event: UIEvent) => clear(event, false),
        onTouchStart: (event: UIEvent) => start(event),
        onTouchEnd: (event: UIEvent) => clear(event),
    };
}