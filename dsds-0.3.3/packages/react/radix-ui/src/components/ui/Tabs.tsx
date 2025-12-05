import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

import type { TabsVariantsConfig } from "./types"

/** Storybook 에서 control select 옵션을 추출하기 쉽도록 분리 */
const tabsVariantsConfig: TabsVariantsConfig = {
  variant: {
    default: "dsds-tab-underline",
    button: "dsds-tab-button",
  },
  size: {
    small: "",
    medium: "",
  },
}

const tabsVariants = cva("flex flex-col gap-2", {
  variants: {
    ...tabsVariantsConfig,
  },
  defaultVariants: {
    variant: "default",
    size: "medium",
  },
  compoundVariants: [
    {
      variant: "default",
      size: "small",
      className: "dsds-tab-underline-small",
    },
    {
      variant: "default",
      size: "medium",
      className: "dsds-tab-underline-medium",
    },
    {
      variant: "button",
      size: "small",
      className: "dsds-tab-button-small",
    },
    {
      variant: "button",
      size: "medium",
      className: "dsds-tab-button-medium",
    },
  ],
})

type TabsVariantProps = VariantProps<typeof tabsVariants>

/**
 * Tabs 컴포넌트의 props 타입입니다.
 *
 * - `variant`: 탭의 스타일 타입 (`default` - underline 스타일, `button` - 버튼 스타일)
 * - `size`: 탭의 크기 (`small`, `medium`)
 * - `width`: 탭 컨테이너의 너비 (number 또는 string)
 * - 기타 `TabsPrimitive.Root`의 모든 표준 속성 지원
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="tab1" variant="default" size="medium">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 * </Tabs>
 * ```
 */
type TabsProps = TabsVariantProps &
  React.ComponentProps<typeof TabsPrimitive.Root> & {
    width?: number | string
  }

/**
 * TODO (Sprint 2) Tabs 컴포넌트 추가시 개발 필요 사항
 * - [ ] (난이도: 상) Overflow 스타일 적용 - 전체 탭이 차지하는 너비에 대한 동적 계산 필요.
 */

/**
 * Tabs 컴포넌트는 Radix UI를 기반으로 한 탭 네비게이션 UI 컴포넌트입니다.
 *
 * - `variant`: `default`(underline 스타일), `button`(버튼 스타일) 2가지 스타일을 지원합니다.
 * - `size`: `small`, `medium` 2가지 크기 옵션을 지원합니다.
 * - `width`: 탭 컨테이너의 너비를 지정할 수 있습니다.
 * - 접근성: 키보드 네비게이션과 ARIA 속성을 완전히 지원합니다.
 *   - Tab 키: 활성 탭으로 포커스 이동
 *   - 화살표 키: 탭 간 이동 (좌우 화살표)
 *   - Enter/Space: 탭 선택
 *
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/tabs/ WAI-ARIA Tabs Pattern}
 *
 * @example
 * ```tsx
 * // 기본 탭 (underline 스타일)
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 *
 * // 버튼 스타일 탭
 * <Tabs variant="button" defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 *
 * // 작은 크기 탭
 * <Tabs size="small" defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 * </Tabs>
 * ```
 *
 * @see TabsProps
 * @see TabsList
 * @see TabsTrigger
 * @see TabsContent
 */
function Tabs({ variant = "default", size = "medium", className, width, ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn(tabsVariants({ variant, size }), className)}
      style={{ width }}
      {...props}
    />
  )
}

/**
 * TabsList 컴포넌트는 탭 트리거들을 담는 컨테이너 컴포넌트입니다.
 *
 * - 탭 트리거들을 가로로 배치합니다.
 * - Radix UI의 TabsList의 모든 기능을 지원합니다.
 * - 접근성: 탭 목록으로서의 ARIA 역할 제공
 *
 * @example
 * ```tsx
 * <TabsList>
 *   <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *   <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 * </TabsList>
 * ```
 *
 * @see TabsPrimitive.List
 */
function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn("relative inline-flex w-full items-center justify-start", className)}
      {...props}
    />
  )
}

/**
 * TabsTrigger 컴포넌트는 개별 탭 버튼 컴포넌트입니다.
 *
 * - 클릭 시 해당 탭의 콘텐츠를 활성화합니다.
 * - 키보드 네비게이션(화살표 키)을 지원합니다.
 * - Radix UI의 TabsTrigger의 모든 기능을 지원합니다.
 * - 접근성: 탭 버튼으로서의 ARIA 역할과 상태 제공
 *
 * @example
 * ```tsx
 * <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 * ```
 *
 * @see TabsPrimitive.Trigger
 */
function TabsTrigger({ className, children, disabled, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn("relative inline-flex items-center", disabled && "dsds-tab-trigger-disabled", className)}
      disabled={disabled}
      {...props}
    >
      <div className="label">{children}</div>
      <div className="line"></div>
      {<u className="absolute bottom-[1px] h-[3px]"></u>}
    </TabsPrimitive.Trigger>
  )
}

/**
 * TabsContent 컴포넌트는 탭 콘텐츠를 담는 컴포넌트입니다.
 *
 * - `value` prop으로 연결된 TabsTrigger가 활성화될 때 표시됩니다.
 * - Radix UI의 TabsContent의 모든 기능을 지원합니다.
 * - 접근성: 탭 패널로서의 ARIA 역할 제공
 *
 * @example
 * ```tsx
 * <TabsContent value="tab1">
 *   <div>Tab 1 content</div>
 * </TabsContent>
 * ```
 *
 * @see TabsPrimitive.Content
 */
function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn("flex-1 outline-none", className)} {...props} />
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
