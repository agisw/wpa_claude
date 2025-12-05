<template>
  <div class="dsds-dialog-panel flex flex-col h-full flex-1"
       :class="{ collapsible: collapsible }">
    <div class="dsds-dialog-panel-header flex items-center mb-2"
         v-if="title">
      <VBtn v-if="collapsible"
            variant="ghost"
            size="small"
            iconOnly
            @click="toggle"
            :aria-expanded="!collapsed">
        <ChevronDownIcon :class="!collapsed ? '' : 'rotate-180'"
                         :size="14" />
      </VBtn>

      <div class="typo-sok-h6-14-700 flex items-center">
        <slot name="title">{{ title }}</slot>
      </div>

      <div class="flex items-center gap-1 ml-2">
        <slot name="title-tools" />
      </div>
    </div>

    <div class="dsds-dialog-panel-body flex flex-1 h-full flex-col gap-3"
         :class="{ ' rounded-xs p-4! border-1 border-[var(--color-border-border-2-outer)]! bg-[var(--colors-neutral-neutral-02)]!': collapsible }"
         v-show="!collapsed">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChevronDownIcon from '@/components/icons/ChevronDownIcon.vue'
import VBtn from '@/components/ui/VBtn.vue'
import { ref, watch } from 'vue'

const props = defineProps({
  collapsible: { type: Boolean, default: false },
  title: { type: String, default: '' },
  startCollapsed: { type: Boolean, default: false }
})

const collapsed = ref(props.collapsible ? props.startCollapsed : false)

watch(() => props.collapsible, (v) => {
  if (!v) collapsed.value = false
})

function toggle() {
  if (!props.collapsible) return
  collapsed.value = !collapsed.value
}
</script>

<!-- No component-scoped styles here; styling is provided by global DSDS CSS -->
