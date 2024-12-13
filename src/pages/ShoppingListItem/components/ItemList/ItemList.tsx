import { createRef, useMemo } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { MdOutlineMoodBad } from 'react-icons/md';

import { ShoppingItem } from '@/models/shoppingListModels';
import { useOverlayComponent } from '@/hooks/overlayComponentsHooks';
import { FirestoreData, FirestoreDataStatus } from '@/hooks/firestoreHooks';
import ListService from '@/services/ListService';

import { EditItemModal } from '@/components/Modal/EditItemModal';
import { Loading } from '@/components/Loading/Loading';
import { Summary } from '../Summary/Summary';
import { Item } from './Item';

import styles from './ItemList.module.scss';
import { getListSummary } from '../../helpers/shoppingListItemHelpers';


type ItemListProps = {
    listId: string;
    shoppingItems: FirestoreData<ShoppingItem>[];
    dataStatus: FirestoreDataStatus;
    editMode?: boolean;
}

export const ItemList: React.FC<ItemListProps> = ({ listId, shoppingItems, dataStatus, editMode }) => {
    const { showOverlayComponent, closeOverlayComponent } = useOverlayComponent();

    const handleClick = async (id: string, isDone: boolean) => {
        await ListService.updateItem(listId, id, { isDone });
    }

    const handleEditClick = async (item: FirestoreData<ShoppingItem>) => {
        await showOverlayComponent(EditItemModal, { item, listId, onClose: closeOverlayComponent });
    }

    const handleDeleteClick = async (id: string) => {
        await ListService.deleteItem(listId, id);
    }

    const renderSummary = () => {
        const { totalPrice, remainingTotalPrice } = getListSummary(shoppingItems);

        if (!Number(totalPrice)) return null;

        return (
            <Summary
                totalPrice={totalPrice}
                remainingTotalPrice={remainingTotalPrice}
            />
        )
    }


    const items = useMemo(() => {
        return shoppingItems.map(item => {
            const ref = createRef<HTMLDivElement>();

            return (
                <CSSTransition
                    key={item.id}
                    nodeRef={ref}
                    timeout={600}
                    classNames={{
                        enter: styles.itemEnter,
                        enterActive: styles.itemEnterActive,
                        exit: styles.itemExit,
                        exitActive: styles.itemExitActive,
                    }}
                >
                    <div ref={ref} className={styles.itemWrapper}>
                        <Item
                            item={item}
                            editMode={editMode}
                            onClick={() => handleClick(item.id, !item.isDone)}
                            onEditClick={() => handleEditClick(item)}
                            onDeleteClick={() => handleDeleteClick(item.id)}
                        />
                    </div>
                </CSSTransition>
            )
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shoppingItems, editMode]);

    if (dataStatus === FirestoreDataStatus.Loading) return (
        <div className={styles.loading}>
            <Loading fillContainer />
        </div>
    )

    return (
        <div className={styles.wrapper}>
            {!items.length ? (
                <div className={styles.noItems}>
                    <MdOutlineMoodBad className={styles.noItemsIcon} />
                    <div className={styles.noItemsText}>Список пуст</div>
                </div>
            ) : (
                <>
                    <div className={styles.list}>
                        <TransitionGroup>
                            {items}
                        </TransitionGroup>
                    </div>
                    
                    {renderSummary()}
                </>
            )}
        </div>
    );
}
