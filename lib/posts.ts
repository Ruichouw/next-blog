// lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";

import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from "rehype-pretty-code";

import remarkGfm from "remark-gfm";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  cover?: string;
  excerpt?: string;
};

export type PostFrontmatter = {
  title: string;
  date: string;
  tags?: string[];
  cover?: string;
  excerpt?: string;
};

const postsDirectory = path.join(process.cwd(), "content", "posts");

// 代码高亮配置
const prettyCodeOptions: PrettyCodeOptions = {
  // 固定主题，one-dark-pro
  // 其它可选： "github-dark", "github-light", "dracula" 等
  theme: "one-dark-pro",
  keepBackground: false,
  defaultLang: "plaintext",
};

// ============ 列表页：只读 meta ============

export function getAllPostsMeta(): PostMeta[] {
  const files = fs.readdirSync(postsDirectory);

  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        tags: (data.tags ?? []) as string[],
        cover: data.cover as string | undefined,
        excerpt: data.excerpt as string | undefined,
      } satisfies PostMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return posts;
}

// ============ 详情页：编译 MDX ============

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const source = fs.readFileSync(fullPath, "utf8");

  const { content, frontmatter } = await compileMDX<PostFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
      },
    },
    components: mdxComponents,
  });

  const meta: PostMeta = {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    tags: frontmatter.tags ?? [],
    cover: frontmatter.cover,
    excerpt: frontmatter.excerpt,
  };

  return { meta, content };
}

// ============ generateStaticParams 用 ============

export function generatePostParams() {
  return getAllPostsMeta().map((post) => ({ slug: post.slug }));
}
