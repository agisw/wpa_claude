<template>
  <div :class="['flex flex-col gap-2 radius-xs', props.class]">
    <div class="flex items-center h-5!">
      <NoticeIcon class="p-0!" />
      <div class="pl-2 typo-sok-h6-14-400">공지사항</div>
    </div>

    <div class="dsds-textarea min-h-[33px]! max-h-[72px]!">
      <div v-if="!noticeCont"
           class="typo-body text-[var(--color-text-on-box-on-box-disabled)]!">공지사항이 없습니다.</div>
      <div class="typo-body"
           v-html="noticeCont"
           v-else></div>
    </div>
  </div>
</template>
<script setup lang="ts">

import { NoticeIcon } from '@/components/icons'

const props = defineProps<{
  noticeCont: string,
  class?: string,
}>();
</script>
<style scoped></style>
