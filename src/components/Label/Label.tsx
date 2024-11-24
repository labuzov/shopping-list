import classNames from 'classnames';

import styles from './Label.module.scss';


type LabelProps = {
    className?: string;
    text?: string;
}

export const Label: React.FC<LabelProps> = ({ className, text }) => {
    const classes = classNames(
        styles.label,
        className
    );

    return ( 
        <div className={classes}>
            {text}
        </div>
    );
}
