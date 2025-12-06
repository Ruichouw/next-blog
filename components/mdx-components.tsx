import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";

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

  // ⭐ 所有 fenced code block 都走 CodeBlock（里面有复制+折叠）
  pre: (props) => <CodeBlock {...(props as any)} />,

  // 行内代码仍然保持之前的样式
  code: (props) => {
    const anyProps = props as any;
    if (anyProps["data-theme"] || anyProps["data-language"]) {
      // 块级代码（给 pretty-code 用），不要强行改颜色
      return <code {...props} />;
    }

    // 行内代码
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
