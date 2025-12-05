<template>
  <div :class="['dsds-breadcrumb-text', { 'cursor-not-allowed': disabled }]">
    <v-tooltip v-model="showTooltip"
               :disabled="!shouldShowTooltip"
               location="bottom">
      <template #activator="{ props: tooltipProps }">
        <a v-if="href"
           v-bind="{ ...tooltipProps, ...attrs }"
           :href="href"
           :class="linkClasses"
           @focus="handleFocus"
           @blur="handleBlur"
           :aria-disabled="disabled ? 'true' : undefined">
          <span ref="textRef"
                class="truncate">
            <slot>{{ text }}</slot>
          </span>
        </a>
        <span v-else
              v-bind="{ ...tooltipProps, ...attrs }"
              tabindex="0"
              :class="linkClasses"
              @focus="handleFocus"
              @blur="handleBlur">
          <span ref="textRef"
                class="truncate cursor-default">
            <slot>{{ text }}</slot>
          </span>
        </span>
      </template>

      <span>
        <slot>{{ text }}</slot>
      </span>
    </v-tooltip>
  </div>
</template>

<script setup lang="ts">
import { VTooltip } from "@/components/ui"
import { computed, nextTick, onBeforeUnmount, onMounted, ref, toRefs, useAttrs } from "vue"

const props = withDefaults(defineProps<{
  href?: string
  text?: string  // backup text when slot isn't provided
  selected?: boolean
  disabled?: boolean
}>(), {
  text: "",
  selected: false,
  disabled: false,
})

// Destructure props for easier template access
const { href, text, selected, disabled } = toRefs(props)

const attrs = useAttrs()
const textRef = ref<HTMLElement | null>(null)
const showTooltip = ref(false)
const shouldShowTooltip = ref(false)

const linkClasses = computed(() => [
  // Base classes
  "dsds-breadcrumb-link",
  // Conditional classes using object syntax
  {
    "with-href": href.value,
    "disabled": disabled.value,
    "selected": selected.value,
  },
])

let ro: ResizeObserver | null = null
let resizeListener: (() => void) | null = null

const checkTextOverflow = async () => {
  await nextTick()
  const el = textRef.value
  if (el) {
    shouldShowTooltip.value = el.scrollWidth > el.clientWidth
  }
}

const handleFocus = () => {
  if (shouldShowTooltip.value) {
    showTooltip.value = true
  }
}

const handleBlur = () => {
  showTooltip.value = false
}

onMounted(() => {
  // initial check
  checkTextOverflow()

  // ResizeObserver for dynamic content/size changes
  if (typeof ResizeObserver !== "undefined") {
    ro = new ResizeObserver(() => {
      checkTextOverflow()
    })
    if (textRef.value) ro.observe(textRef.value)
  } else {
    // fallback: window resize
    resizeListener = () => checkTextOverflow()
    window.addEventListener("resize", resizeListener)
  }
})

onBeforeUnmount(() => {
  if (ro && textRef.value) ro.unobserve(textRef.value)
  ro = null
  if (resizeListener) window.removeEventListener("resize", resizeListener)
})
</script>
