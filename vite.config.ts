import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import viteCompression from 'vite-plugin-compression';
import pluginPurgeCss from 'vite-plugin-purgecss-updated-v5';
import { VitePluginRadar } from 'vite-plugin-radar';

export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'gzip',
    }),
    pluginPurgeCss({
      variables: true,
    }),
    VitePluginRadar({
      analytics: {
        id: 'G-K63GFRNPPF',
      },
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
