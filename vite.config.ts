import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import viteCompression from 'vite-plugin-compression';
import pluginPurgeCss from '@mojojoejo/vite-plugin-purgecss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'gzip',
    }),
    pluginPurgeCss({
      variables: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: browserslistToEsbuild(),
    minify: 'terser',
    cssMinify: 'lightningcss',
  },
});
