<template>
  <v-card>
    <v-card-title>
      <ModalHeader title="제품별 권한 관리"
                    @close="emitClose" />
    </v-card-title>

    <v-card-text class="flex flex-col gap-5 overflow-y-auto">
      <ModalPanel>
        <!-- 검색조건 -->
        <div class="flex items-center gap-2">
          <FormField label="Line ID">
            <VSelect v-model="searchParams.lineId"
                     :items="lineIdItems"
                     :disabled="editMode"
                     @update:modelValue="changeLineId"
                     itemTitle="codeName"
                     itemValue="codeId"
                     placeholder="선택하세요."
                     :width="120" />
          </FormField>
          <FormField label="적용공정">
            <VAutocomplete v-model="searchParams.procName"
                           :items="procNameItems"
                           :disabled="editMode"
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
                           :disabled="editMode"
                           itemTitle="codeName"
                           itemValue="codeId"
                           placeholder="선택하세요"
                           multiple
                           show-all
                           :width="120" />
          </FormField>
          <FormField label="정 담당자">
            <VTextField v-model="searchParams.chargeUserName"
                        :disabled="editMode"
                        :width="120"
                        placeholder="입력하세요."></VTextField>
          </FormField>
          <FormField class="-ml-px!">
            <div class="flex items-center">
              <v-divider vertical
                         :length="10"
                         class="mr-1.5 mt-1.5"></v-divider>
              <VBtn :disabled="editMode"
                    @click="search(1)">검색</VBtn>
            </div>
          </FormField>
        </div>
        <!--/ 검색조건 -->

        <v-divider></v-divider>


        <!-- 검색결과 -->
        <div class="flex items-center h-5 max-h-5 typo-caption mb-[-4px]!">
          <div v-if="!editMode && pageRole"
               class="flex items-center h-5">
            <VBtn size="small"
                  variant="secondary"
                  @click="edit">편집</VBtn>
          </div>
          <div v-if="editMode && pageRole"
               class="flex items-center h-5">
            <VBtn size="small"
                  class="mr-1"
                  @click="saveGridRow">저장</VBtn>
            <VBtn size="small"
                  variant="secondary"
                  @click="editCan">취소</VBtn>
            <v-divider vertical
                       :length="10"
                       class="mx-1.5! mt-5px!"></v-divider>
            <div class="font-12 text-neutral-3rd">Row</div>
            <VSelect class="mx-1"
                     size="small"
                     v-model="rowCnt"
                     :items="[1, 2, 5, 10, 20, 50]"
                     variant="default"
                     :width="60" />
            <VBtn size="small"
                  variant="secondary"
                  @click="addGridRow">추가</VBtn>
            <v-divider vertical
                       :length="10"
                       class="mx-1.5! mt-5px!"></v-divider>
            <VBtn size="small"
                  variant="secondary"
                  :disabled="checkedCount === 0"
                  @click="deleteGridRow">삭제</VBtn>
            <v-divider vertical
                       :length="10"
                       class="mx-1.5! mt-5px!"></v-divider>
            <VBtn size="small"
                  variant="secondary"
                  @click="clearGridRow">초기화</VBtn>
          </div>
          <v-spacer></v-spacer>
          <div class="flex items-center">
            <div class="typo-caption text-neutral-3rd">Total: {{ searchParams.totCnt }}</div>
          </div>
        </div>
        <!--/ 검색결과 -->

        <!-- 그리드 -->
        <FakeRealGrid :columns="columns"
                      :columnLayout="columnLayout"
                      :editable="editMode"
                      :checkBar="editMode"
                      :emptyState="emptyState"
                      v-model="gridRef"
                      class="min-h-[497px]!" />
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
</template>
<script setup lang="ts">
import {
  FormField,
  ModalHeader,
  ModalPanel,
  VAutocomplete,
  VBtn,
  VCard, VCardTitle, VDivider,
  VSelect,
  VSpacer,
  VTextField
} from '@/components/ui'
import { FakeRealGrid, createColumnsFromNames, extendedFakeSource } from '@/faker/realgrid'
import type { GridBase, GridCell, GridView } from 'realgrid'
import { computed, onMounted, reactive, ref, shallowRef } from 'vue'

// Props
const props = withDefaults(defineProps<{
  emptyState?: boolean
  modelValue?: boolean
}>(), {
  emptyState: false,
  modelValue: false,
})

const gridRef = shallowRef<GridView | null>()
const checkedCount = ref(0);

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

  gridRef.value.onItemChecked = (grid, itemIndex, checked) => {
    grid.clearCurrent();
    checkedCount.value = (grid as GridView).getCheckedRows().length;
    editModeChange(grid, checked, itemIndex, false);
  };

})

const styleCallback = (grid: GridBase, cell: GridCell) => {
  let ret = {};
  let checked = grid.isCheckedRow(cell.index?.itemIndex!);
  return checked ? { styleName: 'editable', editable: true } : { styleName: 'disabled-edit-button', editable: false };
}

const columns = computed(() => createColumnsFromNames([
  ["lineName", {
    width: 70,
    values: extendedFakeSource.lineIds,
    editable: false,
    editButtonVisibility: "always",
    styleCallback,
    editor: "dropdown"
  },],
  ["process", {
    width: 120, header: { text: "적용공정" }, editable: editMode.value,
    values: extendedFakeSource.processes,
    editButtonVisibility: "always",
    styleCallback,
    editor: "dropdown"
  }],
  ["procId", {
    width: 120, editable: editMode.value,
    values: extendedFakeSource.procIds,
    editButtonVisibility: "always",
    styleCallback,
    editor: "dropdown"
  }],
  ["koreanNameWithEnglish", {
    name: 'chargeUserName', fieldName: 'chargeUserName', header: { text: "정 담당자" }, styleName: editMode.value ? "border-r-0!" : undefined,
  }],
  ["isYn", {
    name: 'firBtn',
    fieldName: 'firBtn',
    header: {
      text: ' ',
    },
    renderer: {
      type: 'html',
      callback: function (grid, cell) {
        let checked = grid.isCheckedRow(cell.index?.itemIndex!);
        let str = '';
        if (checked) {
          str =
            '<button><i class="dsds-rg-icon dsds-rg-icon-magnify"></i></button>';
        } else {
          str =
            '<i class="dsds-rg-icon dsds-rg-icon-magnify disabled"></i>';
        }
        return str;
      },
    },
    styleName: 'dsds-realgrid-cell-icon',
    width: 20,
    visible: editMode.value,
    editable: false,
  }],
  ["createUser", {
    name: 'countrUserId',
    fieldName: "countrUserId",
    styleName: editMode.value ? "border-r-0!" : undefined,
    width: 330,
  }],
  ["isYn", {
    name: 'secBtn',
    fieldName: 'secBtn',
    header: {
      text: ' ',
    },
    renderer: {
      type: 'html',
      callback: function (grid, cell) {
        let checked = grid.isCheckedRow(cell.index?.itemIndex!);
        let str = '';
        if (checked) {
          str =
            '<button><i class="dsds-icon-magnify"></i></button>';
        } else {
          str =
            '<i class="dsds-icon-magnify disabled"></i>';
        }
        return str;
      },
    },
    styleName: 'dsds-realgrid-cell-icon',
    width: 18,
    visible: editMode.value,
    editable: false,
  }],
  ["evaluationPurpose", { name: 'issue', fieldName: "issue", header: { text: "Issue" }, width: 292 }],
]))

const columnLayout = [
  "lineName",
  "process",
  "procId",
  {
    name: 'firstManagerGroup',
    header: {
      text: "정 담당자",
      styleName: 'rg-header-align-left',
    },
    items: ['chargeUserName', 'firBtn'],
    hideChildHeaders: true,
  },
  {
    name: 'secondManagerGroup',
    header: {
      text: "부 담당자",
      template: `부 담당자(Knox ID) <span style="margin-left: 5px; color: var(--color-disabled)">*Max 100명 지정 가능</span>`,
      tooltip: "직접 입력시  ,(콤마) 기준으로 구분해 주세요.",
      showTooltip: true,
      styleName: 'rg-header-align-left',
    },
    items: ['countrUserId', 'secBtn'],
    hideChildHeaders: true,
  },
  "issue",
]

// Emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

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

// Reactive data
const editMode = ref(false)
const pageRole = ref(true)
const rowCnt = ref(5)

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

function edit() {
  editMode.value = true
  console.log('Edit mode enabled')
}

function saveGridRow() {
  // Fake handler
  console.log('Grid row saved')
  editMode.value = false
}

function editCan() {
  editMode.value = false
  console.log('Edit cancelled')
}

function addGridRow() {
  // Fake handler
  console.log('Grid row added')
}

function deleteGridRow() {
  // Fake handler
  console.log('Grid row deleted')
}

function clearGridRow() {
  // Fake handler
  console.log('Grid row cleared')
}
</script>