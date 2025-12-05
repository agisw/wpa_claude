<template>
  <UMDefaultLayout
       v-bind="$attrs">
    <Header :logo="logo" :gnb="headerNavigation" :utility="utility" :theme="theme" />
    <UMDefaultLayoutBody>
      <LNB :data="lnbData"
           :default-selected-item-id="defaultSelectedItemId"
           v-model:selected-item-id="selectedItemId"
           v-model:search-text="searchValue"
           @selectionChange="handleSelectionChange"
           >
        <template #title>
          <Searchbox v-model="searchValue"
                     placeholder="메뉴명 검색"
                     class="lnb-title-searchbox"
                     @update:model-value="handleSearchInput"
                     @search="handleSearchInput" />
        </template>
      </LNB>
      <Page>
        <PageHeader v-if="activeTab"
                    :title="activeTab.label"
                    :favorite="activeTab.isFavorite"
                    showFavorite
                    @update:favorite="handleFavoriteUpdate">
          <template #tools>
            <Breadcrumb :items="breadcrumbItems"
                        ellipsis />
          </template>
          <template #filter>
            <PageHeaderFilterRow>
              <FormField label="Line"
                         required>
                <VSelect ref="lineSelectRef"
                         v-model="searchParams.lineId"
                         :items="lineIdItems"
                         :placeholder="placeholders.lineId"
                         item-title="lineTitle"
                         item-value="lineId"
                         clearable
                         @update:modelValue="changeLineId" />
              </FormField>
              <FormField label="Area">
                <VSelect v-model="searchParams.area"
                         :items="areaItems"
                         :placeholder="placeholders.area"
                         item-title="title"
                         item-value="value"
                         clearable
                         @update:modelValue="changeArea" />
              </FormField>
              <FormField label="상태">
                <VSelect v-model="searchParams.status"
                         :items="statusItems"
                         :placeholder="placeholders.status"
                         item-title="title"
                         item-value="value"
                         clearable
                         @update:modelValue="changeStatus" />
              </FormField>
            </PageHeaderFilterRow>
          </template>
        </PageHeader>

        <PageBody>
          <Markdown :content="activeTabMarkdown"
                    :theme="theme" />
        </PageBody>

        <PageTabs v-model="activeTabValue"
                  v-model:items="pageTabs"
                  @options="logTabOptions" />
        <Footer :items="footerItems"
                fluid />
      </Page>
    </UMDefaultLayoutBody>
  </UMDefaultLayout>
</template>

<script setup lang="ts">
import {
  Breadcrumb,
  filterMenuItems,
  Footer,
  FormField,
  Header,
  LNB,
  Markdown,
  Page,
  PageBody,
  PageHeader,
  PageHeaderFilterRow,
  PageTabs,
  Searchbox,
  UMDefaultLayout,
  UMDefaultLayoutBody,
  VSelect,
  type FooterItem,
  type HeaderItem,
  type LNBAccordionItem,
  type PageTabItem
} from "@/components/ui"
import { dedent } from "@/lib/utils"
import { computed, reactive, ref, watch } from "vue"

defineOptions({
  name: "BasicLayout",
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    logo?: string
    theme?: "light" | "dark"
    fullHeight?: boolean
  }>(),
  {
    logo: "DSDS Console",
    theme: "dark",
    fullHeight: true,
  },
)

const utility: HeaderItem[] = [
  { type: "link", content: "도움말", href: "#help" },
  { type: "divider" },
  { type: "button", content: "설정" },
]

const footerItems: FooterItem[] = [
  { type: "button", content: "Privacy" },
  { type: "link", content: "Terms", href: "#terms" },
  { type: "copyright" },
]

const menuItems: LNBAccordionItem[] = [
  {
    id: "section-1",
    content: "운영",
    items: [
      { type: "item", id: "overview", content: "Overview" },
      { type: "item", id: "analytics", content: "Analytics" },
      { type: "item", id: "settings", content: "Settings" },
    ],
  },
  {
    id: "section-2",
    content: "리포트",
    items: [
      { type: "item", id: "reports", content: "Reports" },
    ],
  },
]

const lnbTitle = "서비스 탐색"
const searchValue = ref("")
const defaultSelectedItemId = "overview"
const selectedItemId = ref(defaultSelectedItemId)

const lineSelectRef = ref<InstanceType<typeof VSelect> | null>(null)

const lineIdItems = [
  { lineId: "L1", lineTitle: "Line 1" },
  { lineId: "L2", lineTitle: "Line 2" },
  { lineId: "L3", lineTitle: "Line 3" },
]

const areaItems = [
  { title: "CMP", value: "cmp" },
  { title: "Lithography", value: "lithography" },
  { title: "Diffusion", value: "diffusion" },
]

const statusItems = [
  { title: "정상", value: "active" },
  { title: "확인 필요", value: "pending" },
  { title: "중단", value: "stopped" },
]

const searchParams = reactive<{ lineId: string | null; area: string | null; status: string | null }>({
  lineId: lineIdItems[0]?.lineId ?? null,
  area: areaItems[0]?.value ?? null,
  status: statusItems[0]?.value ?? null,
})

const placeholders = computed(() => ({
  lineId: lineIdItems.length ? "라인 선택" : "로딩 중...",
  area: areaItems.length ? "공정 영역" : "로딩 중...",
  status: statusItems.length ? "상태 선택" : "로딩 중...",
}))

const changeLineId = (value: string | null | undefined) => {
  searchParams.lineId = value ?? null
  console.info("[Storybook][BasicLayout] Line changed", value ?? "none")
}

const changeArea = (value: string | null | undefined) => {
  searchParams.area = value ?? null
  console.info("[Storybook][BasicLayout] Area changed", value ?? "none")
}

const changeStatus = (value: string | null | undefined) => {
  searchParams.status = value ?? null
  console.info("[Storybook][BasicLayout] Status changed", value ?? "none")
}

const filteredMenuItems = computed(() =>
  filterMenuItems(menuItems, searchValue.value, selectedItemId.value)
)

const lnbData = computed(() => ({
  title: lnbTitle,
  items: filteredMenuItems.value,
}))

type MenuNode = {
  id?: string
  content?: string
  items?: MenuNode[]
  type?: string
}

const castMenuItems = menuItems as unknown as MenuNode[]

const findMenuNodeById = (id: string, nodes: MenuNode[] = castMenuItems): MenuNode | undefined => {
  for (const node of nodes) {
    if (!node) continue
    if (node.id === id && (!node.items || node.type === "item")) {
      return node
    }

    if (Array.isArray(node.items)) {
      const found = findMenuNodeById(id, node.items)
      if (found) return found
    }
  }

  return undefined
}

const findMenuPathById = (id: string, nodes: MenuNode[] = castMenuItems, path: MenuNode[] = []): MenuNode[] => {
  for (const node of nodes) {
    if (!node) continue
    const nextPath = [...path, node]

    if (node.id === id && (!node.items || node.type === "item")) {
      return nextPath
    }

    if (Array.isArray(node.items)) {
      const found = findMenuPathById(id, node.items, nextPath)
      if (found.length > 0) {
        return found
      }
    }
  }

  return []
}

const toDisplayLabel = (node?: MenuNode): string => {
  if (!node) return "선택되지 않음"
  if (typeof node.content === "string") return node.content
  if (typeof node.content === "number") return String(node.content)
  return node.id ?? "선택되지 않음"
}

const ensureTabForId = (id: string) => {
  if (!id) return
  const existing = pageTabs.value.find((tab) => tab.value === id)
  if (existing) return

  const menuNode = findMenuNodeById(id)
  if (!menuNode) return

  const newTab: PageTabItem = {
    value: id,
    label: toDisplayLabel(menuNode),
    closable: true,
  }

  pageTabs.value = [...pageTabs.value, newTab]
}

const pageTabs = ref<PageTabItem[]>([
  { value: "overview", label: "Overview", closable: false },
  { value: "analytics", label: "Analytics" },
  { value: "settings", label: "Settings" },
])

const activeTabValue = ref(defaultSelectedItemId)

const activeTab = computed(() => pageTabs.value.find((tab) => tab.value === activeTabValue.value))

const selectedItemLabel = computed(() => toDisplayLabel(findMenuNodeById(selectedItemId.value)))
const selectedMenuPath = computed(() =>
  selectedItemId.value ? findMenuPathById(selectedItemId.value) : []
)

const activeSectionId = computed(() => {
  for (const node of selectedMenuPath.value) {
    if (Array.isArray(node?.items) && node.items.length > 0) {
      return node.id
    }
  }

  return undefined
})

type BasicBreadcrumbItem = {
  title: string
  type?: "text" | "select"
  href?: string
  selected?: boolean
  disabled?: boolean
  dropdownItems?: Array<{ title: string; value: string }>
}

type HeaderMenuEntry = {
  content: string
  value: string
  disabled?: boolean
  description?: string
}

const breadcrumbItems = computed<BasicBreadcrumbItem[]>(() => {
  const items: BasicBreadcrumbItem[] = []

  const rootTitle = toDisplayLabel({ content: lnbTitle })
  if (rootTitle && rootTitle !== "선택되지 않음") {
    items.push({ title: rootTitle, type: "text" })
  }

  const pathNodes = selectedMenuPath.value
    .filter((node) => Boolean(node) && toDisplayLabel(node) !== "선택되지 않음")

  pathNodes.forEach((node) => {
    const title = toDisplayLabel(node)
    if (!title) return
    items.push({ title, type: "text" })
  })

  if (activeTab.value) {
    const activeLabel = activeTab.value.label
    const lastIndex = items.length - 1
    if (lastIndex >= 0 && items[lastIndex].title === activeLabel) {
      items[lastIndex] = { ...items[lastIndex], selected: true }
    } else {
      items.push({ title: activeLabel, type: "text", selected: true })
    }
  } else if (items.length > 0) {
    const lastIndex = items.length - 1
    items[lastIndex] = { ...items[lastIndex], selected: true }
  }

  return items
})

const toHeaderMenuEntries = (section: MenuNode): HeaderMenuEntry[] => {
  if (!Array.isArray(section.items)) return []

  return section.items
    .filter((item): item is MenuNode => Boolean(item) && (!Array.isArray(item.items) || item.type === "item"))
    .map((item, index) => ({
      content: toDisplayLabel(item),
      value: item.id ?? `${section.id ?? "section"}-${index}`,
    }))
    .filter((entry) => Boolean(entry.value))
}

const activeTabMarkdown = computed(() => {
  if (!activeTab.value) return ""

  const favoriteLabel = activeTab.value.isFavorite ? "활성" : "비활성"

  return dedent(`
    DSDS 기본 레이아웃은 Header, LNB, 콘텐츠 영역, PageTabs, Footer를 조합해 애플리케이션 페이지 프레임을 구성합니다.

    ### 현재 상태

    - **LNB 선택**: ${selectedItemLabel.value}
    - **즐겨찾기 상태**: ${favoriteLabel}
    - **열려 있는 탭 수**: ${pageTabs.value.length}
  `)
})

const handleSelectionChange = (id: string) => {
  selectedItemId.value = id
  ensureTabForId(id)
  activeTabValue.value = id
}

const handleSearchInput = (value: string | number | undefined) => {
  if (typeof value === "number") {
    searchValue.value = String(value)
    return
  }

  searchValue.value = value ?? ""
}

const handleHeaderMenuSelect = (value: string) => {
  if (!value || value === selectedItemId.value) return
  handleSelectionChange(value)
}

const headerNavigation = computed<HeaderItem[]>(() =>
  castMenuItems.reduce<HeaderItem[]>((acc, section) => {
    const items = toHeaderMenuEntries(section)
    if (items.length === 0) {
      return acc
    }

    const isActiveSection = Boolean(activeSectionId.value && section.id === activeSectionId.value)

    acc.push({
      type: "menu",
      content: toDisplayLabel(section),
      items,
      selected: isActiveSection ? selectedItemId.value : undefined,
      onSelect: handleHeaderMenuSelect,
    } satisfies HeaderItem)

    return acc
  }, [])
)

watch(activeTabValue, (nextValue) => {
  if (!nextValue) return

  ensureTabForId(nextValue)

  if (selectedItemId.value !== nextValue) {
    const menuNode = findMenuNodeById(nextValue)
    if (menuNode) {
      selectedItemId.value = nextValue
    }
  }
})

const handleFavoriteUpdate = (isFavorite: boolean) => {
  if (!activeTab.value) return

  pageTabs.value = pageTabs.value.map((tab) =>
    tab.value === activeTab.value?.value ? { ...tab, isFavorite } : tab,
  )
}

const logTabOptions = (tab?: PageTabItem) => {
  if (tab) {
    console.info("탭 옵션 호출", tab)
  }
}

const logo = computed(() => props.logo)
const theme = computed(() => props.theme)
</script>
