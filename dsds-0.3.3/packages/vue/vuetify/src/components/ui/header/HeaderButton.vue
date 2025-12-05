<template>
  <div v-if="hasBadgeOrNotiCount"
       class="header-button-wrapper">
    <VBtn variant="ghost"
          :class="buttonClasses"
          v-bind="$attrs"
          @click="$emit('click', $event)">
      <div :class="[
        'header-button-label',
        tabsContext.isInTabs && 'header-menu-tab'
      ]">
        <slot>{{ content }}</slot>
      </div>
    </VBtn>
    <div v-if="badge"
         class="header-badge"></div>
    <div v-else-if="notiCount"
         class="header-noti-count-wrapper">
      <Badge kind="count"
             :class="props.notiCount && props.notiCount < 10 ? 'header-noti-count-small' : ''">
        {{ displayNotiCount }}
      </Badge>
    </div>
  </div>
  <VBtn v-else
        variant="ghost"
        :class="buttonClasses"
        v-bind="$attrs"
        @click="$emit('click', $event)">
    <div :class="[
      'header-button-label',
      tabsContext.isInTabs && 'header-menu-tab'
    ]">
      <slot>{{ content }}</slot>
    </div>
  </VBtn>
</template>

<script setup lang="ts">
import { VBtn } from '@/components/ui'
import { computed, inject } from 'vue'

defineOptions({
  inheritAttrs: false
})

interface Props {
  content?: string
  badge?: boolean
  notiCount?: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const HeaderTabsKey = Symbol('HeaderTabs')
const tabsContext = inject(HeaderTabsKey, { isInTabs: false })

const hasBadgeOrNotiCount = computed(() =>
  props.badge || (typeof props.notiCount === 'number' && props.notiCount > 0)
)

const displayNotiCount = computed(() =>
  props.notiCount && props.notiCount > 99 ? 99 : props.notiCount
)

const buttonClasses = computed(() => [
  'dsds-header-button',
  tabsContext.isInTabs && 'header-tab-item',
  !tabsContext.isInTabs && 'header-button-normal',
])


</script>
