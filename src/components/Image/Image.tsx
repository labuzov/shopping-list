import { useState } from 'react';
import { MdErrorOutline } from 'react-icons/md';

import { Skeleton } from '@/components/Skeleton/Skeleton';

import styles from './Image.module.scss';


const DEFAULT_WIDTH = '100%';
const DEFAULT_HEIGHT = '100%';

enum ImageStatus {
    None,
    Loaded,
    Error
}

type ImageProps = {
    src?: string;
    width?: number | string;
    height?: number | string;
}

export const Image: React.FC<ImageProps> = ({ src, ...props }) => {
    const [status, setStatus] = useState(ImageStatus.None);

    const width = props.width ?? DEFAULT_WIDTH;
    const height = props.height ?? DEFAULT_HEIGHT;

    const handleLoad = () => {
        setStatus(ImageStatus.Loaded);
    }

    const handleError = () => {
        setStatus(ImageStatus.Error);
    }

    const renderLoading = () => (
        <Skeleton width={width} height={height} className={styles.skeleton} />
    );

    const renderError = () => {
        return (
            <div className={styles.error} style={{ width, height }} title="Failed to load">
                <MdErrorOutline />
            </div>
        );
    }

    return (
        <>
            <div
                className={styles.image}
                style={{ display: status === ImageStatus.Loaded ? 'flex' : 'none', width, height }}
            >
                <img
                    src={src}
                    width="100%"
                    height="100%"
                    onLoad={handleLoad}
                    onError={handleError}
                />
            </div>

            {status === ImageStatus.None && (
                <>
                    {renderLoading()}
                </>
            )}
            {status === ImageStatus.Error && (
                <>
                    {renderError()}
                </>
            )}
        </>
    );
}
