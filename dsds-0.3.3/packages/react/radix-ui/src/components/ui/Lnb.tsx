"use client"

import React, { createContext, JSX, useContext, useEffect, useMemo, useRef, useState } from "react"
import * as LnbPrimitive from "@radix-ui/react-accordion"
import Highlighter from "react-highlight-words"

import { cn, isArrayShallowEqual } from "@/lib/utils"
import { LnbBulletIcon, LnbChevronUpIcon, LnbTriangleLeftIcon, LnbTriangleRightIcon } from "@/components/icons"
import { ScrollArea } from "@/components/ui"

// LNB 관련 모든 타입 정의
export type LNBItemType = "accordion" | "tree" | "item"

export interface BaseLNBItem {
  type?: string
  id: string
  content: string
  disabled?: boolean
  depth?: number
}

export interface LNBAccordionItem extends BaseLNBItem {
  items?: LNBTreeItem[] | LNBContentItem[]
}

export interface LNBTreeItem extends BaseLNBItem {
  items?: LNBTreeItem[] | LNBContentItem[]
}

export interface LNBContentItem extends BaseLNBItem {
  items?: never | undefined
  id: string
}

// Title 컴포넌트 타입 정의
export type LNBTabsTitleComponent = React.ComponentType<{
  onTabChange?: (value: string) => void
  currentTab?: string
}>

export type LNBSearchboxTitleComponent = React.ComponentType<{
  onSearchChange?: (value: string) => void
  searchValue?: string
}>

export interface LNBContainerItem {
  type: string
  icon?: React.ReactNode
  items: LNBAccordionItem[]
}

export interface LNBInputItem {
  title?: string | React.ReactNode
  items: LNBAccordionItem[]
  icon?: React.ReactNode
  args?: Partial<LnbProps>
}

type LNBItem = LNBAccordionItem | LNBTreeItem | LNBContentItem

const MIN_WIDTH = 200
const MAX_WIDTH = 240

/**
 * LNB 메뉴 트리에서 특정 ID를 가진 아이템을 재귀적으로 찾는 유틸리티 함수
 * @param items - 검색할 LNB 아이템 배열
 * @param targetId - 찾고자 하는 아이템의 ID
 * @returns 찾은 아이템 또는 undefined
 */
function getLnbItemById(items: LNBItem[], targetId?: string): LNBItem | undefined {
  if (!targetId) {
    return undefined
  }

  for (const item of items) {
    // 현재 아이템의 ID가 일치하는지 확인
    if (item.id === targetId) {
      return item
    }

    // 하위 아이템이 있는 경우 재귀적으로 검색
    if (item.items && item.items.length > 0) {
      const found = getLnbItemById(item.items, targetId)
      if (found) {
        return found
      }
    }
  }

  return undefined
}

function findSelectedItemPaths(items: LNBItem[], selectedItemId?: string): string[] {
  const selectedPaths: string[] = []

  function traverse(items: LNBItem[], currentPath: string[] = []): void {
    items.forEach((item, index) => {
      const itemPath = [...currentPath, item.id || `${index}`]

      // 선택된 항목을 찾은 경우
      if (selectedItemId && item.id === selectedItemId) {
        // 루트부터 선택된 항목의 부모까지 각 id를 개별적으로 추가
        for (let i = 0; i < itemPath.length - 1; i++) {
          const parentId = itemPath[i]
          if (!selectedPaths.includes(parentId)) {
            selectedPaths.push(parentId)
          }
        }
      }

      // 하위 아이템이 있는 경우 재귀 호출
      if (item.items && item.items.length > 0) {
        traverse(item.items, itemPath)
      }
    })
  }

  traverse(items)
  return selectedPaths
}

// 검색된 항목들의 부모 경로를 찾는 함수
function findSearchMatchParentPaths(items: LNBItem[], searchTerm: string, selectedItemId?: string): string[] {
  if (!searchTerm.trim()) {
    return []
  }

  const parentPaths: string[] = []

  function traverse(items: LNBItem[], currentPath: string[] = []): void {
    items.forEach((item, index) => {
      const itemPath = [...currentPath, item.id || `${index}`]

      // 현재 항목이 검색어에 매치되는지 확인
      const contentMatches = item.content.toLowerCase().includes(searchTerm.toLowerCase())

      // 선택된 항목인지 확인
      const isSelected = selectedItemId && item.id === selectedItemId

      // 하위 항목들을 재귀적으로 확인
      let hasMatchingChild = false
      if (item.items && item.items.length > 0) {
        traverse(item.items, itemPath)

        // 하위 항목 중에 매치되는 것이 있는지 확인
        hasMatchingChild = hasSearchMatch(item.items, searchTerm, selectedItemId)
      }

      // 현재 항목이 매치되거나 선택된 항목이거나 하위에 매치되는 항목이 있으면 경로들을 추가
      if (contentMatches || isSelected || hasMatchingChild) {
        // 현재 항목까지의 모든 경로를 추가 (자기 자신 포함)
        for (let i = 0; i < itemPath.length; i++) {
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

// 하위 항목 중에 검색 매치가 있는지 확인하는 헬퍼 함수
function hasSearchMatch(items: LNBItem[], searchTerm: string, selectedItemId?: string): boolean {
  for (const item of items) {
    const contentMatches = item.content.toLowerCase().includes(searchTerm.toLowerCase())
    const isSelected = selectedItemId && item.id === selectedItemId

    if (contentMatches || isSelected) {
      return true
    }

    if (item.items && item.items.length > 0) {
      if (hasSearchMatch(item.items, searchTerm, selectedItemId)) {
        return true
      }
    }
  }
  return false
}

function addTypeAndDepthToHierarchy(
  items: LNBItem[],
  currentDepth: number = 0,
  withoutAccordion: boolean = false
): LNBAccordionItem[] | LNBTreeItem[] {
  return items.map((item, index) =>
    addTypeAndDepthToNode(item, currentDepth, index === 0 && currentDepth === 0, withoutAccordion)
  )
}

function isFlatStructure(items: LNBItem[]): boolean {
  return items.every((item) => !item.type || item.type === "item")
}

function addTypeAndDepthToNode(
  item: LNBItem,
  depth: number,
  isRoot: boolean = false,
  withoutAccordion: boolean = false
): LNBAccordionItem | LNBTreeItem | LNBContentItem {
  const hasChildren = item.items

  let type: "accordion" | "tree" | "item"

  if (!hasChildren) {
    type = "item" // 말단 노드
  } else if (isRoot || depth === 0) {
    if (withoutAccordion) {
      type = "tree"
    } else {
      type = "accordion"
    }
  } else {
    type = "tree" // 중간 노드
  }

  // 말단 노드 처리
  if (type === "item") {
    return {
      ...item,
      type: "item",
      depth,
      disabled: item.disabled ?? false,
      items: undefined,
    } as LNBContentItem
  }

  // 부모 노드 처리 (accordion 또는 tree)
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

  // tree 타입
  return {
    ...baseResult,
    type: "tree" as const,
  } as LNBTreeItem
}

function getMaxDepth(items: LNBItem[]): number {
  if (!items || items.length === 0) {
    return 0
  }

  let maxDepth = 1

  for (const item of items) {
    if (item.items && item.items.length > 0) {
      const childDepth = 1 + getMaxDepth(item.items)
      maxDepth = Math.max(maxDepth, childDepth)
    }
  }
  return maxDepth
}

interface TreeContextType {
  maxDepth: number | null
  setMaxDepth: (value: number | null) => void
  selectedItem: LNBContentItem | null
  setSelectedItem: (value: LNBContentItem | null) => void
  selectedItemId?: string
  handleSelectionChange: (item: LNBContentItem) => void
  openPath: string[]
  setOpenPath: (value: string[]) => void
  onlyTree: boolean | undefined
  disableAnimation: boolean
  searchText: string
  setSearchText: (value: string) => void
}

const TreeContext = createContext<TreeContextType | undefined>(undefined)

const useTreeContext = () => {
  const context = useContext(TreeContext)
  if (!context) {
    // Provider 외부에서 사용하면 에러를 발생시켜 실수를 방지합니다.
    throw new Error("useTreeContext는 Tree 컴포넌트 내부에서만 사용할 수 있습니다.")
  }
  return context
}

// Highlight text component
const HighlightedText = ({ text, searchText }: { text: string; searchText: string }) => {
  if (!searchText.trim()) {
    return <span>{text}</span>
  }

  return (
    <Highlighter
      highlightClassName="bg-yellow-300"
      searchWords={[searchText]}
      autoEscape={true}
      textToHighlight={text}
    />
  )
}

export type LnbProps = Omit<React.ComponentProps<"div">, "title"> & {
  data: LNBInputItem
  title?: JSX.Element | string
  selectedItemId?: string
  defaultSelectedItemId?: string
  defaultOpenPath?: string[]
  onSelectionChange?: (selectedItemId: string, selectedItem: LNBContentItem) => void
  hidden?: boolean
  withoutAccordion?: boolean
  searchText?: string
  onSearchTextChange?: (searchText: string) => void
}

/**
 * LNB (Left Navigation Bar) 컴포넌트
 *
 * 계층 구조와 불릿 표시 규칙:
 * - 1단계: 아코디언 (대그룹)
 * - 2단계: 트리 (중그룹) - 불릿 표시
 * - 3단계: 항목 (손자) - 불릿 숨김
 * - 4단계 이상 항목이 존재하면, 모든 말단 항목에 불릿 표시
 *
 * 주요 기능:
 * - 아코디언과 트리의 복합 구조 지원
 * - withoutAccordion 옵션으로 트리만 사용 가능
 * - controlled/uncontrolled 패턴 지원:
 *   - selectedItemId: 외부에서 선택 상태 제어 (controlled)
 *   - defaultSelectedItemId: 초기 선택 상태만 설정 (uncontrolled)
 * - onSelectionChange 콜백을 통한 선택 이벤트 처리
 * - 리사이징 가능한 너비 조절
 * - 검색 기능 지원 (자동 확장 포함)
 */

const Lnb: React.FC<LnbProps> = ({
  data,
  title,
  className,
  selectedItemId,
  defaultSelectedItemId,
  defaultOpenPath,
  onSelectionChange,
  hidden = false, // 기본값 false
  withoutAccordion = false,
  searchText: externalSearchText,
  onSearchTextChange,
  ...props
}) => {
  const [width, setWidth] = useState(MIN_WIDTH)
  const [isDragging, setIsDragging] = useState(false)
  const [disableAnimation, setDisableAnimation] = useState(false)
  const [internalSearchText, setInternalSearchText] = useState("")
  const [internalSelectedItemId, setInternalSelectedItemId] = useState<string | undefined>(defaultSelectedItemId)
  const resizing = useRef(false)
  const startX = useRef(0)
  const startWidth = useRef(width)
  const dataRef = useRef(data)

  // 외부에서 searchText가 제공되면 그것을 사용하고, 그렇지 않으면 내부 상태 사용
  const searchText = externalSearchText !== undefined ? externalSearchText : internalSearchText
  const setSearchText = onSearchTextChange || setInternalSearchText

  // controlled vs uncontrolled 패턴
  const isControlled = selectedItemId !== undefined
  const currentSelectedItemId = isControlled ? selectedItemId : internalSelectedItemId

  const itemsWithTypeAndDepth = addTypeAndDepthToHierarchy(data.items, 0, withoutAccordion)

  const isFlat = isFlatStructure(itemsWithTypeAndDepth)

  const [maxDepth, setMaxDepth] = useState<number | null>(0)
  const [selectedItem, setSelectedItem] = useState<LNBContentItem | null>(null)
  const onlyTree = withoutAccordion

  // 선택 상태 변경 핸들러
  const handleSelectionChange = (item: LNBContentItem) => {
    if (!isControlled) {
      setInternalSelectedItemId(item.id)
    }
    setSelectedItem(item)
    if (onSelectionChange) {
      onSelectionChange(item.id, item)
    }
  }

  // 초기 선택 상태 설정
  useEffect(() => {
    if (!isControlled && defaultSelectedItemId && onSelectionChange) {
      const foundItem = getLnbItemById(itemsWithTypeAndDepth, defaultSelectedItemId) as LNBContentItem | undefined
      if (foundItem && !foundItem.items) {
        // ContentItem인지 확인
        setSelectedItem(foundItem)
        onSelectionChange(defaultSelectedItemId, foundItem)
      }
    }
  }, [defaultSelectedItemId, isControlled, onSelectionChange, itemsWithTypeAndDepth])

  useEffect(() => {
    setMaxDepth(getMaxDepth(itemsWithTypeAndDepth))
  }, [setMaxDepth, itemsWithTypeAndDepth])

  // data가 변경될 때 애니메이션을 일시적으로 비활성화
  useEffect(() => {
    if (dataRef.current !== data) {
      dataRef.current = data
      setDisableAnimation(true)

      const timer = setTimeout(() => {
        setDisableAnimation(false)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [data])

  const handleMouseDown = (e: { clientX: number }) => {
    resizing.current = true
    setIsDragging(true)
    startX.current = e.clientX
    startWidth.current = width
    document.body.style.cursor = "ew-resize"
    document.body.style.userSelect = "none"
  }

  const defaultExpandedValues = useMemo(() => {
    return findSelectedItemPaths(itemsWithTypeAndDepth, currentSelectedItemId)
  }, [itemsWithTypeAndDepth, currentSelectedItemId])

  // 1. 초기값은 한 번만 사용
  const [openPath, setOpenPath] = useState<string[]>(() => [...defaultExpandedValues, ...(defaultOpenPath || [])])

  // 2. defaultOpenPath가 바뀔 때만 openPath를 갱신
  useEffect(() => {
    if (defaultOpenPath) {
      setOpenPath((prev) => {
        const merged = [...new Set([...prev, ...defaultOpenPath])]
        return merged
      })
    }
  }, [defaultOpenPath])

  // 검색 전 openPath를 저장할 state
  const [prevSearchOpenPath, setPrevSearchOpenPath] = useState<string[] | null>(null)
  const [prevSearchText, setPrevSearchText] = useState<string>("")

  // 검색어가 변경될 때 매치된 항목들의 부모를 자동으로 확장
  useEffect(() => {
    const isSearchActivated = !prevSearchText.trim() && searchText.trim()
    const isSearchDeactivated = prevSearchText.trim() && !searchText.trim()

    if (isSearchActivated) {
      // 검색어가 활성화되면 이전 openPath를 저장
      setPrevSearchOpenPath((prev) => {
        return !prev ? openPath : prev
      })
      const searchMatchPaths = findSearchMatchParentPaths(itemsWithTypeAndDepth, searchText, currentSelectedItemId)
      setOpenPath((prev) => {
        const combinedPaths = [...new Set([...prev, ...defaultExpandedValues, ...searchMatchPaths])]
        if (isArrayShallowEqual(combinedPaths, prev)) {
          return prev
        }
        return combinedPaths
      })
    }

    // 검색이 비활성화되면 이전 상태로 되돌리기
    if (isSearchDeactivated && prevSearchOpenPath) {
      setOpenPath((prev) => {
        if (isArrayShallowEqual(prevSearchOpenPath, prev)) {
          return prev
        }
        return prevSearchOpenPath
      })
      // 검색어가 비활성화되면 prevSearchOpenPath를 초기화
      setPrevSearchOpenPath(null)
    }
    setPrevSearchText(searchText)
  }, [
    prevSearchOpenPath,
    openPath,
    prevSearchText,
    searchText,
    defaultExpandedValues,
    itemsWithTypeAndDepth,
    currentSelectedItemId,
  ])

  // 선택이 변경될 때 openPath에 부모 경로를 추가
  useEffect(() => {
    if (currentSelectedItemId) {
      const selectedPaths = findSelectedItemPaths(itemsWithTypeAndDepth, currentSelectedItemId)
      setOpenPath((prev) => {
        return [...new Set([...prev, ...selectedPaths])]
      })
    }
  }, [currentSelectedItemId, itemsWithTypeAndDepth, searchText])

  const handleMouseMove = (e: { preventDefault: () => void; clientX: number }) => {
    if (resizing.current) {
      e.preventDefault()
      const delta = e.clientX - startX.current
      const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth.current + delta))
      setWidth(newWidth)
    }
  }

  const handleMouseUp = () => {
    resizing.current = false
    setIsDragging(false)
    document.body.style.cursor = "default"
    document.body.style.userSelect = ""
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  })
  const [lnbHide, setLnbHide] = useState(hidden)
  useEffect(() => {
    setLnbHide(hidden)
  }, [hidden])

  const temp = () => {
    setLnbHide(!lnbHide)
  }

  const hasTitle = title || data.title

  if (!lnbHide)
    return (
      <TreeContext.Provider
        value={{
          maxDepth,
          setMaxDepth,
          selectedItem,
          setSelectedItem,
          selectedItemId: currentSelectedItemId,
          handleSelectionChange,
          openPath,
          setOpenPath,
          onlyTree,
          disableAnimation,
          searchText,
          setSearchText,
        }}
      >
        <div className={cn("lnb-root", className)} data-disable-animation={disableAnimation}>
          <div className="lnb-sidebar" style={{ width }} {...props}>
            {/* Header - 아이콘 또는 제목이 있을 때만 사용 */}
            {hasTitle && (
              <div className="lnb-header">
                <div className="lnb-header-bar">
                  <div role="lnb-title" className="lnb-title">
                    {data.icon && (
                      <div className="pr-[10px]">
                        <div className="p-[1px]">{data.icon}</div>
                      </div>
                    )}
                    {title || data.title}
                  </div>
                  <div onClick={temp} className="lnb-toggle">
                    <LnbTriangleLeftIcon className="lnb-toggle-icon" />
                  </div>
                </div>
                <div className="lnb-header-divider" />
              </div>
            )}
            <ScrollArea className={cn("lnb-scroll", hasTitle && "with-title", isDragging && "pointer-events-none")}>
              {/* {itemsWithTypeAndDepth[0] && itemsWithTypeAndDepth[0].type == "accordion" && (
                <Accordion type="multiple">
                  <AccordionItem data={itemsWithTypeAndDepth as LNBAccordionItem[]} />
                </Accordion>
              )}
              {itemsWithTypeAndDepth[0] && itemsWithTypeAndDepth[0].type == "tree" && (
                <Tree type="multiple">
                  <TreeItem data={itemsWithTypeAndDepth as LNBTreeItem[]} />
                </Tree>
              )}
              {itemsWithTypeAndDepth[0] && itemsWithTypeAndDepth[0].type == "item" && (
                <ItemContent data={itemsWithTypeAndDepth as LNBContentItem[]} />
              )} */}
              {isFlat && <div className={cn("h-[4px]")} />}

              {itemsWithTypeAndDepth.map((item, index) => {
                if (item.type === "accordion") {
                  return (
                    <Accordion key={index} type="multiple" className="lnb-accordion">
                      <AccordionItem data={[item] as LNBAccordionItem[]} />
                    </Accordion>
                  )
                }

                if (item.type === "tree") {
                  return (
                    <Tree key={index} type="multiple">
                      <TreeItem data={[item] as LNBTreeItem[]} />
                    </Tree>
                  )
                }

                if (item.type === "item") {
                  return <ItemContent key={index} item={item as LNBContentItem} />
                }

                return null // 알 수 없는 type일 경우
              })}
              {isFlat && <div className={cn("mt-[4px] h-[1px] bg-[var(--color-border-btn-2ndary-border-default)]")} />}
            </ScrollArea>
          </div>
          {/* Resizing Border */}
          <div onMouseDown={handleMouseDown} className="lnb-resizer">
            {/* 실제 핸들: 1px만 차지, 중앙에 위치 */}
            <div onMouseDown={handleMouseDown} className="lnb-resizer-line" />
            {/* 클릭 허용 영역: 투명, 실제로는 6px */}
            <div className="lnb-resizer-hitarea" onMouseDown={handleMouseDown} aria-label="Resize handle" />
          </div>
        </div>
      </TreeContext.Provider>
    )
  else {
    return (
      <div className="lnb-collapsed">
        <div onClick={temp} className="lnb-collapsed-button">
          <LnbTriangleRightIcon className="lnb-collapsed-icon" />
        </div>
        <div className="lnb-collapsed-track">
          <div className="lnb-collapsed-background" />
          <div className="lnb-collapsed-border" />
        </div>
      </div>
    )
  }
}

function Accordion({ children }: React.ComponentProps<typeof LnbPrimitive.Root>) {
  const { openPath, setOpenPath } = useTreeContext()

  return (
    <LnbPrimitive.Root
      type="multiple"
      value={openPath}
      onValueChange={setOpenPath}
      data-slot="accordion"
      className="text-neutral-2nd"
    >
      {children}
    </LnbPrimitive.Root>
  )
}

Lnb.displayName = "Lnb"

function AccordionItem({ data }: { data: LNBAccordionItem[] }) {
  const { searchText } = useTreeContext()

  return data.map((item, index) => (
    <LnbPrimitive.Item
      key={index}
      data-slot="accordion-item"
      className="lnb-accordion-item"
      value={item.disabled ? "disabled_content" : item.id}
    >
      <LnbPrimitive.Header className="lnb-accordion-title">
        <LnbPrimitive.Trigger
          data-slot="accordion-trigger"
          className={cn("lnb-accordion-trigger", item.disabled && "is-disabled")}
        >
          <span className="truncate">
            <HighlightedText text={item.content} searchText={searchText} />
          </span>

          <LnbChevronUpIcon className={cn("pointer-events-none [&_svg]:stroke-[var(--color-icon-default-1st)]")} />
        </LnbPrimitive.Trigger>
      </LnbPrimitive.Header>
      <div className="lnb-divider" />

      <LnbPrimitive.Content className="lnb-accordion-content" key={index} data-slot="accordion-content">
        {item.items?.map((subItem, index) => {
          if (subItem.type === "tree") {
            return (
              <Tree key={index} type="multiple">
                <TreeItem data={[subItem] as LNBTreeItem[]} />
              </Tree>
            )
          }
          return <ItemContent key={index} item={subItem as LNBContentItem} />
        })}
        {item.items?.length !== 0 && <div className="lnb-divider" />}
      </LnbPrimitive.Content>
    </LnbPrimitive.Item>
  ))
}

function Tree({ children }: React.ComponentProps<typeof LnbPrimitive.Root>) {
  const { openPath, setOpenPath } = useTreeContext()

  return (
    <LnbPrimitive.Root
      type="multiple"
      value={openPath}
      onValueChange={setOpenPath}
      data-slot="accordion"
      className="lnb-tree"
    >
      {children}
    </LnbPrimitive.Root>
  )
}
function TreeItem({ data }: { data: LNBTreeItem[] }) {
  const { onlyTree, searchText } = useTreeContext()

  return data.map((item, index) => (
    <LnbPrimitive.Item
      key={index}
      data-slot="accordion-item"
      className="lnb-tree-item"
      value={item.disabled ? "disabled_content" : item.id}
    >
      <LnbPrimitive.Header>
        {/* 1depth tree간 divider */}
        {!onlyTree && item.depth === 1 && item.id.match(/\d+$/)?.[0] != "1" && (
          <div className={cn("mx-[10px] h-[1px] bg-[var(--color-border-btn-2ndary-border-default)]")} />
        )}

        <LnbPrimitive.Trigger
          data-slot="accordion-trigger"
          style={{
            // paddingLeft: `${item.depth === 0 ? 8 : 8 + (onlyTree ? 16 : 0) + ((item.depth ? item.depth : 1) - 1) * 16}px`,
            paddingLeft: `${item.depth ? item.depth * 16 + 8 - (onlyTree ? 0 : 16) : 8}px`,
          }}
          className={cn(
            "lnb-tree-trigger",
            ((!onlyTree && item.depth === 1) || (onlyTree && item.depth === 0)) && "lnb-tree-trigger-root",
            // (item.depth && item.depth > 1) || (onlyTree && item.depth && item.depth > 0 && "lnb-tree-trigger-nested"),
            ((item.depth && item.depth > 1) || (onlyTree && item.depth && item.depth > 0)) && "lnb-tree-trigger-nested",

            item.disabled && "lnb-tree-trigger-disabled",
            // 열렸을 때 Trigger - Content간 간격 줄이기 -> 내용 있을 때만
            // item.depth === 0 && item.items && item.items.length > 0 && "data-[state=open]:mb-[-4px]"
            ((!onlyTree && item.depth === 1) || (onlyTree && item.depth === 0)) &&
              item.items &&
              item.items.length > 0 &&
              "data-[state=open]:mb-[-4px]"
          )}
        >
          <LnbChevronUpIcon className="lnb-tree-icon" />
          <span className="truncate">
            <HighlightedText text={item.content} searchText={searchText} />
          </span>
        </LnbPrimitive.Trigger>
      </LnbPrimitive.Header>
      {item.items && item.items.length !== 0 && (
        <LnbPrimitive.Content
          className={cn(
            "lnb-accordion-content",
            // onlyTree -> 0depth일 때 upper spacing
            // TODO: Accordion 있을 때 상황 고려
            ((!onlyTree && item.depth === 1) || (onlyTree && item.depth === 0)) && "data-[state=open]:mb-[4px]"
          )}
          key={index}
          data-slot="accordion-content"
        >
          {item.items?.map((subItem, index) => {
            if (subItem.type === "tree") {
              return (
                <Tree key={index} type="multiple">
                  <TreeItem data={[subItem] as LNBTreeItem[]} />
                </Tree>
              )
            }
            return <ItemContent key={index} item={subItem as LNBContentItem} />
          })}
        </LnbPrimitive.Content>
      )}
      {/* Tree만 사용할 때 최상위 트리의 구분선 */}
      {onlyTree && item.depth === 0 && (
        <div className={cn("h-[1px] bg-[var(--color-border-btn-2ndary-border-default)]")} />
      )}
    </LnbPrimitive.Item>
  ))
}
function ItemContent({ item, className, ...props }: React.ComponentPropsWithoutRef<"div"> & { item: LNBContentItem }) {
  const { maxDepth, selectedItem, setSelectedItem, selectedItemId, handleSelectionChange, onlyTree, searchText } =
    useTreeContext()

  // selectedItemId가 변경될 때 selectedItem 업데이트
  useEffect(() => {
    // if (selectedItemId) {
    //   const foundItem = data.find((item) => item.id === selectedItemId)
    //   if (foundItem && (!selectedItem || selectedItem.id !== foundItem.id)) {
    //     setSelectedItem(foundItem)
    //   }
    // }
    if (selectedItemId) {
      if (item == selectedItem && (!selectedItem || selectedItem.id !== item.id)) {
        setSelectedItem(item)
      }
    }
  }, [selectedItemId, item, selectedItem, setSelectedItem])

  return (
    <button
      onClick={() => handleSelectionChange(item)}
      tabIndex={0}
      style={
        {
          // paddingLeft: `${item.depth === 0 ? 8 : 8 + (onlyTree ? 16 : 0) + ((item.depth ? Math.max(item.depth, 2) : 1) - 1) * 16 - (item.type == "item" ? 16 : 0)}px`,
          // paddingLeft: `${item.depth ? item.depth * 16 + 8 - (onlyTree ? 0 : 16) + 1 : 8 + 1}px`,
          // marginTop: `${item.id.match(/\d+$/)?.[0] == "1" ? 4 : 0}px`,
        }
      }
      className={cn(
        "lnb-item",
        (selectedItem?.id == item.id || selectedItemId === item.id) && "lnb-item-selected",
        item.disabled && "lnb-item-disabled",
        className
      )}
    >
      {!item.disabled && (selectedItem?.id == item.id || selectedItemId === item.id) && (
        <div className="lnb-item-active-indicator" />
      )}{" "}
      {/* 불릿 표시 규칙: 최대 깊이가 3단계를 초과하는 경우에만 불릿 표시
          3단계 이하에서는 손자 메뉴(3단계 항목)에 불릿을 표시하지 않음 */}
      {item.depth && item.depth != 0 ? (
        (!onlyTree && maxDepth && maxDepth > 3) || (onlyTree && maxDepth && maxDepth > 2) ? (
          <div
            className="lnb-item-bullet"
            style={{ marginLeft: `${item.depth ? item.depth * 16 + 8 - (onlyTree ? 0 : 16) : 8}px` }}
          >
            <LnbBulletIcon className="lnb-item-bullet-icon" />
          </div>
        ) : !onlyTree && item.depth == 1 ? (
          // Accordion 바로 밑에 item이 붙는 경우
          <div className={"flex h-full w-[12px] flex-shrink-0"} />
        ) : (
          // Tree 밑에 item이 붙는 경우
          <div style={{ width: `${9 + 16 * (item.depth - 1)}px` }} className={"flex h-full flex-shrink-0"} />
        )
      ) : (
        // 평면 구조인 경우
        <div className={"flex h-full w-[12px] flex-shrink-0"} />
      )}
      <span className={cn("lnb-item-label", className)} {...props}>
        <HighlightedText text={item.content} searchText={searchText} />
      </span>
    </button>
  )
}

// 검색 필터링 함수
const filterMenuItems = (
  items: LNBAccordionItem[],
  searchTerm: string,
  selectedItemId?: string
): LNBAccordionItem[] => {
  if (!searchTerm.trim()) {
    return items
  }

  const filtered: LNBAccordionItem[] = []

  for (const item of items) {
    // 현재 항목이 검색어에 매치되는지 확인
    const contentMatches = item.content.toLowerCase().includes(searchTerm.toLowerCase())

    // 선택된 항목인지 확인
    const isSelected = selectedItemId && item.id === selectedItemId

    // 하위 항목들을 재귀적으로 필터링
    const filteredSubItems =
      item.items && item.items.length > 0
        ? filterMenuItems(item.items as LNBAccordionItem[], searchTerm, selectedItemId)
        : []

    // 현재 항목이 매치되거나 선택된 항목이거나 하위 항목 중에 매치되는 것이 있으면 포함
    if (contentMatches || isSelected || filteredSubItems.length > 0) {
      filtered.push({
        ...item,
        ...(filteredSubItems.length > 0 ? { items: filteredSubItems } : { items: item.items }),
      } as LNBAccordionItem)
    }
  }

  return filtered
}

export { Lnb, filterMenuItems }
