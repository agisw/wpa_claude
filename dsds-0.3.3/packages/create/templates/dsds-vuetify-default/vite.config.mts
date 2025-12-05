import { fileURLToPath, URL } from "node:url"
import Vue from "@vitejs/plugin-vue"
// Plugins
import Components from "unplugin-vue-components/vite"
import VueRouter from "unplugin-vue-router/vite"
// Utilities
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      dts: "src/typed-router.d.ts",
    }),
    Vue(),
    Components({
      dts: "src/components.d.ts",
    }),
  ],
  optimizeDeps: {
    exclude: [
      "vuetify",
      "vue-router",
      "unplugin-vue-router/runtime",
      "unplugin-vue-router/data-loaders",
      "unplugin-vue-router/data-loaders/basic",
    ],
  },
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: {
    port: 3000,
    allowedHosts: ["cloudlab.koreacentral.cloudapp.azure.com"],
  },
  css: {
    preprocessorOptions: {
      sass: {
        api: "modern-compiler",
      },
      scss: {
        api: "modern-compiler",
      },
    },
  },
})
