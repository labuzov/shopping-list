import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig(() => {
    // const isProd = command === 'build';
    const srcPath = path.resolve(__dirname, 'src');

    const alias = {
        '@': srcPath
    }

    return {
        plugins: [
            react()
        ],
        resolve: {
            alias
        },
    }
})
