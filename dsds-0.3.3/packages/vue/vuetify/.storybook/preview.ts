import { basePreviewOptions } from "./settings"
import { setup, type Preview } from "@storybook/vue3-vite"

import "@vuepic/vue-datepicker/dist/main.css"
import "@dsds/fonts"
import "@/index.css"
import "@/styles/dsds/realgrid.css"
import { i18nDecorator } from "./i18nDecorator"
import { createVuetify } from "../src/index"

setup((app) => {
  app.use(createVuetify())
})

export const globalTypes = {
  locale: {
    name: "Locale",
    defaultValue: "ko",
    toolbar: {
      icon: "globe",
      items: [
        { value: "ko", title: "한국어" },
        { value: "en", title: "English" },
      ],
      showName: true,
    },
  },
}

export default {
  decorators: [i18nDecorator],
  parameters: {
    ...basePreviewOptions,
    backgrounds: {
      disabled: true,
    },
    docs: {
      toc: true,
    },
    actions: { disable: false },
    interactions: { disable: false },
    options: {
      storySort: {
        order: [
          "Home",
          "Getting Started",
          ["Installation", "MCP Server", "Releases"],
          "Design Tokens",
          [
            "Primitives",
            ["Colors", "Spacing", "Typography", "Border", "Shadows", "Opacity"],
            "Semantics",
            ["Colors", "Spacing", "Typography", "Border", "Shadows"],
          ],
          "Tools",
          "Layouts",
          [
            "Overview",
            "BasicLayout",
            "Header",
            "Footer",
            "LNB",
            "Breadcrumb",
            "Page",
            "Form",
            "PageFilter",
            "PageTabs",
          ],
          "Examples",
          "Components",
          [
            // Basic Components
            "Button",
            "Checkbox",
            "Radio",
            "Select",
            "Autocomplete",
            "TextField",
            "Toggle (VSwitch)",
            "ToggleButton",

            // Navigation Components
            "Breadcrumb",
            "Pagination",
            "Tabs",

            // Popover Components
            "Dropdown Menu",
            "Combobox",
            "Modal",

            // Auxiliary Components
            "Tooltip",
          ],
          "DataTable",
          "Advanced",
          ["RichTextEditor"],
          "Layouts",
        ],
      },
    },
  },
} satisfies Preview
