import { useEffect, useState } from "react"

export type PlatformType = "windows" | "macos" | "linux" | "ios" | "android" | "unknown"
export type BrowserType = "chrome" | "edge" | "firefox" | "safari" | "other"

export interface PlatformInfo {
  platform: PlatformType
  browser: BrowserType
  isWindows: boolean
  isMacOS: boolean
  isLinux: boolean
  isIOS: boolean
  isAndroid: boolean
  isMobile: boolean
  isDesktop: boolean
  isChrome: boolean
  isEdge: boolean
  isFirefox: boolean
  isSafari: boolean
}

/**
 * Browser platform detection hook
 * @returns PlatformInfo object with platform type, browser type and boolean flags
 */
export function usePlatform(): PlatformInfo {
  const [platform, setPlatform] = useState<PlatformType>("unknown")
  const [browser, setBrowser] = useState<BrowserType>("other")

  useEffect(() => {
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      return
    }

    const userAgent = navigator.userAgent.toLowerCase()
    const platform = navigator.platform?.toLowerCase() || ""

    // Platform detection
    let detectedPlatform: PlatformType = "unknown"

    // iOS detection
    if (/iphone|ipad|ipod/.test(userAgent) || (platform.includes("mac") && "ontouchend" in document)) {
      detectedPlatform = "ios"
    }
    // Android detection
    else if (/android/.test(userAgent)) {
      detectedPlatform = "android"
    }
    // Windows detection
    else if (/windows|win32|win64/.test(userAgent) || platform.includes("win")) {
      detectedPlatform = "windows"
    }
    // macOS detection
    else if (/macintosh|mac os x/.test(userAgent) || platform.includes("mac")) {
      detectedPlatform = "macos"
    }
    // Linux detection
    else if (/linux/.test(userAgent) || platform.includes("linux")) {
      detectedPlatform = "linux"
    }

    // Browser detection
    let detectedBrowser: BrowserType = "other"

    // Edge detection (must come before Chrome as Edge includes "chrome" in user agent)
    if (/edg\//.test(userAgent) || /edge\//.test(userAgent)) {
      detectedBrowser = "edge"
    }
    // Chrome detection
    else if (/chrome\//.test(userAgent) && !/edg\//.test(userAgent)) {
      detectedBrowser = "chrome"
    }
    // Firefox detection
    else if (/firefox\//.test(userAgent)) {
      detectedBrowser = "firefox"
    }
    // Safari detection
    else if (/safari\//.test(userAgent) && !/chrome\//.test(userAgent) && !/edg\//.test(userAgent)) {
      detectedBrowser = "safari"
    }

    setPlatform(detectedPlatform)
    setBrowser(detectedBrowser)
  }, [])

  const isWindows = platform === "windows"
  const isMacOS = platform === "macos"
  const isLinux = platform === "linux"
  const isIOS = platform === "ios"
  const isAndroid = platform === "android"
  const isMobile = isIOS || isAndroid
  const isDesktop = isWindows || isMacOS || isLinux

  const isChrome = browser === "chrome"
  const isEdge = browser === "edge"
  const isFirefox = browser === "firefox"
  const isSafari = browser === "safari"

  return {
    platform,
    browser,
    isWindows,
    isMacOS,
    isLinux,
    isIOS,
    isAndroid,
    isMobile,
    isDesktop,
    isChrome,
    isEdge,
    isFirefox,
    isSafari,
  }
}
