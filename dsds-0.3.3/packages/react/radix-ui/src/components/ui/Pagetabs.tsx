"use client"

import * as React from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

import { cn } from "@/lib/utils"
import { DropdownMenuContent } from "@/components/ui/DropdownMenu"
import { MessageModal, ModalClose } from "@/components/ui/Modal"

import { ChevronLeftIcon, ChevronRightIcon } from "../icons/ChevronIcons"
import { CloseIconGhost } from "../icons/CloseIcon"
import { LnbMoreIcon } from "../icons/LnbIcon"

type TabItem = { id: string; name: string }

export interface PageTabsProps {
  tabs: TabItem[]
  activeId?: string
  onSelect?: (id: string) => void
  onClose?: (id: string) => void
  showExtraButton?: boolean
  size?: "compact" | "cozy"
}

/**
 * PageTabs는 페이지 하단에 위치하는 탭 기반 컴포넌트입니다.
 *
 * 상단 UI 버튼으로 탭 추가 및 삭제, 추가 버튼 표시가 가능하고, 열린 탭 목록을 통해 조작 가능한 탭과 현재 활성화된 탭을 확인할 수 있습니다.
 *
 * - 상단 `추가 버튼 보기` 클릭을 통해 컨트롤 영역에 커스텀 버튼을 추가할 수 있습니다.
 * - 우측 하단 컨트롤 영역의 `<`, `>` 버튼 혹은 키보드 좌우 방향키 입력으로 탭 간 이동이 가능합니다.
 * - 우측 하단 컨트롤 영역의 `X` 버튼 클릭 시, 모든 탭을 지울 수 있습니다.
 **/

export function PageTabs({
  tabs,
  activeId,
  onSelect,
  onClose,
  showExtraButton = false,
  size = "compact",
}: PageTabsProps) {
  const [internalActiveId, setInternalActiveId] = React.useState<string | undefined>(activeId ?? tabs[0]?.id)
  const [menuOpen, setMenuOpen] = React.useState(false)

  const [focusIndex, setFocusIndex] = React.useState<number | null>(null)
  const [isKeyboardFocus, setIsKeyboardFocus] = React.useState(false)

  const tabRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const setTabRef = React.useCallback(
    (idx: number) =>
      (el: HTMLDivElement | null): void => {
        tabRefs.current[idx] = el
      },
    []
  )

  React.useEffect(() => {
    if (activeId !== undefined) setInternalActiveId(activeId)
  }, [activeId])

  React.useEffect(() => {
    if (focusIndex !== null && focusIndex >= tabs.length) setFocusIndex(null)
  }, [tabs, focusIndex])

  const currentActiveId = activeId ?? internalActiveId
  const currentIdx = tabs.findIndex((t) => t.id === currentActiveId)
  const isFirst = currentIdx === 0
  const isLast = currentIdx === tabs.length - 1
  const noActive = !currentActiveId || tabs.length === 0

  const handleSelect = React.useCallback(
    (id: string) => {
      setInternalActiveId(id)
      onSelect?.(id)
    },
    [onSelect]
  )

  const handleClose = React.useCallback(
    (id: string) => {
      if (id === currentActiveId) {
        const idx = tabs.findIndex((t) => t.id === id)
        const newActiveId = idx > 0 ? tabs[idx - 1]?.id : tabs[idx + 1]?.id
        setInternalActiveId(newActiveId)
      }
      onClose?.(id)
    },
    [currentActiveId, onClose, tabs]
  )

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (tabs.length === 0) return

      if (e.key === "ArrowLeft") {
        e.preventDefault()
        if (currentIdx > 0) handleSelect(tabs[currentIdx - 1].id)
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        if (currentIdx < tabs.length - 1) handleSelect(tabs[currentIdx + 1].id)
      } else if (e.key === "Tab") {
        e.preventDefault()
        setIsKeyboardFocus(true)
        setFocusIndex((prev) => {
          const next = e.shiftKey
            ? prev === null
              ? tabs.length - 1
              : (prev - 1 + tabs.length) % tabs.length
            : prev === null
              ? 0
              : (prev + 1) % tabs.length
          tabRefs.current[next]?.focus()
          return next
        })
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [tabs, currentIdx, handleSelect])

  const onAnyMouse = React.useCallback(() => {
    if (isKeyboardFocus) setIsKeyboardFocus(false)
  }, [isKeyboardFocus])

  const handleClickTab = React.useCallback(
    (id: string, idx: number) => {
      handleSelect(id)
      if (focusIndex !== null) setFocusIndex(null)
      setIsKeyboardFocus(false)
      tabRefs.current[idx]?.blur()
    },
    [focusIndex, handleSelect]
  )

  React.useEffect(() => {
    const activeTab = document.querySelector(".page-tab-item-active") as HTMLElement | null
    const list = document.querySelector(".page-tab-list") as HTMLElement | null
    if (activeTab && list) {
      const tabRect = activeTab.getBoundingClientRect()
      const listRect = list.getBoundingClientRect()
      if (tabRect.right > listRect.right) list.scrollLeft += tabRect.right - listRect.right + 8
      else if (tabRect.left < listRect.left) list.scrollLeft -= listRect.left - tabRect.left + 8
    }
  }, [currentActiveId, tabs])

  return (
    <div className="page-tabs" data-size={size} onMouseDown={onAnyMouse}>
      <div className="page-tab-list">
        {tabs.map((tab, idx) => {
          const isActive = tab.id === currentActiveId
          const isFocused = focusIndex === idx
          const isFirstTab = idx === 0

          return (
            <div
              key={tab.id}
              ref={setTabRef(idx)}
              tabIndex={0}
              onClick={() => handleClickTab(tab.id, idx)}
              onFocus={() => {
                if (isKeyboardFocus) setFocusIndex(idx)
              }}
              onBlur={() => setFocusIndex(null)}
              className={cn(
                "page-tab-item group outline-none",
                isActive ? "page-tab-item-active" : "page-tab-item-inactive",
                !isFirstTab && "page-tab-item-merged",
                isFirstTab && "is-first",
                isFocused && isKeyboardFocus && "page-tab-focused"
              )}
            >
              <span className="page-tab-text">{tab.name}</span>

              <div className="close-wrapper">
                <CloseIconGhost
                  size={10}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClose(tab.id)
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="page-tab-controls">
        <button
          className={cn("page-tab-control-btn", (isFirst || noActive) && "control-disabled")}
          aria-label="control-prev"
          disabled={isFirst || noActive}
          onClick={() => !isFirst && !noActive && handleSelect(tabs[currentIdx - 1].id)}
        >
          <div className="control-wrapper">
            <ChevronLeftIcon size={14} />
          </div>
        </button>

        <button
          className={cn("page-tab-control-btn", isLast && "control-disabled")}
          aria-label="control-next"
          disabled={isLast || noActive}
          onClick={() => !isLast && !noActive && handleSelect(tabs[currentIdx + 1].id)}
        >
          <div className="control-wrapper">
            <ChevronRightIcon size={14} />
          </div>
        </button>

        <DropdownMenu.Root modal={false} open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenu.Trigger asChild>
            <button className="page-tab-control-btn" aria-label="control-more">
              <div className="control-wrapper">
                <span className="more-icon-wrapper">
                  <LnbMoreIcon />
                </span>
              </div>
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenuContent side="top" sideOffset={4} align="end" className="page-tab-dropdown">
            {tabs.map((t) => (
              <div
                key={t.id}
                className={cn("more-item", t.id === currentActiveId && "more-item-active")}
                onClick={() => {
                  handleSelect(t.id)
                  setMenuOpen(false)
                }}
              >
                {t.name}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu.Root>

        <MessageModal
          message={`모든 탭을 닫으시겠습니까?\n\n[확인] 버튼을 누르면 모든 탭이 닫힙니다.`}
          trigger={
            <button className="page-tab-control-btn" aria-label="control-close-all">
              <div className="control-wrapper">
                <CloseIconGhost size={10} />
              </div>
            </button>
          }
          footer={
            <div className="w-full border-t border-[var(--colors-neutral-neutral-07)]">
              <div className="modal-footer">
                <ModalClose asChild>
                  <button className="modal-cancel">취소</button>
                </ModalClose>
                <ModalClose asChild>
                  <button className="modal-confirm" onClick={() => tabs.forEach((t) => onClose?.(t.id))}>
                    확인
                  </button>
                </ModalClose>
              </div>
            </div>
          }
        />

        {showExtraButton && (
          <button className="page-tab-control-btn" aria-label="extra-button">
            <div className="control-wrapper" />
          </button>
        )}
      </div>
    </div>
  )
}
