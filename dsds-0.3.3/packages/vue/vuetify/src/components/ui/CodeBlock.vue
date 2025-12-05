<script setup lang="ts">
import { codeToHtml } from 'shiki'
import { onMounted, ref, watch } from 'vue'

interface Props {
  code: string
  lang: string
  theme?: string
  inline?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'vitesse-dark'
})

const highlightedHtml = ref('')
const isLoading = ref(true)

const highlightCode = async () => {
  try {
    isLoading.value = true

    // Shiki의 shorthand 함수 사용 (자동으로 theme/language를 on-demand 로드)
    const html = await codeToHtml(props.code, {
      lang: props.lang,
      theme: props.theme
    })

    highlightedHtml.value = html
  } catch (error) {
    console.error('Shiki highlighting error:', error)
    // 에러 발생 시 기본 pre/code 태그로 fallback
    highlightedHtml.value = `<pre><code>${props.code}</code></pre>`
  } finally {
    isLoading.value = false
  }
}

// props 변경 시 재하이라이팅
watch(() => [props.code, props.lang, props.theme], highlightCode, { immediate: false })

onMounted(highlightCode)
</script>

<template>
  <code v-if="inline" class="rounded bg-gray-100 px-1">{{ code }}</code>
  <div class="shiki-code-block" v-else>
    <!-- 로딩 상태 -->
    <pre v-if="isLoading"
         class="loading-fallback">
      <code>{{ code }}</code>
    </pre>

    <!-- Shiki로 하이라이팅된 HTML -->
    <div v-else-if="highlightedHtml"
         v-html="highlightedHtml" />

    <!-- 에러 fallback -->
    <pre v-else
         class="error-fallback">
      <code>{{ code }}</code>
    </pre>
  </div>
</template>

<style scoped>
.shiki-code-block {
  position: relative;
}

/* 로딩 및 에러 상태 스타일 */
.loading-fallback,
.error-fallback {
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #f6f8fa;
  border: 1px solid #e1e4e8;
  overflow-x: auto;
}

.loading-fallback {
  opacity: 0.7;
}

.error-fallback {
  background-color: #fff5f5;
  border-color: #fed7d7;
}

/* Shiki 생성 HTML에 대한 추가 스타일 */
:deep(.shiki) {
  border-radius: 0.5rem;
  overflow-x: auto;
}

:deep(.shiki code) {
  display: block;
  padding: 1rem;
  font-size: 13px;
  line-height: 1.3;
}

/* 다크모드 대응 */
@media (prefers-color-scheme: dark) {

  .loading-fallback,
  .error-fallback {
    background-color: #1a1a1a;
    border-color: #333;
    color: #e1e4e8;
  }

  .error-fallback {
    background-color: #2d1b1b;
    border-color: #5d2d2d;
  }
}
</style>
