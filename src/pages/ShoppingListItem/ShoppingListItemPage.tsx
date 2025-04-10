import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdDeleteOutline, MdOutlineEditOff, MdOutlineModeEditOutline } from 'react-icons/md';
import { documentId } from 'firebase/firestore';

import { useOverlayComponentsStore } from '@/stores/OverlayComponentsStore';
import { FirestoreDataFilter, FirestoreDataOrdering, FirestoreDataStatus, useFirestoreData } from '@/hooks/firestoreHooks';
import { ShoppingItem, ShoppingList } from '@/models/shoppingListModels';
import { useHeaderOptions } from '@/hooks/headerHooks';
import ListService from '@/services/ListService';

import { Container } from '@/components/Container/Container';
import { AddItemsButton } from '@/components/AddItemsButton/AddItemsButton';
import { ConfirmationModal } from '@/components/OverlayComponents/Modals/ConfirmationModal';
import { IconButton } from '@/components/IconButton/IconButton';
import { ItemList } from './components/ItemList/ItemList';

import styles from './ShoppingListItemPage.module.scss';
import { getSortedShoppingItems } from './helpers/shoppingListItemHelpers';


const itemsOrdering: FirestoreDataOrdering = { field: 'createdAt', directionStr: 'asc' };

const ShoppingListItemPage = () => {
    const [editMode, setEditMode] = useState(false);

    const { id } = useParams<{ id: string }>();
    const listId = id ?? 'default';

    const { data: itemsData, dataStatus: itemsDataStatus } = useFirestoreData<ShoppingItem>(`lists/${listId}/items`, { ordering: itemsOrdering });

    const listsFilters: FirestoreDataFilter[] = useMemo(() => [{ field: documentId(), value: listId }], [listId]);
    const { data: listsData, dataStatus: listsDataStatus, setData } = useFirestoreData<ShoppingList>(`lists`, { filters: listsFilters });

    const showComponent = useOverlayComponentsStore(state => state.showComponent);

    const handleDelete = async () => {
        if (!await showComponent(ConfirmationModal, { message: 'Очистить весь список?' })) return;

        ListService.clearList(listId);
    }

    const handleEditModeClick = () => {
        setEditMode(mode => !mode);
    }

    const handleOrderChange = (order: string[]) => {
        setData(lists => lists.map(list => {
            list.order = order;
            return list;
        }));
    }

    const headerOptions = useMemo(() => {
        return {
            contentOnRight: (
                <div className={styles.actions}>
                    <IconButton Icon={editMode ? MdOutlineEditOff : MdOutlineModeEditOutline} onClick={handleEditModeClick} />
                    <IconButton Icon={MdDeleteOutline} onClick={handleDelete} />
                </div>
            )
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editMode, listId]);

    useHeaderOptions(headerOptions);

    const shoppingItems = useMemo(() => getSortedShoppingItems(itemsData, listsData), [itemsData, listsData]);

    return (
        <>
            <Container maxWidth={768}>
                <ItemList
                    listId={listId}
                    shoppingItems={shoppingItems}
                    isLoading={
                        itemsDataStatus === FirestoreDataStatus.Loading ||
                        listsDataStatus === FirestoreDataStatus.Loading
                    }
                    editMode={editMode}
                    onOrderChange={handleOrderChange}
                />
                <AddItemsButton listId={listId} />
            </Container>
        </>
    );
}

export default ShoppingListItemPage;
