<template>
  <div class="dsds-breadcrumb-element"
       v-bind="$attrs">
    <slot />
    <BreadcrumbSlashIcon v-if="!isLast" />
  </div>
</template>

<script setup lang="ts">
import { BreadcrumbSlashIcon } from "@/components/icons"

defineOptions({
  inheritAttrs: false
})

defineProps<{
  isLast?: boolean
}>()
</script>