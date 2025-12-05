<template>
  <AccordionRoot class="lnb-tree"
                 type="multiple"
                 :model-value="openPanels"
                 @update:modelValue="updatePanels">
    <template v-for="item in items"
              :key="item.id">
      <AccordionItem class="lnb-tree-item"
                     :value="item.disabled ? 'disabled_content' : item.id"
                     :disabled="item.disabled"
                     v-slot="{ open }">
        <AccordionHeader class="lnb-tree-title">
          <!-- 1depth tree간 divider  -->
          <div v-if="!onlyTree && item.depth === 1 && item.id.match(/\d+$/)?.[0] != '1'"
               class="lnb-divider mx-[10px]" />
          <AccordionTrigger :style="{ paddingLeft: `${getPadding(item)}px` }"
                            :class="[
                              'lnb-tree-trigger',
                              (item.items?.length && ((!onlyTree && item.depth === 1) || (onlyTree && item.depth === 0))) && 'data-[state=open]:mb-[-4px]',
                              ,
                              {
                                'lnb-tree-trigger-root'
                                  :
                                  ((!onlyTree && item.depth === 1) || (onlyTree && item.depth === 0)), 'lnb-tree-trigger-nested'
                                  :
                                  (item.depth
                                    &&
                                    item.depth > 1) || (onlyTree && item.depth && item.depth > 0),
                                'lnb-tree-trigger-disabled': item.disabled,
                                'lnb-tree-trigger-expanded': open,

                              }
                            ]">
            <ChevronUpIcon class="lnb-tree-icon"
                           :class="{ 'is-expanded': open }" />
            <span class="truncate">
              <LNBHighlightedText :text="item.content"
                                  :search-text="searchText" />
            </span>
          </AccordionTrigger>
        </AccordionHeader>
        <!-- Selected Tree 의 하단 Border에 ‘Upper_Spacing’ 옵션 적용 -->
        <AccordionContent v-if="item.items && item.items.length"
                          class="lnb-accordion-content"
                          :class="{ 'data-[state=open]:mb-1': ((!onlyTree && item.depth === 1) || (onlyTree && item.depth === 0)) }">
          <template v-for="child in item.items"
                    :key="child.id">
            <LNBTree v-if="child.type === 'tree'"
                     :items="[child as LNBTreeItem]" />
            <LNBContent v-else
                        :items="[child as LNBContentItem]" />
          </template>
        </AccordionContent>
        <!-- 트리만 사용할 때 최상위 트리의 구분선 -->
        <div v-if="onlyTree && item.depth === 0"
             class="lnb-divider " />
      </AccordionItem>

    </template>
  </AccordionRoot>
</template>

<script setup lang="ts">
import { ChevronUpIcon } from "@/components/icons"
import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger } from "reka-ui"
import { computed } from "vue"
import { useLNBContext } from "./context"
import { normalizePanelValue } from "./helpers"
import LNBHighlightedText from "./LNBHighlightedText.vue"
import type { LNBContentItem, LNBTreeItem } from "./types"

interface LNBTreeProps {
  items: LNBTreeItem[]
}

const props = defineProps<LNBTreeProps>()

const { openPath, setOpenPath, onlyTree, searchText } = useLNBContext()

const managedIds = computed(() => {
  const ids: string[] = []

  const collect = (nodes: Array<LNBTreeItem | LNBContentItem>) => {
    nodes.forEach((node) => {
      if ((node as LNBTreeItem).type === "item") {
        return
      }
      const treeNode = node as LNBTreeItem
      ids.push(treeNode.disabled ? "disabled_content" : treeNode.id)
      if (treeNode.items && treeNode.items.length > 0) {
        collect(treeNode.items as Array<LNBTreeItem | LNBContentItem>)
      }
    })
  }

  collect(props.items)
  return ids
})

const openPanels = computed(() => openPath.value.filter((value) => managedIds.value.includes(value)))

const updatePanels = (value: unknown) => {
  const normalized = normalizePanelValue(value as string | number | (string | number)[] | null | undefined)
  const preserved = openPath.value.filter((existing) => !managedIds.value.includes(existing))
  setOpenPath([...preserved, ...normalized])
}

const getPadding = (item: LNBTreeItem) => {
  if (!item.depth) return 8
  const base = item.depth * 16 + 8
  return onlyTree.value ? base : base - 16
}
</script>
