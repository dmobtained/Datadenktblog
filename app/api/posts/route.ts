import { NextResponse, type NextRequest } from "next/server";
import { normalizeSlug } from "@/lib/slug";
import { readPosts, writePosts, type Post } from "@/lib/posts";

type PostPayload = Omit<Post, "createdAt" | "updatedAt" | "slug"> & {
  slug?: string;
};

const requiredFields: Array<keyof PostPayload> = [
  "title",
  "excerpt",
  "content",
  "category",
  "coverImage",
  "author",
];

const validatePayload = (payload: Partial<PostPayload>) => {
  const errors: string[] = [];
  requiredFields.forEach((field) => {
    if (!payload[field]) {
      errors.push(`Veld ontbreekt: ${field}`);
    }
  });

  if (payload.author) {
    if (!payload.author.name || !payload.author.role || !payload.author.avatar) {
      errors.push("Auteur moet name, role en avatar bevatten.");
    }
  }

  if (payload.tags && !Array.isArray(payload.tags)) {
    errors.push("Tags moet een array van strings zijn.");
  }

  return errors;
};

export async function GET() {
  const posts = await readPosts();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as Partial<PostPayload>;
    const errors = validatePayload(payload);

    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const posts = await readPosts();
    const normalizedSlug = normalizeSlug(payload.slug || payload.title || "");
    if (!normalizedSlug) {
      return NextResponse.json(
        { errors: ["Slug kon niet worden bepaald."] },
        { status: 400 }
      );
    }
    const now = new Date().toISOString();

    const existingIndex = posts.findIndex(
      (post) => normalizeSlug(post.slug) === normalizedSlug
    );

    if (existingIndex >= 0) {
      const existing = posts[existingIndex];
      const updatedPost: Post = {
        ...existing,
        ...payload,
        slug: normalizedSlug,
        updatedAt: now,
        liveUpdate: Boolean(payload.liveUpdate),
      } as Post;
      posts[existingIndex] = updatedPost;
      await writePosts(posts);
      return NextResponse.json(updatedPost, { status: 200 });
    }

    const newPost: Post = {
      slug: normalizedSlug,
      title: payload.title ?? "",
      excerpt: payload.excerpt ?? "",
      content: payload.content ?? "",
      category: payload.category ?? "",
      tags: payload.tags ?? [],
      coverImage: payload.coverImage ?? "",
      author: payload.author ?? { name: "", role: "", avatar: "" },
      createdAt: now,
      updatedAt: now,
      liveUpdate: Boolean(payload.liveUpdate),
    };

    posts.unshift(newPost);
    await writePosts(posts);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Post payload verwerken mislukt:", error);
    return NextResponse.json({ error: "Onverwachte fout." }, { status: 500 });
  }
}
