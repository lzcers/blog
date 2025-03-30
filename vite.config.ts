import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: path.resolve(__dirname, "./dist/"),
        rollupOptions: {
            output: {
                // 配置 JS 文件输出格式，不使用 hash
                entryFileNames: `assets/[name].js`,
                chunkFileNames: `assets/[name].js`,
                // 配置 CSS 文件输出格式，不使用 hash
                assetFileNames: `assets/[name].[ext]`
            }
        }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 3000
    },
    plugins: [
        react()
    ]
});
