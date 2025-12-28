// lib/search/text.ts
export function mdxToPlainText(mdx: string) {
  return (
    mdx
      // 去掉 frontmatter
      .replace(/^---[\s\S]*?---\s*/m, '')
      // 去掉代码块 ```...```
      .replace(/```[\s\S]*?```/g, ' ')
      // 去掉行内代码 `...`
      .replace(/`[^`]*`/g, ' ')
      // 去掉 jsx 标签 <Comp ...>...</Comp> 或 <Comp />
      .replace(/<[^>]+>/g, ' ')
      // 去掉 markdown 链接/图片 ![]() []()
      .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
      .replace(/\[[^\]]*]\([^)]*\)/g, ' ')
      // 去掉 markdown 标题/列表符号
      .replace(/[#>*_\-]+/g, ' ')
      // 合并空白
      .replace(/\s+/g, ' ')
      .trim()
  )
}
