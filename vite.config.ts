import react from '@vitejs/plugin-react';
// @ts-ignore
import { URL, fileURLToPath } from 'url';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            {
                find: '@',
                replacement: fileURLToPath(new URL('./src', (import.meta as any).url)),
            },
        ],
    },
});
