import { inject } from "vue"
import { LNBContextKey, type LNBContext } from "./types"

export function useLNBContext(): LNBContext {
  const context = inject(LNBContextKey)
  if (!context) {
    throw new Error("useLNBContext는 LNB 컴포넌트 내부에서만 사용할 수 있습니다.")
  }
  return context
}
