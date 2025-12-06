"use client";

import type { HTMLAttributes, ReactNode } from "react";
import React, { useRef, useState } from "react";
import clsx from "clsx";

type CodeBlockProps = HTMLAttributes<HTMLPreElement> & {
  children: ReactNode;
};

export function CodeBlock({ children, className, ...rest }: CodeBlockProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement | null>(null);

  const handleCopy = async () => {
    if (!navigator?.clipboard) return;
    const text = preRef.current?.innerText ?? "";
    if (!text.trim()) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  return (
    <div className="group relative my-4">
      {/* 右上角按钮：放进一个 pill 容器里，稍微往下、往左一点 */}
      <div className="pointer-events-none absolute right-4 top-3 z-10 flex gap-2">
        <div className="flex gap-2 rounded-full bg-black/40 px-2 py-1 text-[11px] text-gray-100 backdrop-blur-sm dark:bg-white/10 dark:text-gray-100">
          <button
            type="button"
            onClick={handleCopy}
            className="pointer-events-auto rounded-full px-2 py-0.5 hover:bg-black/40 dark:hover:bg-white/20"
          >
            {copied ? "✅ 已复制" : "📋 复制"}
          </button>
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className="pointer-events-auto rounded-full px-2 py-0.5 hover:bg-black/40 dark:hover:bg白/20"
          >
            {collapsed ? "⬇ 展开" : "⬆ 折叠"}
          </button>
        </div>
      </div>

      {/* 代码容器 */}
      <pre
        ref={preRef}
        {...rest}
        className={clsx(
          "code-block mt-0 rounded-2xl bg-[#050711]/95 p-4 pr-32 text-sm shadow-inner shadow-black/40",
          // 展开：可以滚动
          !collapsed && "overflow-auto whitespace-pre",
          // 折叠：完全隐藏多余内容，不要竖向滚动条
          collapsed && "max-h-24 overflow-hidden whitespace-pre",
          className,
        )}
      >
        {children}
      </pre>

      {/* 折叠时的渐变遮罩 */}
      {collapsed && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 rounded-b-2xl bg-gradient-to-t from-[#050711]/95 to-transparent" />
      )}
    </div>
  );
}
