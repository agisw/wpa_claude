<template>
  <footer class="dsds-footer"
          :class="[
            `dsds-footer-${props.theme}`,
            `dsds-footer-${props.size}`,
            { 'dsds-footer-fluid': props.fluid },
          ]">
    <div v-if="hasDefaultSlot"
         class="dsds-footer-container flex"
         :class="alignClassMap[props.align] ?? 'justify-end'">
      <slot />
    </div>
    <div v-else-if="shouldRenderItems"
         class="dsds-footer-container flex"
         :class="alignClassMap[props.align] ?? 'justify-end'">
      <template v-for="(item, index) in items"
                :key="`${item.type}-${index}`">
        <FooterText v-if="item.type === 'text'"
                    v-bind="item.props">
          <RenderContent :content="item.content" />
        </FooterText>
        <FooterCopyright v-else-if="item.type === 'copyright'"
                         v-bind="item.props">
          <template v-if="item.content">
            <RenderContent :content="item.content" />
          </template>
        </FooterCopyright>
        <FooterButton v-else-if="item.type === 'button'"
                      v-bind="item.props">
          <RenderContent :content="item.content" />
        </FooterButton>
        <FooterLink v-else-if="item.type === 'link'"
                    :href="item.href"
                    v-bind="item.props">
          <RenderContent :content="item.content" />
        </FooterLink>
        <FooterDivider v-else-if="item.type === 'divider'"
                       v-bind="item.props" />
        <div v-else-if="item.type === 'custom'"
             v-bind="item.props">
          <RenderContent :content="item.content" />
        </div>
      </template>
    </div>
  </footer>
</template>

<script lang="ts">

import type { FooterAlign, FooterItem, FooterSize, FooterTheme } from "./types"

export interface FooterProps {
  /** Footer에 표시할 아이템 배열 */
  items?: FooterItem[]
  /** Footer 테마 */
  theme?: FooterTheme
  /** Footer 높이 / 패딩 사이즈 */
  size?: FooterSize
  /** 콘텐츠 정렬 방식 */
  align?: FooterAlign
  /** 컨테이너 폭을 그대로 사용 (반응형 최소 폭 비활성화) */
  fluid?: boolean
}

</script>

<script setup lang="ts">
import type { VNodeChild } from "vue"
import { computed, defineComponent, h, isVNode, useSlots } from "vue"

import { hasSlotContent } from "@/lib/utils"

import FooterButton from "./FooterButton.vue"
import FooterCopyright from "./FooterCopyright.vue"
import FooterDivider from "./FooterDivider.vue"
import FooterLink from "./FooterLink.vue"
import FooterText from "./FooterText.vue"

const props = withDefaults(defineProps<FooterProps>(), {
  theme: "light",
  size: "compact",
  align: "right" as FooterAlign,
  fluid: false,
})
const slots = useSlots()

const alignClassMap: Record<FooterAlign, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
}

const hasDefaultSlot = computed(() => hasSlotContent(slots.default))
const items = computed(() => props.items ?? [])
const shouldRenderItems = computed(() => !hasDefaultSlot.value && items.value.length > 0)

const RenderContent = defineComponent({
  name: "FooterRenderContent",
  props: {
    content: {
      type: null,
      default: null,
    },
  },
  setup(renderProps) {
    return () => {
      const value = renderProps.content as VNodeChild | VNodeChild[] | undefined
      if (value === null || value === undefined || value === false) {
        return null
      }

      if (Array.isArray(value)) {
        return value
      }

      if (isVNode(value)) {
        return value
      }

      if (typeof value === "object") {
        return value
      }

      return h("span", null, String(value))
    }
  },
})
</script>
