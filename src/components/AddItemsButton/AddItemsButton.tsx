import { useOverlayComponentsStore } from '@/stores/OverlayComponentsStore';

import { AddListItemsDrawer } from '@/components/Drawers/AddListItemsDrawer/AddListItemsDrawer';
import styles from './AddItemsButton.module.scss';


type AddItemsButtonProps = {
    listId: string;
}

export const AddItemsButton: React.FC<AddItemsButtonProps> = ({ listId }) => {
    const showComponent = useOverlayComponentsStore(state => state.showComponent);

    const handleClick = () => {
        showComponent(AddListItemsDrawer, { listId });
    }

    return (
        <div className={styles.button} onClick={handleClick}>
            +
        </div>
    );
}
