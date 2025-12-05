import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import preserveDirectives from "rollup-preserve-directives"
import { defineConfig, type Plugin } from "vite"
import dts from "vite-plugin-dts"
import { viteStaticCopy } from "vite-plugin-static-copy"

const cwd = import.meta.dirname

const ReactCompilerConfig = { target: "19" }

// 빌드 모드 확인
const isOfflineEsmBuild = process.env.BUILD_MODE === "offline"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
    }),
    preserveDirectives() as Plugin,
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: "src/index.css",
          dest: "",
        },
        {
          src: "src/styles",
          dest: "",
        },
      ],
    }),
    dts({
      insertTypesEntry: true,
      tsconfigPath: "./tsconfig.json",
      exclude: ["src/stories/**", "src/**/*.test.*", "src/components/_shadcn/**", "tests/**", "docs/**"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(cwd, "./src"),
      "@tests": path.resolve(cwd, "./tests"),
      "@dsds/react-radix-ui": path.resolve(cwd, "./src/components/ui"),
      "@dsds/react-radix-ui/utils": path.resolve(cwd, "./src/lib/utils"),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx"],
  },
  build: {
    copyPublicDir: false,
    sourcemap: true,
    lib: {
      name: "DsdsRadixUI",
      entry: {
        index: path.resolve(cwd, "src/index.ts"),
        utils: path.resolve(cwd, "src/lib/utils.ts"),
        ...(isOfflineEsmBuild && {
          // ESM 빌드시 추가 엔트리 포인트
          offline: path.resolve(cwd, "src/index.esm.ts"),
        }),
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: isOfflineEsmBuild
        ? [
            // 오프라인 ESM 빌드시에는 React만 외부 의존성으로 유지
            "react",
            "react-dom",
            "react/jsx-runtime",
            /.*\.test\.(ts|tsx)$/,
            /.*\.spec\.(ts|tsx)$/,
          ]
        : [
            // 일반 빌드시 모든 의존성을 외부(Peer-Dependencies)로 처리
            "react",
            "react-dom",
            "react/jsx-runtime",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-label",
            "@radix-ui/react-popover",
            "@radix-ui/react-radio-group",
            "@radix-ui/react-switch",
            "@radix-ui/react-tabs",
            "@radix-ui/react-tooltip",
            "react-resizable-panels",
            "cmdk",
            "clsx",
            "class-variance-authority",
            "lucide-react",
            /.*\.test\.(ts|tsx)$/,
            /.*\.spec\.(ts|tsx)$/,
          ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.type === "asset") {
            if (assetInfo.name === "react-radix-ui.css") {
              return "styles.css"
            }
          }
          return ""
        },
      },
    },
    outDir: isOfflineEsmBuild ? "dist-esm" : "dist",
  },
})
