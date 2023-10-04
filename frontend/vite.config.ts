import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {crx} from '@crxjs/vite-plugin'
import {vanillaExtractPlugin} from "@vanilla-extract/vite-plugin";
import path from 'path';
import svgr from 'vite-plugin-svgr';
import {ViteImageOptimizer} from 'vite-plugin-image-optimizer';
// @ts-ignore
import AutoImport from 'unplugin-auto-import/vite';
// @ts-ignore
import manifest from './manifest.json'
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr(),
        ViteImageOptimizer({exclude: []}),
        VitePWA({registerType: 'autoUpdate'}),
        AutoImport({
            eslintrc: {
                enabled: true,
            },
            imports: ['react'],
        }),
        vanillaExtractPlugin(),
        crx({manifest}),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})
