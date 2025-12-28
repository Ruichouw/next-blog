// scripts/build-search-index.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import MiniSearch from 'minisearch'
import { mdxToPlainText } from '../lib/search/text'
import { tokenize } from '../lib/search/tokenizer'

const postsDir = path.join(process.cwd(), 'content', 'posts')
const outFile = path.join(process.cwd(), 'public', 'search-index.json')

type Doc = {
  id: string // slug
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt?: string
  content: string // 纯文本
}

function readAllMdxFiles() {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.mdx'))
  return files.map((file) => {
    const slug = file.replace(/\.mdx$/, '')
    const fullPath = path.join(postsDir, file)
    const source = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(source)

    const title = (data.title as string) ?? slug
    const date = (data.date as string) ?? ''
    const tags = (data.tags ?? []) as string[]
    const excerpt = data.excerpt as string | undefined

    return {
      id: slug,
      slug,
      title,
      date,
      tags,
      excerpt,
      content: mdxToPlainText(content),
    } satisfies Doc
  })
}

function main() {
  const docs = readAllMdxFiles()

  const miniSearch = new MiniSearch<Doc>({
    fields: ['title', 'tags', 'excerpt', 'content'], // 索引字段
    storeFields: ['slug', 'title', 'date', 'tags', 'excerpt'], // 返回结果携带字段
    tokenize,
    searchOptions: {
      // 默认搜索配置（可在前端再覆盖）
      boost: { title: 4, tags: 2, excerpt: 1.5, content: 1 },
    },
  })

  miniSearch.addAll(docs)

  const payload = {
    version: 1,
    builtAt: new Date().toISOString(),
    index: miniSearch.toJSON(),
  }

  fs.mkdirSync(path.dirname(outFile), { recursive: true })
  fs.writeFileSync(outFile, JSON.stringify(payload), 'utf8')

  console.log(`✅ search index built: ${outFile} (${docs.length} docs)`)
}

main()
