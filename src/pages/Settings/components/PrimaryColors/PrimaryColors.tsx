import { useMemo } from 'react';

import { PrimaryColors } from '@/stores/AppConfigStore';

import { PrimaryColorItem } from './PrimaryColorItem';
import styles from './PrimaryColors.module.scss';


type Props = {
    color: PrimaryColors;
    onChange: (color: PrimaryColors) => void;
}

export const PrimaryColorList: React.FC<Props> = ({ color, onChange }) => {
    const allColors = Object.values(PrimaryColors);
    const colorItems = useMemo(() => allColors.map(i => (
        <PrimaryColorItem
            key={i}
            color={i}
            onClick={() => onChange(i)}
            isSelected={color === i}
        />
    )), [allColors, color, onChange]);

    return ( 
        <div className={styles.container}>
            {colorItems}
        </div>
    );
}
