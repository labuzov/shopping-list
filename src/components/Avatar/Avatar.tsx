import { useState } from 'react';
import { MdAccountCircle } from 'react-icons/md';

import styles from './Avatar.module.scss';


enum AvatarStatus {
    None,
    Loaded,
    Error
}

type Props = {
    src?: string | null;
}

export const Avatar: React.FC<Props> = ({ src }) => {
    const [status, setStatus] = useState(AvatarStatus.None);
    
    const handleLoad = () => {
        setStatus(AvatarStatus.Loaded);
    }

    const handleError = () => {
        setStatus(AvatarStatus.Error);
    }

    const isPlaceholderVisible = !src || status !== AvatarStatus.Loaded;

    return (
        <div className={styles.avatar}>
            <div
                className={styles.image}
                style={{ display: isPlaceholderVisible ? 'none' : 'flex' }}
            >
                <img
                    src={src ?? ''}
                    width="100%"
                    height="100%"
                    onLoad={handleLoad}
                    onError={handleError}
                />
            </div>

            {isPlaceholderVisible && (
                <div className={styles.noSrc}>
                    <MdAccountCircle />
                </div>
            )}
        </div>
    );
}
