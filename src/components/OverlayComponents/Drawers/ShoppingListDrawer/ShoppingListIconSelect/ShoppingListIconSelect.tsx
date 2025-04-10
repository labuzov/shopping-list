import { FC } from 'react';
import classNames from 'classnames';

import styles from './ShoppingListIconSelect.module.scss';
import { ShoppingListIcon } from '@/models/shoppingListModels';
import { getShoppingListIcon } from '@/helpers/shoppingListIconHelpers';


type Props = {
    value: ShoppingListIcon;
    onChange: (icon: ShoppingListIcon) => void;
};

export const ShoppingListIconSelect: FC<Props> = ({ value, onChange }) => {
    const renderIcons = () => {
        return Object.values(ShoppingListIcon).map(icon => {
            const Icon = getShoppingListIcon(icon);

            return (
                <div
                    key={icon}
                    className={classNames(styles.item, value === icon && styles.selected)}
                    onClick={() => onChange(icon)}
                >
                    <Icon />
                </div>
            )
        })
    }

    return (
        <div className={styles.container}>
            {renderIcons()}
        </div>
    );
}

