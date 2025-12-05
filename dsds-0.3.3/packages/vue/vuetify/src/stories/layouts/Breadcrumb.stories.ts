import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { Breadcrumb, BreadcrumbElement, BreadcrumbText, BreadcrumbSelect } from "@/components/ui/breadcrumb"

const meta: Meta<typeof Breadcrumb> = {
  title: "Layouts/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
네비게이션 경로를 표시하는 브레드크럼 컴포넌트입니다. 사용자가 현재 위치한 페이지의 계층 구조를 시각적으로 표현하여 직관적인 네비게이션을 제공합니다.

### 주요 기능 <features />
- **계층적 네비게이션 표시**: 홈 > 카테고리 > 서브카테고리 > 현재페이지 형태로 경로 표시
- **자동 생략 기능**: 5개 이상의 깊은 계층에서 중간 부분을 "..."으로 생략 (React와 동일한 방식)
- **다양한 아이템 타입**: 텍스트 링크와 드롭다운 선택 메뉴 지원
- **접근성 지원**: 키보드 네비게이션과 스크린 리더 지원
- **반응형 디자인**: 모바일과 데스크톱에서 최적화된 표시

### 사용 방법 <usages />

#### 1. 슬롯 기반 사용법
\`\`\`html
<Breadcrumb ellipsis>
  <BreadcrumbElement>
    <BreadcrumbText href="/home">홈</BreadcrumbText>
  </BreadcrumbElement>
  <BreadcrumbElement>
    <BreadcrumbSelect
      :dropdown-items="[
        {title: '전자제품', value: 'electronics'},
        {title: '의류', value: 'clothing'}
      ]"
      @select="handleCategorySelect"
    >
      카테고리
    </BreadcrumbSelect>
  </BreadcrumbElement>
  <BreadcrumbElement :is-last="true">
    <BreadcrumbText>현재 상품</BreadcrumbText>
  </BreadcrumbElement>
</Breadcrumb>
\`\`\`

#### 2. 데이터 기반 사용법
\`\`\`html
<Breadcrumb
  ellipsis
  :items="[
    { title: '홈', href: '/home' },
    {
      type: 'select',
      title: '카테고리',
      dropdownItems: [
        {title: '전자제품', value: 'electronics'},
        {title: '의류', value: 'clothing'}
      ]
    },
    { title: '현재 상품', selected: true }
  ]"
/>
\`\`\`

### Props 설명 <props />
- \`ellipsis\` (boolean, optional): 5개 이상의 아이템에서 중간을 생략할지 여부
- \`items\` (BreadcrumbItem[] | string[], optional): 데이터 기반으로 브레드크럼을 구성할 때 사용하는 아이템 배열 (문자열 배열 또는 객체 배열)

### 슬롯 설명 <slots />
- \`default\`: 기본 슬롯 - BreadcrumbElement 컴포넌트들을 포함
- \`first\`: ellipsis가 true일 때 첫 번째 요소를 위한 슬롯
- \`lastThree\`: ellipsis가 true일 때 마지막 3개 요소를 위한 슬롯

### 이벤트 <events />
- \`@select\`: 드롭다운 메뉴에서 아이템 선택 시 발생 (BreadcrumbSelect에서)
        `,
      },
    },
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: "기본 사용법",
  parameters: {
    docs: {
      description: {
        story: `
기본적인 브레드크럼 사용 예시입니다. 홈 > 카테고리 > 현재페이지 형태의 간단한 네비게이션 구조를 보여줍니다.

**특징**
- 텍스트 링크와 드롭다운 선택 메뉴의 조합
- ellipsis 속성으로 긴 경로에서 중간 생략
- 각 요소의 hover 및 선택 상태 표시
        `,
      },
    },
  },
  render: () => ({
    components: {
      Breadcrumb,
      BreadcrumbElement,
      BreadcrumbText,
      BreadcrumbSelect,
    },
    setup() {
      const handleSelect = (value: string) => {
        console.log("Selected:", value)
      }

      return { handleSelect }
    },
    template: `
      <div class="p-4">
        <Breadcrumb ellipsis>
          <BreadcrumbElement>
            <BreadcrumbText href="/home">Home</BreadcrumbText>
          </BreadcrumbElement>
          <BreadcrumbElement>
            <BreadcrumbSelect
              :dropdown-items="[{title: 'Option 1', value: '1'}]"
              @select="handleSelect"
            >
              Category
            </BreadcrumbSelect>
          </BreadcrumbElement>
          <BreadcrumbElement :is-last="true">
            <BreadcrumbText selected>Current Page</BreadcrumbText>
          </BreadcrumbElement>
        </Breadcrumb>
      </div>
    `,
  }),
}

export const WithMultipleDropdowns: Story = {
  name: "다중 드롭다운 메뉴",
  parameters: {
    docs: {
      description: {
        story: `
여러 개의 드롭다운 메뉴가 포함된 브레드크럼 예시입니다. 복잡한 계층 구조에서 각 레벨마다 선택 옵션을 제공할 수 있습니다.

**특징**
- 여러 드롭다운 메뉴의 조합
- 각 메뉴의 독립적인 이벤트 처리
- 긴 텍스트의 자동 생략 및 툴팁 표시
        `,
      },
    },
  },
  render: () => ({
    components: {
      Breadcrumb,
      BreadcrumbElement,
      BreadcrumbText,
      BreadcrumbSelect,
    },
    setup() {
      const dropdownItems = [
        { title: "Option 1", value: "opt1" },
        { title: "Option 2", value: "opt2" },
        { title: "Option 3", value: "opt3" },
      ]

      const handleSelect = (value: string) => {
        console.log("Selected:", value)
      }

      return { dropdownItems, handleSelect }
    },
    template: `
      <div class="p-4">
        <Breadcrumb ellipsis>
          <BreadcrumbElement>
            <BreadcrumbText href="/home">Home</BreadcrumbText>
          </BreadcrumbElement>
          <BreadcrumbElement>
            <BreadcrumbSelect
              :dropdown-items="dropdownItems"
              @select="handleSelect"
            >
              Category
            </BreadcrumbSelect>
          </BreadcrumbElement>
          <BreadcrumbElement>
            <BreadcrumbSelect
              :dropdown-items="dropdownItems"
              @select="handleSelect"
            >
              Subcategory
            </BreadcrumbSelect>
          </BreadcrumbElement>
          <BreadcrumbElement :is-last="true">
            <BreadcrumbText selected>Current Page</BreadcrumbText>
          </BreadcrumbElement>
        </Breadcrumb>
      </div>
    `,
  }),
}

export const FromItems: Story = {
  name: "데이터 기반 구성",
  parameters: {
    docs: {
      description: {
        story: `
데이터 배열을 기반으로 브레드크럼을 구성하는 예시입니다. 동적으로 생성되는 네비게이션 구조에 유용합니다.

**특징**
- items prop을 통한 선언적 구성
- 텍스트와 드롭다운 타입의 자동 구분
- 데이터 기반의 동적 렌더링
- 간단한 props 설정으로 복잡한 구조 구현
        `,
      },
    },
  },
  render: () => ({
    components: {
      Breadcrumb,
    },
    setup() {
      const items = [
        { title: "Home", href: "/home", type: "text" },
        { title: "Category", type: "select", dropdownItems: [{ title: "Option 1", value: "1" }] },
        { title: "Subcategory", href: "/category/sub", type: "text" },
        { title: "Current Page", selected: true, type: "text" },
      ]

      return { items }
    },
    template: `
      <div class="p-4">
        <Breadcrumb :items="items" ellipsis />
      </div>
    `,
  }),
}

export const EllipsisComparison: Story = {
  name: "중간 생략 기능 비교",
  parameters: {
    docs: {
      description: {
        story: `
5개 이상의 아이템에서 중간을 생략할지 여부를 비교하는 예시입니다. 긴 네비게이션 경로에서 사용자 경험을 개선하기 위한 ellipsis 기능의 효과를 보여줍니다.

**특징**
- **ellipsis="true"**: 5개 이상의 아이템에서 중간 부분을 "..."으로 생략하여 공간 절약 (React와 동일한 방식)
- **ellipsis="false"**: 모든 아이템을 그대로 표시 (긴 경로에서 공간을 많이 차지할 수 있음)
- 긴 계층 구조의 네비게이션에서 가독성 개선
- 모바일 환경에서 특히 유용한 기능
- **React와 동일**: 문자열 배열로 간단하게 사용 가능
        `,
      },
    },
  },
  render: () => ({
    components: {
      Breadcrumb,
    },
    setup() {
      const longItems = ["Home", "Electronics", "Smartphones", "Android", "Samsung", "Galaxy S24", "Specifications"]

      return { longItems }
    },
    template: `
      <div class="space-y-6 p-4">
        <div>
          <h3 class="text-lg font-semibold mb-2">중간 생략 활성화 (ellipsis="true")</h3>
          <p class="text-sm text-gray-600 mb-3">5개 이상의 아이템에서 중간 부분을 "..."으로 생략하여 공간을 절약합니다.</p>
          <Breadcrumb :items="longItems" ellipsis />
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-2">중간 생략 비활성화 (ellipsis="false")</h3>
          <p class="text-sm text-gray-600 mb-3">모든 아이템을 그대로 표시합니다. 긴 경로에서 공간을 많이 차지할 수 있습니다.</p>
          <Breadcrumb :items="longItems" :ellipsis="false" />
        </div>
      </div>
    `,
  }),
}
