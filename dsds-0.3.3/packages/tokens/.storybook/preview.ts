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
          "Examples",
          "Navigation",
          "Components",
          [
            // Basic Navigation
            "Header",
            "LNB",

            // Basic Components
            "Buttons",
            "Boxes",
            ["Docs", "Basicbox", "Textbox", "Searchbox"],
            "Checkbox",
            "Radiobox",
            "Toggle",

            // Popover Components
            "Dropdown Menu",
            "Combobox",
            "Modal",

            // Auxiliary Components
            "Tooltip",
          ],
        ],
      },
    },
  },
} satisfies Preview
