import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"
import { BadgeNewIcon } from "@/components/icons"

/**
 * Badge 컴포넌트의 Props 인터페이스
 */
interface BadgeProps extends React.ComponentProps<"span"> {
  /** 배지 종류 */
  kind: "notification" | "count" | "text"
  /** 텍스트 배지의 색상 (kind가 'text'일 때만 적용) */
  color?: string
  /** Slot 컴포넌트로 렌더링할지 여부 */
  asChild?: boolean
}

/**
 * Badge 컴포넌트는 알림, 개수 표시, 텍스트 라벨링 등 다양한 목적으로 사용할 수 있는
 * 유연한 배지 컴포넌트입니다. `kind` prop을 통해 다음과 같은 유형을 지원합니다:
 *
 * - `notification`: 새로운 알림이나 업데이트를 표시하는 배지 (아이콘 포함)
 * - `count`: 숫자나 텍스트를 표시하는 원형 배지 (알림 개수 등에 사용)
 *   -  99보다 클 경우 "99+"로 표시됩니다.
 * - `text`: 텍스트 라벨을 표시하는 직사각형 배지 (상태 표시 등에 사용)
 *
 * @example
 * ```tsx
 * // 알림 배지
 * <Badge kind="notification" />
 *
 * // 개수 표시 배지
 * <Badge kind="count">5</Badge>
 * <Badge kind="count">99</Badge>
 * // 99보다 클 경우 `99+` 로 표시됨
 * <Badge kind="count">300</Badge>
 *
 * // 텍스트 배지
 * <Badge kind="text">Label</Badge>
 * <Badge kind="text" color="blue">Status</Badge>
 * ```
 */
function Badge({ kind, color, className, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "span"

  if (kind === "notification") {
    return (
      <Comp data-slot="badge" className={cn("dsds-badge dsds-badge-notification", className)} {...props}>
        <BadgeNewIcon />
      </Comp>
    )
  }

  if (kind === "count") {
    // children이 숫자로 변환 가능한지 확인
    const childrenStr = React.Children.toArray(props.children).join("")
    const numValue = parseInt(childrenStr)

    if (isNaN(numValue)) {
      throw new Error(`Badge kind="count" requires integer numeric children, but received: "${childrenStr}"`)
    }

    // 99보다 클 때는 99+로 표시
    const displayValue = numValue >= 99 ? "99+" : childrenStr
    const digitClass = displayValue.length === 1 ? "dsds-badge-count-single-digit" : "dsds-badge-count-multi-digit"

    return (
      <Comp data-slot="badge" className={cn("dsds-badge dsds-badge-count", digitClass, className)} {...props}>
        {displayValue}
      </Comp>
    )
  }

  if (kind === "text") {
    const colorClass = color === "blue" ? "dsds-badge-text-blue" : ""
    return <Comp data-slot="badge" className={cn("dsds-badge dsds-badge-text", colorClass, className)} {...props} />
  }

  return null
}

/**
 * 새로운 알림을 표시하는 배지 컴포넌트의 Props 인터페이스
 */
interface BadgeNotificationNewProps extends React.ComponentProps<"span"> {
  /** Slot 컴포넌트로 렌더링할지 여부 */
  asChild?: boolean
}

/**
 * 새로운 알림을 표시하는 배지 컴포넌트
 *
 * @example
 * ```tsx
 * <BadgeNotificationNew />
 * ```
 */
export function BadgeNotificationNew({ className, asChild = false, ...props }: BadgeNotificationNewProps) {
  return <Badge asChild={asChild} kind="notification" className={cn("pointer-events-none", className)} {...props} />
}

/**
 * 알림 개수를 표시하는 배지 컴포넌트의 Props 인터페이스
 */
interface BadgeNotificationCountProps extends React.ComponentProps<"span"> {
  /** Slot 컴포넌트로 렌더링할지 여부 */
  asChild?: boolean
}

/**
 * 알림 개수를 표시하는 배지 컴포넌트
 *
 * @param children - 표시할 숫자 또는 텍스트
 * @example
 * ```tsx
 * <BadgeNotificationCount>5</BadgeNotificationCount>
 * <BadgeNotificationCount>99+</BadgeNotificationCount>
 * ```
 */
export function BadgeNotificationCount({ className, asChild = false, ...props }: BadgeNotificationCountProps) {
  return (
    <Badge asChild={asChild} kind="count" className={cn("pointer-events-none", className)} {...props}>
      {props.children}
    </Badge>
  )
}

/**
 * 텍스트를 표시하는 배지 컴포넌트의 Props 인터페이스
 */
interface BadgeTextProps extends React.ComponentProps<"span"> {
  /** 배지 색상 */
  color?: string
  /** Slot 컴포넌트로 렌더링할지 여부 */
  asChild?: boolean
}

/**
 * 텍스트를 표시하는 배지 컴포넌트
 *
 * @param color - 배지 색상 ('default' | 'blue')
 * @param children - 표시할 텍스트
 * @example
 * ```tsx
 * <BadgeText>Label</BadgeText>
 * <BadgeText color="blue">Status</BadgeText>
 * ```
 */
export function BadgeText({ className, asChild = false, color, ...props }: BadgeTextProps) {
  return (
    <Badge asChild={asChild} kind="text" color={color} className={cn("pointer-events-none", className)} {...props}>
      {props.children}
    </Badge>
  )
}

export { Badge }
