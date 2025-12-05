"use client"

import { useRef, useState } from "react"

import { CloseIcon, MagnifyIcon } from "@/components/icons"

import { TextboxWrapper, type TextboxWrapperProps } from "./_components/TextboxWrapper"

/**
 * Searchbox 컴포넌트의 props 타입입니다.
 * @property {string} [placeholder] - 검색 입력 필드의 플레이스홀더 텍스트
 * @property {string} [value] - 제어형 모드에서 사용할 값
 * @property {string} [defaultValue] - 비제어형 모드에서 사용할 초기값
 * @property {(value: string) => void} [onChange] - 값 변경 시 호출되는 콜백 함수
 * @property {() => void} [onClear] - 클리어 버튼 클릭 시 호출되는 콜백 함수
 * @property {(value: string) => void} [onSearch] - 검색 버튼 클릭 시 호출되는 콜백 함수
 * @property {boolean} [disabled] - 비활성화 상태
 * @property {string} [message] - 입력 필드 아래에 표시할 메시지
 * @property {"default" | "error" | "success"} [messageType] - 메시지 타입
 * @property {"small" | "medium" | "large"} [size] - 입력 필드 크기
 * @property {"default" | "ghost"} [variant] - 입력 필드 스타일 변형
 * @property {number} [width] - 입력 필드 너비
 * @property {string} [className] - 추가 CSS 클래스
 * @property {string} [wrapperClassName] - 래퍼 요소에 적용할 추가 CSS 클래스
 */
export type SearchboxProps = Omit<TextboxWrapperProps, "multiline" | "autoResize" | "icon" | "iconSub"> & {
  onClear?: () => void
  onSearch?: (value: string) => void
}

/**
 * Searchbox 컴포넌트입니다.
 * 검색 기능을 위한 특화된 입력 필드 컴포넌트입니다.
 *
 * ## 모드 지원
 * - **제어형(Controlled) 모드**: `value`와 `onChange`를 함께 사용하여 컴포넌트의 상태를 완전히 제어
 * - **비제어형(Uncontrolled) 모드**: `value` 없이 `defaultValue`로 초기값만 설정하고 내부 상태로 관리
 * - **하이브리드 모드**: 필요에 따라 두 모드를 혼합하여 사용 가능
 *
 * ## 주요 특징
 * - 검색 아이콘과 클리어 아이콘을 내장
 * - `onSearch` 콜백으로 검색 기능 제공 (Enter 키 또는 검색 버튼 클릭 시)
 * - `onClear` 콜백으로 입력 내용 클리어 기능 제공
 * - `message`와 `messageType`으로 유효성 메시지 표시
 * - 접근성을 위한 적절한 ARIA 속성 지원
 *
 * @example
 * ```tsx
 * // 기본 사용법 (비제어형 모드)
 * <Searchbox placeholder="검색어를 입력하세요" />
 *
 * // 초기값이 있는 비제어형 모드
 * <Searchbox
 *   placeholder="사용자 검색"
 *   defaultValue="홍길동"
 * />
 *
 * // 제어형 모드
 * const [searchValue, setSearchValue] = useState("")
 * <Searchbox
 *   value={searchValue}
 *   onChange={(e) => setSearchValue(e.target.value)}
 *   placeholder="검색어를 입력하세요"
 * />
 *
 * // 검색 및 클리어 기능과 함께
 * <Searchbox
 *   placeholder="상품 검색"
 *   onSearch={(value) => handleSearch(value)}
 *   onClear={() => setSearchValue("")}
 * />
 *
 * // Enter 키로 검색
 * <Searchbox
 *   placeholder="빠른 검색"
 *   onSearch={(value) => console.log("Search:", value)}
 * />
 *
 * // 메시지와 함께
 * <Searchbox
 *   placeholder="사용자 검색"
 *   message="최소 2글자 이상 입력해주세요"
 *   messageType="error"
 * />
 *
 * // 다양한 스타일
 * <Searchbox variant="ghost" size="large" placeholder="Ghost 스타일 검색" />
 * ```
 *
 * @see SearchboxProps
 */
export function Searchbox({ onClear, onSearch, ...props }: SearchboxProps) {
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

  const handleSearch: React.MouseEventHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // controlled 모드면 props.value 사용, uncontrolled 모드면 현재 값 사용
    const searchValue = props.value !== undefined ? props.value : currentValue
    onSearch?.(searchValue)
  }

  return (
    <TextboxWrapper
      {...props}
      ref={inputRef}
      onChange={handleChange}
      wrapperClassName={props.wrapperClassName}
      iconSub={
        (isFocused || isPopulated) && currentValue ? <CloseIcon size={iconSize} onMouseDown={handleClear} /> : undefined
      }
      icon={<MagnifyIcon size={iconSize} onClick={handleSearch} />}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  )
}
