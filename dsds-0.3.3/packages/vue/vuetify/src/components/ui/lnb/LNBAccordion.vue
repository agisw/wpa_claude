<template>
  <AccordionRoot class="lnb-accordion"
                 type="multiple"
                 :model-value="openPanels"
                 @update:modelValue="updatePanels">
    <AccordionItem v-for="item in items"
                   :key="item.id"
                   class="lnb-accordion-item"
                   :value="item.disabled ? 'disabled_content' : item.id"
                   :disabled="item.disabled"
                   v-slot="{ open }">
      <AccordionHeader class="lnb-accordion-title">
        <AccordionTrigger class="lnb-accordion-trigger"
                          :class="{ 'is-disabled': item.disabled }">
          <span class="truncate">
            <LNBHighlightedText :text="item.content"
                                :search-text="searchText" />
          </span>
          <ChevronUpIcon :class="['lnb-accordion-icon', { 'is-expanded': open }]" />
        </AccordionTrigger>
      </AccordionHeader>
      <!-- Accordion 간의 Divider -->
      <div class="lnb-divider" />
      <AccordionContent class="lnb-accordion-content"
                        :class="{ 'has-children': item.items && item.items.length }">
        <template v-for="child in item.items"
                  :key="child.id">
          <LNBTree v-if="child.type === 'tree'"
                   :items="[child as LNBTreeItem]" />
          <LNBContent v-else
                      :items="[child as LNBContentItem]" />
        </template>
        <!-- 마지막 Divider -->
        <div v-if="item.items && item.items.length"
             class="lnb-divider " />
      </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>

<script setup lang="ts">
import { ChevronUpIcon } from "@/components/icons"
import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger } from "reka-ui"
import { computed } from "vue"
import { useLNBContext } from "./context"
import { normalizePanelValue } from "./helpers"
import LNBHighlightedText from "./LNBHighlightedText.vue"
import LNBTree from "./LNBTree.vue"
import type { LNBAccordionItem, LNBContentItem, LNBTreeItem } from "./types"

interface LNBAccordionProps {
  items: LNBAccordionItem[]
}

const props = defineProps<LNBAccordionProps>()

const { openPath, setOpenPath, searchText } = useLNBContext()

const managedIds = computed(() => props.items.map((item) => (item.disabled ? "disabled_content" : item.id)))

const openPanels = computed(() => openPath.value.filter((value) => managedIds.value.includes(value)))

const updatePanels = (value: unknown) => {
  const normalized = normalizePanelValue(value as string | number | (string | number)[] | null | undefined)
  const preserved = openPath.value.filter((existing) => !managedIds.value.includes(existing))
  setOpenPath([...preserved, ...normalized])
}
</script>
