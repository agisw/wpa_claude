"use client"

import { ReactNode, useState } from "react"
import { cx } from "class-variance-authority"

type Tab = {
  label: string
  content: ReactNode
}

type TabsProps = {
  tabs: Tab[]
  defaultIndex?: number
  className?: string
}

export function Tabs({ tabs, defaultIndex = 0, className }: TabsProps) {
  const [active, setActive] = useState(defaultIndex)

  return (
    <div className={cx("flex w-full flex-col gap-1", className)}>
      <div className="flex w-full gap-1 border-b border-gray-300">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            className={cx("flex flex-col px-0 py-0 transition-colors focus:outline-none")}
            onClick={() => setActive(idx)}
            type="button"
            aria-selected={active === idx}
            tabIndex={active === idx ? 0 : -1}
          >
            <span className={cx("px-2 py-1 !font-sans !text-sm", active === idx && "font-bold")}>{tab.label}</span>
            <u className={cx(active === idx && "relative bottom-0 mb-[-1px] h-[2px] w-full bg-gray-500")}></u>
          </button>
        ))}
      </div>
      <div className="flex-1">{tabs[active]?.content}</div>
    </div>
  )
}
