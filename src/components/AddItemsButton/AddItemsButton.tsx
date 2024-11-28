import { useOverlayComponent } from '@/hooks/overlayComponentsHooks';

import { AddListItemsDrawer } from './AddListItemsDrawer';
import styles from './AddItemsButton.module.scss';


type AddItemsButtonProps = {
    listId: string;
}

export const AddItemsButton: React.FC<AddItemsButtonProps> = ({ listId }) => {
    const { showOverlayComponent, closeOverlayComponent } = useOverlayComponent();

    const handleClick = () => {
        showOverlayComponent(AddListItemsDrawer, { listId, onClose: closeOverlayComponent });
    }

    return (
        <div className={styles.button} onClick={handleClick}>
            +
        </div>
    );
}
