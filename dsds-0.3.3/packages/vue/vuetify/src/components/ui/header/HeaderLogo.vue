<template>
  <component :is="as"
             :href="as === 'a' ? homeUrl : undefined"
             @click="handleClick"
             class="header-logo">
    <slot>{{ content }}</slot>
  </component>
</template>

<script setup lang="ts">

interface Props {
  as?: 'a' | 'h1' | 'div'
  homeUrl?: string
  onLogoClick?: (event: MouseEvent) => void
  content?: string
}

const props = withDefaults(defineProps<Props>(), {
  as: 'a',
  homeUrl: '/'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (e: MouseEvent) => {
  if (props.as === 'a' && props.onLogoClick) {
    e.preventDefault()
    props.onLogoClick(e)
  }
  emit('click', e)
}
</script>
