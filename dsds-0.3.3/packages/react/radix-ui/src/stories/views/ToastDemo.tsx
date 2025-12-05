import { useEffect, useRef } from "react"

import { Button, showToast, Toast } from "@/components/ui"

type ToastDemoProps = {
  title?: string
  body: string
  type: "success" | "fail" | "warning" | "inform"
  link?: string
  linkText?: string
} & { customDuration?: number }

export function ToastDemo({ customDuration, ...props }: ToastDemoProps) {
  const mounted = useRef(false)

  useEffect(() => {
    console.log(customDuration)
    if (mounted.current) return
    mounted.current = true

    const timer = setTimeout(() => {
      showToast(
        {
          title: "타이틀 정보",
          body: "시작일로부터 60일 이내 데이터가 다운로드 되었습니다.",
          link: "/",
          linkText: "Linked Text",
          type: "inform",
        },
        { id: "auto-inform", duration: customDuration }
      )

      showToast(
        {
          title: "타이틀 경고",
          body: "시작일로부터 60일 이내 데이터가 다운로드 되었습니다.",
          link: "/",
          linkText: "Linked Text",
          type: "warning",
        },
        { id: "auto-warning", duration: customDuration }
      )

      showToast(
        {
          title: "타이틀 실패",
          body: "시작일로부터 60일 이내 데이터가 다운로드 되었습니다.",
          link: "/",
          linkText: "Linked Text",
          type: "fail",
        },
        { id: "auto-fail", duration: customDuration }
      )

      showToast(
        {
          title: "타이틀 성공",
          body: "시작일로부터 60일 이내 데이터가 다운로드 되었습니다.",
          link: "/",
          linkText: "Linked Text",
          type: "success",
        },
        { id: "auto-success", duration: customDuration }
      )
    }, 0)

    return () => clearTimeout(timer)
  })
  return (
    <div className="flex flex-col items-center gap-5">
      <Button
        className="w-[100px]"
        onClick={() =>
          showToast(
            {
              ...props,
              title: "타이틀 성공",
              body: "시작일로부터 60일 이내 데이터가 다운로드 되었습니다.",
              link: "/",
              linkText: "Linked Text",
              type: "success",
            },
            { duration: customDuration }
          )
        }
      >
        Success
      </Button>
      <Button
        className="w-[100px]"
        variant="danger"
        onClick={() =>
          showToast(
            {
              ...props,
              title: "타이틀 실패",
              body: "시작일로부터 60일 이내 데이터가 다운로드 되었습니다.",
              link: "/",
              linkText: "Linked Text",
              type: "fail",
            },
            { duration: customDuration }
          )
        }
      >
        Fail
      </Button>
      <Button
        className="w-[100px]"
        variant="warning"
        onClick={() =>
          showToast(
            {
              ...props,
              title: "타이틀 경고",
              body: "시작일로부터 60일 이내 데이터가 다운로드 되었습니다.",
              link: "/",
              linkText: "Linked Text",
              type: "warning",
            },
            { duration: customDuration }
          )
        }
      >
        Warning
      </Button>
      <Button
        className="w-[100px]"
        variant="secondary"
        onClick={() =>
          showToast(
            {
              ...props,
              title: "타이틀 정보",
              body: "시작일로부터 60일 이내 데이터가 다운로드 되었습니다.",
              link: "/",
              linkText: "Linked Text",
              type: "inform",
            },
            { duration: customDuration }
          )
        }
      >
        Inform
      </Button>

      <Toast />
    </div>
  )
}
