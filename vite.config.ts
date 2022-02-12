import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  base: "//ksana.oss-cn-shenzhen.aliyuncs.com/",
  build: {
    outDir:  path.resolve(__dirname, './docs/'),
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
    }
  },
  plugins: [
    react(),   
    viteStaticCopy({
      targets: [
        {
          src: './CNAME',
          dest: './'
        }
      ]
  })]
});