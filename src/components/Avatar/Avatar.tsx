import { Image } from '@/components/Image/Image';

import styles from './Avatar.module.scss';
import { MdAccountCircle } from 'react-icons/md';


type Props = {
    src?: string | null;
}

export const Avatar: React.FC<Props> = ({ src }) => {

    return (
        <div className={styles.avatar}>
            {!src ? (
                <div className={styles.noSrc}>
                    <MdAccountCircle />
                </div>
            ) : (
                <Image src={src} />
            )}
        </div>
    );
}
