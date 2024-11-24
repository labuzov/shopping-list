import { useContext, useRef } from 'react';
import { OverlayComponentContext, OverlayComponent } from '@/providers/OverlayComponentProvider';
import { ConfirmationModal, ConfirmationModalProps } from '@/components/Modal/ConfirmationModal';


export const useOverlayComponent = () => {
    const { addComponent, removeComponent } = useContext(OverlayComponentContext);
    const resolveCallback = useRef<((value: unknown) => void) | null>(null);

    const generateId = () => {
        return Math.random().toString(36).substring(2, 8);
    }

    const showOverlayComponent = async <P, T>(component: React.FunctionComponent<P>, props: P) => {
        const id = generateId();
        const overlayComponent: OverlayComponent = {
            id,
            component: component as React.FunctionComponent<unknown>,
            props
        };

        return new Promise<T>(resolve => {
            resolveCallback.current = resolve as (value: unknown) => void;

            addComponent(overlayComponent);
        }).finally(() => removeComponent(id));
    }

    const showConfirmationModal = async (message?: string | JSX.Element, title?: string | JSX.Element) => {
        const handleConfirm = () => {
            closeOverlayComponent(true);
        }
    
        const handleCancel = () => {
            closeOverlayComponent(false);
        }

        return showOverlayComponent<ConfirmationModalProps, boolean>(ConfirmationModal, {
            message,
            title,
            onConfirm: handleConfirm,
            onClose: handleCancel
        });
    }

    const closeOverlayComponent = (payload?: unknown) => {
        resolveCallback.current?.(payload);
    };

    return {
        showOverlayComponent,
        showConfirmationModal,
        closeOverlayComponent
    }
}
