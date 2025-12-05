<template>
  <div class="dsds-tiptap-editor-container"
       :style="{ height: typeof props.height === 'number' ? `${props.height}px` : props.height }">
    <!-- Toolbar -->
    <div class="dsds-tiptap-editor-toolbar">
      <VBtn variant="secondary"
            size="small"
            iconOnly
            :selected="isBoldActive"
            @click="editor?.commands.toggleBold()"
            title="굵게">
        <strong>B</strong>
      </VBtn>
      <VBtn variant="secondary"
            size="small"
            iconOnly
            :selected="isItalicActive"
            @click="editor?.commands.toggleItalic()"
            title="기울임">
        <em>I</em>
      </VBtn>
      <VBtn variant="secondary"
            size="small"
            iconOnly
            :selected="isStrikeActive"
            @click="editor?.commands.toggleStrike()"
            title="취소선">
        <s>S</s>
      </VBtn>
      <VBtn variant="secondary"
            size="small"
            iconOnly
            :selected="isCodeActive"
            @click="editor?.commands.toggleCode()"
            title="코드">
        <span style="letter-spacing: 0px">&lt;/&gt;</span>
      </VBtn>
      <div class="w-px h-3 bg-page-header-divider mx-1"></div>
      <VBtn variant="secondary"
            size="small"
            iconOnly
            :selected="isHeading1Active"
            @click="editor?.commands.toggleHeading({ level: 1 })"
            title="제목 1">
        <span style="letter-spacing: 0px">H1</span>
      </VBtn>
      <VBtn variant="secondary"
            size="small"
            iconOnly
            :selected="isHeading2Active"
            @click="editor?.commands.toggleHeading({ level: 2 })"
            title="제목 2">
        <span style="letter-spacing: 0px">H2</span>
      </VBtn>
      <VBtn variant="secondary"
            size="small"
            iconOnly
            :selected="isBulletListActive"
            @click="editor?.commands.toggleBulletList()"
            title="글머리 기호 목록">
        •
      </VBtn>
      <VBtn variant="secondary"
            size="small"
            iconOnly
            :selected="isOrderedListActive"
            @click="editor?.commands.toggleOrderedList()"
            title="번호 목록">
        1.
      </VBtn>
      <VBtn variant="secondary"
            size="small"
            iconOnly
            :selected="isBlockquoteActive"
            @click="editor?.commands.toggleBlockquote()"
            title="인용구">
        "
      </VBtn>
      <div class="w-px h-3 bg-page-header-divider mx-1"></div>
      <VBtn variant="secondary"
            iconOnly
            size="small"
            @click="editor?.commands.undo()"
            title="실행 취소">
        ↶
      </VBtn>
      <VBtn variant="secondary"
            size="small"
            iconOnly
            @click="editor?.commands.redo()"
            title="다시 실행">
        ↷
      </VBtn>
    </div>
    <!-- Editor Content -->
    <div class="dsds-tiptap-editor"
         @click="focusEditor">
      <EditorContent :editor="editor" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { VBtn } from '@/components/ui'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import { computed, onUnmounted, watch } from 'vue'

const props = withDefaults(defineProps<{
  /** v-model로 바인딩되는 HTML 콘텐츠 값 */
  modelValue?: string
  /** 에디터가 비어있을 때 표시할 플레이스홀더 텍스트 */
  placeholder?: string
  /** 에디터 컨테이너의 높이 (CSS 값 또는 숫자) */
  height?: string | number
}>(), {
  modelValue: '',
  placeholder: '내용을 입력하세요.',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

// Editor instance
const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Image.configure({
      allowBase64: true,
    }),
    Placeholder.configure({
      placeholder: ({ node }) => {
        if (node.type.name === 'paragraph' || node.type.name === 'heading') {
          return props.placeholder || '내용을 입력하세요.'
        }
        return ''
      },
      emptyEditorClass: 'is-editor-empty',
    }),
  ],
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
  onPaste: (event) => {
    // 클립보드 이미지 붙여넣기 처리
    const clipboardData = event.clipboardData
    if (!clipboardData) return

    const items = clipboardData.items
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (item.type.indexOf('image') !== -1) {
        event.preventDefault()
        const file = item.getAsFile()
        if (file) {
          const reader = new FileReader()
          reader.onload = (e) => {
            const result = e.target?.result as string
            if (result && editor.value) {
              // Image 노드를 직접 생성하여 삽입
              editor.value.chain().focus().insertContent({
                type: 'image',
                attrs: {
                  src: result,
                  alt: 'Pasted image',
                }
              }).run()
            }
          }
          reader.readAsDataURL(file)
        }
        break // 첫 번째 이미지만 처리
      }
    }
  },
})

// Watch for external content changes
watch(() => props.modelValue, (newValue) => {
  if (editor.value && newValue !== editor.value.getHTML()) {
    editor.value.commands.setContent(newValue)
  }
})

// Editor state getters
const isBoldActive = computed(() => editor.value?.isActive('bold') ?? false)
const isItalicActive = computed(() => editor.value?.isActive('italic') ?? false)
const isStrikeActive = computed(() => editor.value?.isActive('strike') ?? false)
const isCodeActive = computed(() => editor.value?.isActive('code') ?? false)
const isHeading1Active = computed(() => editor.value?.isActive('heading', { level: 1 }) ?? false)
const isHeading2Active = computed(() => editor.value?.isActive('heading', { level: 2 }) ?? false)
const isBulletListActive = computed(() => editor.value?.isActive('bulletList') ?? false)
const isOrderedListActive = computed(() => editor.value?.isActive('orderedList') ?? false)
const isBlockquoteActive = computed(() => editor.value?.isActive('blockquote') ?? false)

// Focus editor
const focusEditor = () => {
  editor.value?.commands.focus()
}

// Cleanup
onUnmounted(() => {
  editor.value?.destroy()
})
</script>
