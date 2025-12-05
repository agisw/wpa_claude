import React from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { PageTabs } from "@/components/ui/Pagetabs"

interface PageTabsStoryMeta extends Meta<typeof PageTabs> {
  argTypes?: Record<string, unknown>
}

const meta: PageTabsStoryMeta = {
  title: "Components/PageTabs",
  tags: ["autodocs"],
  component: PageTabs,
  parameters: {
    layout: "fullscreen",
    controls: { expanded: true },
    docs: {
      canvas: {
        sourceState: "none",
      },
    },
  },
  argTypes: {
    tabs: { table: { disable: true } },
    activeId: { table: { disable: true } },
    onSelect: { table: { disable: true } },
    onClose: { table: { disable: true } },
    size: {
      control: false,
      options: { disable: true },
    },
  },
}

export default meta
type Story = StoryObj<typeof PageTabs>

type TabItem = { id: string; name: string }

const nextTab = (tabs: TabItem[]): TabItem => {
  const last = tabs[tabs.length - 1]
  const lastNum = last?.name?.match(/Menu(\d+)/)?.[1]
  const n = lastNum ? parseInt(lastNum, 10) + 1 : tabs.length + 1
  return { id: `tab-${n}`, name: `Menu${String(n).padStart(2, "0")}` }
}

export const Compact: Story = {
  render: () => {
    const [tabs, setTabs] = React.useState<TabItem[]>([
      { id: "tab-1", name: "Menu01" },
      { id: "tab-2", name: "Menu02" },
      { id: "tab-3", name: "Menu03" },
    ])
    const [activeId, setActiveId] = React.useState<string | undefined>(tabs[0]?.id)
    const [showExtraButton, setShowExtraButton] = React.useState(false)

    const handleAdd = () => {
      const newTab = nextTab(tabs)
      setTabs((prev) => [...prev, newTab])
      setActiveId(newTab.id)
    }

    const handleRemove = () => {
      if (tabs.length === 0) return
      const removed = tabs[tabs.length - 1]
      setTabs((prev) => prev.slice(0, -1))
      if (removed.id === activeId) {
        const prev = tabs[tabs.length - 2]
        setActiveId(prev?.id)
      }
    }

    return (
      <>
        <div className="flex h-[500px] flex-col items-start justify-start p-4">
          <div className="flex gap-3">
            <button
              className="rounded-xs border border-gray-300 px-2.5 py-0.5 text-xs hover:bg-gray-100"
              onClick={handleAdd}
            >
              탭 추가
            </button>
            <button
              className="rounded-xs border border-gray-300 px-2.5 py-0.5 text-xs hover:bg-gray-100"
              onClick={handleRemove}
            >
              탭 삭제
            </button>
            <button
              className={`rounded-xs border border-gray-300 px-2.5 py-0.5 text-xs transition-colors ${
                showExtraButton ? "hover:bg-gray-100" : "bg-[#3392D3] text-white"
              }`}
              onClick={() => setShowExtraButton((prev) => !prev)}
            >
              {showExtraButton ? "추가 버튼 숨기기" : "추가 버튼 보기"}
            </button>
          </div>

          <div className="mt-3 w-[400px] rounded-sm border border-gray-300 bg-gray-50 p-2 text-xs text-gray-700">
            <p className="mb-1 font-semibold text-gray-800">열린 탭 목록</p>
            {tabs.length > 0 ? (
              <ul className="list-inside list-disc space-y-0.5">
                {tabs.map((tab) => (
                  <li
                    key={tab.id}
                    className={`flex justify-between ${
                      tab.id === activeId ? "font-semibold text-[#3392D3]" : "text-gray-600"
                    }`}
                  >
                    <span>{tab.name}</span>
                    {tab.id === activeId && <span className="text-[11px] text-gray-400">active</span>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 italic">현재 열린 탭이 없습니다.</p>
            )}
          </div>
        </div>

        <PageTabs
          tabs={tabs}
          activeId={activeId}
          onSelect={setActiveId}
          onClose={(id) => {
            setTabs((prev) => prev.filter((t) => t.id !== id))
            if (id === activeId) {
              const idx = tabs.findIndex((t) => t.id === id)
              const fallback = idx > 0 ? tabs[idx - 1]?.id : tabs[idx + 1]?.id
              setActiveId(fallback)
            }
          }}
          showExtraButton={showExtraButton}
          size="compact"
        />
      </>
    )
  },
}

export const Cozy: Story = {
  render: () => {
    const [tabs, setTabs] = React.useState<TabItem[]>([
      { id: "tab-1", name: "Menu01" },
      { id: "tab-2", name: "Menu02" },
      { id: "tab-3", name: "Menu03" },
    ])
    const [activeId, setActiveId] = React.useState<string | undefined>(tabs[0]?.id)
    const [showExtraButton, setShowExtraButton] = React.useState(false)

    const handleAdd = () => {
      const newTab = nextTab(tabs)
      setTabs((prev) => [...prev, newTab])
      setActiveId(newTab.id)
    }

    const handleRemove = () => {
      if (tabs.length === 0) return
      const removed = tabs[tabs.length - 1]
      setTabs((prev) => prev.slice(0, -1))
      if (removed.id === activeId) {
        const prev = tabs[tabs.length - 2]
        setActiveId(prev?.id)
      }
    }

    return (
      <>
        <div className="flex h-[500px] flex-col items-start justify-start p-4">
          <div className="flex gap-3">
            <button
              className="rounded-xs border border-gray-300 px-2.5 py-0.5 text-xs hover:bg-gray-100"
              onClick={handleAdd}
            >
              탭 추가
            </button>
            <button
              className="rounded-xs border border-gray-300 px-2.5 py-0.5 text-xs hover:bg-gray-100"
              onClick={handleRemove}
            >
              탭 삭제
            </button>
            <button
              className={`rounded-xs border border-gray-300 px-2.5 py-0.5 text-xs transition-colors ${
                showExtraButton ? "hover:bg-gray-100" : "bg-[#3392D3] text-white"
              }`}
              onClick={() => setShowExtraButton((prev) => !prev)}
            >
              {showExtraButton ? "추가 버튼 숨기기" : "추가 버튼 보기"}
            </button>
          </div>

          <div className="mt-3 w-[400px] rounded-sm border border-gray-300 bg-gray-50 p-2 text-xs text-gray-700">
            <p className="mb-1 font-semibold text-gray-800">열린 탭 목록</p>
            {tabs.length > 0 ? (
              <ul className="list-inside list-disc space-y-0.5">
                {tabs.map((tab) => (
                  <li
                    key={tab.id}
                    className={`flex justify-between ${
                      tab.id === activeId ? "font-semibold text-[#3392D3]" : "text-gray-600"
                    }`}
                  >
                    <span>{tab.name}</span>
                    {tab.id === activeId && <span className="text-[11px] text-gray-400">active</span>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 italic">현재 열린 탭이 없습니다.</p>
            )}
          </div>
        </div>

        <PageTabs
          tabs={tabs}
          activeId={activeId}
          onSelect={setActiveId}
          onClose={(id) => {
            setTabs((prev) => prev.filter((t) => t.id !== id))
            if (id === activeId) {
              const idx = tabs.findIndex((t) => t.id === id)
              const fallback = idx > 0 ? tabs[idx - 1]?.id : tabs[idx + 1]?.id
              setActiveId(fallback)
            }
          }}
          showExtraButton={showExtraButton}
          size="cozy"
        />
      </>
    )
  },
}
