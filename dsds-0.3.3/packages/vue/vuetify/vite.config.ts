/// <reference types="vitest/config" />
// vite.config.mts

// Plugins
import tailwindcss from "@tailwindcss/vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "node:path"
import RekaResolver from "reka-ui/resolver"
import components from "unplugin-vue-components/vite"
import dts from "vite-plugin-dts"
import vuetify from "vite-plugin-vuetify"

// Utilities
import { fileURLToPath, URL } from "node:url"
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import { defineConfig, Plugin } from "vite"

// 폰트 파일 제외 플러그인
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import path from "node:path"
const dirname = typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url))

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon

function excludeMDI(): Plugin {
  return {
    name: "exclude-mdi",
    resolveId(id) {
      // MDI 관련 모듈 해결 차단
      if (
        id.includes("@mdi/font") ||
        id.includes("materialdesignicons") ||
        id.includes(".woff") ||
        id.includes(".woff2")
      ) {
        return false // 모듈 해결 차단
      }
    },
    load(id) {
      // MDI CSS 로드 차단
      if (id.includes("materialdesignicons.css") || id.includes("@mdi/font")) {
        return "/* MDI fonts excluded from library build */"
      }
    },
    generateBundle(options, bundle) {
      // 최종 번들에서 MDI 관련 파일 제거
      Object.keys(bundle).forEach((fileName) => {
        if (fileName.includes("materialdesignicons") || fileName.match(/\.(woff|woff2|eot|ttf|otf)$/)) {
          delete bundle[fileName]
        }
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      styles: {
        configFile: "src/styles/settings.scss",
      },
    }),
    excludeMDI(),
    // 폰트 제외 플러그인 추가
    peerDepsExternal(),
    // peer dependencies 자동 externalize
    tailwindcss(),
    components({
      dts: true,
      resolvers: [RekaResolver()],
    }) as unknown as import("vite").PluginOption,
    dts({
      tsconfigPath: "tsconfig.build.json",
      entryRoot: "src",
      outDir: "dist",
      insertTypesEntry: true,
    }),
  ],
  // public 폴더 자동 복사 방지 (라이브러리 빌드에서 필요 없음)
  publicDir: false,
  // 기존 설정들은 그대로 유지합니다.
  optimizeDeps: {
    exclude: ["vuetify"],
  },
  define: {
    "process.env": {},
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  build: {
    // 이 부분을 추가합니다.
    target: "es2022",
    lib: {
      entry: {
        // 메인 진입점 (모든 컴포넌트)
        index: resolve(__dirname, "src/index.ts"),
        icons: resolve(__dirname, "src/components/icons/index.ts"),
        faker: resolve(__dirname, "src/faker/index.ts"),
        utils: resolve(__dirname, "src/lib/utils.ts"),
        /*
        // 개별 컴포넌트 진입점 (선별적 import용)
        components: resolve(__dirname, "src/components/ui/index.ts"),
        // 개별 컴포넌트들
        "components/VSelect": resolve(__dirname, "src/components/ui/VSelect.vue"),
        "components/VAutocomplete": resolve(__dirname, "src/components/ui/VAutocomplete.vue"),
        "components/VTextField": resolve(__dirname, "src/components/ui/VTextField.vue"),
        "components/VDialog": resolve(__dirname, "src/components/ui/VDialog.vue"),
        "components/VRadioGroup": resolve(__dirname, "src/components/ui/radio/VRadioGroup.vue"),
        "components/VRadio": resolve(__dirname, "src/components/ui/radio/VRadio.vue"),
        "components/VCardText": resolve(__dirname, "src/components/ui/VCardText.vue"),
        // Composables
        "composables/useScrollbarWidth": resolve(__dirname, "src/components/ui/composables/useScrollbarWidth.ts"),
        */
      },
      name: "DsdsVueVuetify",
      // UMD 빌드 시 사용할 이름
      formats: ["es"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      // Tailwind CSS sourcemap 경고 무시
      onwarn(warning, warn) {
        // Tailwind CSS 플러그인의 sourcemap 경고 무시
        if (warning.code === "SOURCEMAP_BROKEN" && warning.plugin === "@tailwindcss/vite:generate:build") {
          return
        }
        warn(warning)
      },
      // Peer dependencies externalize
      external: [
        "vue",
        "vuetify",
        "vuetify/components",
        "vuetify/directives",
        /^vuetify\/.*/,
        // MDI 관련 모든 파일 외부화
        "@mdi/font",
        "@mdi/js",
        /^@mdi\/.*/,
        // 폰트 파일 패턴 외부화
        /\.(woff|woff2|eot|ttf|otf)(\?.*)?$/,
        // MDI CSS 파일 외부화
        /materialdesignicons/,
        // DSDS 폰트 패키지 외부화
        "@dsds/fonts",
      ],
      output: {
        globals: {
          vue: "Vue",
          vuetify: "Vuetify",
        },
        // 진입점별 폴더 분리
        entryFileNames: (chunkInfo) => {
          const name = chunkInfo.name
          if (name === "faker") {
            return "faker/index.[format].js" // Custom name for 'admin' entry
          }
          if (name === "utils") {
            return "utils/index.[format].js" // Custom name for 'admin' entry
          }
          if (name === "icons") {
            return "icons/index.[format].js" // Custom name for 'admin' entry
          } // Default naming for other entries
          return "[name].[format].js"
        },
        chunkFileNames: `chunks/[name].[format].js`,
        // CSS를 단일 파일로 통합
        assetFileNames: (assetInfo) => {
          const fileName = (assetInfo.name || "").toLowerCase()

          // MDI 관련 파일들 제외
          if (fileName.includes("material") || fileName.match(/\.(woff|woff2|eot|ttf|otf)$/)) {
            return "" // 빌드에서 제외
          }
          if (fileName.endsWith(".css")) {
            return "style.css" // 모든 CSS를 단일 파일로
          }
          return "assets/[name].[hash][extname]"
        },
      },
    },
    assetsInlineLimit: 0,
    // 라이브러리 빌드: CSS를 단일 파일로 통합
    cssCodeSplit: false,
    // Tailwind Vite 플러그인이 sourcemap을 제공하지 않아 빌드 시 경고가 발생하므로 비활성화
    sourcemap: true,
    // 빌드 최적화
    minify: true,
    terserOptions: {
      // @ts-ignore
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
    ],
  },
})
