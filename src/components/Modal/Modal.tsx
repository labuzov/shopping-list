import { CSSProperties, useRef } from 'react';
import classNames from 'classnames';
import { MdClose } from 'react-icons/md';

import { Loading } from '@/components/Loading/Loading';
import { Button, ButtonType } from '@/components/Button/Button';
import styles from './Modal.module.scss';
import { CSSTransition } from 'react-transition-group';
import { OverlayComponentBase } from '../OverlayComponentsContainer';


const DEFAULT_WIDTH = 500;
const ANIM_DURATION = 200;

export type ModalButton = {
    text: string;
    title?: string;
    type?: ButtonType;
    isDisabled?: boolean;
    isLoading?: boolean;
    alignLeft?: boolean;
    style?: CSSProperties;
    onClick?: () => Promise<void> | void;
}

export type ModalProps = OverlayComponentBase & {
    title?: string | JSX.Element;
    className?: string;
    width?: number;
    buttons?: ModalButton[];
    isLoading?: boolean;
    children?: React.ReactNode;
    footerRender?: () => JSX.Element;
}

export const Modal: React.FC<ModalProps> = ({
    open, title, className, width, buttons, isLoading, children,
    onClose, footerRender
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const handleClose = () => {
        onClose();
    }

    const renderButtons = (buttons: ModalButton[]) => (
        buttons.map((button, index) => (
            <Button
                key={index}
                text={button.text}
                type={button.type}
                className={styles.button}
                style={button.style}
                disabled={button.isDisabled}
                isLoading={button.isLoading}
                onClick={button.onClick}
            />
        ))
    );

    const renderFooter = () => {
        if (footerRender) return (
            <div className={styles.modalFooter}>
                {footerRender()}
            </div>
        );

        if (!buttons) return null;

        const leftButtons: ModalButton[] = [];
        const rightButtons: ModalButton[] = [];

        for (const button of buttons) {
            if (button.alignLeft) {
                leftButtons.push(button);
                continue;
            }

            rightButtons.push(button);
        }

        return (
            <div className={styles.modalFooter}>
                <div className={styles.modalFooterInner}>
                    <div className={styles.left}>
                        {renderButtons(leftButtons)}
                    </div>
                    <div className={styles.right}>
                        {isLoading && <Loading className={styles.loading} />}
                        {renderButtons(rightButtons)}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <CSSTransition
            in={open}
            nodeRef={ref}
            timeout={ANIM_DURATION}
            unmountOnExit
            classNames={{
                enter: styles.enter,
                enterActive: styles.enterActive,
                exit: styles.exit,
                exitActive: styles.exitActive,
            }}
        >
            <div ref={ref} className={styles.container}>
                <div className={styles.backdrop} onClick={handleClose} />
                <div className={classNames(styles.modal, className)} style={{ maxWidth: width || DEFAULT_WIDTH }}>
                    <div className={styles.modalHeader}>
                        <div className={styles.title}>{title}</div>
                        <button className={styles.icon} onClick={handleClose}>
                            <MdClose />
                        </button>
                    </div>

                    <div className={styles.modalContent}>{children}</div>

                    {renderFooter()}
                </div>
            </div>
        </CSSTransition>
    );
}
