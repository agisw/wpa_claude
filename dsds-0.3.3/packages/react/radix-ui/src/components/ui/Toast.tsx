"use client"

import { Toaster as Sonner, toast, ToasterProps } from "sonner"

import { cn } from "@/lib/utils"
import { ToastFailIcon, ToastInformIcon, ToastSuccessIcon, ToastWarningIcon } from "@/components/icons"

import { CloseIconGhost } from "../icons"

/**
 * Toast 컴포넌트의 Props 인터페이스
 */
type ToastProps = ToasterProps

/**
 * 토스트 알림을 표시하기 위한 컨테이너 컴포넌트입니다.
 *
 * 앱의 최상위 레벨에 `<Toast />` 를 한 번만 배치하여 사용합니다. `showToast` 함수를 호출하면
 * 이 `Toast` 컴포넌트를 통해 토스트 알림이 우상단에 표시됩니다.
 * [Sonner](https://github.com/emilkowalski/sonner) 라이브러리를 기반으로 하며, 최대 4개의 토스트를 동시에 표시할 수 있습니다.
 *
 * @example
 * ```tsx
 * import { Toast, showToast } from "@/components/ui"
 * import { Button } from "@/components/ui"
 *
 * function App() {
 *   const handleSuccess = () => {
 *     showToast({
 *       title: "저장 완료",
 *       body: "데이터가 성공적으로 저장되었습니다.",
 *       type: "success"
 *     })
 *   }
 *
 *   const handleError = () => {
 *     showToast({
 *       title: "오류 발생",
 *       body: "작업 중 오류가 발생했습니다.",
 *       type: "fail"
 *     })
 *   }
 *
 *   return (
 *     <div>
 *       <Button onClick={handleSuccess}>저장</Button>
 *       <Button variant="danger" onClick={handleError}>실패 테스트</Button>
 *       <Toast />
 *     </div>
 *   )
 * }
 * ```
 */
const Toast = ({ ...props }: ToastProps) => {
  return (
    <Sonner
      toastOptions={{
        unstyled: true,
      }}
      className="toaster group ![z-index:50] ![max-height:280px] ![width:280px]"
      position="top-right"
      offset={{ top: 112, right: 20 }}
      expand={true}
      gap={12}
      duration={2000}
      visibleToasts={4}
      {...props}
    />
  )
}

/**
 * 토스트 메시지를 표시하는 함수입니다.
 * 디자인 시스템의 공식 API로, 커스텀 디자인의 토스트 알림을 표시합니다.
 *
 * @param message - 표시할 토스트 메시지 정보
 * @param options - 토스트 표시 옵션
 * @returns 토스트 ID
 *
 * @example
 * ```tsx
 * import { showToast } from "@/components/ui"
 *
 * // 성공 메시지
 * showToast({
 *   title: "성공",
 *   body: "작업이 완료되었습니다.",
 *   type: "success"
 * })
 *
 * // 링크 포함 메시지
 * showToast({
 *   title: "알림",
 *   body: "자세한 내용은 링크를 클릭하세요.",
 *   type: "inform",
 *   link: "/details",
 *   linkText: "자세히 보기"
 * })
 *
 * // 클릭 콜백이 있는 메시지
 * showToast({
 *   title: "알림",
 *   body: "버튼을 클릭하여 작업을 수행하세요.",
 *   type: "warning",
 *   linkText: "실행하기",
 *   onClickLink: () => {
 *     console.log("링크 클릭됨")
 *     // 원하는 작업 수행
 *   }
 * })
 * ```
 */
const showToast = (
  message: {
    title?: string
    body: string
    type: "success" | "fail" | "warning" | "inform"
    link?: string
    linkText?: string
    onClickLink?: () => void
  },
  options?: {
    duration?: number
    id?: string
  }
) => {
  return toast.custom((t) => <ToastMessage {...message} t={t} />, options)
}

export type CustomToastProps = {
  t: number | string
  title: string
  body: string
  link?: string
  linkText?: string
  transitionDuration?: number
  onClose?: () => void
  type: string
  duration?: number
  animation?: boolean
}

/**
 * ToastMessage 컴포넌트의 Props 인터페이스
 */
interface ToastMessageProps {
  /** 토스트 ID */
  t: number | string
  /** 토스트 제목 (선택사항) */
  title?: string
  /** 토스트 본문 내용 */
  body: string
  /** 링크 URL */
  link?: string
  /** 링크 텍스트 */
  linkText?: string
  /** 링크 클릭 콜백 (link 대신 사용 가능) */
  onClickLink?: () => void
  /** 토스트 타입 */
  type: "success" | "fail" | "warning" | "inform"
}

/**
 * ToastMessage 컴포넌트입니다.
 * 디자인 시스템의 공식 토스트 메시지 컴포넌트입니다.
 *
 * 4가지 타입(success, fail, warning, inform)을 지원하며,
 * 제목, 본문, 링크를 포함할 수 있습니다. 각 타입별로 다른 색상과 아이콘이 적용됩니다.
 *
 * @param t - 토스트 ID
 * @param title - 토스트 제목 (선택사항)
 * @param body - 토스트 본문 내용
 * @param link - 링크 URL (선택사항)
 * @param linkText - 링크 텍스트 (선택사항)
 * @param type - 토스트 타입 ('success' | 'fail' | 'warning' | 'inform')
 * @example
 * ```tsx
 * <ToastMessage
 *   t={toastId}
 *   title="알림"
 *   body="작업이 완료되었습니다."
 *   type="success"
 * />
 * ```
 */
const ToastMessage = ({ t, title, body, link, linkText, onClickLink, type }: ToastMessageProps) => {
  return (
    <div className={cn("flex flex-row rounded-[2px] shadow-lg")}>
      <div
        className={cn(
          "w-[4px] rounded-l-[2px]",
          type === "success" && "bg-[var(--colors-nitrogen-green-n-green-10)]",
          type === "fail" && "bg-[var(--colors-oxygen-red-o-red-09)]",
          type === "warning" && "bg-[var(--colors-copper-yellow-cu-yellow-09)]",
          type === "inform" && "bg-[var(--colors-neutral-neutral-11)]"
        )}
      />
      <div
        className={cn(
          "flex max-h-[280px] w-[276px] flex-row gap-[8px] rounded-r-[2px] py-[16px] pr-[16px] pl-[12px] text-[var(--colors-neutral-neutral-17)]",
          type === "success" && "bg-[var(--colors-nitrogen-green-n-green-03)]",
          type === "fail" && "bg-[var(--colors-oxygen-red-o-red-03)]",
          type === "warning" && "bg-[var(--colors-copper-yellow-cu-yellow-04)]",
          type === "inform" && "bg-[var(--colors-wafer-blue-wafer-blue-01)]"
        )}
      >
        <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center">
          {type === "success" && <ToastSuccessIcon />}
          {type === "fail" && <ToastFailIcon />}
          {type === "warning" && <ToastWarningIcon />}
          {type === "inform" && <ToastInformIcon />}
        </div>
        <div className="flex w-full flex-col">
          {title && <div className="typo-sok-h6-14-700 mb-[4px] h-[20px]">{title}</div>}
          {body && <div className="typo-sok-body-14-400 mb-[4px]">{body}</div>}
          {(link || onClickLink) &&
            linkText &&
            (link ? (
              <a
                href={link}
                target="_blank"
                className="typo-sok-body-14-400 w-fit text-[var(--color-text-linked)] underline underline-offset-3"
              >
                {linkText}
              </a>
            ) : (
              <button
                onClick={onClickLink}
                className="typo-sok-body-14-400 w-fit cursor-pointer border-none bg-transparent text-[var(--color-text-linked)] underline underline-offset-3"
              >
                {linkText}
              </button>
            ))}
        </div>
        <div className="flex h-[20px] w-[20px] items-center justify-center">
          <button
            className={cn(
              "focus:outline-ring rounded-[2px] p-[2px] hover:bg-[var(--color-bg-on-ghost-button-ghostbtn-hover)] focus:bg-[var(--color-bg-on-ghost-button-ghostbtn-hover)]"
            )}
          >
            <CloseIconGhost size={14} onClick={() => toast.dismiss(t)} />
          </button>
        </div>
      </div>
    </div>
  )
}

export { Toast, ToastMessage, showToast }
