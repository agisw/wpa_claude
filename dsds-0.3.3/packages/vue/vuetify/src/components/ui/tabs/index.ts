export { default as VTabs } from "./VTabs.vue"
export { default as VTab } from "./VTab.vue"
export { default as VTabsContainer } from "./VTabsContainer.vue"
export { default as VTabsWindow } from "./VTabsWindow.vue"
export { default as VTabsWindowItem } from "./VTabsWindowItem.vue"
export { default as VTabsContent } from "./VTabsContent.vue"

export { default as PageTabs } from "./PageTabs.vue"
export type { PageTabItem } from "./PageTabs.vue"

// For backward compatibility
export { default as VTabItems } from "./VTabsWindow.vue"
export { default as VTabItem } from "./VTabsWindowItem.vue"

export type * from "./types"

// Variants configuration for external use
export const tabsVariantsConfig = {
  variant: {
    default: "dsds-tab-underline",
    button: "dsds-tab-button",
  },
  size: {
    small: "",
    medium: "",
  },
}

// Re-export types for convenience
export type { TabsProps, TabProps, TabItemProps, TabVariant, TabSize } from "./types"
