import { MdDelete, MdEdit } from 'react-icons/md';
import classNames from 'classnames';

import { FirestoreData } from '@/hooks/firestoreHooks';
import { ShoppingItem } from '@/models/shoppingListModels';

import { Checkbox } from '@/components/FormControls/Checkbox/Checkbox';
import { IconButton } from '@/components/IconButton/IconButton';

import styles from './ItemList.module.scss';


type ItemProps = {
    item: FirestoreData<ShoppingItem>;
    editMode?: boolean;
    onClick?: () => void;
    onEditClick?: () => void;
    onDeleteClick?: () => void;
};

export const Item: React.FC<ItemProps> = ({ item, editMode, onClick, onDeleteClick, onEditClick }) => {

    return (
        <div className={classNames(styles.item, item.isDone && styles.done, editMode && styles.editMode)} onClick={onClick}>
            <div className={styles.left}>
                <Checkbox value={!!item.isDone} name={item.id} />
                {item.title}
                {item.amount && item.amount >= 2 && (
                    <span className={styles.amount}>{item.amount} шт.</span>
                )}
            </div>
            <div className={styles.right}>
                {!!item.price && (
                    <div className={styles.price}>{item.price} р.</div>
                )}
                
                <div className={styles.actions}>
                    <IconButton size={35} Icon={MdEdit} onClick={onEditClick} />
                    <IconButton size={35} Icon={MdDelete} onClick={onDeleteClick} />
                </div>

            </div>
        </div>
    );
}