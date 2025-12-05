"use client"

import React from "react"
import samsungCopyrightIcon from "@/assets/icons/Icon-SamsungCopyright.png"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { CopyrightIcon } from "@/components/icons"

import { Button, ButtonProps } from "./Button"

const FooterThemeContext = React.createContext<"light" | "dark">("light")

/**
 * Footer 스타일 변형을 위한 cva 인스턴스입니다.
 * @private
 */
const footerVariants = cva("dsds-footer", {
  variants: {
    theme: {
      light: "dsds-footer-light",
      dark: "dsds-footer-dark",
    },
    size: {
      compact: "dsds-footer-compact",
      cozy: "dsds-footer-cozy",
    },
    align: {
      center: "justify-center",
      right: "justify-end",
    },
  },
  defaultVariants: {
    theme: "light",
    size: "compact",
    align: "right",
  },
})

/**
 * Footer에서 사용할 수 있는 아이템 타입입니다.
 * - text: 일반 텍스트 (저작권 표시 등)
 * - copyright: 저작권 텍스트 (CopyrightIcon과 함께 표시)
 * - button: 클릭 가능한 버튼
 * - link: 외부 링크
 * - divider: 구분선
 * - custom: 커스텀 React 노드
 */
export type FooterItem =
  | {
      type: "text"
      content: React.ReactNode
      props?: React.HTMLAttributes<HTMLDivElement>
    }
  | {
      type: "copyright"
      content?: React.ReactNode
      props?: React.HTMLAttributes<HTMLDivElement>
    }
  | {
      type: "button"
      content: React.ReactNode
      props?: React.ButtonHTMLAttributes<HTMLButtonElement>
    }
  | {
      type: "link"
      href: string
      content: React.ReactNode
      props?: React.AnchorHTMLAttributes<HTMLAnchorElement>
    }
  | { type: "divider"; props?: React.HTMLAttributes<HTMLDivElement> }
  | { type: "custom"; props?: React.HTMLAttributes<HTMLDivElement>; content: React.ReactNode }

/**
 * Footer 컴포넌트의 props입니다.
 * @property {FooterItem[]} [items] - Footer에 표시할 아이템 배열
 * @property {boolean} [asChild] - Slot 컴포넌트로 감쌀지 여부
 * @property {"light" | "dark"} [theme] - 푸터 테마 (기본값: "light")
 * @property {"compact" | "cozy"} [size] - 푸터 높이/패딩 사이즈 (기본값: "compact")
 * @property {"left" | "center" | "right"} [align] - 내용 정렬 (기본값: "right")
 * @property {React.ReactNode} [children] - 직접 커스텀 레이아웃을 넣을 때 사용
 */
export interface FooterProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof footerVariants> {
  items?: FooterItem[]
  asChild?: boolean
  /** 상단 border 없이 표시 (최상위 레이아웃이 아닌 Lnb 우측에 포함될 경우 필요) */
  noBorder?: boolean
}

/**
 * Footer 내 텍스트 컴포넌트입니다.
 * Footer.Item에서 type: "text"로 사용하거나, Footer.Text로 직접 사용합니다.
 *
 * @param props React.HTMLAttributes<HTMLDivElement>
 * @example
 * <Footer.Text>ⓒ 2025 Samsung</Footer.Text>
 */
const FooterText = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={cn("dsds-footer-text", className)}>
    {children}
  </div>
)
FooterText.displayName = "Footer.Text"

/**
 * Footer 내 저작권 텍스트 컴포넌트입니다.
 * Footer.Item에서 type: "copyright"로 사용하거나, Footer.Copyright로 직접 사용합니다.
 * CopyrightIcon과 함께 표시되며 기본 letter-spacing이 0.5로 설정됩니다.
 *
 * @param props React.HTMLAttributes<HTMLDivElement>
 * @example
 * <Footer.Copyright>2025 Samsung</Footer.Copyright>
 */
const FooterCopyright = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={cn("dsds-footer-copyright", className)}>
      {children ? (
        <>
          <CopyrightIcon />
          <span>{children}</span>
        </>
      ) : (
        <img src={samsungCopyrightIcon} height="16px" />
      )}
    </div>
  )
}
FooterCopyright.displayName = "Footer.Copyright"

/**
 * Footer 내 구분선(세로선) 컴포넌트입니다.
 * Footer.Item에서 type: "divider"로 사용하거나, Footer.Divider로 직접 사용합니다.
 *
 * @param props React.HTMLAttributes<HTMLDivElement>
 * @example
 * <Footer.Divider />
 */
const FooterDivider = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      aria-hidden="true"
      {...props}
      className={cn("dsds-footer-divider", props.className)}
    >
      <div className="bg-footer-divider h-full min-w-[1px]" />
    </div>
  )
}
FooterDivider.displayName = "Footer.Divider"

type FooterButtonProps = ButtonProps & {
  className?: string
  children: React.ReactNode
}

/**
 * Footer 내 버튼 컴포넌트입니다.
 * Footer.Item에서 type: "button"으로 사용하거나, Footer.Button으로 직접 사용합니다.
 *
 * @param props React.ButtonHTMLAttributes<HTMLButtonElement>
 * @example
 * <Footer.Button>Settings</Footer.Button>
 */
const FooterButton = React.forwardRef<HTMLButtonElement, FooterButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button ref={ref} variant="ghost" size="small" {...props} className={cn("dsds-footer-button", className)}>
        {children}
      </Button>
    )
  }
)
FooterButton.displayName = "Footer.Button"

type FooterLinkProps = {
  href?: string
  className?: string
  children: React.ReactNode
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

/**
 * Footer 내 링크 컴포넌트입니다.
 * Footer.Item에서 type: "link"로 사용하거나, Footer.Link로 직접 사용합니다.
 *
 * @param props React.AnchorHTMLAttributes<HTMLAnchorElement>
 * @example
 * <Footer.Link href="/privacy">개인정보 처리 방침</Footer.Link>
 */
const FooterLink = React.forwardRef<HTMLAnchorElement, FooterLinkProps>(
  ({ className, href, children, ...props }, ref) => {
    return (
      <a href={href} ref={ref} {...props} className={cn("dsds-footer-link", className)}>
        {children}
      </a>
    )
  }
)
FooterLink.displayName = "Footer.Link"

/**
 * Footer의 메인 컴포넌트입니다.
 * - `items` props로 데이터 기반으로 Footer를 구성할 수 있습니다.
 * - children prop을 사용하면 완전히 커스텀 레이아웃도 지원합니다.
 * - 최소 1200px, 최대 1920px 너비를 지원하며, 범위를 벗어나면 잘리거나 공백이 생성됩니다.
 *
 * ### 예제
 *
 * **기본 예제:**
 *
 * ```jsx
 * <Footer
 *   items={[
 *     {type: "button", content: "개인정보 처리 방침"},
 *     {type: "divider"},
 *     {type: "link", href: "/terms", content: "이용약관"},
 *     {type: "divider"},
 *     {type: "copyright", content: "2025 Samsung"},
 *   ]}
 * />
 * ```
 *
 * **커스텀 레이아웃 예제:**
 * ```jsx
 * <Footer theme="dark" size="cozy" align="center">
 *   <Footer.Button>개인정보 처리 방침</Footer.Button>
 *   <Footer.Divider />
 *   <Footer.Link href="/terms">이용약관</Footer.Link>
 *   <Footer.Divider />
 *   <Footer.Copyright>2025 Samsung</Footer.Copyright>
 * </Footer>
 * ```
 */
const FooterRoot = React.forwardRef<HTMLElement, FooterProps>(
  (
    { className, theme = "light", size = "compact", align = "right", children, items, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "footer"

    // 아이템을 렌더링하는 헬퍼 함수
    const renderItem = (item: FooterItem, index: number) => {
      const key = `${item.type}-${index}`
      switch (item.type) {
        case "text":
          return (
            <FooterText key={key} {...item.props}>
              {item.content}
            </FooterText>
          )
        case "copyright":
          return (
            <FooterCopyright key={key} {...item.props}>
              {item.content}
            </FooterCopyright>
          )
        case "button":
          return (
            <FooterButton key={key} {...item.props}>
              {item.content}
            </FooterButton>
          )
        case "link":
          return (
            <FooterLink key={key} href={item.href} {...item.props}>
              {item.content}
            </FooterLink>
          )
        case "divider":
          return <FooterDivider key={key} {...item.props} />
        case "custom":
          return (
            <div key={key} {...item.props}>
              {item.content}
            </div>
          )
        default:
          return null
      }
    }

    return (
      <FooterThemeContext.Provider value={theme || "light"}>
        <Comp
          className={cn(
            footerVariants({ size, theme, align }),
            theme === "light" && "dsds-footer-light",
            theme === "dark" && "dsds-footer-dark",
            !props.noBorder && "border-t-footer",
            className
          )}
          ref={ref}
          {...props}
        >
          {/* children이 있으면 그대로 렌더링 (커스텀 레이아웃 지원) */}
          {children ? (
            <div
              className={cn(
                "dsds-footer-container flex",
                align === "center" ? "justify-center" : align === "right" ? "justify-end" : ""
              )}
            >
              {children}
            </div>
          ) : (
            items &&
            items.length > 0 && (
              <div
                className={cn(
                  "dsds-footer-container flex",
                  align === "center" ? "justify-center" : align === "right" ? "justify-end" : ""
                )}
              >
                {items.map(renderItem)}
              </div>
            )
          )}
        </Comp>
      </FooterThemeContext.Provider>
    )
  }
)
FooterRoot.displayName = "Footer"

/**
 * Footer 컴포넌트는 서비스 하단에 위치하며, 저작권 정보, 링크, 버튼 등을 포함합니다.
 * - 최소 1200px, 최대 1920px 너비를 지원합니다.
 * - Compact/Cozy 두 가지 크기를 지원합니다.
 * - Light/Dark 테마를 지원합니다.
 * - Left/Center/Right 정렬을 지원합니다.
 *
 * @example
 * ```jsx
 * <Footer
 *   items={[
 *     {type: "copyright", content: "2025 Samsung"},
 *     {type: "divider"},
 *     {type: "link", href: "/privacy", content: "개인정보 처리 방침"}
 *   ]}
 * />
 * ```
 */
const Footer = Object.assign(FooterRoot, {
  Text: FooterText,
  Copyright: FooterCopyright,
  Divider: FooterDivider,
  Button: FooterButton,
  Link: FooterLink,
})

// 선언 병합(Declaration Merging)을 위한 namespace를 정의합니다.
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace Footer {
  /**
   * @see FooterText
   */
  export type Text = typeof FooterText
  /**
   * @see FooterCopyright
   */
  export type Copyright = typeof FooterCopyright
  /**
   * @see FooterDivider
   */
  export type Divider = typeof FooterDivider
  /**
   * @see FooterButton
   */
  export type Button = typeof FooterButton
  /**
   * @see FooterLink
   */
  export type Link = typeof FooterLink
}

export { Footer }
