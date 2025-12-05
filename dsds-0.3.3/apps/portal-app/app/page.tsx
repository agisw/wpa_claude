import HomeContent from "./docs/home.mdx"
import { FooterNavigation } from "./nav"

export default function Home() {
  return (
    <main className="flex h-full flex-col">
      <div className="flex flex-1 justify-center">
        <div className="mx-auto w-full max-w-4xl p-4 sm:p-6 lg:p-8 xl:max-w-5xl">
          <div className="markdown">
            <HomeContent />
          </div>
        </div>
      </div>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <FooterNavigation align="center" size="cozy" />
    </main>
  )
}
