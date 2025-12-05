<template>
  <div class="dsds-footer-copyright">
    <template v-if="hasDefaultSlot">
      <CopyrightIcon />
      <span class="align-middle">
        <slot />
      </span>
    </template>
    <template v-else>
      <img :src="samsungCopyrightIcon"
           :alt="props.fallbackText"
           height="16px" />
    </template>
  </div>
</template>

<script setup lang="ts">
import samsungCopyrightIcon from "@/assets/icons/Icon-SamsungCopyright.png"
import { CopyrightIcon } from "@/components/icons"
import { hasSlotContent } from "@/lib/utils"
import { computed, useSlots } from "vue"

interface FooterCopyrightProps {
  fallbackText?: string
}

const props = withDefaults(defineProps<FooterCopyrightProps>(), {
  fallbackText: "Samsung",
})
const slots = useSlots()

const hasDefaultSlot = computed(() => hasSlotContent(slots.default))
</script>
