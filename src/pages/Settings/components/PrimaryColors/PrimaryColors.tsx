import { useContext, useMemo } from 'react';

import { AppViewContext, PrimaryColors } from '@/providers/AppViewProvider';

import { PrimaryColorItem } from './PrimaryColorItem';
import styles from './PrimaryColors.module.scss';


export const PrimaryColorList: React.FC = () => {
    const { primaryColor, setPrimaryColor } = useContext(AppViewContext);

    const allColors = Object.values(PrimaryColors);
    const colorItems = useMemo(() => allColors.map(color => (
        <PrimaryColorItem
            key={color}
            color={color}
            onClick={() => setPrimaryColor(color)}
            isSelected={primaryColor === color}
        />
    )), [allColors, primaryColor, setPrimaryColor]);

    return ( 
        <div className={styles.container}>
            {colorItems}
        </div>
    );
}
