<template>
  <v-card>
    <v-card-title>
      <ModalHeader title="공지사항"
                    @close="emitClose" />
    </v-card-title>

    <v-card-text class="flex flex-col gap-5 overflow-y-auto">
      <ModalPanel>
        <!-- 검색조건 -->
        <div class="flex items-center gap-2">
          <FormField label="Line ID">
            <VSelect v-model="searchParams.lineId"
                     :items="lineIdItems"
                     @update:modelValue="changeLineId"
                     itemTitle="codeName"
                     itemValue="codeId"
                     placeholder="선택하세요."
                     :width="120" />
          </FormField>
          <FormField label="적용공정">
            <VAutocomplete v-model="searchParams.procName"
                           :items="procNameItems"
                           @update:modelValue="changeProcName"
                           itemTitle="codeName"
                           itemValue="codeId"
                           placeholder="선택하세요"
                           multiple
                           show-all
                           :width="120" />
          </FormField>
          <FormField label="Proc ID">
            <VAutocomplete v-model="searchParams.procId"
                           :items="procIdItems"
                           itemTitle="codeName"
                           itemValue="codeId"
                           placeholder="선택하세요"
                           multiple
                           show-all
                           :width="120" />
          </FormField>
          <FormField>
            <FormTools>
              <v-divider vertical />
              <VBtn @click="search(1)"> 검색 </VBtn>
            </FormTools>
          </FormField>
        </div>
        <!--/ 검색조건 -->

        <v-divider></v-divider>

        <!-- 검색결과 -->
        <div class="flex items-center h-5 max-h-5 typo-caption mb-[-4px]!">
          <div class="flex items-center h-5">
            <VBtn size="small"
                  @click="openRegModal">신규등록</VBtn>
          </div>
          <v-spacer></v-spacer>
          <div class="flex items-center">
            <div class="typo-caption text-neutral-3rd">Total: {{ searchParams.totCnt }}</div>
          </div>
        </div>
        <!--/ 검색결과 -->

        <!-- 그리드 -->
        <FakeRealGrid :columns="columns"
                      :emptyState="emptyState"
                      v-model="gridRef"
                      :rowCount="14"
                      :autoFitLayout="true"
                      class="flex-1" />
        <!--/ 그리드 -->
      </ModalPanel>
    </v-card-text>

    <v-card-actions>
      <!-- 하단 버튼 -->
      <VBtn variant="secondary"
            @click="emitClose"> 닫기 </VBtn>
      <!--/ 하단 버튼 -->
    </v-card-actions>
  </v-card>

  <!-- 신규등록 다이얼로그 -->
  <Modal v-model="showRegModal"
           size="medium"
           height="520">
    <NoticeRegModalBody @close="closeRegModal" />
  </Modal>
</template>
<script setup lang="ts">
import {
  FormField,
  FormTools,
  ModalHeader,
  ModalPanel,
  VAutocomplete,
  VBtn,
  VCard, VCardTitle,
  VDivider,
  VSelect,
  VSpacer
} from '@/components/ui'
import { createColumnsFromNames, extendedFakeSource, FakeRealGrid } from '@/faker/realgrid'
import type { GridBase, GridView } from 'realgrid'
import { computed, onMounted, reactive, ref, shallowRef, toRefs } from 'vue'
import NoticeRegModalBody from './NoticeRegModalBody.vue'
// Props
const props = withDefaults(defineProps<{
  emptyState?: boolean
  modelValue?: boolean
}>(), {
  emptyState: false,
  modelValue: false,
})

const { emptyState } = toRefs(props)

// Emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const gridRef = shallowRef<GridView | null>()

// 다이얼로그 상태 관리
const showRegModal = ref(false)

onMounted(() => {
  if (!gridRef.value) return;

  function editModeChange(grid: GridBase, checked: boolean, itemIndex: number, isAll: boolean) {
    if (!isAll) {
      checked = grid.isCheckedRow(itemIndex);
    }

    grid.setColumnProperty('lineId', 'editable', checked);
    grid.setColumnProperty('process', 'editable', checked);
    grid.setColumnProperty('procId', 'editable', checked);
    grid.setColumnProperty('countrUserId', 'editable', checked);
    grid.setColumnProperty('issue', 'editable', checked);
  }
})

const columns = computed(() => createColumnsFromNames([
  ["procId", {
    values: extendedFakeSource.procIds,
    editButtonVisibility: "always",
    editor: "dropdown"
  }],
  ["evaluationPurpose", { name: 'title', fieldName: "title", header: { text: "제목" }, width: 500, styleName: "link-text" }],
  ["koreanNameWithEnglish", {
    name: 'regUserName', fieldName: 'regUserName', header: { text: "Reg. UserName" }, width: 150,
  }],
  ["createdAt", {
    name: 'regDate',
    fieldName: "regDate",
    header: { text: "Reg. Date" },
    width: 120,
  }],
  [
    "quantity", {
      header: { text: "조회수" },
      width: 80,
    }
  ]
]))


// Fake data
const lineIdItems = ref([
  { codeId: 'L1', codeName: 'Line 1' },
  { codeId: 'L2', codeName: 'Line 2' },
  { codeId: 'L3', codeName: 'Line 3' }
])

const procNameItems = ref([
  { codeId: 'P1', codeName: 'Process 1' },
  { codeId: 'P2', codeName: 'Process 2' },
  { codeId: 'P3', codeName: 'Process 3' }
])

const procIdItems = ref([
  { codeId: 'PID1', codeName: 'Proc ID 1' },
  { codeId: 'PID2', codeName: 'Proc ID 2' },
  { codeId: 'PID3', codeName: 'Proc ID 3' }
])

const searchParams = reactive({
  lineId: null,
  procName: [],
  procId: [],
  chargeUserName: '',
  totCnt: 100
})


// Functions
function emitClose() {
  emit('update:modelValue', false)
}

function openRegModal() {
  showRegModal.value = true
}

function closeRegModal() {
  showRegModal.value = false
}

function changeLineId() {
  // Fake handler
  console.log('Line ID changed')
}

function changeProcName() {
  // Fake handler
  console.log('Proc Name changed')
}

function search(page: number) {
  // Fake handler
  console.log('Search triggered for page:', page)
}
</script>