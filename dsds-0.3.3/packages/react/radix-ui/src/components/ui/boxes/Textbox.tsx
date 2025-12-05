"use client"

import { useRef, useState } from "react"

import { CloseIcon } from "@/components/icons" // You need to have this icon

import { TextboxWrapper, TextboxWrapperVariantProps, type TextboxWrapperProps } from "./_components/TextboxWrapper"

/**
 * Textbox 컴포넌트의 props 타입입니다.
 * @property {string} [placeholder] - 입력 필드의 플레이스홀더 텍스트
 * @property {string} [value] - 제어형 모드에서 사용할 값
 * @property {string} [defaultValue] - 비제어형 모드에서 사용할 초기값
 * @property {(value: string) => void} [onChange] - 값 변경 시 호출되는 콜백 함수
 * @property {() => void} [onClear] - clearable이 true일 때 사용할 커스텀 클리어 콜백 함수
 * @property {boolean} [clearable] - 클리어 버튼 표시 여부 (true일 경우 기본 클리어 기능 제공)
 * @property {boolean} [disabled] - 비활성화 상태
 * @property {boolean} [multiline] - 여러 줄 입력 모드
 * @property {boolean} [autoResize] - 자동 크기 조정 (multiline 모드에서만 적용)
 * @property {string} [message] - 입력 필드 아래에 표시할 메시지
 * @property {"default" | "error" | "success"} [messageType] - 메시지 타입
 * @property {"small" | "medium" | "large"} [size] - 입력 필드 크기
 * @property {"default" | "ghost"} [variant] - 입력 필드 스타일 변형
 * @property {string} [type] - 입력 타입 ("text", "password", "number" 등)
 * @property {number} [width] - 입력 필드 너비
 * @property {string} [className] - 추가 CSS 클래스
 * @property {string} [wrapperClassName] - 래퍼 요소에 적용할 추가 CSS 클래스
 */
export type TextboxProps = Omit<TextboxWrapperProps, "icon" | "iconSub"> & {
  onClear?: () => void
  /** 클리어 버튼 표시 여부 */
  clearable?: boolean
}

/**
 * Textbox 컴포넌트의 variant props 타입입니다.
 */
export type TextboxVariantProps = TextboxWrapperVariantProps

/**
 * Textbox 컴포넌트입니다.
 * 텍스트 입력을 위한 UI 컴포넌트로, 단일 행과 여러 줄 입력을 모두 지원합니다.
 *
 * ## 모드 지원
 * - **제어형(Controlled) 모드**: `value`와 `onChange`를 함께 사용하여 컴포넌트의 상태를 완전히 제어
 * - **비제어형(Uncontrolled) 모드**: `value` 없이 `defaultValue`로 초기값만 설정하고 내부 상태로 관리
 * - **하이브리드 모드**: 필요에 따라 두 모드를 혼합하여 사용 가능
 *
 * ## 주요 특징
 * - `multiline` prop으로 단일 행/여러 줄 모드 전환 가능
 * - `autoResize`로 여러 줄 모드에서 자동 높이 조정 지원
 * - `clearable` prop으로 클리어 버튼 기능 제공
 * - `message`와 `messageType`으로 유효성 메시지 표시
 * - 접근성을 위한 적절한 ARIA 속성 지원
 *
 * @example
 * ```tsx
 * // 기본 사용법 (비제어형 모드)
 * <Textbox placeholder="이름을 입력하세요" />
 *
 * // 초기값이 있는 비제어형 모드
 * <Textbox
 *   placeholder="이름을 입력하세요"
 *   defaultValue="홍길동"
 * />
 *
 * // 제어형 모드
 * const [value, setValue] = useState("")
 * <Textbox
 *   value={value}
 *   onChange={(e) => setValue(e.target.value)}
 *   placeholder="이름을 입력하세요"
 * />
 *
 * // 여러 줄 입력 (비제어형)
 * <Textbox multiline placeholder="메시지를 입력하세요" />
 *
 * // 여러 줄 입력 (제어형)
 * const [message, setMessage] = useState("")
 * <Textbox
 *   multiline
 *   value={message}
 *   onChange={(e) => setMessage(e.target.value)}
 *   placeholder="메시지를 입력하세요"
 * />
 *
 * // 자동 크기 조정
 * <Textbox
 *   multiline
 *   autoResize
 *   defaultValue="이 텍스트는 자동으로 크기가 조정됩니다"
 *   placeholder="내용을 입력하세요"
 * />
 *
 * // 메시지와 함께
 * <Textbox
 *   placeholder="이메일을 입력하세요"
 *   message="올바른 이메일 형식을 입력해주세요"
 *   messageType="error"
 * />
 *
 * // clearable prop으로 기본 클리어 기능 사용
 * <Textbox
 *   placeholder="검색어를 입력하세요"
 *   clearable
 * />
 *
 * // 클리어 기능과 함께
 * <Textbox
 *   placeholder="검색어를 입력하세요"
 *   clearable
 *   onClear={() => console.log("cleared")}
 * />
 *
 * // 다양한 스타일
 * <Textbox variant="ghost" size="large" placeholder="Ghost 스타일" />
 * ```
 *
 * @see TextboxProps
 * @see TextboxVariantProps
 */
export function Textbox({ onClear, clearable = false, ...props }: TextboxProps) {
  const [internalValue, setInternalValue] = useState(props.defaultValue || "")
  const inputRef = useRef<HTMLInputElement>(null)

  // controlled 모드면 props.value, uncontrolled 모드면 internalValue 사용
  const currentValue = props.value !== undefined ? props.value : internalValue
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

  return (
    <TextboxWrapper
      {...props}
      ref={inputRef}
      onChange={handleChange}
      wrapperClassName={props.wrapperClassName}
      icon={
        !props.multiline && (onClear || clearable) && currentValue ? (
          <CloseIcon size={iconSize} onMouseDown={handleClear} />
        ) : undefined
      }
      data-testid="textbox"
    />
  )
}
