// 참고: https://markus.oberlehner.net/blog/running-visual-regression-tests-with-storybook-and-playwright-for-free
import { expect, test } from "@playwright/test"

// This file is created by Storybook when we run `pnpm build:storybook`
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import storybook from "../storybook-static/index.json" with { type: "json" }
import { getLinuxDistro } from "./lib/utils"

// Only run tests on stories, not other documentation pages.
const stories = Object.values(storybook.entries).filter((e) =>
  [
    "qa-doing-buttons--docs",
    "qa-doing-footer--docs",
    "qa-doing-header--docs",
    "qa-doing-radio--docs",
    "qa-doing-toggle--docs",
    "qa-doing-checkbox--docs",
    "qa-doing-tooltip--docs",
    "qa-doing-boxes--docs",
    "qa-doing-boxes-icons--docs",
    "qa-doing-tabs--docs",
    "qa-doing-toast--docs",
    "qa-doing-badge--docs",
    "qa-doing-tag--docs",
    "qa-doing-breadcrumb--docs",
    "qa-doing-pagination--docs",
    "qa-doing-toggletip--docs",
  ].includes(e.id)
)

for (const story of stories) {
  test(`${story.title} ${story.name} should not have visual regressions`, async ({ page }) => {
    const params = new URLSearchParams({
      id: story.id,
      viewMode: story.type === "story" ? "story" : "docs",
    })

    await page.goto(`/iframe.html?${params.toString()}`)
    if (story.type === "docs") {
      await page.waitForSelector("#storybook-docs")
    } else if (story.type === "story") {
      await page.waitForSelector("#storybook-root")
    }
    await page.waitForLoadState("networkidle")
    const distro = getLinuxDistro()

    await expect(page).toHaveScreenshot(`${story.id}-${distro}.png`, {
      fullPage: true,
      animations: "disabled",
      threshold: 0,
    })
  })
}
