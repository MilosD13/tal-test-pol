import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";
import path from "path";

export default defineConfig({
  plugins: [
    react(),

    // configure the ESLint plugin
    eslintPlugin({
      // only lint your source files
      include: ["src/**/*.js", "src/**/*.jsx", "src/**/*.ts", "src/**/*.tsx"],

      // point ESLint at your root config
      overrideConfigFile: path.resolve(__dirname, ".eslintrc.json"),

      // keep using your .eslintrc.json
      useEslintrc: true,

      // (optional) automatically fix problems
      fix: true,

      // (optional) show warnings as well as errors
      emitWarning: true,
      emitError: true,

      // (optional) don’t block dev on lint errors
      failOnWarning: false,
      failOnError: false
    })
  ],

  server: {
    // if you ever want to hide the red‐screen overlay:
    // hmr: { overlay: false }
  }
});
