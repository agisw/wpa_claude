"use client"

import { useRef, useState } from "react"

import { CalendarIcon, CloseIcon } from "@/components/icons"

import { TextboxWrapper, type TextboxWrapperProps } from "./_components/TextboxWrapper"

/**
 * Calbox 컴포넌트의 props 타입입니다.
 * @property {string} [placeholder] - 날짜 입력 필드의 플레이스홀더 텍스트
 * @property {string} [value] - 제어형 모드에서 사용할 값
 * @property {string} [defaultValue] - 비제어형 모드에서 사용할 초기값
 * @property {(value: string) => void} [onChange] - 값 변경 시 호출되는 콜백 함수
 * @property {(value: string) => void} [onClick] - 달력 아이콘 클릭 시 호출되는 콜백 함수
 * @property {() => void} [onClear] - 클리어 버튼 클릭 시 호출되는 콜백 함수
 * @property {boolean} [disabled] - 비활성화 상태
 * @property {string} [message] - 입력 필드 아래에 표시할 메시지
 * @property {"default" | "error" | "success"} [messageType] - 메시지 타입
 * @property {"small" | "medium" | "large"} [size] - 입력 필드 크기
 * @property {"default" | "ghost"} [variant] - 입력 필드 스타일 변형
 * @property {number} [width] - 입력 필드 너비 (기본값: 118)
 * @property {string} [className] - 추가 CSS 클래스
 * @property {string} [wrapperClassName] - 래퍼 요소에 적용할 추가 CSS 클래스
 */
export type CalboxProps = Omit<TextboxWrapperProps, "multiline" | "autoResize" | "icon" | "iconSub"> & {
  onClick?: (value: string) => void
  onClear?: () => void
}

/**
 * Calbox 컴포넌트입니다.
 * 날짜 입력을 위한 특화된 입력 필드 컴포넌트입니다.
 *
 * ## 모드 지원
 * - **제어형(Controlled) 모드**: `value`와 `onChange`를 함께 사용하여 컴포넌트의 상태를 완전히 제어
 * - **비제어형(Uncontrolled) 모드**: `value` 없이 `defaultValue`로 초기값만 설정하고 내부 상태로 관리
 * - **하이브리드 모드**: 필요에 따라 두 모드를 혼합하여 사용 가능
 *
 * ## 주요 특징
 * - 캘린더 아이콘과 클리어 아이콘을 내장
 * - 날짜 형식의 플레이스홀더("2025-01-01") 자동 적용
 * - `onClear` 콜백으로 입력 내용 클리어 기능 제공
 * - `message`와 `messageType`으로 유효성 메시지 표시
 * - 접근성을 위한 적절한 ARIA 속성 지원
 *
 * @example
 * ```tsx
 * // 기본 사용법 (비제어형 모드)
 * <Calbox />
 *
 * // 초기값이 있는 비제어형 모드
 * <Calbox defaultValue="2025-01-15" />
 *
 * // 제어형 모드
 * const [date, setDate] = useState("2025-01-01")
 * <Calbox
 *   value={date}
 *   onChange={(e) => setDate(e.target.value)}
 * />
 *
 * // 클리어 기능과 함께
 * <Calbox
 *   value="2025-01-01"
 *   onClear={() => setDate("")}
 * />
 *
 * // 날짜 검증 메시지와 함께
 * <Calbox
 *   value="2025-01-01"
 *   message="올바른 날짜 형식을 입력해주세요 (YYYY-MM-DD)"
 *   messageType="error"
 * />
 *
 * // 다양한 스타일
 * <Calbox variant="ghost" size="large" />
 *
 * // 커스텀 너비
 * <Calbox width={150} />
 *
 * // 날짜 범위 검증 예제
 * const [selectedDate, setSelectedDate] = useState("")
 * const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 *   const newDate = e.target.value
 *   // 날짜 유효성 검증 로직
 *   if (isValidDate(newDate)) {
 *     setSelectedDate(newDate)
 *   }
 * }
 *
 * <Calbox
 *   value={selectedDate}
 *   onChange={handleDateChange}
 *   message={selectedDate && !isValidDate(selectedDate) ? "올바른 날짜를 입력해주세요" : ""}
 *   messageType="error"
 * />
 * ```
 *
 * @see CalboxProps
 */
export function Calbox({ onClear, onClick, ...props }: CalboxProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [internalValue, setInternalValue] = useState(props.defaultValue || "")
  const inputRef = useRef<HTMLInputElement>(null)

  // controlled 모드면 props.value, uncontrolled 모드면 internalValue 사용
  const currentValue = props.value !== undefined ? props.value : internalValue
  const isPopulated = !!currentValue
  const iconSize = 14

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    // uncontrolled 모드에서만 내부 상태 업데이트
    if (props.value === undefined) {
      setInternalValue(e.target.value)
    }
    // 원래 onChange 호출
    props.onChange?.(e)
  }

  const handleClear: React.MouseEventHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // uncontrolled 모드에서는 내부 상태도 클리어
    if (props.value === undefined) {
      setInternalValue("")
      // input 요소도 직접 클리어
      if (inputRef.current) {
        inputRef.current.value = ""
      }
    }
    onClear?.()
  }

  const handleClick: React.MouseEventHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // controlled 모드면 props.value 사용, uncontrolled 모드면 현재 값 사용
    const searchValue = props.value !== undefined ? props.value : currentValue
    onClick?.(searchValue)
  }

  return (
    <TextboxWrapper
      {...props}
      ref={inputRef}
      onChange={handleChange}
      placeholder="2025-01-01"
      width={props.width || 118}
      wrapperClassName={props.wrapperClassName}
      iconSub={
        (isFocused || isPopulated) && currentValue ? <CloseIcon size={iconSize} onMouseDown={handleClear} /> : undefined
      }
      icon={<CalendarIcon size={iconSize} onClick={handleClick} />}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  )
}
