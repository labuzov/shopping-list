import path from 'path';
import { defineConfig } from 'vite';
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
            visualizer({
                filename: "analyse_bundle.html"
            })
        ],
        css: {
            postcss: {
                plugins: [
                    autoprefixer()
                ]
            },
            modules: {
                generateScopedName: isProd ? '[hash:base64:6]' : '[name]__[local]__[hash:base64:2]'
            },
        },
        resolve: {
            alias
        },
    }
})
