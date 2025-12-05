import type { VNodeChild } from "vue"

export interface TabsVariantsConfig {
  variant: {
    default: string
    button: string
  }
  size: {
    small: string
    medium: string
  }
}

export type TabVariant = "default" | "button" | "compact"
export type TabSize = "small" | "medium"

export interface TabProps {
  href?: string
  label?: string
  title?: string
  value?: string
  disabled?: boolean
  isActive?: boolean
}

export interface TabsProps {
  modelValue?: string
  variant?: TabVariant
  size?: TabSize
  class?: string
  items?: TabItemProps[]
}

export interface TabItemProps extends TabProps {
  text?: string
  content?: VNodeChild | (() => VNodeChild)
}
