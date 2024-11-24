import { useState } from 'react';
import { IconType } from 'react-icons';

import { BottomDrawerButton, BottomDrawerButtonColors } from './BottomDrawerButton';
import { Container } from '../../Container/Container';
import { Drawer } from '../Drawer';
import { OverlayComponentBase } from '../../OverlayComponentsContainer';
import styles from './BottomDrawer.module.scss';


const DEFAULT_HEIGHT = '250px'

export type BottomDrawerButton = {
    text?: string;
    disabled?: boolean;
    color?: BottomDrawerButtonColors;
    Icon: IconType;
    onClick?: () => void;
}

export type BottomDrawerProps = OverlayComponentBase & {
    header?: string | JSX.Element;
    buttons?: BottomDrawerButton[];
};

export const BottomDrawer: React.FC<BottomDrawerProps> = ({ open, header, buttons, onClose }) => {
    const [height] = useState(DEFAULT_HEIGHT);

    const handleButtonClick = async (onClick?: () => void | Promise<void>) => {
        await onClick?.();

        // handleClose();
    }

    const renderButtons = () => {
        if (!buttons?.length) return null;

        return (
            <div className={styles.buttons}>
                {buttons?.map(button => (
                    <BottomDrawerButton
                        key={button.text}
                        text={button.text}
                        disabled={button.disabled}
                        color={button.color}
                        Icon={button.Icon}
                        onClick={() => handleButtonClick(button.onClick)}
                    />
                ))}
            </div>
        )
    }

    return (
        <Drawer
            open={open}
            paperStyle={{ height }}
            position="bottom"
            onClose={onClose}
        >
            <Container maxWidth={768} className={styles.contentInner}>
                <div className={styles.header}>
                    {header}
                </div>
                
                {renderButtons()}
            </Container>
        </Drawer>
    );
}