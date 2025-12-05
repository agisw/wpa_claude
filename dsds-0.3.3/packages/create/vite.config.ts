import path from "node:path"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import { viteStaticCopy } from "vite-plugin-static-copy"

const cwd = process.cwd()

export default defineConfig({
  build: {
    target: "node20",
    outDir: "dist",
    lib: {
      entry: path.resolve(cwd, "src/index.ts"),
      formats: ["es"],
      fileName: () => "index.js",
    },
    rollupOptions: {
      external: ["inquirer", "child_process", "fs", "path", "os", "util", "url"],
      output: {
        entryFileNames: "index.js",
        chunkFileNames: "[name].js",
        format: "es",
        banner: "#!/usr/bin/env node", // CLI 실행 가능하게 shebang 추가
      },
    },
    sourcemap: true,
    emptyOutDir: true,
    minify: false,
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      tsconfigPath: "./tsconfig.json",
      // CLI라서 타입만 배포, src/**/*.test.* 등은 제외
      exclude: ["**/*.test.*", "**/__tests__/**"],
    }),
    viteStaticCopy({
      targets: [
        {
          src: "templates/*",
          dest: "templates",
        },
      ],
    }),
  ],
})
