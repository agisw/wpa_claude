<template>
  <PageHeaderFilterRow>
    <FormField label="라인"
               required>
      <v-select v-model="searchParams.lineId"
                :width="120"
                :items="lineIdItems"
                item-title="codeName"
                item-value="codeId"
                @update:modelValue="changeLineId">
      </v-select>
    </FormField>
    <FormField label="적용공정"
               required>
      <v-autocomplete v-model="searchParams.procName"
                      :width="120"
                      :items="procNameItems"
                      item-title="codeName"
                      item-value="codeId"
                      multiple
                      show-all
                      @update:modelValue="changeProcName"
                      placeholder="선택하세요." />
    </FormField>
    <FormField label="Proc ID"
               required>
      <v-autocomplete v-model="searchParams.procId"
                      :width="120"
                      :items="procIdItems"
                      item-title="codeName"
                      item-value="codeId"
                      multiple
                      show-all
                      placeholder="선택하세요." />
    </FormField>
    <FormField label="Arr Status">
      <v-autocomplete v-model="searchParams.statusType"
                      :width="120"
                      :items="statusTypeItems"
                      item-title="codeName"
                      item-value="codeId"
                      multiple
                      show-all
                      placeholder="선택하세요.">
      </v-autocomplete>
    </FormField>
    <FormField label="Einecn no"
               required>
      <v-text-field v-model="searchParams.einecnNo"
                    :width="120"
                    clearable
                    @keyup.enter="search(1)"
                    placeholder="입력하세요."></v-text-field>
    </FormField>
    <FormField label="요청자">
      <v-text-field v-model="searchParams.reqUser"
                    :width="120"
                    clearable
                    @keyup.enter="search(1)"
                    placeholder="입력하세요."></v-text-field>
    </FormField>

    <FormField label="기간">
      <VueDatePicker v-model="periodDates"
                     model-type="yyyy-MM-dd"
                     :range="{ partialRange: false }"
                     :format="formatRange"
                     style="width: 230px"
                     clearable
                     @cleared="setDefaultRange" />
    </FormField>
    <FormField>
      <div class="flex items-center gap-1.5">
        <v-divider vertical
                   :length="10"
                   class="mx-0 mt-1.5"></v-divider>
        <v-btn variant="primary"
               class="mr-px!"
               @click="search(1)"> 검색 </v-btn>
        <v-divider vertical
                   :length="10"
                   class="mx-0 mt-1.5"></v-divider>
        <v-btn variant="secondary"
               @click="saveSearchCon"> 조건 저장 </v-btn>
        <v-btn variant="secondary"
               @click="getSearchCon"> 조건 불러오기 </v-btn>
      </div>
    </FormField>
  </PageHeaderFilterRow>
</template>

<script setup lang="ts">
import { FormField, PageHeaderFilterRow, VAutocomplete, VBtn, VSelect, VTextField, VueDatePicker } from "@/components/ui"
import { reactive, ref } from 'vue'

type CodeItem = { codeId: string; codeName: string; title: string }

const emit = defineEmits<{
  (e: 'action', payload: { message: string }): void
}>()

// Fake / mock data for storybook
const collapsed = ref(false)
const lineIdItems = ref<CodeItem[]>([])
const procNameItems = ref<CodeItem[]>([])
const procIdItems = ref<CodeItem[]>([])
const statusTypeItems = ref<CodeItem[]>([])

// Generic item generators for stories / mocks
function generateItems(idPrefix: string, namePrefix: string, count = 5, start = 1) {
  return Array.from({ length: count }, (_, i) => {
    const n = i + start
    const codeId = `${idPrefix}${n}`
    const codeName = `${namePrefix} ${n}`
    return { codeId, codeName, title: codeName }
  })
}

function generateFromNames(names: string[], idPrefix = 'X') {
  return names.map((name, i) => ({ codeId: `${idPrefix}${i + 1}`, codeName: name, title: name }))
}

// Create mock lists using generators
lineIdItems.value = generateItems('L', 'Line', 3)
procNameItems.value = generateItems('P', 'Proc', 20)
procIdItems.value = generateItems('PID', 'Proc ID', 6)
statusTypeItems.value = generateFromNames(['Ready', 'InProgress'], 'S')


const searchParams = reactive({
  lineId: lineIdItems.value[0]?.codeId ?? null as string | null,
  procName: [] as string[],
  procId: [] as string[],
  statusType: [] as string[],
  einecnNo: '',
  reqUser: '',
})

// periodDates 타입을 any로 지정하여 v-model 타입 에러 방지
const periodDates = ref<any>(null)

// Range 포맷 함수 (v11 호환)
const formatRange = (dates: string[] | Date[]): string => {
  if (!dates || dates.length === 0) return ''

  const [start, end] = dates

  if (start && end) {
    // 이미 문자열인 경우 (model-type: "yyyy-MM-dd")
    if (typeof start === 'string' && typeof end === 'string') {
      return `${start} ~ ${end}`
    }

    // Date 객체인 경우
    if (start instanceof Date && end instanceof Date) {
      const formatDate = (date: Date) => date.toISOString().split('T')[0]
      return `${formatDate(start)} ~ ${formatDate(end)}`
    }
  }

  return start.toLocaleString() || end.toLocaleString() || ''
}

function changeLineId(val: any) {
  searchParams.lineId = val
  emit('action', { message: `lineId 변경: ${String(val)}` })
}

function changeProcName(val: any) {
  searchParams.procName = val || []
  emit('action', { message: `procName 변경` })
}

function search(page = 1) {
  emit('action', { message: `검색 실행 (page:${page})` })
}

function setDefaultRange() {
  periodDates.value = [null, null]
  emit('action', { message: '기간 초기화' })
}

function saveSearchCon() {
  emit('action', { message: '조건 저장' })
}

function getSearchCon() {
  const mocked = {
    lineId: lineIdItems.value[0]?.codeId ?? null,
    procName: [procNameItems.value[0]?.codeId].filter(Boolean),
    procId: [procIdItems.value[0]?.codeId].filter(Boolean),
    statusType: [statusTypeItems.value[0]?.codeId].filter(Boolean),
    einecnNo: 'E-123',
    reqUser: 'storybook',
  }
  Object.assign(searchParams, mocked)
  emit('action', { message: '조건 불러오기' })
}

</script>
