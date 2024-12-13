import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdDeleteOutline, MdOutlineEditOff, MdOutlineModeEditOutline } from 'react-icons/md';

import { ShoppingItem } from '@/models/shoppingListModels';
import { useOverlayComponent } from '@/hooks/overlayComponentsHooks';
import { FirestoreDataOrdering, useFirestoreData } from '@/hooks/firestoreHooks';
import { useHeaderOptions } from '@/hooks/headerHooks';
import ListService from '@/services/ListService';

import { Container } from '@/components/Container/Container';
import { AddItemsButton } from '@/components/AddItemsButton/AddItemsButton';
import { IconButton } from '@/components/IconButton/IconButton';
import { ItemList } from './components/ItemList/ItemList';

import styles from './ShoppingListItemPage.module.scss';


const ordering: FirestoreDataOrdering = { field: 'createdAt', directionStr: 'asc' };

const ShoppingListItemPage = () => {
    const [editMode, setEditMode] = useState(false);

    const { id } = useParams<{ id: string }>();
    const listId = id ?? 'default';

    const { data, dataStatus } = useFirestoreData<ShoppingItem>(`lists/${listId}/items`, { ordering });

    const { showConfirmationModal } = useOverlayComponent();

    const handleDelete = async () => {
        if (!await showConfirmationModal('Очистить весь список?')) return;

        ListService.clearList(listId);
    }

    const handleEditModeClick = () => {
        setEditMode(mode => !mode);
    }

    const headerOptions = useMemo(() => {
        return {
            content: (
                <div className={styles.actions}>
                    <IconButton Icon={editMode ? MdOutlineEditOff : MdOutlineModeEditOutline} onClick={handleEditModeClick} />
                    <IconButton Icon={MdDeleteOutline} onClick={handleDelete} />
                </div>
            )
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editMode, listId]);

    useHeaderOptions(headerOptions);

    return (
        <>
            <Container maxWidth={768}>
                <ItemList
                    listId={listId}
                    shoppingItems={data}
                    dataStatus={dataStatus}
                    editMode={editMode}
                />
                <AddItemsButton listId={listId} />
            </Container>
        </>
    );
}

export default ShoppingListItemPage;
