import { createRef, useMemo, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { MdOutlineMoodBad } from 'react-icons/md';
import { Active, DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';

import { ShoppingItem } from '@/models/shoppingListModels';
import { useOverlayComponentsStore } from '@/stores/OverlayComponentsStore';
import { FirestoreData } from '@/hooks/firestoreHooks';
import ListService from '@/services/ListService';

import { EditItemModal } from '@/components/OverlayComponents/Modals/EditItemModal/EditItemModal';
import { Loading } from '@/components/Loading/Loading';
import { Summary } from '../Summary/Summary';
import { Item } from './Item';

import { getListSummary } from '../../helpers/shoppingListItemHelpers';
import styles from './ItemList.module.scss';


type ItemListProps = {
    listId: string;
    shoppingItems: FirestoreData<ShoppingItem>[];
    isLoading?: boolean;
    editMode?: boolean;
    onOrderChange: (order: string[]) => void;
}

export const ItemList: React.FC<ItemListProps> = ({
    listId, shoppingItems, isLoading, editMode, onOrderChange
}) => {
    const [activeDraggable, setActiveDraggable] = useState<Active | null>(null);

    const showComponent = useOverlayComponentsStore(state => state.showComponent);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor)
    );

    const handleClick = async (id: string, isDone: boolean) => {
        await ListService.updateItem(listId, id, { isDone });
    }

    const handleEditClick = async (item: FirestoreData<ShoppingItem>) => {
        await showComponent(EditItemModal, { item, listId });
    }

    const handleDeleteClick = async (id: string) => {
        await ListService.deleteItem(listId, id);
    }

    const handleDragStart = (event: DragStartEvent) => {
        setActiveDraggable(event.active);
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { over, active } = event;

        if (over && active.id !== over?.id) {
            const activeIndex = shoppingItems.findIndex(({ id }) => id === active.id);
            const overIndex = shoppingItems.findIndex(({ id }) => id === over.id);

            const newItems = arrayMove(shoppingItems, activeIndex, overIndex);
            const newOrder = newItems.map(({ id }) => id);

            ListService.updateList(listId, { order: newOrder });

            onOrderChange(newOrder);
        }

        setActiveDraggable(null);
    }

    const handleDragCancel = () => {
        setActiveDraggable(null);
    }

    const renderItem = (item: FirestoreData<ShoppingItem>) => {
        return (
            <Item
                item={item}
                editMode={editMode}
                onClick={() => handleClick(item.id, !item.isDone)}
                onEditClick={() => handleEditClick(item)}
                onDeleteClick={() => handleDeleteClick(item.id)}
            />
        )
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

    const renderNoItems = () => {
        return (
            <div className={styles.noItems}>
                <MdOutlineMoodBad className={styles.noItemsIcon} />
                <div className={styles.noItemsText}>Список пуст</div>
            </div>
        );
    }

    const activeDraggableItem = useMemo(() => {
        return activeDraggable ? shoppingItems.find(item => item.id === activeDraggable.id) : null;
    }, [activeDraggable, shoppingItems]);

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
                        {renderItem(item)}
                    </div>
                </CSSTransition>
            )
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shoppingItems, editMode]);

    if (isLoading) return (
        <div className={styles.loading}>
            <Loading fillContainer />
        </div>
    )

    return (
        <div className={styles.wrapper}>
            {!items.length ? (
                <>
                    {renderNoItems()}
                </>
            ) : (
                <>
                    <DndContext
                        sensors={sensors}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onDragCancel={handleDragCancel}
                    >
                        <SortableContext items={shoppingItems} id="order">
                            <div className={styles.list}>
                                <TransitionGroup>
                                    {items}
                                </TransitionGroup>
                            </div>
                        </SortableContext>
                        <DragOverlay>
                            {activeDraggableItem ? renderItem(activeDraggableItem) : null}
                        </DragOverlay>
                    </DndContext>
                    
                    {renderSummary()}
                </>
            )}
        </div>
    );
}
