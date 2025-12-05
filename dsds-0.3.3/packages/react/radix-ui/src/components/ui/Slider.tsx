"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"
import { Textbox } from "@/components/ui/boxes/Textbox"

type Range = [number, number]

type Props = Omit<
  React.ComponentProps<typeof SliderPrimitive.Root>,
  "min" | "max" | "defaultValue" | "value" | "onValueChange"
> & {
  min?: number
  max?: number
  value?: Range
  onValueChange?: (v: Range) => void
}

/**
 * 기본 Slider 컴포넌트입니다. 최소, 최대가 지정되지 않은 초기화 상태입니다.
 *
 * - 왼쪽 텍스트박스 내 숫자 입력으로 `min`, 오른쪽 텍스트박스 내 숫자 입력으로 `max`를 지정할 수 있습니다. (0-100)
 * - 마우스 컨트롤로 슬라이더 트랙 위 바를 이동시킬 경우, 텍스트박스 내 숫자가 실시간으로 연동됩니다.
 * - 텍스트박스를 클릭한 뒤, 키보드 상하 방향키로 숫자를 미세 조정할 수 있습니다. (1 단위씩 증감)
 * - 슬라이더 트랙 위 바끼리 교차할 경우, 최솟값과 최댓값이 즉시 반전되어 적용됩니다.
 **/

export function Slider({ className, min = 0, max = 100, value, onValueChange, ...props }: Props) {
  const [modality, setModality] = React.useState<"keyboard" | "pointer">("pointer")
  const [dragging, setDragging] = React.useState(false)
  const [leftInteracted, setLeftInteracted] = React.useState(false)
  const [rightInteracted, setRightInteracted] = React.useState(false)

  React.useEffect(() => {
    const up = () => setDragging(false)
    window.addEventListener("pointerup", up)
    window.addEventListener("blur", up)
    return () => {
      window.removeEventListener("pointerup", up)
      window.removeEventListener("blur", up)
    }
  }, [])

  const clamp = React.useCallback((n: number) => Math.min(max, Math.max(min, n)), [min, max])
  const normalize = React.useCallback(
    (a: number, b: number): Range => {
      const lo = clamp(Math.min(a, b))
      const hi = clamp(Math.max(a, b))
      return [lo, hi]
    },
    [clamp]
  )
  const onlyDigits = (s: string) => /^\d*$/.test(s)

  const initial: Range = [min, max]
  const isControlled = value != null
  const [committed, setCommitted] = React.useState<Range>(initial)

  const current: Range = isControlled ? value! : committed
  const hideRange = current[0] === current[1]

  const [draftL, setDraftL] = React.useState<string>(String(current[0]))
  const [draftR, setDraftR] = React.useState<string>(String(current[1]))

  React.useEffect(() => {
    setDraftL(String(current[0]))
    setDraftR(String(current[1]))
  }, [current])

  React.useEffect(() => {
    if (!isControlled) {
      setCommitted((prev) => normalize(prev[0], prev[1]))
    } else if (value) {
      const fixed = normalize(value[0], value[1])
      if (fixed[0] !== value[0] || fixed[1] !== value[1]) onValueChange?.(fixed)
    }
  }, [min, max, isControlled, normalize, value, onValueChange])

  const commit = (next: Range) => {
    const v = normalize(next[0], next[1])
    if (!leftInteracted && v[0] !== current[0]) setLeftInteracted(true)
    if (!rightInteracted && v[1] !== current[1]) setRightInteracted(true)
    if (isControlled) onValueChange?.(v)
    else setCommitted(v)
    setDraftL(String(v[0]))
    setDraftR(String(v[1]))
  }

  const handleSlide = (arr: number[]) => {
    const [a = min, b = max] = arr
    commit([a, b])
  }

  const handleArrowInTextbox = (delta: number, which: "L" | "R") => {
    const base: Range = [Number(draftL || current[0]), Number(draftR || current[1])]
    let [l, r] = base
    if (which === "L") l = clamp(l + delta)
    else r = clamp(r + delta)
    commit([l, r])
  }

  const onKeyDownLeft = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      handleArrowInTextbox(+1, "L")
      return
    }
    if (e.key === "ArrowDown") {
      e.preventDefault()
      handleArrowInTextbox(-1, "L")
      return
    }
    if (e.key === "Enter" || e.key === " " || e.code === "Space") {
      e.preventDefault()
      const n = Number(draftL)
      const safe = Number.isNaN(n) ? current[0] : clamp(n)
      commit([Math.min(safe, current[1]), current[1]])
      e.currentTarget.blur()
    }
  }
  const onKeyDownRight = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      handleArrowInTextbox(+1, "R")
      return
    }
    if (e.key === "ArrowDown") {
      e.preventDefault()
      handleArrowInTextbox(-1, "R")
      return
    }
    if (e.key === "Enter" || e.key === " " || e.code === "Space") {
      e.preventDefault()
      const n = Number(draftR)
      const safe = Number.isNaN(n) ? current[1] : clamp(n)
      commit([current[0], Math.max(safe, current[0])])
      e.currentTarget.blur()
    }
  }

  const onChangeLeft: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const v = e.currentTarget.value.trim()
    if (!onlyDigits(v)) return
    setDraftL(v)
    if (!leftInteracted) setLeftInteracted(true)
  }
  const onChangeRight: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const v = e.currentTarget.value.trim()
    if (!onlyDigits(v)) return
    setDraftR(v)
    if (!rightInteracted) setRightInteracted(true)
  }

  const onBlurLeft: React.FocusEventHandler<HTMLInputElement> = () => {
    const raw = draftL
    const n = raw === "" ? current[0] : Number(raw)
    const safe = Number.isNaN(n) ? current[0] : clamp(n)
    commit([safe, current[1]])
  }

  const onBlurRight: React.FocusEventHandler<HTMLInputElement> = () => {
    const raw = draftR
    const n = raw === "" ? current[1] : Number(raw)
    const safe = Number.isNaN(n) ? current[1] : clamp(n)
    commit([current[0], safe])
  }

  const textColorLeft = leftInteracted
    ? "!text-[color:var(--colors-neutral-neutral-16)]"
    : "!text-[color:var(--colors-neutral-neutral-13)]"

  const textColorRight = rightInteracted
    ? "!text-[color:var(--colors-neutral-neutral-16)]"
    : "!text-[color:var(--colors-neutral-neutral-13)]"

  const textboxWrapper = "slider-textbox-wrapper"

  return (
    <div
      className={cn("group slider-container", className)}
      data-modality={modality}
      data-dragging={String(dragging)}
      onKeyDownCapture={() => setModality("keyboard")}
      onPointerDownCapture={() => setModality("pointer")}
    >
      {/* ← Left textbox */}
      <Textbox
        type="text"
        value={draftL}
        placeholder={String(current[0])}
        onChange={onChangeLeft}
        onBlur={onBlurLeft}
        onKeyDown={onKeyDownLeft}
        className={cn(textColorLeft, "flex-shrink-0")}
        width={44}
        wrapperClassName={textboxWrapper}
      />

      {/* ← Slider UI */}
      <SliderPrimitive.Root
        data-slot="slider"
        min={min}
        max={max}
        value={current}
        onValueChange={handleSlide}
        className={cn("slider-root")}
        onPointerDownCapture={() => setDragging(true)}
        onPointerUpCapture={() => setDragging(false)}
        {...props}
      >
        <SliderPrimitive.Track data-slot="slider-track" className="slider-track">
          <SliderPrimitive.Range data-slot="slider-range" className={cn("slider-range", hideRange && "hidden")} />
        </SliderPrimitive.Track>

        {[0, 1].map((i) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={i}
            className={cn("slider-thumb", i === 1 ? "z-[3]" : "z-[2]")}
          />
        ))}
      </SliderPrimitive.Root>

      {/* ← Right textbox */}
      <Textbox
        type="text"
        value={draftR}
        placeholder={String(current[1])}
        onBlur={onBlurRight}
        onChange={onChangeRight}
        onKeyDown={onKeyDownRight}
        className={cn(textColorRight, "flex-shrink-0")}
        width={44}
        wrapperClassName={textboxWrapper}
      />
    </div>
  )
}
