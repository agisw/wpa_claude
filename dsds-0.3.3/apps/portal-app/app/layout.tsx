import type { Metadata } from "next"
import { fontClassName } from "@dsds/next-fonts"
import { HeaderNavigation } from "./nav"

import "./index.css"

export const metadata: Metadata = {
  title: "DSDS Portal",
  description: "Provides DSDS Components and Templates",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={fontClassName}>
      <body>
        <div className="flex h-screen w-full flex-col">
          <HeaderNavigation />
          <div className="h-[calc(100vh-72px)] overflow-hidden">{children}</div>
        </div>
      </body>
    </html>
  )
}
