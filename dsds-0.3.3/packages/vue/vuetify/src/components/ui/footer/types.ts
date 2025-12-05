import type { AnchorHTMLAttributes, HTMLAttributes, VNodeChild } from "vue"

export type FooterTheme = "light" | "dark"
export type FooterSize = "compact" | "cozy"
export type FooterAlign = "left" | "center" | "right"

export type FooterTextItem = {
  type: "text"
  content: VNodeChild
  props?: HTMLAttributes
}

export type FooterCopyrightItem = {
  type: "copyright"
  content?: VNodeChild
  props?: HTMLAttributes
}

export type FooterButtonItem = {
  type: "button"
  content: VNodeChild
  props?: HTMLAttributes
}

export type FooterLinkItem = {
  type: "link"
  href: string
  content: VNodeChild
  props?: AnchorHTMLAttributes
}

export type FooterDividerItem = {
  type: "divider"
  props?: HTMLAttributes
}

export type FooterCustomItem = {
  type: "custom"
  content: VNodeChild
  props?: HTMLAttributes
}

export type FooterItem =
  | FooterTextItem
  | FooterCopyrightItem
  | FooterButtonItem
  | FooterLinkItem
  | FooterDividerItem
  | FooterCustomItem
