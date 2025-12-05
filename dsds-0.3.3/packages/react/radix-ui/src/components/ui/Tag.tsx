import { cn } from "@/lib/utils"

import { CloseIcon } from "../icons"

/**
 * Tag 컴포넌트의 Props 타입입니다.
 */
export type TagProps = {
  /** 태그에 표시될 텍스트 */
  title: string
  /** 둥근 모양의 태그로 표시할지 여부 */
  round?: boolean
  /** 태그 앞에 표시할 아이콘 */
  icon?: React.ReactNode
  /** 해시태그 스타일로 표시할지 여부 (# 기호 추가) */
  hashtag?: boolean
  /** 닫기 버튼을 표시할지 여부 */
  closeIcon?: boolean
  /** 비활성화 상태로 표시할지 여부 */
  disabled?: boolean
} & React.ComponentProps<"a">

/**
 * Tag 컴포넌트는 콘텐츠를 분류하거나 강조하기 위한 작은 라벨 컴포넌트입니다.
 *
 * - **기본 태그**: 간단한 텍스트 라벨
 * - **아이콘 태그**: 아이콘과 텍스트 조합
 * - **해시태그**: # 기호가 포함된 태그
 * - **닫기 버튼**: 제거 가능한 태그
 * - **둥근 태그**: 완전히 둥근 모양의 태그
 * - **비활성화 태그**: 회색으로 표시된 비활성 상태
 *
 * @example
 * ```tsx
 * // 기본 태그
 * <Tag title="기본 태그" />
 *
 * // 아이콘과 함께
 * <Tag title="아이콘 태그" icon={<StarIcon />} />
 *
 * // 해시태그 스타일
 * <Tag title="해시태그" hashtag />
 *
 * // 닫기 버튼 포함
 * <Tag title="닫기 가능" closeIcon />
 *
 * // 둥근 모양
 * <Tag title="둥근 태그" round />
 *
 * // 비활성화 상태
 * <Tag title="비활성 태그" disabled />
 * ```
 *
 * @see TagProps
 */
function Tag({ title, round, icon, hashtag, closeIcon, disabled, className }: TagProps) {
  return (
    <div
      className={cn(
        "dsds-tag",
        round && "dsds-tag-round",
        hashtag && "dsds-tag-hashtag",
        disabled && "dsds-tag-disabled",
        className
      )}
    >
      {icon && <div className="dsds-tag-icon">{icon}</div>}
      {hashtag && <div className="dsds-tag-hashtag-symbol">#</div>}
      <div className="dsds-tag-title">{title}</div>
      {closeIcon && (
        <button className="dsds-tag-close">
          <CloseIcon className="p-[-1px]" />
        </button>
      )}
    </div>
  )
}
export { Tag }
