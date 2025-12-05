import type { Component, ComputedRef, InjectionKey, Ref, VNodeChild } from "vue"

export type LNBItemType = "accordion" | "tree" | "item"

export interface BaseLNBItem {
  type?: string
  id: string
  content: string
  disabled?: boolean
  depth?: number
}

export interface LNBAccordionItem extends BaseLNBItem {
  items?: Array<LNBTreeItem | LNBContentItem>
}

export interface LNBTreeItem extends BaseLNBItem {
  items?: Array<LNBTreeItem | LNBContentItem>
}

export interface LNBContentItem extends BaseLNBItem {
  items?: never | undefined
  id: string
}

export type LNBItem = LNBAccordionItem | LNBTreeItem | LNBContentItem

export interface LNBContainerItem {
  type: string
  icon?: VNodeChild | Component
  items: LNBAccordionItem[]
}

export interface LNBInputItem {
  title?: string | VNodeChild | Component
  items: LNBAccordionItem[]
  icon?: VNodeChild | Component
  args?: Partial<LNBProps>
}

export interface LNBProps {
  data: LNBInputItem
  title?: string | VNodeChild | Component
  selectedItemId?: string
  defaultSelectedItemId?: string
  defaultOpenPath?: string[]
  hidden?: boolean
  withoutAccordion?: boolean
  searchText?: string
}

export interface LNBContext {
  maxDepth: Ref<number | null>
  setMaxDepth: (value: number | null) => void
  selectedItem: Ref<LNBContentItem | null>
  setSelectedItem: (value: LNBContentItem | null) => void
  selectedItemId: ComputedRef<string | undefined>
  handleSelectionChange: (item: LNBContentItem) => void
  openPath: Ref<string[]>
  setOpenPath: (value: string[]) => void
  onlyTree: ComputedRef<boolean>
  disableAnimation: Ref<boolean>
  searchText: ComputedRef<string>
  setSearchText: (value: string) => void
  isDragging: Ref<boolean>
}

export const LNBContextKey: InjectionKey<LNBContext> = Symbol("LNBContext")
