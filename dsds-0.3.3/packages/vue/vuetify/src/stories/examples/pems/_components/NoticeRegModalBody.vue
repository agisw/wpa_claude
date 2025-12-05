<template>
  <v-card>
    <VuetifyModal />
    <VuetifyConfirm />

    <v-card-title>
      <ModalHeader title="공지사항 등록"
                    @close="emitClose" />
    </v-card-title>

    <v-card-text class="flex flex-col gap-5 overflow-y-auto">
      <ModalPanel>
        <div class="flex flex-col gap-[14px]! h-full">
          <!-- 검색조건 -->
          <div class="flex items-center gap-5">
            <FormField size="large"
                       required
                       label="Line">
              <VSelect v-model="noticeForm.lineId"
                       size="large"
                       :items="lineIdItems"
                       @update:modelValue="changeLineId"
                       itemTitle="codeName"
                       itemValue="codeId"
                       placeholder="선택하세요."
                       :width="120" />
            </FormField size="large">
            <FormField size="large"
                       required
                       label="적용공정">
              <VSelect v-model="noticeForm.procName"
                       size="large"
                       :items="procNameItems"
                       @update:modelValue="changeProcName"
                       itemTitle="codeName"
                       itemValue="codeId"
                       placeholder="선택하세요"
                       :width="120" />
            </FormField size="large">
            <FormField size="large"
                       required
                       label="Proc ID">
              <VSelect v-model="noticeForm.procId"
                       size="large"
                       :items="procIdItems"
                       itemTitle="codeName"
                       itemValue="codeId"
                       placeholder="선택하세요"
                       @update:modelValue="changeProcId"
                       :width="120" />
            </FormField size="large">
          </div>
          <div class="flex items-center gap-2">
            <FormField size="large"
                       required
                       label="제목">
              <VTextField v-model="noticeForm.noticeTitle"
                          size="large"
                          clearable
                          :width="600"
                          placeholder="입력하세요." />
            </FormField size="large">
          </div>
          <!--/ 검색조건 -->
          <!-- 에디터 -->
          <FormField size="large"
                     label="내용"
                     class="flex-1"
                     required>
            <RichTextEditor v-model="noticeForm.noticeCont"
                            placeholder="공지사항 내용을 입력하세요."
                            class="min-h-[calc(100%-28px)]! max-h-[calc(100%-28px)]" />
          </FormField size="large">
          <!--/ 에디터 -->
        </div>
      </ModalPanel>
    </v-card-text>

    <v-card-actions>
      <!-- 하단 버튼 -->
      <VBtn v-if="pageRole"
            @click="insertNotice">저장</VBtn>
      <VBtn variant="secondary"
            @click="emitClose">닫기</VBtn>
      <!--/ 하단 버튼 -->
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import {
  FormField,
  ModalHeader,
  ModalPanel,
  RichTextEditor,
  VBtn,
  VCard, VCardActions, VCardText, VCardTitle,
  VSelect,
  VTextField,
  showToast
} from '@/components/ui'
import { ref } from 'vue'

// Mock components for Storybook
const VuetifyModal = { template: '<div></div>' }
const VuetifyConfirm = { template: '<div></div>' }

type CodeItem = { codeId: string; codeName: string }

// 공지사항 폼 인터페이스 정의
interface NoticeForm {
  lineId: string | null
  procName: string | null
  procId: string | null
  noticeTitle: string
  noticeCont: string
}

// 기본 폼 값 (에디터 초기화용)
const defaultContent = '<p>공지사항 내용을 입력하세요.</p>'

// Vue 3.5 defineModel 사용
const noticeForm = defineModel<NoticeForm>({
  default: () => ({
    lineId: null,
    procName: null,
    procId: null,
    noticeTitle: '',
    noticeCont: defaultContent
  })
})

const props = withDefaults(defineProps<{
  modelValue?: boolean
}>(), {
  modelValue: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}>()

// Fake data
const lineIdItems = ref<CodeItem[]>([
  { codeId: 'L1', codeName: 'Line 1' },
  { codeId: 'L2', codeName: 'Line 2' },
  { codeId: 'L3', codeName: 'Line 3' }
])

const procNameItems = ref<CodeItem[]>([
  { codeId: 'P1', codeName: 'Process 1' },
  { codeId: 'P2', codeName: 'Process 2' },
  { codeId: 'P3', codeName: 'Process 3' }
])

const procIdItems = ref<CodeItem[]>([
  { codeId: 'PID1', codeName: 'Proc ID 1' },
  { codeId: 'PID2', codeName: 'Proc ID 2' },
  { codeId: 'PID3', codeName: 'Proc ID 3' }
])

// Reactive data
const pageRole = ref(true)

// Editor toolbar configuration (Tiptap은 기본 툴바 사용)
const editToolBar = ref([
  // Tiptap StarterKit의 기본 기능들
  'bold', 'italic', 'strike', 'code',
  'heading', 'bulletList', 'orderedList',
  'blockquote', 'codeBlock'
])

// Functions
function emitClose() {
  emit('close')
}

function changeLineId() {
  // Fake handler
  console.log('Line ID changed')
}

function changeProcName() {
  // Fake handler
  console.log('Proc Name changed')
}

function changeProcId() {
  // Fake handler
  console.log('Proc ID changed')
}

function insertNotice() {
  // Fake handler
  console.log('Notice inserted:', noticeForm.value)
  emitClose()

  // 500ms 후에 Toast 표시
  setTimeout(() => {
    showToast("입력하신 데이터가 저장되었습니다.", {
      type: "success",
    })
  }, 500)
}
</script>