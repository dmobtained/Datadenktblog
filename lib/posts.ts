import fs from "fs/promises";
import path from "path";
import { normalizeSlug } from "./slug";

export type Author = {
  name: string;
  role: string;
  avatar: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  coverImage: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
  liveUpdate: boolean;
};

const POSTS_PATH = path.join(process.cwd(), "data", "posts.json");

export const readPosts = async (): Promise<Post[]> => {
  try {
    const file = await fs.readFile(POSTS_PATH, "utf-8");
    const parsed = JSON.parse(file) as Post[];
    return parsed;
  } catch (error) {
    console.error("Kon posts.json niet lezen:", error);
    return [];
  }
};

export const writePosts = async (posts: Post[]) => {
  await fs.writeFile(POSTS_PATH, JSON.stringify(posts, null, 2));
};

export const getAllPosts = async () => {
  const posts = await readPosts();
  return posts
    .map((post) => ({
      ...post,
      slug: normalizeSlug(post.slug || post.title),
    }))
    .sort((a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)));
};

export const getPostBySlug = async (slug: string) => {
  const posts = await getAllPosts();
  const normalized = normalizeSlug(slug);
  return posts.find((post) => normalizeSlug(post.slug) === normalized) ?? null;
};

export const getLatestPosts = async (limit = 3) => {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
};

export const getCategories = async () => {
  const posts = await getAllPosts();
  return Array.from(new Set(posts.map((post) => post.category))).sort((a, b) =>
    a.localeCompare(b, "nl")
  );
};

export const searchPosts = async (query: string, category?: string) => {
  const posts = await getAllPosts();
  const normalizedCategory = category?.toLowerCase() ?? "";
  const normalizedQuery = query.trim().toLowerCase();
  return posts.filter((post) => {
    const inCategory = normalizedCategory
      ? post.category.toLowerCase() === normalizedCategory
      : true;
    const inQuery = normalizedQuery
      ? [post.title, post.excerpt, post.content, post.tags.join(" ")].some(
          (field) => field.toLowerCase().includes(normalizedQuery)
        )
      : true;
    return inCategory && inQuery;
  });
};

export const estimateReadingTime = (content: string) => {
  const words = content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return { minutes, words };
};
