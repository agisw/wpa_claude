import * as TogglePrimitive from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Toggle 컴포넌트의 체크 아이콘 컴포넌트입니다.
 * Toggle이 체크되었을 때 표시되는 체크 아이콘입니다.
 *
 * @returns 체크 아이콘 JSX 요소
 */
export function ToggleCheckIcon() {
  return (
    <div className="icon [&>svg]:stroke-toggle-thumb-stroke size-[12px]">
      <svg fill="none">
        <path d="M2 5L5 8L10 3" strokeWidth="1.7" />
      </svg>
    </div>
  )
}

/**
 * Toggle 컴포넌트의 스타일 변형을 위한 cva 인스턴스입니다.
 * @private
 */
const toggleVariants = cva(cn("dsds-toggle"), {
  variants: {
    size: {
      large: "dsds-toggle-large",
      medium: "dsds-toggle-medium",
      small: "dsds-toggle-small",
    },
  },
  defaultVariants: {
    size: "medium",
  },
})

/**
 * Toggle 컴포넌트의 thumb(스위치 버튼) 스타일 변형을 위한 cva 인스턴스입니다.
 * @private
 */
const toggleThumbVariants = cva("dsds-toggle-thumb", {
  variants: {
    size: {
      large: "dsds-toggle-thumb-large",
      medium: "dsds-toggle-thumb-medium",
      small: "dsds-toggle-thumb-small",
    },
  },
})

/**
 * Toggle 컴포넌트의 variant props 타입입니다.
 */
type ToggleVariantProps = VariantProps<typeof toggleVariants>

/**
 * Toggle 컴포넌트의 props 타입입니다.
 * @property {boolean} [checked] - Toggle의 체크 상태
 * @property {(checked: boolean) => void} [onCheckedChange] - 체크 상태 변경 시 호출되는 콜백 함수
 * @property {boolean} [disabled] - 비활성화 상태
 * @property {"large" | "medium" | "small"} [size] - Toggle의 크기
 * @property {string} [className] - 추가 CSS 클래스
 * @property {React.ReactNode} [children] - Toggle 내부 콘텐츠 (일반적으로 사용되지 않음)
 */
export type ToggleProps = ToggleVariantProps & React.ComponentProps<typeof TogglePrimitive.Root>

/**
 * Toggle 컴포넌트는 ON/OFF 상태를 토글할 수 있는 스위치 UI 컴포넌트입니다.
 * Radix UI의 Switch를 기반으로 하여 접근성과 키보드 네비게이션을 지원합니다.
 *
 * - `size`: `large`, `medium`, `small` 크기 옵션을 지원합니다.
 * - `checked` 상태에 따라 시각적 스타일이 자동 적용됩니다.
 * - `disabled` 상태에서 사용자 상호작용을 제한합니다.
 * - 접근성: `aria-checked`, `aria-disabled` 등 표준 속성을 지원합니다.
 *
 * @example
 * ```tsx
 * // 기본 토글
 * <Toggle />
 *
 * // 체크된 상태
 * <Toggle checked />
 *
 * // 비활성화 상태
 * <Toggle disabled />
 *
 * // 크기 지정
 * <Toggle size="large" />
 *
 * // 상태 관리와 함께 사용
 * const [isChecked, setIsChecked] = useState(false)
 * <Toggle checked={isChecked} onCheckedChange={setIsChecked} />
 * ```
 *
 * @see ToggleProps
 * @see ToggleCheckIcon
 */
function Toggle({ className, size = "medium", ...props }: ToggleProps) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(
        toggleVariants({ size }),
        // State
        "data-[state=unchecked]:dsds-toggle-unchecked",
        "data-[state=checked]:dsds-toggle-checked",
        className
      )}
      {...props}
    >
      <TogglePrimitive.Thumb data-slot="toggle-thumb" className={toggleThumbVariants({ size })}>
        <ToggleCheckIcon />
      </TogglePrimitive.Thumb>
    </TogglePrimitive.Root>
  )
}

export { Toggle }
