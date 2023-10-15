import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

import packageJson from "./package.json" assert { type: "json" };
import postcss from "rollup-plugin-postcss";

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@utils": path.resolve(__dirname, "./src/utils"),
            "@type-utils": path.resolve(__dirname, "./src/type-utils"),
        },
    },
    plugins: [react()],
    build: {
        rollupOptions: [
            {
                input: "src/index.ts",
                output: [
                    {
                        file: packageJson.main,
                        format: "cjs",
                        sourcemap: true,
                    },
                    {
                        file: packageJson.module,
                        format: "esm",
                        sourcemap: true,
                    },
                ],
                plugins: [
                    resolve(),
                    commonjs(),
                    typescript({ tsconfig: "./tsconfig.json" }),

                    postcss(),
                ],
            },
            {
                input: "dist/esm/types/index.d.ts",
                output: [{ file: "dist/index.d.ts", format: "esm" }],
                plugins: [dts()],

                external: [/\.css$/, /\.scss$/],
            },
        ],
    },
});
