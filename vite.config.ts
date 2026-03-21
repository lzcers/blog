import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: path.resolve(__dirname, "./dist/"),
        rollupOptions: {
            output: {
                codeSplitting: {
                    minSize: 20000,
                    groups: [
                        {
                            name: 'vendor',
                            test: /node_modules/,
                        },
                    ],
                },
            },
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
