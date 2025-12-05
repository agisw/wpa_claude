import type { NextConfig } from "next"
import createMDX from "@next/mdx"

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: true,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  transpilePackages: ["@dsds/react-radix-ui", "react-resizable-panels"],
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    rehypePlugins: [
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ["rehype-highlight", { detect: true, ignoreMissing: true, subset: false }],
    ],
  },
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
