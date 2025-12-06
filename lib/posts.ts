// lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string; // 用文件名做 slug
  title: string;
  date: string;
  tags: string[];
  cover?: string;
  excerpt?: string;
};

const postsDirectory = path.join(process.cwd(), "content", "posts");

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
      };
    })
    // 按时间倒序
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return posts;
}
