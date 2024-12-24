import { AiOutlineCheck } from 'react-icons/ai';
import classNames from 'classnames';

import { PrimaryColors } from '@/stores/AppConfigStore';

import styles from './PrimaryColors.module.scss';


type PrimaryColorItemProps = {
    color: PrimaryColors;
    isSelected?: boolean;
    onClick?: () => void;
}

export const PrimaryColorItem: React.FC<PrimaryColorItemProps> = ({ color, isSelected, onClick }) => {

    return ( 
        <div
            className={classNames(styles.item, isSelected && styles.selected)}
            style={{ backgroundColor: `var(--color-primary-${color})` }}
            onClick={onClick}
        >
            {isSelected && <div className={styles.icon}><AiOutlineCheck /></div>}
        </div>
    );
}
