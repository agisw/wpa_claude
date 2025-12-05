import type { LNBAccordionItem, LNBContentItem, LNBItem, LNBTreeItem } from "./types"

export const MIN_WIDTH = 200
export const MAX_WIDTH = 240

export function isArrayShallowEqual<T>(a: readonly T[], b: readonly T[]): boolean {
  if (a === b) return true
  if (a.length !== b.length) return false
  return a.every((value, index) => value === b[index])
}

export function uniqueValues(values: readonly (string | number)[]): string[] {
  return Array.from(new Set(values.map((value) => String(value))))
}

export function getLNBItemById(items: LNBItem[], targetId?: string): LNBItem | undefined {
  if (!targetId) return undefined

  for (const item of items) {
    if (item.id === targetId) {
      return item
    }

    if (item.items && item.items.length > 0) {
      const found = getLNBItemById(item.items as LNBItem[], targetId)
      if (found) {
        return found
      }
    }
  }

  return undefined
}

export function findSelectedItemPaths(items: LNBItem[], selectedItemId?: string): string[] {
  const selectedPaths: string[] = []

  const traverse = (nodes: LNBItem[], currentPath: string[] = []) => {
    nodes.forEach((item, index) => {
      const itemPath = [...currentPath, item.id || String(index)]

      if (selectedItemId && item.id === selectedItemId) {
        for (let i = 0; i < itemPath.length - 1; i += 1) {
          const parentId = itemPath[i]
          if (!selectedPaths.includes(parentId)) {
            selectedPaths.push(parentId)
          }
        }
      }

      if (item.items && item.items.length > 0) {
        traverse(item.items as LNBItem[], itemPath)
      }
    })
  }

  traverse(items)
  return selectedPaths
}

export function hasSearchMatch(items: LNBItem[], searchTerm: string, selectedItemId?: string): boolean {
  const lowerTerm = searchTerm.toLowerCase()

  for (const item of items) {
    const contentMatches = item.content.toLowerCase().includes(lowerTerm)
    const isSelected = selectedItemId && item.id === selectedItemId

    if (contentMatches || isSelected) {
      return true
    }

    if (item.items && item.items.length > 0) {
      if (hasSearchMatch(item.items as LNBItem[], searchTerm, selectedItemId)) {
        return true
      }
    }
  }

  return false
}

export function findSearchMatchParentPaths(items: LNBItem[], searchTerm: string, selectedItemId?: string): string[] {
  const trimmed = searchTerm.trim()
  if (!trimmed) return []

  const parentPaths: string[] = []
  const lowerTerm = trimmed.toLowerCase()

  const traverse = (nodes: LNBItem[], currentPath: string[] = []) => {
    nodes.forEach((item, index) => {
      const itemPath = [...currentPath, item.id || String(index)]
      const contentMatches = item.content.toLowerCase().includes(lowerTerm)
      const isSelected = selectedItemId && item.id === selectedItemId

      let hasMatchingChild = false
      if (item.items && item.items.length > 0) {
        traverse(item.items as LNBItem[], itemPath)
        hasMatchingChild = hasSearchMatch(item.items as LNBItem[], trimmed, selectedItemId)
      }

      if (contentMatches || isSelected || hasMatchingChild) {
        for (let i = 0; i < itemPath.length; i += 1) {
          const pathId = itemPath[i]
          if (!parentPaths.includes(pathId)) {
            parentPaths.push(pathId)
          }
        }
      }
    })
  }

  traverse(items)
  return parentPaths
}

export function addTypeAndDepthToHierarchy(
  items: LNBItem[],
  currentDepth = 0,
  withoutAccordion = false
): Array<LNBAccordionItem | LNBTreeItem> {
  return items.map(
    (item, index) =>
      addTypeAndDepthToNode(item, currentDepth, index === 0 && currentDepth === 0, withoutAccordion) as
        | LNBAccordionItem
        | LNBTreeItem
  )
}

export function isFlatStructure(items: LNBItem[]): boolean {
  return items.every((item) => !item.type || item.type === "item")
}

export function addTypeAndDepthToNode(item: LNBItem, depth: number, isRoot = false, withoutAccordion = false): LNBItem {
  const hasChildren = item.items
  let type: "accordion" | "tree" | "item"

  if (!hasChildren) {
    type = "item"
  } else if (isRoot || depth === 0) {
    type = withoutAccordion ? "tree" : "accordion"
  } else {
    type = "tree"
  }

  if (type === "item") {
    return {
      ...item,
      type: "item",
      depth,
      disabled: item.disabled ?? false,
      items: undefined,
    } as LNBContentItem
  }

  const childItems = hasChildren ? addTypeAndDepthToHierarchy(item.items as LNBItem[], depth + 1, withoutAccordion) : []

  const baseResult = {
    ...item,
    depth,
    disabled: item.disabled ?? false,
    items: childItems,
  }

  if (type === "accordion") {
    return {
      ...baseResult,
      type: "accordion" as const,
    } as LNBAccordionItem
  }

  return {
    ...baseResult,
    type: "tree" as const,
  } as LNBTreeItem
}

export function getMaxDepth(items: LNBItem[]): number {
  if (!items || items.length === 0) {
    return 0
  }

  let maxDepth = 1

  for (const item of items) {
    if (item.items && item.items.length > 0) {
      const childDepth = 1 + getMaxDepth(item.items as LNBItem[])
      maxDepth = Math.max(maxDepth, childDepth)
    }
  }

  return maxDepth
}

export function filterMenuItems(
  items: LNBAccordionItem[],
  searchTerm: string,
  selectedItemId?: string
): LNBAccordionItem[] {
  if (!searchTerm.trim()) {
    return items
  }

  const filtered: LNBAccordionItem[] = []
  const lowerTerm = searchTerm.toLowerCase()

  for (const item of items) {
    const contentMatches = item.content.toLowerCase().includes(lowerTerm)
    const isSelected = selectedItemId && item.id === selectedItemId

    const filteredSubItems =
      item.items && item.items.length > 0
        ? filterMenuItems(item.items as LNBAccordionItem[], searchTerm, selectedItemId)
        : []

    if (contentMatches || isSelected || filteredSubItems.length > 0) {
      filtered.push({
        ...item,
        items: filteredSubItems.length > 0 ? filteredSubItems : item.items,
      } as LNBAccordionItem)
    }
  }

  return filtered
}

export function normalizePanelValue(value: string | number | (string | number)[] | null | undefined): string[] {
  if (Array.isArray(value)) {
    return uniqueValues(value)
  }

  if (value === null || value === undefined) {
    return []
  }

  return [String(value)]
}
