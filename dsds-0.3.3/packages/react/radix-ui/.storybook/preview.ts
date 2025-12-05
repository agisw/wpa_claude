import type { Preview } from "@storybook/react-vite"

import { basePreviewOptions } from "./settings"

import "@dsds/fonts"
import "../src/index.css"

export default {
  parameters: {
    ...basePreviewOptions,
    options: {
      storySort: {
        order: [
          "Home",
          "Getting Started",
          ["Installation", "MCP Server"],
          "Design Tokens",
          [
            "Primitives",
            ["Colors", "Spacing", "Typography", "Border", "Shadows", "Opacity"],
            "Semantics",
            ["Colors", "Spacing", "Typography", "Border", "Shadows"],
          ],
          "Tools",
          "Layouts",
          ["Layout Examples", "Header", "Footer", "LNB"],
          "Components",
          [
            // Work in Progress
            "Doing",
            // Basic Components
            "Buttons",
            "Textbox",
            ["Docs", "Searchbox", "Calbox", "Selectbox"],
            "Checkbox",
            "Radio",
            "Toggle",

            // Popover Components
            "Dropdown Menu",
            "Combobox",
            "Modal",

            // Auxiliary Components
            "Tooltip",
          ],
          "Examples",
          "QA",
          [
            "Doing",
            [
              "Header",
              "Footer",
              "Buttons",
              "Radio",
              "Checkbox",
              "Toggle",
              "Textbox",
              "Searchbox",
              "Dropdown Menu",
              "Combobox",
              "Modal",
              "Tooltip",
            ],
            "Done",
          ],
        ],
      },
    },
  },
} satisfies Preview
