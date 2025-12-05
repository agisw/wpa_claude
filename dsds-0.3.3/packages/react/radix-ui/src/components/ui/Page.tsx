import { cn } from "@/lib/utils"
import { ChevronLeftIcon, InformationIcon } from "@/components/icons"

import { Button } from "./Button"
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip"

type Props = {
  title?: string
  tooltipContent?: React.ReactNode | string
} & React.ComponentProps<"div">

export function PageHeader({ className, children, title, tooltipContent, ...props }: Props) {
  return (
    <div
      className={cn(
        "dsds-page-header flex h-[40px] flex-row items-center bg-[var(--colors-neutral-neutral-04)]",
        className
      )}
      {...props}
    >
      <div className="typo-sok-h4-20-700 flex w-full flex-row items-center gap-[12px] px-[12px]">
        <div className="flex flex-shrink-0 flex-row items-center">
          {title}
          <Tooltip place="bottom-start">
            <TooltipTrigger>
              <div className="flex h-[24px] w-[24px] items-center justify-center">
                <InformationIcon />
              </div>
            </TooltipTrigger>
            <TooltipContent>{tooltipContent}</TooltipContent>
          </Tooltip>
        </div>
        {children}
      </div>
    </div>
  )
}

export function DetailPageHeader({ className, children, title, tooltipContent, ...props }: Props) {
  //뒤로 가기 로직: react-router-dom의 useNavigate를 사용하여 이전 페이지로 이동
  return (
    <div className={cn("top-0 z-10 flex h-[40px] flex-row items-center bg-white", className)} {...props}>
      <div className="typo-sok-h4-20-700 flex flex-row gap-[12px] px-[16px] py-[8px]">
        <Button variant="secondary" icon={<ChevronLeftIcon />} />
        <div className="flex items-center">
          {title}
          <Tooltip place="bottom-start">
            <TooltipTrigger>
              <div className="flex h-[24px] w-[24px] items-center justify-center">
                <InformationIcon />
              </div>
            </TooltipTrigger>
            <TooltipContent>{tooltipContent}</TooltipContent>
          </Tooltip>
        </div>
        {children}
      </div>
    </div>
  )
}

type PageContentHeaderProps = {
  title: string
  tooltip?: {
    title: string
    content: string
  }
  children?: React.ReactNode
}

export function PageContentHeader({ title, tooltip, children }: PageContentHeaderProps) {
  return (
    <>
      <div className={cn("dsds-page-content-header typo-sok-h6-14-700 flex flex-row items-center gap-[4px] py-[12px]")}>
        {title}
        {tooltip && (
          <Tooltip place="bottom-start">
            <TooltipTrigger>
              <InformationIcon />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">{tooltip.title}</p>
              <p>{tooltip.content}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      {children}
    </>
  )
}

type DetailPageContentHeaderProps = {
  title: string
  children?: React.ReactNode
}
export function DetailPageContentHeader({ title, children }: DetailPageContentHeaderProps) {
  return (
    <>
      <div className="flex flex-row items-center pt-[15px] pb-[1px]">
        <div className="typo-sok-h6-14-700 mr-auto">{title}</div>
        {children}
      </div>
      <PageContentDivider />
    </>
  )
}

export const PageContentDivider = () => (
  <div className="my-[14px] h-[1px] shrink-0 bg-[var(--color-border-border-2-outer)]" />
)

type PageContentProps = {
  children: React.ReactNode
  className?: string
}

export const PageContent = ({ children, className }: PageContentProps) => {
  return (
    <div
      className={cn(
        "dsds-page-content flex h-full w-full flex-1 flex-col overflow-hidden bg-white px-[12px] py-[12px]",
        className
      )}
    >
      {children}
    </div>
  )
}

type DetailPageContentProps = {
  children: React.ReactNode
  className?: string
}

export const DetailPageContent = ({ children, className }: DetailPageContentProps) => {
  return (
    <div className={cn("dsds-detail-page-content flex w-full flex-1 flex-col bg-white px-[16px] pb-[14px]", className)}>
      {children}
    </div>
  )
}

type PagetContentToolsProps = {
  children?: React.ReactNode
}

export const PageContentTools = ({ children }: PagetContentToolsProps) => {
  return (
    <div className="dsds-page-content-tools typo-sok-footnote-11-400 flex flex-row items-center gap-[4px] pb-[12px] text-[var(--colors-neutral-neutral-15)]">
      {children}
    </div>
  )
}

type PageContentBodyProps = {
  children: React.ReactNode
  className?: string
}

export const PageContentBody = ({ className, children }: PageContentBodyProps) => {
  return <div className={cn("dsds-page-content-body flex-1", className)}>{children}</div>
}

type PageProps = {
  children?: React.ReactNode
}
export const Page = ({ children }: PageProps) => <div className="dsds-page-root flex w-full flex-col">{children}</div>
