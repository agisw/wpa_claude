<template>
  <div class="dsds-basic-layout h-screen">
    <Header :logo="logo"
            :utility="utility"
            theme="dark"
            class="bg-[#695d8b]!" />
    <div class="dsds-basic-layout-body">
      <LNB :data="{
        title: '검색박스 타이틀',
        items: filteredMenuItems,
      }"
           :default-selected-item-id="defaultSelectedItemId"
           v-model:search-text="searchValue">
        <template #title>
          <Searchbox v-model="searchValue"
                     size="large"
                     placeholder="메뉴명 검색"
                     class="lnb-title-searchbox"
                     @update:model-value="handleSearchChange"
                     @search="handleSearchChange" />
        </template>
      </LNB>
      <div class="dsds-layout-content">
        <template v-if="activeTab">
          <EESAlarmSummaryPage v-if="activeTab?.value === 'tab-3'"
                               :page="activeTab"
                               @update:favorite="handleFavoriteUpdate" />
          <Page v-else>
            <PageHeader :title="activeTab.label"
                        :favorite="activeTab.isFavorite ?? false"
                        showFavorite
                        @update:favorite="handleFavoriteUpdate">
              <template #tools>
                <VBtn variant="secondary"
                      size="small">매뉴얼</VBtn>
                <v-divider vertical />
                <Breadcrumb :items="[
                  { title: 'FDC', type: 'text' },
                  { title: 'Interlock', type: 'text' },
                  { title: 'Alarm Summary', type: 'text' },
                ]"
                            ellipsis />
              </template>
            </PageHeader>
            <PageBody class="active-content">
              <p>{{ activeTab.label }} 페이지입니다.</p>
              <p>즐겨찾기: {{ activeTab.isFavorite || false }}</p>
            </PageBody>
          </Page>
        </template>
        <Page v-else>
          <PageBody class="bg-page-disabled!">
            <p>선택된 탭이 없습니다.</p>
          </PageBody>
        </Page>
        <PageTabs v-model="activeTabValue"
                  v-model:items="pageTabs"
                  @options="handleOptions" />
        <Footer :items="defaultItems"
                fluid />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
    type FooterItem,
    type HeaderItem,
    type LNBAccordionItem,
    type PageTabItem,
    Breadcrumb,
    filterMenuItems,
    Footer,
    Header,
    LNB,
    Page,
    PageBody,
    PageHeader,
    PageTabs,
    Searchbox,
    VBtn
} from "@/components/ui";
import { computed, ref } from "vue";
import EESAlarmSummaryPage from "./EESAlarmSummaryPage.vue";

withDefaults(defineProps<{
  logo: string
}>(), {
  logo: 'FDC'
});

const emit = defineEmits<{
  (e: "action", payload?: { message: string }): void
}>()


const pageTabs = ref<PageTabItem[]>([
  { value: "tab-1", label: "Wafer Lapping" },
  { value: "tab-2", label: "Wafer Wallpaper", },
  { value: "tab-3", label: "Alarm Summary" },
  { value: "tab-4", label: "Wafer Hospital" },
  { value: "tab-5", label: "Admin Address" },
  { value: "tab-6", label: "Readble Testing" },
])

const activeTabValue = ref("tab-3")
const activeTab = computed(() => pageTabs.value.find((tab) => tab.value === activeTabValue.value))
const handleFavoriteUpdate = (isFavorite: boolean) => {
  emit("action", { message: `즐겨찾기 상태 변경: ${isFavorite}` })

  const currentTab = activeTab.value
  if (currentTab) {
    currentTab.isFavorite = isFavorite
  }
}

const utility = [
  { type: "button", content: "공지사항", notiCount: 1 },
  { type: "link", content: "매뉴얼", href: "/manual" },
  { type: "button", content: "챗봇", href: "/chatbot" },
  { type: "link", content: "SR 요청", href: "/sr" },
  { type: "link", content: "S-VOC", href: "/svoc" },
  { type: "divider" },
  { type: "button", content: "Login" },
  { type: "divider" },
  { type: "hamburger" },
] as HeaderItem[]

const defaultItems: FooterItem[] = [
  { type: "button", content: "개인정보 처리방침" },
  { type: "link", href: "#privacy", content: "이용약관" },
  { type: "copyright" },
]
const defaultSelectedItemId = "4-1" // Alarm Summary

const searchValue = ref("")

const handleSearchChange = (value: string | number | undefined) => {
  if (typeof value === "number") {
    searchValue.value = String(value)
    return
  }
  searchValue.value = value ?? ""
}

const handleOptions = (tab?: PageTabItem) => {
  console.log("현재 탭:", tab)
}

const allMenuItems: LNBAccordionItem[] = [
  {
    id: "1",
    content: "즐겨찾기 ☆",
    items: [],
  },
  {
    id: "2",
    content: "FDC View",
    items: [],
  },
  {
    id: "3",
    content: "EPT",
    items: [],
  },
  {
    id: "4",
    content: "Interlock",
    items: [
      {
        type: "item",
        id: "4-1",
        content: "Alarm Summary",
      },
      {
        type: "item",
        id: "4-2",
        content: "Fault Summary",
      },
      {
        type: "item",
        id: "4-3",
        content: "Interlock Summary",
      },
      {
        type: "item",
        id: "4-4",
        content: "Fault Summary(Multi)",
      },
      {
        type: "item",
        id: "4-5",
        content: "Interlock Summary(Multi)",
      },
    ],
  },
  {
    id: "5",
    content: "Preference",
    items: [
      {
        id: "50",
        content: "물류설비",
        items: [
          {
            type: "item",
            id: "5-1-1",
            content: "Tool(General)",
          },
          {
            type: "item",
            id: "5-1-2",
            content: "MDM Tool(General)",
          },
          {
            type: "item",
            id: "5-1-3",
            content: "Lot Filter Info(General)",
          },
          {
            type: "item",
            id: "5-1-4",
            content: "Stricke Out Lot Filter(General)",
          },
        ],
      },
      {
        id: "5-2",
        content: "Tool",
        items: [],
      },
      {
        id: "5-3",
        content: "PM Reg",
        items: [],
      },
      {
        id: "5-4",
        content: "Alarm",
        items: [],
      },
      {
        id: "5-5",
        content: "MCC Spec",
        items: [],
      },
      {
        id: "5-6",
        content: "DCP",
        items: [],
      },
      {
        id: "5-7",
        content: "SPEC Reg",
        items: [],
      },
    ],
  },
  {
    id: "6",
    content: "EDA",
    items: [
      {
        id: "6-1",
        content: "물류설비",
        items: [
          {
            type: "item",
            id: "6-1-1",
            content: "Tool(General)",
          },
        ],
      },
    ],
  },
  {
    id: "7",
    content: "Report",
    items: [],
  },
  {
    id: "8",
    content: "ARG",
    items: [],
  },
  {
    id: "9",
    content: "FPA",
    items: [],
  },
]


const filteredMenuItems = computed(() =>
  filterMenuItems(allMenuItems, searchValue.value, defaultSelectedItemId)
)

</script>