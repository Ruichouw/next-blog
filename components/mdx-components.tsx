// components/mdx-components.tsx
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="mt-8 text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mt-8 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-6 text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="mt-4 leading-relaxed text-gray-700 dark:text-gray-300"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="mt-4 list-disc pl-6 text-gray-700 dark:text-gray-300"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-4 list-decimal pl-6 text-gray-700 dark:text-gray-300"
      {...props}
    />
  ),
  li: (props) => <li className="mt-1" {...props} />,
  a: (props) => (
    <Link
      className="text-pink-500 underline-offset-4 hover:underline dark:text-pink-300"
      {...props}
    />
  ),

  // ✅ 只给 pre 做“容器”样式，**不要设置 text-xxx**
  pre: ({ children }) => (
    <pre
      className="mt-4 overflow-x-auto rounded-2xl bg-[#050711]/95 p-4 text-sm shadow-inner shadow-black/40
                 dark:bg-[#050711]/95"
    >
      {children}
    </pre>
  ),

  // ✅ inline code 才加底色 + 颜色；block code 交给 pretty-code 管
  code: (props) => {
    // rehype-pretty-code 对 block code 会加 data-theme、data-language 等标记
    // 有这些标记的，我们认为是“高亮代码块”，不再强行加 text-xxx
    const anyProps = props as any;
    if (anyProps["data-theme"] || anyProps["data-language"]) {
      return <code {...props} />;
    }

    // 其它情况当作“行内代码”
    return (
      <code
        className="rounded bg-black/5 px-1.5 py-0.5 text-sm text-pink-600 dark:bg-white/10 dark:text-pink-300"
        {...props}
      />
    );
  },

  img: (props) => (
    <div className="relative my-6 overflow-hidden rounded-2xl">
      {/* @ts-expect-error src 在这里是有的 */}
      <Image
        alt={props.alt ?? ""}
        src={props.src}
        width={800}
        height={450}
        className="h-auto w-full object-cover"
      />
    </div>
  ),
};
