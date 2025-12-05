
import { FooterNavigation } from "../nav"
import { LnbNavigation } from "./lnb"

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex overflow-hidden w-full">
        <LnbNavigation />
        <main className="scrollbar-thin flex-1 overflow-auto markdown">{children}</main>
      </div>
      <FooterNavigation/>
    </div>
  )
}

