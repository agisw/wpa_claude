"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { usePlatform } from "@/hooks"

import { cn } from "@/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div data-slot="table-container" className="scrollbar-thin relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cn(
          "typo-sok-footnote-11-400 w-full caption-bottom border border-[var(--color-border-border-2-outer)] text-sm",
          className
        )}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead data-slot="table-header" className={cn("bg-[var(--color-bg-surface-secondary)]", className)} {...props} />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={cn(className)} {...props} />
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn("hover:bg-muted/50 data-[state=selected]:bg-muted h-[28px] transition-colors", className)}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground truncate border border-[var(--color-border-border-2-outer)] px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "truncate border border-[var(--color-border-border-2-outer)] px-[4px] py-[2px] align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return (
    <caption data-slot="table-caption" className={cn("text-muted-foreground mt-4 text-sm", className)} {...props} />
  )
}

interface ScrollableTableProps extends React.ComponentProps<"div"> {
  maxHeight?: string | number | "auto"
  children: React.ReactNode
}

function ScrollableTable({ className, maxHeight = "auto", children, ...props }: ScrollableTableProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerContainerRef = useRef<HTMLDivElement>(null)
  const headerTableRef = useRef<HTMLTableElement>(null)
  const bodyTableRef = useRef<HTMLTableElement>(null)
  const bodyContainerRef = useRef<HTMLDivElement>(null)
  const [hasVerticalScrollbar, setHasVerticalScrollbar] = useState(false)
  const [calculatedMaxHeight, setCalculatedMaxHeight] = useState<string>("400px")
  const [headerHeight, setHeaderHeight] = useState<number>(0)
  const { isEdge, isMacOS } = usePlatform()
  const scrollbarWidth = isEdge ? 11 : isMacOS ? 0 : 12

  // Calculate auto max height
  const calculateAutoHeight = useCallback(() => {
    if (maxHeight !== "auto" || !containerRef.current) return

    const container = containerRef.current
    const containerRect = container.getBoundingClientRect()

    // Find the closest flex container parent
    let flexParent = container.parentElement
    while (flexParent && flexParent !== document.body) {
      const computedStyle = window.getComputedStyle(flexParent)
      if (
        computedStyle.display === "flex" &&
        (computedStyle.flexDirection === "column" || computedStyle.flexDirection === "column-reverse")
      ) {
        break
      }
      flexParent = flexParent.parentElement
    }

    let availableHeight: number

    if (flexParent) {
      // Calculate available space within flex container
      const parentRect = flexParent.getBoundingClientRect()
      const parentStyle = window.getComputedStyle(flexParent)

      // Get parent's content height (excluding padding)
      const parentPaddingTop = parseFloat(parentStyle.paddingTop) || 0
      const parentPaddingBottom = parseFloat(parentStyle.paddingBottom) || 0
      const parentContentHeight = parentRect.height - parentPaddingTop - parentPaddingBottom

      // Calculate space taken by siblings
      let siblingsHeight = 0
      Array.from(flexParent.children).forEach((child) => {
        if (child !== container && child instanceof HTMLElement) {
          const childStyle = window.getComputedStyle(child)
          const childRect = child.getBoundingClientRect()

          // Skip flex-1 or flex-grow elements as they should share remaining space
          if (childStyle.flexGrow === "0" || !childStyle.flexGrow) {
            siblingsHeight += childRect.height

            // Add margins
            siblingsHeight += parseFloat(childStyle.marginTop) || 0
            siblingsHeight += parseFloat(childStyle.marginBottom) || 0
          }
        }
      })

      // Available height is parent content height minus siblings height
      availableHeight = parentContentHeight - siblingsHeight // 20px buffer
    } else {
      // Fallback to viewport-based calculation
      const viewportHeight = window.innerHeight
      availableHeight = viewportHeight - containerRect.top - 40 // 40px margin from bottom
    }

    setCalculatedMaxHeight(`${Math.max(200, availableHeight)}px`)
  }, [maxHeight])

  // Calculate header height
  const calculateHeaderHeight = useCallback(() => {
    if (!headerContainerRef.current) {
      setHeaderHeight(0)
      return
    }

    const headerContainer = headerContainerRef.current
    const height = headerContainer.getBoundingClientRect().height
    setHeaderHeight(height)
  }, [])

  // Get effective max height
  const effectiveMaxHeight = useMemo(() => {
    if (maxHeight === "auto") return calculatedMaxHeight
    return typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight
  }, [maxHeight, calculatedMaxHeight])

  // Extract header and body from children
  const headerChild = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === TableHeader
  ) as React.ReactElement<React.ComponentProps<"thead">> | undefined

  const otherChildren = React.Children.toArray(children).filter(
    (child) => !(React.isValidElement(child) && child.type === TableHeader)
  )

  // Add scrollbar placeholder to header rows
  const enhancedHeaderChild = useMemo(() => {
    if (!headerChild) return null

    const headerRows = React.Children.toArray(headerChild.props.children)
    const enhancedRows = headerRows.map((row, rowIndex) => {
      if (!React.isValidElement(row)) return row

      const rowElement = row as React.ReactElement<React.ComponentProps<"tr">>
      const cells = React.Children.toArray(rowElement.props.children)

      // Modify the last real cell to remove right border
      const modifiedCells = cells.map((cell, cellIndex) => {
        if (!React.isValidElement(cell)) return cell

        const cellElement = cell as React.ReactElement<React.ComponentProps<"th">>

        // If this is the last cell, remove right border
        if (cellIndex === cells.length - 1 && hasVerticalScrollbar) {
          return React.cloneElement(cellElement, {
            className: (cellElement.props.className || "") + " border-r-0",
          })
        }
        return cell
      })

      if (hasVerticalScrollbar) {
        const scrollbarPlaceholder = React.createElement(TableHead, {
          key: `scrollbar-placeholder-${rowIndex}`,
          className: cn(
            "scrollbar-placeholder p-0 border-l-0 border-t border-r border-b border-[var(--color-border-border-2-outer)]"
          ),
          style: { width: "0px", minWidth: "0px", maxWidth: "0px" },
        })

        return React.cloneElement(rowElement, {
          key: rowIndex,
          children: [...modifiedCells, scrollbarPlaceholder],
        })
      }

      return rowElement
    })

    return React.cloneElement(headerChild, {
      children: enhancedRows,
    })
  }, [headerChild, hasVerticalScrollbar])

  // Check if vertical scrollbar is present
  const checkScrollbar = useCallback(() => {
    if (!bodyContainerRef.current) return

    const container = bodyContainerRef.current
    const hasScrollbar = container.scrollHeight > container.clientHeight
    setHasVerticalScrollbar(hasScrollbar)
  }, [])

  // Sync column widths between header and body
  const syncColumnWidths = useCallback(() => {
    if (!headerTableRef.current || !bodyTableRef.current) return

    const headerTable = headerTableRef.current
    const bodyTable = bodyTableRef.current

    // Get the first row from body table to measure actual column widths
    const firstBodyRow = bodyTable.querySelector("tbody tr:first-child")
    if (!firstBodyRow) return

    // Get the last row from header table (in case of multiple header rows)
    const headerRows = headerTable.querySelectorAll("thead tr")
    const lastHeaderRow = headerRows[headerRows.length - 1]
    if (!lastHeaderRow) return

    const bodyCells = firstBodyRow.querySelectorAll("td:not(.scrollbar-placeholder)")
    const headerCells = lastHeaderRow.querySelectorAll("th:not(.scrollbar-placeholder)")

    // Apply body cell widths to header cells (excluding scrollbar placeholder)
    bodyCells.forEach((bodyCell, index) => {
      const headerCell = headerCells[index] as HTMLElement
      if (headerCell && bodyCell) {
        const width = bodyCell.getBoundingClientRect().width
        headerCell.style.width = `${width}px`
        headerCell.style.minWidth = `${width}px`
        headerCell.style.maxWidth = `${width}px`
      }
    })

    // Handle scrollbar placeholder width
    const headerScrollbarPlaceholder = headerTable.querySelector(".scrollbar-placeholder") as HTMLElement
    if (headerScrollbarPlaceholder) {
      const physicalScrollbarWidth = hasVerticalScrollbar ? scrollbarWidth / (window.devicePixelRatio || 1) : 0
      const width = hasVerticalScrollbar ? `${physicalScrollbarWidth}px` : "0px"
      headerScrollbarPlaceholder.style.width = width
      headerScrollbarPlaceholder.style.minWidth = width
      headerScrollbarPlaceholder.style.maxWidth = width
    }
  }, [hasVerticalScrollbar])

  // Use ResizeObserver to handle dynamic content changes
  useEffect(() => {
    if (!bodyTableRef.current || !bodyContainerRef.current) return

    let resizeTimeoutId: NodeJS.Timeout | null = null
    let isProcessing = false

    const debouncedResize = () => {
      // Clear previous timeout
      if (resizeTimeoutId) {
        clearTimeout(resizeTimeoutId)
      }

      // Skip if already processing
      if (isProcessing) return

      resizeTimeoutId = setTimeout(() => {
        isProcessing = true

        try {
          calculateAutoHeight()
          calculateHeaderHeight()
          checkScrollbar()
          syncColumnWidths()
        } finally {
          // Reset processing flag after a brief delay to prevent rapid successive calls
          setTimeout(() => {
            isProcessing = false
          }, 50)
        }
      }, 100) // 100ms debounce delay
    }

    const resizeObserver = new ResizeObserver(debouncedResize)

    resizeObserver.observe(bodyTableRef.current)
    resizeObserver.observe(bodyContainerRef.current)

    // Also observe header container if it exists
    if (headerContainerRef.current) {
      resizeObserver.observe(headerContainerRef.current)
    }

    // Initial check and sync (immediate, no debounce)
    setTimeout(() => {
      calculateAutoHeight()
      calculateHeaderHeight()
      checkScrollbar()
      syncColumnWidths()
    }, 0)

    return () => {
      if (resizeTimeoutId) {
        clearTimeout(resizeTimeoutId)
      }
      resizeObserver.disconnect()
    }
  }, [syncColumnWidths, checkScrollbar, calculateAutoHeight, calculateHeaderHeight])

  // Handle window resize for auto height calculation
  useEffect(() => {
    if (maxHeight !== "auto") return

    let windowResizeTimeoutId: NodeJS.Timeout | null = null

    const debouncedWindowResize = () => {
      if (windowResizeTimeoutId) {
        clearTimeout(windowResizeTimeoutId)
      }

      windowResizeTimeoutId = setTimeout(() => {
        calculateAutoHeight()
      }, 250) // Longer debounce for window resize as it's typically less frequent
    }

    window.addEventListener("resize", debouncedWindowResize)
    window.addEventListener("scroll", debouncedWindowResize)

    return () => {
      if (windowResizeTimeoutId) {
        clearTimeout(windowResizeTimeoutId)
      }
      window.removeEventListener("resize", debouncedWindowResize)
      window.removeEventListener("scroll", debouncedWindowResize)
    }
  }, [calculateAutoHeight, maxHeight])

  return (
    <div
      ref={containerRef}
      data-slot="scrollable-table-container"
      className={cn("relative w-full", className)}
      style={{ maxHeight: effectiveMaxHeight }}
      {...props}
    >
      {/* Fixed Header */}
      {enhancedHeaderChild && (
        // TODO: 경우에 따라 Table이 오른쪽 경계를 벗어날 수 있음
        <div ref={headerContainerRef}>
          <table ref={headerTableRef} className="typo-sok-footnote-11-400 caption-bottom text-sm">
            {React.cloneElement(enhancedHeaderChild, {
              className: cn("border-0", enhancedHeaderChild.props.className),
            })}
          </table>
        </div>
      )}

      {/* Scrollable Body */}
      <div
        ref={bodyContainerRef}
        className={cn(
          "scrollbar-thin overflow-y-auto border-r border-b border-[var(--color-border-border-2-outer)]",
          !hasVerticalScrollbar && "border-r-0",
          headerChild && "header-child"
        )}
        style={{
          maxHeight: headerChild ? `calc(${effectiveMaxHeight} - ${headerHeight}px)` : effectiveMaxHeight,
        }}
      >
        <table
          ref={bodyTableRef}
          className="typo-sok-footnote-11-400 w-full caption-bottom text-sm [&>tbody>tr:first-child>td]:border-t-0! [&>tbody>tr:last-child>td]:border-b-0!"
        >
          {otherChildren}
        </table>
      </div>
    </div>
  )
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption, ScrollableTable }
