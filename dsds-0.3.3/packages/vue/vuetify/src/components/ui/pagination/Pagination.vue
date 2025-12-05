<script setup lang="ts">
import { PaginationContent, PaginationDot, PaginationNumber } from '@/components/ui'
import { computed } from 'vue'
import PaginationRoot from './PaginationRoot.vue'

export interface PaginationProps {
  isDot?: boolean
  startPage?: number
  selectedPage?: number
  length: number
  modelValue?: number
}

const props = withDefaults(defineProps<PaginationProps>(), {
  startPage: 1,
  selectedPage: 1,
  modelValue: 1,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  'update:selectedPage': [value: number]
  'page-change': [page: number]
  'first': []
  'prev': []
  'next': []
  'last': []
}>()

const currentPage = computed({
  get: () => props.modelValue ?? props.selectedPage ?? 1,
  set: (value: number) => {
    emit('update:modelValue', value)
    emit('update:selectedPage', value)
    emit('page-change', value)
  }
})

const pages = computed(() => {
  const list = [] as number[]
  const start = props.startPage || 1
  for (let i = 0; i < props.length; i++) {
    list.push(start + i)
  }
  return list
})

// Disabled 상태 계산
const isFirstDisabled = computed(() => currentPage.value === 1)
const isPrevDisabled = computed(() => currentPage.value === 1)
const isNextDisabled = computed(() => {
  const maxPage = pages.value[pages.value.length - 1] || 1
  return currentPage.value >= maxPage
})
const isLastDisabled = computed(() => {
  const maxPage = pages.value[pages.value.length - 1] || 1
  return currentPage.value >= maxPage
})

const handlePageClick = (page: number) => {
  currentPage.value = page
}

const handleFirst = () => {
  if (isFirstDisabled.value) return
  currentPage.value = 1
  emit('first')
}

const handlePrev = () => {
  if (isPrevDisabled.value) return
  if (currentPage.value > 1) {
    currentPage.value = currentPage.value - 1
  }
  emit('prev')
}

const handleNext = () => {
  if (isNextDisabled.value) return
  const maxPage = pages.value[pages.value.length - 1] || 1
  if (currentPage.value < maxPage) {
    currentPage.value = currentPage.value + 1
  }
  emit('next')
}

const handleLast = () => {
  if (isLastDisabled.value) return
  const maxPage = pages.value[pages.value.length - 1] || 1
  currentPage.value = maxPage
  emit('last')
}
</script>

<template>
  <PaginationRoot>
    <PaginationContent :isDot="props.isDot">
      <template v-if="props.isDot">
        <PaginationDot v-for="(_, i) in Array.from({ length: props.length })"
                       :key="i + 1"
                       :isSelected="(i + 1) === currentPage"
                       :tabIndex="(i + 1) === currentPage ? -1 : undefined"
                       @click="handlePageClick(i + 1)" />
      </template>
      <template v-else>
        <PaginationNumber chevron="first"
                          :disabled="isFirstDisabled"
                          @click="handleFirst" />
        <PaginationNumber chevron="left"
                          :disabled="isPrevDisabled"
                          @click="handlePrev" />
        <PaginationNumber v-for="p in pages"
                          :tabIndex="p === currentPage ? -1 : undefined"
                          :key="p"
                          :page="p"
                          :isSelected="p === currentPage"
                          @click="handlePageClick(p)" />
        <PaginationNumber chevron="right"
                          :disabled="isNextDisabled"
                          @click="handleNext" />
        <PaginationNumber chevron="last"
                          :disabled="isLastDisabled"
                          @click="handleLast" />
      </template>
    </PaginationContent>
  </PaginationRoot>
</template>
