<template>
  <a class="sb-unstyled"
     :href="finalHref"
     :target="props.href?.startsWith('http') ? '_blank' : undefined"
     ref="noreferrer">
    <div :class="[cardStyles(rest), 'bg-blue-100 px-4 py-2 w-46 min-w-46']">
      <span class="font-bold">
        <slot></slot>
      </span>
      <template v-if="description">
        <hr class="text-gray-400 my-2" />
        <p class="font-regular">{{ description }}</p>
      </template>
    </div>
  </a>
</template>

<script lang="ts">
import { cardStyles } from "./constants"
</script>

<script setup lang="ts">

const props = defineProps<{
  href?: string
  description?: string
}>()

const { href, description, ...rest } = props
const prefixUrl = (import.meta as ImportMeta).env.BASE_URL
const finalHref = href ? `${prefixUrl === "/" ? "" : prefixUrl}${href}` : href

</script>

<style scoped></style>