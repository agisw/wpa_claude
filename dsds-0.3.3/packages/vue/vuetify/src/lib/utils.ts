import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Slot } from "vue"
import { Comment, Fragment, Text, isVNode } from "vue"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hasSlotContent(slot?: Slot) {
  if (!slot) return false
  const content = slot()
  if (!content || content.length === 0) return false
  return content.some((node) => isMeaningfulNode(node))
}

function isMeaningfulNode(node: unknown): boolean {
  if (!isVNode(node)) {
    if (Array.isArray(node)) {
      return node.some((child) => isMeaningfulNode(child))
    }

    if (typeof node === "string") {
      return node.trim().length > 0
    }

    return node !== null && node !== undefined && node !== false
  }

  if (node.type === Comment) {
    return false
  }

  if (node.type === Fragment) {
    const children = node.children
    if (Array.isArray(children)) {
      return children.some((child) => isMeaningfulNode(child))
    }
    return isMeaningfulNode(children)
  }

  if (node.type === Text) {
    if (typeof node.children === "string") {
      return node.children.trim().length > 0
    }

    if (Array.isArray(node.children)) {
      return node.children.some((child) => isMeaningfulNode(child))
    }

    return Boolean(node.children)
  }

  if (Array.isArray(node.children)) {
    return node.children.some((child) => isMeaningfulNode(child))
  }

  if (typeof node.children === "string") {
    return node.children.trim().length > 0
  }

  return true
}

// 날짜 유틸리티: 포맷 및 랜덤 과거 날짜 생성
export function pad(num: number, size = 2) {
  return String(num).padStart(size, "0")
}

/**
 * Simple date formatter supporting tokens: yyyy, MM, dd, HH, mm, ss
 * Example: formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
 */
export function formatDate(date: Date, fmt = "yyyy-MM-dd HH:mm:ss") {
  const yyyy = String(date.getFullYear())
  const MM = pad(date.getMonth() + 1)
  const dd = pad(date.getDate())
  const HH = pad(date.getHours())
  const mm = pad(date.getMinutes())
  const ss = pad(date.getSeconds())

  return fmt
    .replace(/yyyy/g, yyyy)
    .replace(/MM/g, MM)
    .replace(/dd/g, dd)
    .replace(/HH/g, HH)
    .replace(/hh/g, HH) // hh alias to HH
    .replace(/mm/g, mm)
    .replace(/ss/g, ss)
}

export function dedent(template: TemplateStringsArray | string, ...substitutions: unknown[]): string {
  const buildString = (): string => {
    if (typeof template === "string") {
      return template
    }

    return template.reduce((acc, chunk, index) => {
      const substitution = index < substitutions.length ? substitutions[index] : ""
      return acc + chunk + substitution
    }, "")
  }

  const raw = buildString().replace(/\r\n?/g, "\n")

  const lines = raw.split("\n")

  while (lines.length > 0 && lines[0].trim() === "") {
    lines.shift()
  }

  while (lines.length > 0 && lines[lines.length - 1].trim() === "") {
    lines.pop()
  }

  const indents = lines.filter((line) => line.trim().length > 0).map((line) => line.match(/^[ \t]*/)?.[0].length ?? 0)

  const minIndent = indents.length > 0 ? Math.min(...indents) : 0

  const dedented = minIndent > 0 ? lines.map((line) => line.replace(new RegExp(`^[ \t]{0,${minIndent}}`), "")) : lines

  return dedented.join("\n")
}

/**
 * Rounds the given value to a fixed number of decimal places.
 * Defaults to one decimal place to match most DSDS formatting needs.
 */
export function round(value: number, digits = 1): number {
  if (!Number.isFinite(value)) {
    return 0
  }

  const safeDigits = Number.isFinite(digits) ? Math.max(0, Math.floor(digits)) : 0
  if (safeDigits === 0) {
    return Math.round(value)
  }

  const factor = 10 ** safeDigits
  return Math.round(value * factor) / factor
}
