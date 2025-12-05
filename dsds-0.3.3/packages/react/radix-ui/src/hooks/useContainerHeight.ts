import { useCallback, useEffect, useRef, useState } from "react"

export type UseContainerHeightOptions = {
  /**
   * Offset from bottom (e.g., for header height, margin, padding)
   * @default 0
   */
  bottomOffset?: number
  /**
   * Minimum height in pixels
   * @default 200
   */
  minHeight?: number
  /**
   * Maximum height in pixels or "auto" for container-based calculation
   * @default "auto"
   */
  maxHeight?: number | "auto"
  /**
   * Debounce delay for resize calculations in milliseconds
   * @default 10
   */
  debounceDelay?: number
}

/**
 * Hook for calculating container height based on available space
 * Automatically adjusts on window resize and container changes
 */
export function useContainerHeight(options: UseContainerHeightOptions = {}) {
  const { bottomOffset = 0, minHeight = 200, maxHeight = "auto", debounceDelay = 10 } = options

  const containerRef = useRef<HTMLDivElement>(null)
  const [calculatedHeight, setCalculatedHeight] = useState<string>(`${minHeight}px`)
  const [isCalculating, setIsCalculating] = useState(false)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  // Calculate available height
  const calculateHeight = useCallback(() => {
    if (!containerRef.current) {
      console.log("useContainerHeight: containerRef is null")
      return
    }

    const container = containerRef.current
    console.log("useContainerHeight: calculating height for container", container)

    // First, try to find a parent container with defined height
    let parentWithHeight = container.parentElement
    while (parentWithHeight && parentWithHeight !== document.body) {
      const computedStyle = window.getComputedStyle(parentWithHeight)
      const height = parentWithHeight.getBoundingClientRect().height

      console.log(
        "useContainerHeight: checking parent",
        parentWithHeight,
        "height:",
        height,
        "computedStyle.height:",
        computedStyle.height
      )

      // If parent has a significant height and isn't just auto-sizing to its content
      if (height > 100 && (computedStyle.height !== "auto" || computedStyle.display === "flex")) {
        const parentRect = parentWithHeight.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()

        // Available height is parent's height minus the distance from parent top to container top
        const offsetFromParent = containerRect.top - parentRect.top
        const availableHeight = parentRect.height - offsetFromParent - bottomOffset

        console.log("useContainerHeight: using parent-based calculation", {
          parentHeight: parentRect.height,
          offsetFromParent,
          bottomOffset,
          availableHeight,
        })

        const finalHeight = Math.max(minHeight, availableHeight)
        if (typeof maxHeight === "number") {
          setCalculatedHeight(`${Math.min(finalHeight, maxHeight)}px`)
        } else {
          setCalculatedHeight(`${finalHeight}px`)
        }
        return
      }

      parentWithHeight = parentWithHeight.parentElement
    }

    // Fallback to viewport-based calculation
    const containerRect = container.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const availableHeight = viewportHeight - containerRect.top - bottomOffset

    console.log("useContainerHeight: using viewport-based calculation", {
      viewportHeight,
      containerTop: containerRect.top,
      bottomOffset,
      availableHeight,
    })

    let finalHeight = Math.max(minHeight, availableHeight)
    if (typeof maxHeight === "number") {
      finalHeight = Math.min(finalHeight, maxHeight)
    }

    setCalculatedHeight(`${finalHeight}px`)
  }, [bottomOffset, minHeight, maxHeight])

  // Debounced calculation function
  const debouncedCalculate = useCallback(() => {
    setIsCalculating(true)

    // Clear existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    // Set new timeout
    debounceTimeoutRef.current = setTimeout(() => {
      calculateHeight()
      setIsCalculating(false)
    }, debounceDelay)
  }, [calculateHeight, debounceDelay])

  // Initial calculation and resize listener
  useEffect(() => {
    // Wait for DOM to be ready and then calculate
    const timeoutId = setTimeout(() => {
      calculateHeight()
    }, 0)

    // Window resize listener
    window.addEventListener("resize", debouncedCalculate)

    // ResizeObserver for container changes
    const resizeObserver = new ResizeObserver(() => {
      debouncedCalculate()
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)

      // Also observe parent elements that might affect layout
      let parent = containerRef.current.parentElement
      while (parent && parent !== document.body) {
        resizeObserver.observe(parent)
        parent = parent.parentElement
      }
    }

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener("resize", debouncedCalculate)
      resizeObserver.disconnect()

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
    }
  }, [calculateHeight, debouncedCalculate])

  // Recalculate when dependencies change
  useEffect(() => {
    calculateHeight()
  }, [calculateHeight])

  return {
    /**
     * Ref to attach to the container element
     */
    containerRef,
    /**
     * Calculated height as CSS value (e.g., "400px")
     */
    height: calculatedHeight,
    /**
     * Whether height calculation is in progress
     */
    isCalculating,
    /**
     * Manual recalculation trigger
     */
    recalculate: calculateHeight,
  }
}
