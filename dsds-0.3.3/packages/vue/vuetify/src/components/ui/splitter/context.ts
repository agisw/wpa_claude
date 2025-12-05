import type { Ref } from "vue"
import { inject, provide } from "vue"

export type SplitterContainerSize = {
  width: Ref<number>
  height: Ref<number>
}

const SplitterContainerSymbol = Symbol("dsds.splitter.container")

export function provideSplitterContainer(size: SplitterContainerSize) {
  provide(SplitterContainerSymbol, size)
}

export function useSplitterContainer() {
  return inject<SplitterContainerSize | null>(SplitterContainerSymbol, null)
}
