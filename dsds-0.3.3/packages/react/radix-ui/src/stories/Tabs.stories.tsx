import type { Meta, StoryObj } from "@storybook/react-vite"

import { Tabs, TabsContent, TabsList, TabsTrigger, tabsVariantsConfig } from "@/components/ui"

import { radioControl, rangeControl } from "./utils"

const meta = {
  title: "Components/Tabs",
  tags: ["autodocs"],
  component: Tabs, // 실제 Tabs 컴포넌트를 지정하여 JSDoc을 사용하도록 함
  parameters: {
    layout: "fullscreen",
    docs: {
      codePanel: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="h-full w-full p-2">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: radioControl(Object.keys(tabsVariantsConfig.variant)),
    size: radioControl(Object.keys(tabsVariantsConfig.size)),
    width: rangeControl(200, 500),
  },
  args: {},
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>
type TabsStoryArgs = Story["args"]

const defaultArgs: TabsStoryArgs = {
  variant: "default",
  size: "medium",
}

/**
 * 기본 탭 컴포넌트입니다. Underline 스타일의 기본 탭입니다.
 */
export const Default: Story = {
  args: {
    ...defaultArgs,
  },
  render: (args) => (
    <Tabs {...args} defaultValue="Tab 1" className="w-full border border-red-100">
      <TabsList>
        <TabsTrigger value="Tab 1">Tab 1</TabsTrigger>
        <TabsTrigger value="Tab 2">Tab 2</TabsTrigger>
        <TabsTrigger value="Tab 3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="Tab 1">
        <div className="flex flex-col gap-2">
          <h3 className="mb-2 text-lg font-semibold">탭 1 내용</h3>
          <p className="text-gray-600">탭 1의 내용입니다. 여기에 React 컴포넌트를 자유롭게 넣을 수 있어요.</p>
        </div>
      </TabsContent>
      <TabsContent value="Tab 2">
        <div className="flex flex-col gap-2">
          <h3 className="mb-2 text-lg font-semibold">탭 2 내용</h3>
          <p className="text-gray-600">탭 2의 내용입니다. 여기에 React 컴포넌트를 자유롭게 넣을 수 있어요.</p>
        </div>
      </TabsContent>
      <TabsContent value="Tab 3">
        <div className="flex flex-col gap-2">
          <h3 className="mb-2 text-lg font-semibold">탭 3 내용</h3>
          <p className="text-gray-600">탭 3의 내용입니다. 여기에 React 컴포넌트를 자유롭게 넣을 수 있어요.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: "기본 탭 컴포넌트입니다. Underline 스타일의 기본 탭입니다.",
      },
    },
  },
}

/**
 * 버튼 스타일 탭입니다. 더 굵은 테두리와 버튼 같은 외관을 가집니다.
 */
export const Button: Story = {
  args: {
    ...defaultArgs,
    variant: "button",
  },
  render: (args) => (
    <Tabs {...args} defaultValue="Tab 1" className="w-full border border-red-100">
      <TabsList>
        <TabsTrigger value="Tab 1">Tab 1</TabsTrigger>
        <TabsTrigger value="Tab 2">Tab 2</TabsTrigger>
        <TabsTrigger value="Tab 3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="Tab 1">
        <div className="flex flex-col gap-2">
          <h3 className="mb-2 text-lg font-semibold">탭 1 내용</h3>
          <p className="text-gray-600">탭 1의 내용입니다. 여기에 React 컴포넌트를 자유롭게 넣을 수 있어요.</p>
        </div>
      </TabsContent>
      <TabsContent value="Tab 2">
        <div className="flex flex-col gap-2">
          <h3 className="mb-2 text-lg font-semibold">탭 2 내용</h3>
          <p className="text-gray-600">탭 2의 내용입니다. 여기에 React 컴포넌트를 자유롭게 넣을 수 있어요.</p>
        </div>
      </TabsContent>
      <TabsContent value="Tab 3">
        <div className="flex flex-col gap-2">
          <h3 className="mb-2 text-lg font-semibold">탭 3 내용</h3>
          <p className="text-gray-600">탭 3의 내용입니다. 여기에 React 컴포넌트를 자유롭게 넣을 수 있어요.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: "버튼 스타일 탭입니다. 더 굵은 테두리와 버튼 같은 외관을 가집니다.",
      },
    },
  },
}

/**
 * 작은 크기의 탭입니다. 더 컴팩트한 디자인에 적합합니다.
 */
export const Small: Story = {
  args: {
    ...defaultArgs,
    size: "small",
  },
  render: (args) => (
    <Tabs {...args} defaultValue="Tab 1" className="w-full border border-red-100">
      <TabsList>
        <TabsTrigger value="Tab 1">Tab 1</TabsTrigger>
        <TabsTrigger value="Tab 2">Tab 2</TabsTrigger>
      </TabsList>
      <TabsContent value="Tab 1">
        <div className="flex flex-col gap-2">
          <h3 className="mb-2 text-lg font-semibold">Tab 1</h3>
          <p className="text-gray-600">탭 1의 내용입니다.</p>
        </div>
      </TabsContent>
      <TabsContent value="Tab 2">
        <div className="flex flex-col gap-2">
          <h3 className="mb-2 text-lg font-semibold">Tab 2</h3>
          <p className="text-gray-600">탭 2의 내용입니다. </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: "작은 크기의 탭입니다. 더 컴팩트한 디자인에 적합합니다.",
      },
    },
  },
}

/**
 * [QA] 다양한 탭 상태 테스트용 스토리입니다.
 * - Default: 기본 상태
 * - Hover: 호버 상태
 * - Selected: 선택된 상태
 * - Disabled: 비활성화 상태
 * - Focused: 포커스 상태
 */
export const TabsCombinations: Story = {
  tags: ["!dev"],
  render: () => {
    // variant별로 다른 상태 클래스를 반환하는 함수
    const getTabStates = (variant: "default" | "button") => [
      { label: "Default", value: "default", className: "" },
      {
        label: "Hover",
        value: "hover",
        className: variant === "default" ? "dsds-tab-trigger-default-hover!" : "dsds-tab-trigger-button-hover!",
      },
      { label: "Selected", value: "selected", className: "dsds-tab-trigger-selected!" },
      { label: "Disabled", value: "disabled", className: "dsds-tab-trigger-disabled!" },
      {
        label: "Focused",
        value: "focused",
        className: variant === "default" ? "dsds-tab-trigger-default-focus!" : "dsds-tab-trigger-button-focus!",
      },
    ]

    const combinations = [
      { variant: "default" as const, sizes: ["medium", "small"] as const, title: "기본 스타일" },
      { variant: "button" as const, sizes: ["medium", "small"] as const, title: "버튼 스타일" },
    ]

    return (
      <>
        {combinations.map(({ variant, sizes, title }) => {
          const tabStates = getTabStates(variant)

          return (
            <div key={variant}>
              <h3 className="mb-4 text-lg font-semibold">{title}</h3>
              <div className="flex flex-col gap-2">
                {sizes.map((size) => (
                  <div key={size}>
                    <h4 className="text-md mb-2 font-semibold">{size} 크기</h4>
                    <Tabs
                      variant={variant}
                      size={size}
                      defaultValue="selected"
                      className="mb-4 w-full border border-red-50"
                    >
                      <TabsList>
                        {tabStates.map((state) => (
                          <TabsTrigger
                            key={state.value}
                            value={state.value}
                            className={state.className}
                            disabled={state.value === "disabled"}
                          >
                            {state.label}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      {tabStates.map((state) => (
                        <TabsContent key={state.value} value={state.value}>
                          <div className="p-2">
                            <p className="text-gray-600">{state.label} 상태의 탭 콘텐츠입니다.</p>
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </>
    )
  },
  parameters: {
    docs: {
      codePanel: false,
      description: {
        story:
          "QA용 상태 테스트입니다. 다양한 상태(기본, 호버, 선택됨, 비활성화, 포커스)의 Tab 표시를 확인할 수 있습니다.",
      },
    },
  },
}

/**
 * [QA] Disabled 상태 테스트용 스토리입니다.
 * 실제 disabled 속성을 사용하여 동작을 확인할 수 있습니다.
 */
export const DisabledTest: Story = {
  tags: ["!dev"],
  render: () => {
    return (
      <div className="space-y-8">
        {/* Default variant */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">기본 스타일 - Disabled 테스트</h3>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-sm font-medium text-gray-600">Medium 크기</h4>
              <Tabs variant="default" size="medium" defaultValue="tab1" className="w-full border border-red-50">
                <TabsList>
                  <TabsTrigger value="tab1">활성 탭</TabsTrigger>
                  <TabsTrigger value="tab2" disabled>
                    비활성 탭
                  </TabsTrigger>
                  <TabsTrigger value="tab3">일반 탭</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                  <div className="p-2">
                    <p className="text-gray-600">이 탭은 정상적으로 동작합니다.</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab2">
                  <div className="p-2">
                    <p className="text-gray-600">이 탭은 disabled 상태라서 접근할 수 없습니다.</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab3">
                  <div className="p-2">
                    <p className="text-gray-600">이 탭도 정상적으로 동작합니다.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium text-gray-600">Small 크기</h4>
              <Tabs variant="default" size="small" defaultValue="tab1" className="w-full border border-red-50">
                <TabsList>
                  <TabsTrigger value="tab1">활성</TabsTrigger>
                  <TabsTrigger value="tab2" disabled>
                    비활성
                  </TabsTrigger>
                  <TabsTrigger value="tab3">일반</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                  <div className="p-2">
                    <p className="text-gray-600">활성 탭 내용입니다.</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab3">
                  <div className="p-2">
                    <p className="text-gray-600">일반 탭 내용입니다.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Button variant */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">버튼 스타일 - Disabled 테스트</h3>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-sm font-medium text-gray-600">Medium 크기</h4>
              <Tabs variant="button" size="medium" defaultValue="tab1" className="w-full border border-red-50">
                <TabsList>
                  <TabsTrigger value="tab1">활성 탭</TabsTrigger>
                  <TabsTrigger value="tab2" disabled>
                    비활성 탭
                  </TabsTrigger>
                  <TabsTrigger value="tab3">일반 탭</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                  <div className="p-4">
                    <p className="text-gray-600">
                      버튼 스타일에서 비활성 탭에 마우스를 올려도 hover 효과가 나타나지 않는지 확인하세요.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="tab3">
                  <div className="p-4">
                    <p className="text-gray-600">이 탭은 hover 효과가 정상적으로 동작합니다.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium text-gray-600">Small 크기</h4>
              <Tabs variant="button" size="small" defaultValue="tab1" className="w-full border border-red-50">
                <TabsList>
                  <TabsTrigger value="tab1">활성</TabsTrigger>
                  <TabsTrigger value="tab2" disabled>
                    비활성
                  </TabsTrigger>
                  <TabsTrigger value="tab3">일반</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                  <div className="p-4">
                    <p className="text-gray-600">버튼 스타일 활성 탭 내용입니다.</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab3">
                  <div className="p-4">
                    <p className="text-gray-600">버튼 스타일 일반 탭 내용입니다.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      codePanel: false,
      description: {
        story:
          "실제 disabled 속성을 사용한 테스트입니다. disabled 탭은 클릭할 수 없고, hover 효과도 나타나지 않아야 합니다.",
      },
    },
  },
}
