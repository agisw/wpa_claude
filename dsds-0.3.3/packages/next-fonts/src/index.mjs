import localFont from "next/font/local"

const samsungOneKoreanNoF = localFont({
  src: [
    {
      path: "./fonts/SamsungOneKoreanNoF-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/SamsungOneKoreanNoF-700.woff2",
      weight: "700",
      style: "bold",
    },
  ],
  display: "swap",
  preload: true,
  variable: "--font-sans",
})

const samsungSharpSans = localFont({
  src: [
    {
      path: "./fonts/SamsungSharpSans-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  preload: true,
  variable: "--font-heading",
  declarations: [
    {
      prop: "font-family",
      value: "Samsung Sharp Sans",
    },
  ],
})

const d2Coding = localFont({
  src: [
    {
      path: "./fonts/D2Coding.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/D2CodingBold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  preload: true,
  variable: "--font-mono",
})

export const fontClassName = `${samsungOneKoreanNoF.variable} ${samsungSharpSans.variable} ${d2Coding.variable}`
export default fontClassName
