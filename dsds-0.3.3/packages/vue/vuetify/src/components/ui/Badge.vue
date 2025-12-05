<template>
  <!-- Notification Badge -->
  <span v-if="kind === 'notification'"
        class="dsds-badge dsds-badge-notification">
    <div>
      <svg xmlns="http://www.w3.org/2000/svg"
           width="6"
           height="6"
           viewBox="0 0 6 6"
           fill="none">
        <rect width="1"
              height="6"
              fill="white" />
        <rect x="5"
              width="1"
              height="6"
              fill="white" />
        <rect x="1"
              y="1"
              width="1"
              height="1"
              fill="white" />
        <rect x="2"
              y="2"
              width="1"
              height="1"
              fill="white" />
        <rect x="3"
              y="3"
              width="1"
              height="1"
              fill="white" />
        <rect x="4"
              y="4"
              width="1"
              height="1"
              fill="white" />
      </svg>
    </div>
  </span>

  <!-- Count Badge -->
  <span v-else-if="kind === 'count'"
        class="dsds-badge dsds-badge-count"
        :class="countDisplayValue.length === 1 ? 'dsds-badge-count-single-digit' : 'dsds-badge-count-multi-digit'">
    {{ countDisplayValue }}
  </span>

  <!-- Text Badge -->
  <span v-else-if="kind === 'text'"
        class="dsds-badge dsds-badge-text"
        :class="props.color === 'blue' ? 'dsds-badge-text-blue' : undefined">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue"

/**
 * Badge 컴포넌트의 Props 인터페이스
 */
interface BadgeProps {
  /** 배지 종류 */
  kind: "notification" | "count" | "text"
  /** 텍스트 배지의 색상 (kind가 'text'일 때만 적용) */
  color?: string
}

/**
 * Badge 컴포넌트는 알림, 개수 표시, 텍스트 라벨링 등 다양한 목적으로 사용할 수 있는
 * 유연한 배지 컴포넌트입니다. \`kind\` prop을 통해 다음과 같은 유형을 지원합니다:
 *
 * - \`notification\`: 새로운 알림이나 업데이트를 표시하는 배지 (아이콘 포함)
 * - \`count\`: 숫자나 텍스트를 표시하는 원형 배지 (알림 개수 등에 사용)
 * - \`text\`: 텍스트 라벨을 표시하는 직사각형 배지 (상태 표시 등에 사용)
 *
 * @example
 * ```html
 * <!-- 알림 배지 -->
 * <Badge kind="notification" />
 *
 * <!-- 개수 표시 배지 -->
 * <Badge kind="count">5</Badge>
 * <Badge kind="count">99</Badge>
 * <!-- 99보다 클 경우 `99+` 로 표시됨  -->
 * <Badge kind="count">300</Badge>
 *
 * <!-- 텍스트 배지 -->
 * <Badge kind="text">Label</Badge>
 * <Badge kind="text" color="blue">Status</Badge>
 * ```
 */
const props = withDefaults(defineProps<BadgeProps>(), {
  color: "default",
})

const slots = useSlots()

// count 배지의 표시 값 계산
const countDisplayValue = computed(() => {
  if (props.kind !== "count") return ""

  const defaultSlot = slots.default?.(undefined)
  const slotText = defaultSlot
    ? defaultSlot
      .map((node) => {
        if (typeof node.children === "string") return node.children
        if (node.children && typeof node.children === "object") {
          return node.children.toString()
        }
        return ""
      })
      .join("")
    : ""

  const numValue = parseInt(slotText)
  if (isNaN(numValue)) {
    throw new Error(`Badge kind="count" requires integer numeric children, but received: "${slotText}"`)
  }

  return numValue >= 99 ? "99+" : slotText
})
</script>
