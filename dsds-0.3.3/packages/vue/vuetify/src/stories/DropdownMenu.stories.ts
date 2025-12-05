import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { ref } from "vue"
import { DropdownMenu, VList, VListItem, VBtn, VCheckbox } from "@/components/ui"

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
      description: {
        component:
          "`DropdownMenu`는 Vuetify `VMenu`에 DSDS 기본 스타일과 유틸리티 슬롯을 더한 컴포넌트입니다. 기본 `items` 기반 렌더링과 완전한 슬롯 커스터마이징을 모두 지원합니다. 단, DSDS 디자인 가이드에 따라 `subtitle` 슬롯은 지원하지 않습니다.",
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

const baseItems = [
  { content: "프로필", value: "profile" },
  { content: "설정", value: "settings" },
  { content: "로그아웃", value: "logout" },
]

const DROPDOWN_BASIC_TEMPLATE = `
  <div class="flex flex-col items-start gap-4">
    <DropdownMenu v-model:selected="selected"
                  :items="items">
      기본 액션
    </DropdownMenu>
    <span class="text-sm text-gray-500">선택된 값: {{ selected }}</span>
  </div>
`

const DROPDOWN_CUSTOM_LIST_TEMPLATE = `
  <DropdownMenu v-model:selected="selected"
                :items="items">
    <template #activator="{ props }">
      <VBtn variant="secondary" v-bind="props">
        필터 변경
      </VBtn>
    </template>
    <template #list="{ items, select, selected: selectedValue }">
      <VList class="min-w-64 py-2">
        <VListItem v-for="item in items"
                   :key="item.value"
                   :active="selectedValue === item.value"
                   @click="select(item)">
          <template #prepend>
            <VCheckbox :model-value="selectedValue === item.value"
                       hide-details
                       @click.stop="select(item)" />
          </template>
          <template #title>{{ item.content }}</template>
        </VListItem>
      </VList>
    </template>
  </DropdownMenu>
`

const DROPDOWN_DISABLED_TEMPLATE = `
  <div class="flex flex-col items-start gap-4">
    <DropdownMenu v-model:selected="selected"
                  :items="items">
      작업 메뉴
    </DropdownMenu>
    <span class="text-sm text-gray-500">선택된 값: {{ selected }}</span>
  </div>
`

export const Basic: Story = {
  name: "기본 메뉴",
  parameters: {
    docs: {
      source: {
        code: DROPDOWN_BASIC_TEMPLATE.trim(),
      },
    },
  },
  render: () => ({
    components: { DropdownMenu },
    setup() {
      const selected = ref<string | undefined>(baseItems[0]?.value)
      const items = ref(baseItems)

      return { selected, items }
    },
    template: DROPDOWN_BASIC_TEMPLATE,
  }),
}

export const WithCustomListSlot: Story = {
  name: "커스텀 (왼쪽 체크박스)",
  parameters: {
    docs: {
      source: {
        code: DROPDOWN_CUSTOM_LIST_TEMPLATE.trim(),
      },
    },
  },
  render: () => ({
    components: {
      DropdownMenu,
      VBtn,
      VCheckbox,
      VList,
      VListItem,
    },
    setup() {
      const items = ref([
        { content: "All", value: "all" },
        { content: "Active", value: "active" },
        { content: "Archived", value: "archived" },
      ])
      const selected = ref<string | undefined>(items.value[0]?.value)

      return { items, selected }
    },
    template: DROPDOWN_CUSTOM_LIST_TEMPLATE,
  }),
}

export const WithDisabledItems: Story = {
  name: "비활성 항목 포함",
  parameters: {
    docs: {
      source: {
        code: DROPDOWN_DISABLED_TEMPLATE.trim(),
      },
    },
  },
  render: () => ({
    components: { DropdownMenu },
    setup() {
      const items = ref([
        { content: "새로 만들기", value: "create" },
        { content: "복사", value: "duplicate", disabled: true },
        { content: "삭제", value: "delete" },
      ])
      const selected = ref<string | undefined>(items.value[0]?.value)

      return { items, selected }
    },
    template: DROPDOWN_DISABLED_TEMPLATE,
  }),
}
