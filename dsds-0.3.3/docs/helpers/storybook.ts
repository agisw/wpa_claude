import path, { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import remarkGfm from "remark-gfm"
import type { Options } from "storybook/internal/types"
import { create, type ThemeVarsPartial } from "storybook/theming"
import type { InlineConfig } from "vite"

const cwd = dirname(fileURLToPath(import.meta.url))

export const baseTheme = {
  base: "light",
  fontBase:
    '"Malgun Gothic", "Segoe UI Emoji", "Segoe UI Symbol", "Apple SD Gothic Neo", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Apple Color Emoji", sans-serif',
  fontCode: 'D2Coding, Consolas, "Courier New", ui-monospace, monospace',
} as ThemeVarsPartial

export const basePreviewOptions = {
  docs: {
    theme: create({
      ...baseTheme,
    }),
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  actions: { disable: true },
  interactions: { disable: true },
}

export const prodHostName = "cloudlab.koreacentral.cloudapp.azure.com"
export const prodHostPort = 443
type ViteFinal = (config: InlineConfig, options: Options) => InlineConfig | Promise<InlineConfig>

function getViteFinal(prodUrlPrefix?: string): ViteFinal {
  return async function (baseConfig: InlineConfig, { configType }: Options) {
    const { mergeConfig } = await import("vite")
    const base = configType === "PRODUCTION" ? process.env.STORYBOOK_BASE_URL || prodUrlPrefix : ""
    const server =
      (baseConfig.server?.hmr as { port?: number })?.port === 53000
        ? {
            baseUrl: prodHostName,
            hmr: {
              clientPort: prodHostPort,
              port: prodHostPort,
              host: prodHostName,
            },
          }
        : undefined

    const config = mergeConfig(baseConfig, {
      base,
      server,
      resolve: {
        alias: {
          "@docs": path.resolve(cwd, ".."),
        },
      },
    })

    if (config.plugins) {
      config.plugins = config.plugins.filter((plugin: { name: string } | { name: string }[]) => {
        const name = Array.isArray(plugin) ? plugin[0].name : plugin.name
        if (
          [
            "vite-plugin-inspect",
            "exclude-mdi",
            "vite:dts",
            "peer-deps-external",
            "vite:storybook-inject-mocker-runtime",
            "storybook:mock-loader",
          ].includes(name)
        ) {
          return false
        }
        return true
      })
    }

    if (config.build?.rollupOptions) {
      config.build.rollupOptions.output = {
        ...config.build.rollupOptions.output,
        assetFileNames: (assetInfo: { name: string }) => {
          const fileName = (assetInfo.name || "").toLowerCase()
          // MDI 관련 파일들 제외
          if (fileName.match(/\.(woff|woff2|eot|ttf|otf)$/)) {
            return "fonts/[name].[extname]" // 빌드에서 제외
          }
          return assetInfo.name
        },
      }
    }

    return config
  }
}

function getDefaultStorybookConfig({ stories }: { stories?: string[]; prodUrlPrefix?: string }) {
  return {
    stories: stories || ["../src/**/*.mdx", "../docs/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    staticDirs: ["../public", { from: "../public", to: "/static" }],
    addons: [
      {
        name: "@storybook/addon-docs",
        options: {
          mdxPluginOptions: {
            mdxCompileOptions: {
              remarkPlugins: [remarkGfm],
            },
          },
        },
      },
    ],
    core: {
      disableTelemetry: true, // 👈 Disables telemetry
    },
  }
}

export function getVueStorybookConfig({
  stories,
  prodUrlPrefix,
  addons,
}: {
  stories?: string[]
  prodUrlPrefix?: string
  addons?: string[]
}) {
  const defaultConfig = getDefaultStorybookConfig({ stories, prodUrlPrefix })
  return {
    ...defaultConfig,
    addons: [...defaultConfig.addons, "storybook-addon-vue-mdx", ...(addons || [])],
    framework: {
      name: "@storybook/vue3-vite",
      options: {},
    },
    viteFinal: getViteFinal(prodUrlPrefix),
  }
}

export function getReactStorybookConfig({ stories, prodUrlPrefix }: { stories?: string[]; prodUrlPrefix: string }) {
  return {
    ...getDefaultStorybookConfig({ stories, prodUrlPrefix }),
    framework: {
      name: "@storybook/react-vite",
      options: {},
    },
    viteFinal: getViteFinal(prodUrlPrefix),
  }
}
