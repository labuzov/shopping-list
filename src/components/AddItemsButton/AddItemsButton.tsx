
import { useOverlayComponent } from '@/hooks/overlayComponentsHooks';
import styles from './AddItemsButton.module.scss';
import { AddListItemsDrawer } from './AddListItemsDrawer';


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
