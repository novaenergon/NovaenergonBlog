import type { Post } from "../types";
import { slugify } from "../utils/format";
import fm from "front-matter";

// Import Markdown files
import pythonMd from "../content/questions/python.md?raw";
import aiVsMlVsDlMd from "../content/questions/ai-vs-ml-vs-dl.md?raw";
// import overfittingMd from "../content/overfitting.md?raw";
// import normalizationMd from "../content/normalization.md?raw";
// import aiVsMlVsDlMd from "../content/ai-vs-ml-vs-dl.md?raw";

const files = [
  { slug: "python", raw: pythonMd },
//   { slug: "overfitting", raw: overfittingMd },
//   { slug: "normalization", raw: normalizationMd },
  { slug: "ai-vs-ml-vs-dl", raw: aiVsMlVsDlMd },
];

export async function getPosts(): Promise<Post[]> {
  return files.map((f, i) => {
    const parsed = fm<Record<string, any>>(f.raw);

    return {
      id: i + 1,
      slug: slugify(parsed.attributes.title || f.slug),
      title: parsed.attributes.title,
      author: parsed.attributes.author,
      avatar: parsed.attributes.avatar,
      category: parsed.attributes.category,
      tags: parsed.attributes.tags || [],
      date: parsed.attributes.date,
      excerpt: parsed.attributes.excerpt,
      content: parsed.body, // Markdown body
    } as Post;
  });
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getPosts();
  return Array.from(new Set(posts.flatMap((p) => p.tags))).sort();
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getPosts();
  return Array.from(new Set(posts.map((p) => p.category))).sort();
}
