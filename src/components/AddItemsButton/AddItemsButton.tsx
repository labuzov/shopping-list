
import { useContext } from 'react';

import { OverlayComponentContext } from '@/providers/OverlayComponentProvider';

import { AddListItemsDrawer } from '@/components/Drawers/AddListItemsDrawer/AddListItemsDrawerNew';
import styles from './AddItemsButton.module.scss';


type AddItemsButtonProps = {
    listId: string;
}

export const AddItemsButton: React.FC<AddItemsButtonProps> = ({ listId }) => {
    const { showComponent } = useContext(OverlayComponentContext);

    const handleClick = () => {
        showComponent(AddListItemsDrawer, { listId });
    }

    return (
        <div className={styles.button} onClick={handleClick}>
            +
        </div>
    );
}
