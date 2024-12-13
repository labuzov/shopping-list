import path from 'path';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import { visualizer } from 'rollup-plugin-visualizer';


export default defineConfig(({ command }) => {
    const isProd = command === 'build';
    const srcPath = path.resolve(__dirname, 'src');

    const alias = {
        '@': srcPath
    }

    return {
        plugins: [
            react(),
            splitVendorChunkPlugin(),
            visualizer({
                filename: 'analyse_bundle.html'
            })
        ],
        css: {
            postcss: {
                plugins: [
                    autoprefixer()
                ]
            },
            modules: {
                generateScopedName: isProd ? '[hash:base64:6]' : '[name]_[local]_[hash:base64:2]'
            },
        },
        resolve: {
            alias
        },
        build: {
            chunkSizeWarningLimit: 1000
        }
    }
})
