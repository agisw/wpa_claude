import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils"
import { CheckedOnIcon, IndeterminateIcon } from "@/components/icons/CheckIcons"

import { Label } from "./Label"

/**
 * Checkbox 컴포넌트의 props 타입입니다.
 * @property {boolean | "indeterminate"} [checked] - Checkbox의 체크 상태
 * @property {(checked: boolean | "indeterminate") => void} [onCheckedChange] - 체크 상태 변경 시 호출되는 콜백 함수
 * @property {boolean} [disabled] - 비활성화 상태
 * @property {string} [label] - Checkbox의 라벨 텍스트
 * @property {string} [id] - Checkbox의 고유 ID
 * @property {string} [className] - 추가 CSS 클래스
 */
export type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  label?: string
}

/**
 * Checkbox 컴포넌트입니다.
 * 체크박스 UI를 제공하며, checked, unchecked, indeterminate 세 가지 상태를 지원합니다.
 *
 * - `checked` prop으로 체크 상태를 제어할 수 있습니다.
 * - `indeterminate` 상태는 일부 선택 상태를 나타낼 때 사용합니다.
 * - `label` prop을 제공하면 자동으로 Label 컴포넌트와 함께 렌더링됩니다.
 * - Radix UI의 Checkbox를 기반으로 하여 접근성과 키보드 네비게이션을 지원합니다.
 *
 * @example
 * ```tsx
 * // 기본 사용법
 * <Checkbox />
 *
 * // 체크 상태
 * <Checkbox checked />
 *
 * // indeterminate 상태
 * <Checkbox checked="indeterminate" />
 *
 * // 라벨과 함께 사용 (권장)
 * <Checkbox label="동의합니다" />
 *
 * // 상태 관리와 함께 사용
 * const [isChecked, setIsChecked] = useState(false)
 * <Checkbox checked={isChecked} onCheckedChange={setIsChecked} label="동의합니다" />
 *
 * // 비활성화 상태
 * <Checkbox disabled label="비활성화됨" />
 * ```
 *
 * @see CheckboxProps
 */
function Checkbox({ className, label, id, ...props }: CheckboxProps) {
  const checkbox = (
    <CheckboxPrimitive.Root data-slot="checkbox" className={cn("dsds-checkbox", className)} id={id} {...props}>
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="dsds-checkbox-indicator">
        {!props.checked ? null : props.checked === "indeterminate" ? <IndeterminateIcon /> : <CheckedOnIcon />}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )

  // label이 있으면 Label과 함께 래핑
  if (label) {
    return (
      <div className="flex items-center gap-[6px]">
        {checkbox}
        <Label htmlFor={id} className="pr-1">
          {label}
        </Label>
      </div>
    )
  }

  // label이 없으면 기본 Checkbox만 반환
  return checkbox
}

export { Checkbox }
