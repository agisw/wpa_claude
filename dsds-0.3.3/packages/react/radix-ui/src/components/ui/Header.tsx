"use client"

import React from "react"
import { usePlatform } from "@/hooks"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { ChevronDownIcon, HamburgerIcon } from "@/components/icons"
import { BadgeNotificationCount } from "@/components/ui"

/**
 * Header 내 검색 입력 필드 컴포넌트입니다.
 * Header.Item에서 type: "searchbox"로 사용하거나, Header.Searchbox로 직접 사용합니다.
 *
 * @param props SearchboxProps
 * @example
 * <Header.Searchbox placeholder="Search..." />
 */
import { Searchbox, SearchboxProps } from "./boxes/Searchbox"
import { Button, ButtonProps } from "./Button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./DropdownMenu"

const HeaderThemeContext = React.createContext<"light" | "dark">("light")
const HeaderTabsContext = React.createContext<{
  isInTabs: boolean
  onTabSelect?: (value: string) => void
  activeTab?: string
}>({ isInTabs: false })

/**
 * Header 스타일 변형을 위한 cva 인스턴스입니다.
 * @private
 */
const headerVariants = cva("dsds-header", {
  variants: {
    theme: {
      light: "dsds-header-light",
      dark: "dsds-header-dark",
    },
    size: {
      compact: "dsds-header-compact",
      cozy: "dsds-header-cozy",
    },
    withTabs: {
      true: "dsds-header-with-tabs",
    },
  },
})

/**
 * Header에서 사용할 수 있는 아이템 타입입니다.
 * - tenant: 테넌트 선택 버튼
 * - menu: 드롭다운 메뉴 트리거
 * - link: 네비게이션 링크
 * - button: 일반 버튼
 * - divider: 구분선
 * - image: 프로필 등 이미지
 * - custom: 커스텀 React 노드
 * - hamburger: 햄버거 메뉴 버튼
 * - tab: 탭 (2단 모드에서만 사용)
 */
export type HeaderMenuItem = {
  content: React.ReactNode
  value: string
  disabled?: boolean
}

export type HeaderTabItem = {
  content: React.ReactNode
  value: string
  disabled?: boolean
  active?: boolean
}

const HeaderSearchbox = ({ className, placeholder, ...props }: SearchboxProps) => (
  <div className="dsds-header-searchbox">
    <Searchbox
      {...props}
      placeholder={placeholder || "Search"}
      className={cn("typo-sok-caption-12-400", className)}
      wrapperClassName={cn("header-searchbox-wrapper", props.wrapperClassName)}
      size="small"
    />
  </div>
)
HeaderSearchbox.displayName = "Header.Searchbox"

export type HeaderItem =
  | {
      type: "tenant"
      content: React.ReactNode
      items: HeaderMenuItem[]
      onSelect?: (value: string) => void
      disabled?: boolean
      selected?: string
      value?: string
      props?: React.ButtonHTMLAttributes<HTMLButtonElement>
    }
  | {
      type: "menu"
      content: React.ReactNode
      items?: HeaderMenuItem[]
      onSelect?: (value: string) => void
      selected?: string
      disabled?: boolean
      value?: string
      props?: React.ButtonHTMLAttributes<HTMLButtonElement>
    }
  | {
      type: "link"
      href: string
      props?: React.AnchorHTMLAttributes<HTMLAnchorElement>
      content: React.ReactNode
    }
  | {
      type: "button"
      props?: ButtonProps & { badge?: boolean; notiCount?: number }
      content?: React.ReactNode
    }
  | { type: "divider"; props?: React.HTMLAttributes<HTMLDivElement> }
  | { type: "image"; props: React.ImgHTMLAttributes<HTMLImageElement> }
  | { type: "custom"; props?: React.HTMLAttributes<HTMLDivElement>; content: React.ReactNode }
  | { type: "hamburger"; props?: React.HTMLAttributes<HTMLDivElement>; content?: React.ReactNode }
  | { type: "searchbox"; props?: SearchboxProps }

/**
 * Header 컴포넌트의 props입니다.
 * @property {React.ReactNode} logo - 로고 영역에 표시될 텍스트 또는 ReactNode
 * @property {"a" | "h1" | "div"} [logoAs] - 로고를 감쌀 태그 타입 (기본값: "a")
 * @property {string} [homeUrl] - 로고 클릭 시 이동할 URL (기본값: "/")
 * @property {(event: React.MouseEvent<HTMLAnchorElement>) => void} [onLogoClick] - 로고 클릭 시 호출되는 콜백
 * @property {HeaderItem[]} [items] - Header에 표시할 아이템 배열
 * @property {HeaderItem[]} [gnb] - GNB(Global Navigation Bar)에 표시할 아이템 배열
 * @property {HeaderItem[]} [utility] - Utility 영역에 표시할 아이템 배열
 * @property {HeaderItem[]} [tabs] - 2단 모드에서 하단에 표시할 탭 배열
 * @property {string} [activeTab] - 현재 활성화된 탭의 value
 * @property {(value: string) => void} [onTabSelect] - 탭 선택 시 호출되는 콜백
 * @property {boolean} [asChild] - Slot 컴포넌트로 감쌀지 여부
 * @property {"light" | "dark"} [theme] - 헤더 테마
 * @property {"compact" | "cozy"} [size] - 헤더 높이/패딩 사이즈
 * @property {"default" | "sticky"} [variant] - sticky 등 변형 스타일
 * @property {React.ReactNode} [children] - 직접 커스텀 레이아웃을 넣을 때 사용
 */
export interface HeaderProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof headerVariants> {
  logo?: React.ReactNode
  logoAs?: "a" | "h1" | "div"
  homeUrl?: string
  onLogoClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  gnb?: HeaderItem[]
  utility?: HeaderItem[]
  tabs?: HeaderItem[]
  activeTab?: string
  onTabSelect?: (value: string) => void
  asChild?: boolean
  sticky?: boolean
}

/**
 * 드롭다운 메뉴 트리거 역할의 버튼 컴포넌트입니다.
 * Header.Item에서 type: "menu"로 사용하거나, Header.Menu로 직접 사용합니다.
 *
 * @param props React.ButtonHTMLAttributes<HTMLButtonElement>
 * @example
 * <Header.Menu>Menu</Header.Menu>
 */
type HeaderMenuProps = {
  items?: HeaderMenuItem[]
  onSelect?: (value: string) => void
  selected?: string
  disabled?: boolean
  children?: React.ReactNode
  labelClassName?: string
  iconClassName?: string
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onSelect">

const HeaderMenu = React.forwardRef<HTMLButtonElement, HeaderMenuProps>(
  (
    { children, className, items, value, onSelect, disabled, selected, labelClassName, iconClassName, ...props },
    ref
  ) => {
    const { isInTabs, onTabSelect, activeTab } = React.useContext(HeaderTabsContext)
    const { isMacOS } = usePlatform()

    // Uncontrolled 모드를 위한 내부 상태
    const [internalSelected, setInternalSelected] = React.useState<string | undefined>(undefined)

    // Controlled vs Uncontrolled 모드 판단
    const isControlled = selected !== undefined
    const currentSelected = isControlled ? selected : internalSelected

    // tabs 안에 있을 때 activeTab과 일치하는 아이템이 있는지 확인
    const activeItem = isInTabs && items?.find((item) => item.value === activeTab)
    const shouldShowAsActive = isInTabs && activeItem && !isControlled

    // tabs 안에 있을 때 active 상태 확인
    const isTabActive =
      isInTabs && // 드롭다운이 없는 단일 메뉴이고 id가 activeTab과 일치하는 경우
      ((!items?.length && value === activeTab) ||
        // 드롭다운 메뉴가 있고 activeTab이 items 중 하나와 일치하는 경우
        (items?.length && activeItem))

    const buttonContent = (
      <Button
        {...props}
        disabled={disabled}
        onClick={(e) => {
          // tabs 안에 있고 드롭다운이 없는 단일 버튼인 경우 onTabSelect도 호출
          if (!items?.length && isInTabs && onTabSelect && value) {
            onTabSelect(value as string)
          }
          props?.onClick?.(e)
        }}
        ref={ref}
        variant="ghost"
        value={value}
        className={cn(
          "dsds-header-menu",
          isInTabs && "header-tab-item",
          isTabActive && "header-tab-active",
          !items?.length && isTabActive && "pointer-events-none",
          className
        )}
      >
        <div className={cn("header-button-label", isMacOS && isInTabs && "font-normal", labelClassName)}>
          {children}
        </div>
        {items?.length ? (
          <ChevronDownIcon size={16} className={cn(!isInTabs && "mb-[-1px]", iconClassName)} />
        ) : undefined}
      </Button>
    )

    if (!items || items.length === 0) {
      // 아이템이 없으면 버튼만 렌더링
      return buttonContent
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger disabled={disabled} asChild>
          {buttonContent}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="mt-[-1px]"
          onCloseAutoFocus={(event) => {
            // tabs 안에 있을 때는 트리거로 포커스가 돌아가는 것을 방지
            if (isInTabs) {
              event.preventDefault()
            }
          }}
        >
          {items.map((item) => (
            <DropdownMenuItem
              key={item.value}
              onSelect={() => {
                if (!item.disabled) {
                  // Uncontrolled 모드에서는 내부 상태 업데이트
                  if (!isControlled) {
                    setInternalSelected(item.value)
                  }
                  // onSelect 호출
                  onSelect?.(item.value)
                  // tabs 안에 있으면 onTabSelect도 호출
                  if (isInTabs && onTabSelect) {
                    onTabSelect(item.value)
                  }
                }
              }}
              aria-selected={shouldShowAsActive ? activeTab === item.value : currentSelected === item.value}
              aria-disabled={item.disabled}
              disabled={item.disabled}
              className={cn(
                (shouldShowAsActive ? activeTab === item.value : item.value === currentSelected) && "text-brand"
              )}
              role="menuitem"
            >
              {item.content}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
)
HeaderMenu.displayName = "Header.Menu"

/**
 * Header 내 테넌트 선택 버튼 컴포넌트입니다.
 * Header.Item에서 type: "tenant"로 사용하거나, Header.Tenant로 직접 사용합니다.
 *
 * @param props React.ButtonHTMLAttributes<HTMLButtonElement>
 * @example
 * ```jsx
 * <Header.Tenant items={[{ content: '기흥캠퍼스', value: 'giheung' }, { content: '화성캠퍼스', value: 'hwaseong' }]} />
 * ```
 */
const HeaderTenant = React.forwardRef<HTMLButtonElement, HeaderMenuProps>(
  ({ className, labelClassName, iconClassName, ...props }, ref) => {
    const { isWindows, isMacOS } = usePlatform()
    const { isInTabs } = React.useContext(HeaderTabsContext)
    return (
      <HeaderMenu
        ref={ref}
        {...props}
        className={cn("dsds-header-tenant", isWindows && !isInTabs && "in-tab", className)}
        labelClassName={cn(
          "typo-sss-h5-13-700",
          isMacOS && "mt-[-2px]",
          isWindows && "pt-[6px] mb-[-2px]",
          labelClassName
        )}
        iconClassName={cn(isWindows && !isInTabs && "mt-[0px]", iconClassName)}
      />
    )
  }
)
HeaderTenant.displayName = "Header.Tenant"

/**
 * Header 내 햄버거 메뉴 버튼 컴포넌트입니다.
 * Header.Item에서 type: "hamburger"로 사용하거나, Header.HamburgerMenu로 직접 사용합니다.
 *
 * @param props React.ButtonHTMLAttributes<HTMLButtonElement>
 * @example
 * <Header.HamburgerMenu />
 */
const HeaderHamburgerMenu = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <HamburgerIcon
    {...props}
    className="dsds-header-icon-button dsds-header-hamburger"
    data-testid="dsds-header-hamburger"
  />
)
HeaderHamburgerMenu.displayName = "Header.HamburgerMenu"

/**
 * Header 내 GNB(Global Navigation Bar) 컨테이너 컴포넌트입니다.
 * 커스텀 레이아웃에서 GNB 영역을 정의할 때 사용합니다.
 *
 * @param props React.HTMLAttributes<HTMLDivElement>
 * @example <pre><code>
 * <Header.GNB>
 *   <Header.Menu>홈</Header.Menu>
 *   <Header.Menu>문서</Header.Menu>
 * </Header.GNB>
 * </code></pre>
 */
const HeaderGNB = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={cn("dsds-header-gnb", props.className)} data-testid="dsds-header-gnb">
    {children}
  </div>
)
HeaderGNB.displayName = "Header.GNB"

/**
 * Header 내 Utility 영역 컨테이너 컴포넌트입니다.
 * 커스텀 레이아웃에서 Utility 영역을 정의할 때 사용합니다.
 * 기본적으로 margin-left: auto가 적용됩니다.
 *
 * @param props React.HTMLAttributes<HTMLDivElement>
 * @example
 * <Header.Utility>
 *   <Header.Button>알림</Header.Button>
 *   <Header.Image src="/avatar.png" alt="User" />
 * </Header.Utility>
 */
const HeaderUtility = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    className={cn("dsds-header-utility", props.className)}
    style={{ marginLeft: "auto" }}
    data-testid="dsds-header-utility"
  >
    {children}
  </div>
)
HeaderUtility.displayName = "Header.Utility"

/**
 * Header 내 Tabs 영역 컨테이너 컴포넌트입니다. (2단 모드에서만 사용)
 * 커스텀 레이아웃에서 Tabs 영역을 정의할 때 사용합니다.
 *
 * @param props React.HTMLAttributes<HTMLDivElement>
 * @example
 * <Header.Tabs>
 *   <Header.Tab value="home" active>Home</Header.Tab>
 *   <Header.Tab value="docs">Docs</Header.Tab>
 * </Header.Tabs>
 */
const HeaderTabs = ({
  children,
  onTabSelect,
  activeTab,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { onTabSelect?: (value: string) => void; activeTab?: string }) => (
  <HeaderTabsContext.Provider value={{ isInTabs: true, onTabSelect, activeTab }}>
    <div {...props} className={cn("dsds-header-tabs", props.className)} role="tablist">
      {children}
    </div>
  </HeaderTabsContext.Provider>
)
HeaderTabs.displayName = "Header.Tabs"

/**
 * Header 내 구분선(세로선) 컴포넌트입니다.
 * Header.Item에서 type: "divider"로 사용하거나, Header.Divider로 직접 사용합니다.
 *
 * @param props React.HTMLAttributes<HTMLDivElement>
 * @example
 * <Header.Divider />
 */
const HeaderDivider = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div role="separator" aria-orientation="vertical" aria-hidden="true" {...props} className="dsds-header-divider">
    <div className={cn("divider-line", props.className)}></div>
  </div>
)
HeaderDivider.displayName = "Header.Divider"

type HeaderButtonProps = ButtonProps & {
  className?: string
  children: React.ReactNode
  badge?: boolean
  notiCount?: number
}

/**
 * Header 내 버튼 컴포넌트입니다.
 * Header.Item에서 type: "button"으로 사용하거나, Header.Button으로 직접 사용합니다.
 *
 * @param props React.ButtonHTMLAttributes<HTMLButtonElement>
 * @example
 * <Header.Button>Login</Header.Button>
 */
export const HeaderButton = React.forwardRef<HTMLButtonElement, HeaderButtonProps>(
  ({ className, children, badge, notiCount, ...props }, ref) => {
    const hasBadgeOrNotiCount = badge || (typeof notiCount === "number" && notiCount > 0)

    const buttonContent = (
      <Button
        ref={ref}
        variant="ghostLink"
        {...props}
        aria-label={props["aria-label"]}
        className={cn("dsds-header-button", badge && "with-badge", notiCount && "with-noti", className)}
      >
        <div className="header-button-label">{children}</div>
      </Button>
    )

    return (
      /* 탭 영역이 아닌 경우 badge/notification 을 위해 padding 을 추가합니다. */
      hasBadgeOrNotiCount ? (
        <div className={cn("relative inline-flex shrink-0")}>
          {buttonContent}
          {badge && (
            <div
              className={cn(
                "typo-sok-footnote-11-400 absolute top-[0px] right-[0px] z-100 flex items-center justify-center rounded-full border-1 border-[#f73529] bg-[#e82c1f] text-white",
                badge && "size-[6px]"
              )}
            ></div>
          )}
          {!badge && notiCount && (
            <div
              className={cn(
                "absolute top-[-4px] right-[-7.5px] z-100 w-[18px] max-w-[18px] overflow-clip text-center leading-3",
                notiCount < 10 && "pr-[2px] pl-[2px]"
              )}
            >
              <BadgeNotificationCount
                className={cn(
                  "min-w-[12px] cursor-default text-center",
                  notiCount < 10 && "ml-[0.1px] max-w-[12px] pr-[0px] pl-[1px]"
                )}
                title={notiCount.toString()}
              >
                {notiCount > 99 ? 99 : notiCount}
              </BadgeNotificationCount>
            </div>
          )}
        </div>
      ) : (
        buttonContent
      )
    )
  }
)
HeaderButton.displayName = "Header.Button"

type HeaderLinkProps = {
  href?: string
  className?: string
  children: React.ReactNode
}

const HeaderLink = React.forwardRef<HTMLAnchorElement, HeaderLinkProps>(({ className, href, ...props }, ref) => {
  return (
    <a href={href} ref={ref} tabIndex={-1}>
      <HeaderButton {...props} className={cn("header-link", className)} />
    </a>
  )
})

/**
 * Header 내 이미지(프로필 등) 컴포넌트입니다.
 * Header.Item에서 type: "image"로 사용하거나, Header.Image로 직접 사용합니다.
 *
 * @param props React.ImgHTMLAttributes<HTMLImageElement>
 * @example
 * <Header.Image src="/avatar.png" alt="User" />
 */
const HeaderImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img {...props} className={cn("h-8 w-8 rounded-full", props.className)} />
)
HeaderImage.displayName = "Header.Image"

/**
 * Header 로고 영역 컴포넌트입니다.
 * as prop으로 "a", "h1", "div" 등 태그를 지정할 수 있습니다.
 *
 * @param props HeaderLogoProps
 * @example
 * <Header.Logo as="h1">MyApp</Header.Logo>
 */
export interface HeaderLogoProps extends React.HTMLAttributes<HTMLElement> {
  as?: "a" | "h1" | "div"
  children: React.ReactNode
  homeUrl?: string
  onLogoClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}
const HeaderLogo = React.forwardRef<HTMLElement, HeaderLogoProps>(
  ({ as: Component = "a", children, className, homeUrl = "/", onLogoClick, ...props }, ref) => {
    const { isMacOS } = usePlatform()

    const logoProps: React.AllHTMLAttributes<HTMLElement> = {
      ...props,
    }

    if (Component === "a") {
      ;(logoProps as React.AnchorHTMLAttributes<HTMLAnchorElement>).href = homeUrl

      // 기존 onClick과 onLogoClick을 모두 처리하는 핸들러 생성
      if (onLogoClick) {
        ;(logoProps as React.AnchorHTMLAttributes<HTMLAnchorElement>).onClick = (e) => {
          // onLogoClick이 있으면 preventDefault를 호출하고 onLogoClick 실행
          e.preventDefault()
          e.stopPropagation()
          console.log("HeaderLogo clicked")
          onLogoClick(e)
        }
      }
    }

    if (typeof children === "string") {
      logoProps["aria-label"] = `${children} homepage`
    }

    return React.createElement(
      Component,
      {
        ...logoProps,
        "data-testid": "header-logo",
        ref,
        className: cn("header-logo", isMacOS && "header-logo-macos", className),
      },
      children
    )
  }
)
HeaderLogo.displayName = "Header.Logo"

/**
 * Header의 메인 컴포넌트입니다.
 * - `logo`, `gnb`, `utility` props 그룹으로 데이터 기반으로 Header를 구성할 수 있습니다.
 * - children prop을 사용하면 완전히 커스텀 레이아웃도 지원합니다.
 * - `withTabs` + `tabs` 배열로 2단 모드를 활성화할 수 있습니다.
 *
 * ### 구성
 *
 * ![header-anatomy](/static/images/dsds/header-anatomy.png)
 *
 * 각 그룹은 다음과 같은 역할을 합니다:
 * - **Logo**: 서비스 로고 또는 타이틀을 표시합니다.
 * - **GNB** (Global Navigation Bar): Tenant 와 드롭다운 Menu를 포함한 탐색 가능한 메뉴입니다.
 *   - **Tenant**: 현재 사용 중인 테넌트(서비스 영역. 기흥/화성, MEM/FDRY 등)를 표시합니다.
 *     드롭다운 메뉴로 다른 테넌트로 전환할 수 있습니다.
 * - **Utility**: Searchbox, 버튼(뱃지 포함), 로그인 버튼, 프로필 이미지, 햄버거 메뉴 등 추가적인 기능을 제공합니다.
 * - **Tabs** (2단 모드에서만): 하단에 표시되는 탭 영역으로, 활성 탭은 하단에 흰색 선으로 강조됩니다.
 *
 * ### 예제
 *
 * **기본 예제:**
 *
 * ```jsx
 * <Header logo="MyApp" gnb={[{type: "menu", content: "Docs"}]} utility={[{type: "button", content: "Login"}]} />
 * ```
 *
 * **커스텀 로고 URL과 클릭 핸들러:**
 *
 * ```jsx
 * <Header
 *   logo="MyApp"
 *   homeUrl="/dashboard"
 *   onLogoClick={(e) => {
 *     e.preventDefault()
 *     navigate('/dashboard')
 *   }}
 *   gnb={[{type: "menu", content: "Docs"}]}
 *   utility={[{type: "button", content: "Login"}]}
 * />
 * ```
 *
 * **2단 모드 예제:**
 *
 * ```jsx
 * <Header
 *   size="compact" withTabs
 *   logo="MyApp"
 *   gnb={[{type: "tenant", content: "Memory", items: [...]}]}
 *   utility={[{type: "searchbox"}, {type: "button", content: "알림"}]}
 *   tabs={[
 *     {type: "menu", content: "즐겨찾기", selected: "favorite-dashboard", items: [
 *       {content: "대시보드", value: "favorite-dashboard"},
 *       {content: "주요 리포트", value: "favorite-reports"}
 *     ]},
 *     {type: "divider"},
 *     {type: "menu", content: "업무함", selected: "inbox-tasks", items: [
 *       {content: "대기중인 작업", value: "inbox-tasks"},
 *       {content: "승인 요청", value: "inbox-approvals"}
 *     ]},
 *     {type: "menu", content: "서비스", selected: "service-wafer", items: [
 *       {content: "웨이퍼 관리", value: "service-wafer"},
 *       {content: "테스트 시스템", value: "service-test"}
 *     ]},
 *     {type: "menu", content: "설정", selected: "setting-general", items: [
 *       {content: "일반 설정", value: "setting-general"},
 *       {content: "사용자 관리", value: "setting-users"}
 *     ]},
 *     {type: "button", content: "새창", props: { value: "new-window", icon: <ExternalIcon />, iconOption: "after" }}
 *   ]}
 *   activeTab="favorite-dashboard"
 * />
 * ```
 *
 * **커스텀 레이아웃 예제:**
 * ```jsx
 * <Header>
 *   <Header.Logo>MyApp</Header.Logo>
 *   <Header.GNB>
 *      <Header.Tenant items={[{content: 'Tenant1', value: 'Tenant1'}]}/>
 *      <Header.Divider />
 *      <Header.Menu items={[{content: 'Menu1-1', value: 'menu1-1'}]}/>
 *      <Header.Menu items={[{content: 'Menu2-1', value: 'menu2-1'}]}/>
 *   </Header.GNB>
 *   <Header.Utility>
 *      <Header.Searchbox placeholder="Search..." />
 *      <Header.Button notiCount={3}>Notification</Header.Button>
 *      <Header.Button badge>Update</Header.Button>
 *      <Header.Divider />
 *      <Header.Button>Q&A</Header.Button>
 *      <Header.Button>Help Desk</Header.Button>
 *      <Header.Divider />
 *      <Header.Button aria-label="login button">Admin</Header.Button>
 *      <Header.Button aria-label="profile image" icon={<DummyIcon />} />
 *      <Header.Image aria-label="confidential image" src={<ConfidentialLogo />} />
 *      <Header.Divider />
 *      <Header.HamburgerMenu items=[{content: 'Ham1', value: 'ham1'}] />
 *   </Header.Utility>
 * </Header.GNB>
 * </Header>
 * ```
 *
 * **커스텀 2단 모드 예제:**
 * ```jsx
 * <Header withTabs>
 *   <div className="flex w-full items-center">
 *     <Header.Logo>MyApp</Header.Logo>
 *     <Header.GNB>
 *       <Header.Tenant items={[{content: 'Memory', value: 'memory'}]}>Memory</Header.Tenant>
 *       <Header.Menu items={[{content: '제품', value: 'products'}]}>제품</Header.Menu>
 *     </Header.GNB>
 *     <Header.Utility>
 *       <Header.Searchbox />
 *       <Header.Button badge>알림</Header.Button>
 *     </Header.Utility>
 *   </div>
 *   <Header.Tabs>
 *     <Header.Menu items={[{content: '대시보드', value: 'favorite-dashboard'}, {content: '주요 리포트', value: 'favorite-reports'}]}>즐겨찾기</Header.Menu>
 *     <Header.Divider />
 *     <Header.Menu items={[{content: '대기중인 작업', value: 'inbox-tasks'}, {content: '승인 요청', value: 'inbox-approvals'}]}>업무함</Header.Menu>
 *     <Header.Menu items={[{content: '웨이퍼 관리', value: 'service-wafer'}, {content: '테스트 시스템', value: 'service-test'}]}>서비스</Header.Menu>
 *     <Header.Menu items={[{content: '일반 설정', value: 'setting-general'}, {content: '사용자 관리', value: 'setting-users'}]}>설정</Header.Menu>
 *     <Header.Button onClick={() => window.open('/', '_blank')}>새창</Header.Button>
 *   </Header.Tabs>
 * </Header>
 * ```
 */
const HeaderRoot = React.forwardRef<HTMLElement, HeaderProps>(
  (
    {
      className,
      theme = "light",
      size = "compact",
      withTabs = false,
      children,
      logo,
      logoAs = "a",
      homeUrl,
      onLogoClick,
      gnb,
      utility,
      tabs,
      activeTab,
      onTabSelect,
      sticky: isSticky,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "header"

    // 아이템을 렌더링하는 헬퍼 함수
    const renderItem = (item: HeaderItem, index: number) => {
      const key = `${item.type}-${index}`
      switch (item.type) {
        case "link":
          return (
            <HeaderLink key={key} href={item.href} {...item.props}>
              {item.content}
            </HeaderLink>
          )
        case "menu":
          return (
            <HeaderMenu
              key={key}
              items={item.items}
              onSelect={item.onSelect}
              selected={item.selected}
              disabled={item.disabled}
            >
              {item.content}
            </HeaderMenu>
          )
        case "tenant":
          return (
            <HeaderTenant
              key={key}
              items={item.items}
              onSelect={item.onSelect}
              selected={item.selected}
              disabled={item.disabled}
            >
              {item.content}
            </HeaderTenant>
          )
        case "button": {
          return (
            <HeaderButton key={key} {...item.props}>
              {item.content}
            </HeaderButton>
          )
        }
        case "divider":
          return <HeaderDivider key={key} {...item.props} />
        case "image":
          return <HeaderImage key={key} {...item.props} />
        case "custom":
          return (
            <div key={key} {...item.props}>
              {item.content}
            </div>
          )
        case "hamburger":
          return (
            <HeaderHamburgerMenu key={key} {...item.props}>
              {item.content}
            </HeaderHamburgerMenu>
          )
        case "searchbox":
          return <HeaderSearchbox key={key} {...item.props} />
        default:
          return null
      }
    }

    // 탭 아이템을 렌더링하는 헬퍼 함수
    const renderTabItem = (item: HeaderItem, index: number) => {
      const key = `${item.type}-${index}`

      // tabs 배열에서는 모든 아이템 타입을 지원하되, 특별한 동작 구현
      switch (item.type) {
        case "menu": {
          return (
            <HeaderMenu
              key={key}
              items={item.items}
              onSelect={item.onSelect || onTabSelect}
              selected={item.selected}
              value={item.value}
              className={cn("header-tab-menu relative")}
            >
              {item.content}
            </HeaderMenu>
          )
        }
        case "button": {
          const buttonProps = item.props as React.ButtonHTMLAttributes<HTMLButtonElement> & { value?: string }
          return (
            <HeaderButton
              key={key}
              className={cn("header-tab-button relative", activeTab === buttonProps?.value && "header-tab-active")}
              onClick={(e) => {
                const value = buttonProps?.value
                if (value && onTabSelect) {
                  onTabSelect(value)
                }
                buttonProps?.onClick?.(e)
              }}
              {...buttonProps}
            >
              {item.content}
            </HeaderButton>
          )
        }
        case "link": {
          const linkProps = item.props as React.AnchorHTMLAttributes<HTMLAnchorElement> & { value?: string }
          return (
            <HeaderLink
              key={key}
              href={item.href}
              className={cn("header-tab-link relative", activeTab === linkProps?.value && "header-tab-active")}
              {...linkProps}
            >
              {item.content}
            </HeaderLink>
          )
        }
        default:
          // 다른 타입들은 기본 렌더러 사용
          return renderItem(item, index)
      }
    }

    return (
      <HeaderThemeContext.Provider value={theme || "light"}>
        <Comp
          style={
            theme === "dark"
              ? {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  "--color-bg-on-ghost-button-ghostbtn-hover": "rgba(255,255,255,0.08)",
                }
              : undefined
          }
          className={cn(headerVariants({ size, theme, withTabs, className }), isSticky && "dsds-header-sticty")}
          ref={ref}
          {...props}
        >
          {/* children이 있으면 그대로 렌더링 (커스텀 레이아웃 지원) */}
          {children ??
            (withTabs ? (
              // 2단 모드: 상단과 하단으로 분리된 레이아웃
              <>
                <div className="flex h-7 w-full items-center">
                  {logo && (
                    <HeaderLogo as={logoAs} homeUrl={homeUrl} onLogoClick={onLogoClick}>
                      {logo}
                    </HeaderLogo>
                  )}
                  {gnb && gnb.length > 0 && <HeaderGNB>{gnb.map(renderItem)}</HeaderGNB>}
                  {utility && utility.length > 0 && <HeaderUtility>{utility.map(renderItem)}</HeaderUtility>}
                </div>
                {tabs && tabs.length > 0 && (
                  <HeaderTabs onTabSelect={onTabSelect} activeTab={activeTab}>
                    {tabs.map(renderTabItem)}
                  </HeaderTabs>
                )}
              </>
            ) : (
              // 기본 모드: 한 줄 레이아웃
              <div className="flex w-full items-center">
                {logo && (
                  <HeaderLogo as={logoAs} homeUrl={homeUrl} onLogoClick={onLogoClick}>
                    {logo}
                  </HeaderLogo>
                )}
                {gnb && gnb.length > 0 && <HeaderGNB>{gnb.map(renderItem)}</HeaderGNB>}
                {utility && utility.length > 0 && <HeaderUtility>{utility.map(renderItem)}</HeaderUtility>}
              </div>
            ))}
        </Comp>
      </HeaderThemeContext.Provider>
    )
  }
)
HeaderRoot.displayName = "Header"

/**
 * Header 컴포넌트는 서비스 상단에 위치하며, Logo, GNB(Global Navigation Bar), Utility로 구성된 Navigation 그룹입니다.
 * - Logo: 서비스 로고 또는 타이틀을 표시합니다.
 * - GNB: Tenant 와 드롭다운 Menu를 포함한 탐색 가능한 메뉴입니다.
 *   - Tenant: 현재 사용 중인 테넌트(서비스 영역. 예: 기흥/화성, MEM/FDRY' 등)를 표시합니다. 드롭다운 메뉴로 다른 테넌트로 전환할 수 있습니다.
 * - Utility: Searchbox, 버튼(뱃지 포함), 로그인 버튼, 프로필 이미지, 햄버거 메뉴 등 추가적인 기능을 제공합니다.
 * - Tabs (2단 모드): `withTabs` 시 활성화되며, 하단에 탭 영역을 제공합니다.
 *
 * ### 2단 모드 사용법
 *
 * 2단 모드는 다음 조건을 만족해야 합니다:
 * - `withTabs`
 * - `tabs` 배열이 제공되어야 함
 *
 * 2단 모드에서는 상단에 Logo, GNB, Utility가 배치되고, 하단에 Tabs가 배치됩니다.
 * 활성 탭은 `active={true}` 속성으로 지정하며, 하단에 흰색 선으로 강조됩니다.
 *
 * @example <code><pre>
 * <!-- 기본 사용법 -->
 * <Header logo="MyApp" gnb=[{...}] utility={[{type: "link", content: "Home", href: "/"}]} />
 *
 * <!-- 2단 모드 데이터 기반 -->
 * <Header
 *   logo="MyApp"
     size="compact"
     withTabs
 *   gnb={[{type: "tenant", content: "Memory", items: [...]}]}
 *   utility={[{type: "searchbox"}, {type: "button", content: "알림"}]}
 *   tabs={[
 *     {type: "menu", content: "즐겨찾기", selected: "favorite-dashboard", items: [
 *       {content: "대시보드", value: "favorite-dashboard"},
 *       {content: "주요 리포트", value: "favorite-reports"}
 *     ]},
 *     {type: "divider"},
 *     {type: "menu", content: "업무함", selected: "inbox-tasks", items: [
 *       {content: "대기중인 작업", value: "inbox-tasks"},
 *       {content: "승인 요청", value: "inbox-approvals"}
 *     ]},
 *     {type: "menu", content: "서비스", selected: "service-wafer", items: [
 *       {content: "웨이퍼 관리", value: "service-wafer"},
 *       {content: "테스트 시스템", value: "service-test"}
 *     ]},
 *     {type: "menu", content: "설정", selected: "setting-general", items: [
 *       {content: "일반 설정", value: "setting-general"},
 *       {content: "사용자 관리", value: "setting-users"}
 *     ]},
 *     {type: "button", content: "새창", props: {value: "new-window"}}
 *   ]}
 *   onTabSelect={(value) => console.log(value)}
 * />
 *
 * <!-- 커스텀 레이아웃 -->
 * <Header>
 *   <Header.Logo>MyApp</Header.Logo>
 *   <Header.GNB>
 *      <Header.Tenant items=[{content: 'Tenant1', value: 'Tenant1'}]/>
 *      <Header.Divider />
 *      <Header.Menu items=[{content: 'Menu1-1', value: 'menu1-1'}]/>
 *      <Header.Menu items=[{content: 'Menu2-1', value: 'menu2-1'}]/>
 *   </Header.GNB>
 *   <Header.Utility>
 *      <Header.Searchbox placeholder="Search..." />
 *      <Header.Button notiCount={3}>Notification</Header.Button>
 *      <Header.Button badge>Update</Header.Button>
 *      <Header.Divider />
 *      <Header.Button>Q&A</Header.Button>
 *      <Header.Button>Help Desk</Header.Button>
 *      <Header.Divider />
 *      <Header.Button aria-label="login button">Admin</Header.Button>
 *      <Header.Button aria-label="profile image" icon={<DummyIcon />} />
 *      <Header.Image aria-label="confidential image" src={<ConfidentialLogo />} />
 *      <Header.Divider />
 *      <Header.HamburgerMenu items=[{content: 'Ham1', value: 'ham1'}] />
 *   </Header.Utility>
 * </Header.GNB>
 * </Header>
 *
 * <!-- 커스텀 2단 모드 -->
 * <Header withTabs>
 *   <div className="flex w-full items-center">
 *     <Header.Logo>MyApp</Header.Logo>
 *     <Header.GNB>
 *       <Header.Tenant items=[{content: 'Memory', value: 'memory'}]>Memory</Header.Tenant>
 *       <Header.Menu items={[{content: '제품', value: 'products'}]}>제품</Header.Menu>
 *     </Header.GNB>
 *     <Header.Utility>
 *       <Header.Searchbox />
 *       <Header.Button badge>알림</Header.Button>
 *     </Header.Utility>
 *   </div>
 *   <Header.Tabs>
 *     <Header.Menu items={[{content: '대시보드', value: 'favorite-dashboard'}, {content: '주요 리포트', value: 'favorite-reports'}]}>즐겨찾기</Header.Menu>
 *     <Header.Divider />
 *     <Header.Menu items={[{content: '대기중인 작업', value: 'inbox-tasks'}, {content: '승인 요청', value: 'inbox-approvals'}]}>업무함</Header.Menu>
 *   </Header.Tabs>
 * </Header>
 * </code></pre>
 */
const Header = Object.assign(HeaderRoot, {
  Link: HeaderLink,
  Menu: HeaderMenu,
  Divider: HeaderDivider,
  Button: HeaderButton,
  Image: HeaderImage,
  Logo: HeaderLogo,
  Tenant: HeaderTenant,
  HamburgerMenu: HeaderHamburgerMenu,
  GNB: HeaderGNB,
  Utility: HeaderUtility,
  Searchbox: HeaderSearchbox,
  Tabs: HeaderTabs,
})

/**
 * Header.Tabs 내부에 있는지 확인하는 커스텀 훅입니다.
 * @returns {boolean} Header.Tabs 내부에 있으면 true, 아니면 false
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const isInTabs = useHeaderTabsContext()
 *   return (
 *     <div className={cn("my-component", isInTabs && "in-tabs-style")}>
 *       Content
 *     </div>
 *   )
 * }
 * ```
 */
export const useHeaderTabsContext = () => React.useContext(HeaderTabsContext).isInTabs

// 선언 병합(Declaration Merging)을 위한 namespace를 정의합니다.
// 이 namespace는 Header 함수와 동일한 이름을 가집니다.
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace Header {
  /**
   * @see HeaderLink
   */
  export type Link = typeof HeaderLink
  /**
   * @see HeaderMenu
   */
  export type Menu = typeof HeaderMenu
  /**
   * @see HeaderDivider
   */
  export type Divider = typeof HeaderDivider
  /**
   * @see HeaderButton
   */
  export type Button = typeof HeaderButton
  /**
   * @see HeaderImage
   */
  export type Image = typeof HeaderImage
  /**
   * @see HeaderLogo
   */
  export type Logo = typeof HeaderLogo
  /**
   * @see HeaderTenant
   */
  export type Tenant = typeof HeaderTenant
  /**
   * @see HeaderHamburgerMenu
   */
  export type HamburgerMenu = typeof HeaderHamburgerMenu
  /**
   * @see HeaderGNB
   */
  export type GNB = typeof HeaderGNB
  /**
   * @see HeaderUtility
   */
  export type Utility = typeof HeaderUtility
  /**
   * @see HeaderSearchbox
   */
  export type Searchbox = typeof HeaderSearchbox
  /**
   * @see HeaderTabs
   */
  export type Tabs = typeof HeaderTabs
}

export { Header }
