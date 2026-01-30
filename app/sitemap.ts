import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const base = siteConfig.url;

  return [
    {
      url: base,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${base}/blog`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${base}/automatiseringen`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${base}/contact`,
      lastModified: new Date().toISOString(),
    },
    ...posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.updatedAt,
    })),
  ];
}
