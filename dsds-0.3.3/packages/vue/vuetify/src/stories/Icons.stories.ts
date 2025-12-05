import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { expect } from "storybook/test"
import { rgbToHex } from "./utils"
import "./styles/index.css"

import {
  InformationIcon,
  BreadcrumbSlashIcon,
  BreadcrumbSelectboxIcon,
  BreadcrumbSelectboxDisabledIcon,
  TriangleUpIcon,
  TriangleDownIcon,
  TriangleLeftIcon,
  TriangleRightIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  NoticeIcon,
  CloseIcon,
  MagnifyIcon,
  CalendarIcon,
} from "../components/icons"

const meta = {
  title: "Icons",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "DSDS 디자인 시스템 아이콘 컴포넌트들입니다. 각 아이콘의 색상은 SVG의 stroke 속성을 통해 확인할 수 있습니다.",
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

/**
 * 모든 아이콘을 나열하여 표시하고 색상을 체크합니다.
 */
export const AllIcons: Story = {
  name: "모든 아이콘",
  render: () => ({
    components: {
      InformationIcon,
      BreadcrumbSlashIcon,
      BreadcrumbSelectboxIcon,
      BreadcrumbSelectboxDisabledIcon,
      TriangleUpIcon,
      TriangleDownIcon,
      TriangleLeftIcon,
      TriangleRightIcon,
      ChevronDownIcon,
      ChevronLeftIcon,
      ChevronRightIcon,
      ChevronDoubleLeftIcon,
      ChevronDoubleRightIcon,
      NoticeIcon,
      CloseIcon,
      MagnifyIcon,
      CalendarIcon,
    },
    template: `
      <div class="px-5 py-4">
        <h2 class="typo-sok-h4-20-700 font-bold mb-4">Breadcrumb Icons</h2>
        <div class="icon-grid">
          <div class="icon-container">
            <BreadcrumbSlashIcon data-icon="BreadcrumbSlashIcon" />
            <p class="icon-description">Slash</p>
          </div>
          <div class="icon-container">
            <BreadcrumbSelectboxIcon data-icon="BreadcrumbSelectboxIcon" />
            <p class="icon-description">Selectbox</p>
          </div>
          <div class="icon-container">
            <BreadcrumbSelectboxDisabledIcon data-icon="BreadcrumbSelectboxDisabledIcon" />
            <p class="icon-description">Selectbox Disabled</p>
          </div>
        </div>

        <h2 class="typo-sok-h4-20-700 font-bold mb-4">Chevron Icons</h2>
        <div class="icon-grid">
          <div class="icon-container">
            <ChevronDownIcon data-icon="ChevronDownIcon" />
            <p class="icon-description">Down</p>
          </div>
          <div class="icon-container">
            <ChevronLeftIcon data-icon="ChevronLeftIcon" />
            <p class="icon-description">Left</p>
          </div>
          <div class="icon-container">
            <ChevronRightIcon data-icon="ChevronRightIcon" />
            <p class="icon-description">Right</p>
          </div>
          <div class="icon-container">
            <ChevronDoubleLeftIcon data-icon="ChevronDoubleLeftIcon" />
            <p class="icon-description">Double Left</p>
          </div>
          <div class="icon-container">
            <ChevronDoubleRightIcon data-icon="ChevronDoubleRightIcon" />
            <p class="icon-description">Double Right</p>
          </div>
        </div>

        <h2 class="typo-sok-h4-20-700 font-bold mb-4">Triangle Icons (5x5)</h2>
        <div class="icon-grid">
          <div class="icon-container">
            <TriangleUpIcon data-icon="TriangleUpIcon" />
            <p class="icon-description">Up</p>
          </div>
          <div class="icon-container">
            <TriangleDownIcon data-icon="TriangleDownIcon" />
            <p class="icon-description">Down</p>
          </div>
          <div class="icon-container">
            <TriangleLeftIcon data-icon="TriangleLeftIcon" />
            <p class="icon-description">Left</p>
          </div>
          <div class="icon-container">
            <TriangleRightIcon data-icon="TriangleRightIcon" />
            <p class="icon-description">Right</p>
          </div>
        </div>

        <h2 class="typo-sok-h4-20-700 font-bold mb-4">Other Icons</h2>
        <div class="icon-grid">
          <div class="icon-container">
            <InformationIcon data-icon="InformationIcon" />
            <p class="icon-description">Information</p>
          </div>
          <div class="icon-container">
            <NoticeIcon data-icon="NoticeIcon" />
            <p class="icon-description">Notice</p>
          </div>
          <div class="icon-container">
            <CloseIcon data-icon="CloseIcon" />
            <p class="icon-description">Close</p>
          </div>
          <div class="icon-container">
            <MagnifyIcon data-icon="MagnifyIcon" />
            <p class="icon-description">Magnify</p>
          </div>
          <div class="icon-container">
            <CalendarIcon data-icon="CalendarIcon" />
            <p class="icon-description">Calendar</p>
          </div>
        </div>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const iconsWithDefaultStroke = canvasElement.querySelectorAll("div.dsds-icon.with-default-stroke svg")
    iconsWithDefaultStroke.forEach((svg) => {
      const iconName = svg.closest("[data-icon]")?.getAttribute("data-icon") || "Unknown"
      const strokeRgb = getComputedStyle(svg).stroke
      const strokeHex = rgbToHex(strokeRgb)
      expect(`[Stroke] ${iconName} ${strokeHex}`).toBe(`[Stroke] ${iconName} #565E66`)
    })
    const iconsWithDefaultFill = canvasElement.querySelectorAll("div.dsds-icon.with-default-fill svg")
    iconsWithDefaultFill.forEach((svg) => {
      const iconName = svg.closest("[data-icon]")?.getAttribute("data-icon") || "Unknown"
      const fillRgb = getComputedStyle(svg).fill
      const fillHex = rgbToHex(fillRgb)
      expect(`[Fill] ${iconName} ${fillHex}`).toBe(`[Fill] ${iconName} #565E66`)
    })
    const iconsWithDefaultColor = canvasElement.querySelectorAll("div.dsds-icon.with-default-color svg")
    iconsWithDefaultColor.forEach((svg) => {
      const iconName = svg.closest("[data-icon]")?.getAttribute("data-icon") || "Unknown"
      const strokeRgb = getComputedStyle(svg).stroke
      const strokeHex = rgbToHex(strokeRgb)
      const fillRgb = getComputedStyle(svg).fill
      const fillHex = rgbToHex(fillRgb)
      expect(`[Color] ${iconName} ${strokeHex} ${fillHex}`).toBe(`[Color] ${iconName} #565E66 #565E66`)
    })
    // dsds-icon-size-undefined 클래스가 없는 모든 .dsds-icon 은 16x16 사이즈여야 함
    const iconsWithUndefinedSize = canvasElement.querySelectorAll("div.dsds-icon:not(.dsds-icon-size-undefined)")
    iconsWithUndefinedSize.forEach((icon) => {
      const iconName = icon.getAttribute("data-icon") || "Unknown"
      const rect = icon.getBoundingClientRect()
      const size = `${rect.width}x${rect.height}`
      expect(`[Size] ${iconName} ${size}`).toBe(`[Size] ${iconName} 16x16`)
    })
  },
  parameters: {
    docs: {
      description: {
        story: "모든 아이콘을 그리드 레이아웃으로 표시하고, 각 아이콘의 SVG stroke 색상을 콘솔에 로그합니다.",
      },
    },
  },
}
