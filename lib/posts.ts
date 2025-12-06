// lib/posts.ts
import fs from "fs";
import path from "path";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type PostMeta = {
  slug: string;
  title: string;
};

// 列表用：只读文件名，不解析内容
export function getAllPosts(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames
    .filter((file) => file.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      return {
        slug,
        title: slug,
      };
    });
}

// 详情页调试用：读出整份 Markdown 文本
export function getPostBySlug_raw(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${fullPath}`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  return {
    meta: {
      slug,
      title: slug,
    },
    content: fileContents,
  };
}
