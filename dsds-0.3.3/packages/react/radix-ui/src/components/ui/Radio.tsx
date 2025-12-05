import * as RadioPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils"

import { Label } from "./Label"

/**
 * Radio 컴포넌트의 props 타입입니다.
 * @property {string} [orientation] - Radio 그룹의 배치 방향 ("horizontal" | "vertical")
 * @property {string} [value] - 현재 선택된 Radio 아이템의 값
 * @property {(value: string) => void} [onValueChange] - 값 변경 시 호출되는 콜백 함수
 * @property {boolean} [disabled] - 전체 Radio 그룹의 비활성화 상태
 * @property {string} [name] - Radio 그룹의 이름 (폼 제출 시 사용)
 * @property {boolean} [required] - 필수 선택 여부
 * @property {React.ReactNode} [children] - Radio 아이템들
 * @property {string} [className] - 추가 CSS 클래스
 */
export type RadioProps = React.ComponentProps<typeof RadioPrimitive.Root> & {
  orientation?: "horizontal" | "vertical"
}

/**
 * Radio 그룹 컨테이너 컴포넌트입니다.
 * 여러 Radio 아이템들을 그룹화하고, 선택 상태를 관리합니다.
 *
 * - `orientation` prop으로 수직/수평 배치를 지원합니다.
 * - `value`와 `onValueChange`로 선택 상태를 제어할 수 있습니다.
 * - Radix UI의 Radio Group을 기반으로 하여 접근성과 키보드 네비게이션을 지원합니다.
 * - 하나의 그룹에서 하나의 아이템만 선택할 수 있습니다.
 *
 * @example
 * ```tsx
 * // 기본 사용법
 * <Radio>
 *   <RadioItem value="option1" label="Option 1" />
 *   <RadioItem value="option2" label="Option 2" />
 *   <RadioItem value="option3" label="Option 3" />
 * </Radio>
 *
 * // 수평 배치
 * <Radio orientation="horizontal">
 *   <RadioItem value="option1" label="Option 1" />
 *   <RadioItem value="option2" label="Option 2" />
 * </Radio>
 *
 * // 상태 관리와 함께 사용
 * const [selectedValue, setSelectedValue] = useState("option1")
 * <Radio value={selectedValue} onValueChange={setSelectedValue}>
 *   <RadioItem value="option1" label="Option 1" />
 *   <RadioItem value="option2" label="Option 2" />
 * </Radio>
 *
 * // 폼과 함께 사용
 * <Radio name="gender" required>
 *   <RadioItem value="male" label="남성" />
 *   <RadioItem value="female" label="여성" />
 * </Radio>
 * ```
 *
 * @see RadioProps
 * @see RadioItem
 */
export function Radio({ className, orientation = "vertical", ...props }: RadioProps) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group"
      className={cn(
        "dsds-radio",
        orientation === "horizontal" ? "dsds-radio-horizontal" : "dsds-radio-vertical",
        className
      )}
      {...props}
    />
  )
}

/**
 * RadioItem 컴포넌트의 props 타입입니다.
 * @property {string} value - Radio 아이템의 값 (필수)
 * @property {string} [label] - Radio 아이템의 라벨 텍스트
 * @property {boolean} [checked] - 체크 상태 (비제어 시 사용)
 * @property {boolean} [disabled] - 비활성화 상태
 * @property {boolean} [required] - 필수 선택 여부
 * @property {string} [id] - Radio 아이템의 고유 ID
 * @property {string} [name] - Radio 그룹 이름
 * @property {string} [className] - 추가 CSS 클래스
 * @property {(event: React.ChangeEvent<HTMLInputElement>) => void} [onChange] - 값 변경 이벤트 핸들러
 */
export type RadioItemProps = React.ComponentProps<typeof RadioPrimitive.Item> & {
  label?: string
}

/**
 * 개별 Radio 아이템 컴포넌트입니다.
 * Radio 그룹 내에서 선택할 수 있는 옵션을 나타냅니다.
 *
 * - `label` prop을 제공하면 자동으로 Label 컴포넌트와 함께 렌더링됩니다.
 * - `label`이 없으면 Radio 아이템만 렌더링됩니다.
 * - 접근성을 위해 `id`와 `label`의 연결을 자동으로 처리합니다.
 * - Radio 그룹 내에서 하나의 아이템만 선택할 수 있습니다.
 *
 * @example
 * ```tsx
 * // 라벨과 함께 사용 (권장)
 * <RadioItem value="option1" label="Option 1" />
 *
 * // 라벨 없이 사용 (커스텀 라벨링 필요)
 * <RadioItem value="option1" id="option1" />
 * <Label htmlFor="option1">Option 1</Label>
 *
 * // 비활성화 상태
 * <RadioItem value="option1" label="Option 1" disabled />
 *
 * // 체크 상태 (비제어 시)
 * <RadioItem value="option1" label="Option 1" checked />
 *
 * // 필수 선택
 * <RadioItem value="option1" label="Option 1" required />
 *
 * // 커스텀 스타일링
 * <RadioItem value="option1" label="Option 1" className="custom-radio" />
 * ```
 *
 * @see RadioItemProps
 * @see Radio
 */
export function RadioItem({ className, label, id, ...props }: RadioItemProps) {
  const radioItem = (
    <RadioPrimitive.Item data-slot="radio-group-item" className={cn("dsds-radio-item", className)} id={id} {...props}>
      <RadioPrimitive.Indicator data-slot="radio-group-indicator" className="relative flex items-center justify-center">
        <div className={cn("h-[6px] w-[6px] rounded-full bg-white", props.disabled && "opacity-50")} />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Item>
  )

  // label이 있으면 Label과 함께 래핑
  if (label) {
    return (
      <div className="flex items-center gap-[6px]">
        {radioItem}
        <Label htmlFor={id} className="pr-1">
          {label}
        </Label>
      </div>
    )
  }

  // label이 없으면 기본 RadioItem만 반환
  return radioItem
}
