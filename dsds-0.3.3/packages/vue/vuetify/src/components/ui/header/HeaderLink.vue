<template>
  <a :href="href"
     tabindex="-1"
     v-bind="$attrs">
    <HeaderButton class="header-link"
                  @click="$emit('click', $event)">
      <slot>{{ content }}</slot>
    </HeaderButton>
  </a>
</template>

<script setup lang="ts">
import HeaderButton from './HeaderButton.vue'

defineOptions({
  inheritAttrs: false
})

defineProps<{
  href?: string
  content?: string
}>()

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>
