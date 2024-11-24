import { Modal, ModalButton, ModalProps } from '@/components/Modal/Modal';
import { ButtonType } from '../Button/Button';


export type ConfirmationModalProps = ModalProps & {
    message?: string | JSX.Element;
    cancelButtonText?: string;
    confirmButtonText?: string;
    onConfirm: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    title, message, cancelButtonText, confirmButtonText, onConfirm, onClose, ...props
}) => {
    const handleConfirm = () => {
        onConfirm();
    }

    const handleCancel = () => {
        onClose();
    }

    const getButtons = () => {
        const buttons: ModalButton[] = [];

        const cancelText = cancelButtonText || 'Отмена';
        const confirmText = confirmButtonText || 'ОК';

        buttons.push({ text: cancelText, type: ButtonType.OutlineSecondary, onClick: handleCancel });
        buttons.push({ text: confirmText, onClick: handleConfirm });

        return buttons;
    }

    const modalTitle = title || 'Подтверждение';
    const modalMessage = message || 'Вы действительно хотите продолжить?';

    return (
        <Modal
            title={modalTitle}
            buttons={getButtons()}
            onClose={onClose}
            {...props}
        >
            {modalMessage}
        </Modal>
    );
}
