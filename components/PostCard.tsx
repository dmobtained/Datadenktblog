import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Badge from "./Badge";
import { estimateReadingTime, type Post } from "@/lib/posts";
import { formatDate } from "@/lib/format";

type PostCardProps = {
  post: Post;
  priority?: boolean;
};

const PostCard = ({ post, priority = false }: PostCardProps) => {
  const { minutes } = estimateReadingTime(post.content);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-brand-navy/10 bg-white shadow-card transition hover:-translate-y-1">
      <Link href={`/blog/${post.slug}`} className="group relative block">
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={post.coverImage}
            alt={`Cover voor ${post.title}`}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            priority={priority}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </Link>
      <div className="flex h-full flex-col gap-4 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{post.category}</Badge>
          {post.liveUpdate && <Badge variant="live">Live update</Badge>}
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-brand-black">{post.title}</h3>
          <p className="text-sm text-brand-navy/70">{post.excerpt}</p>
        </div>
        <div className="mt-auto flex items-center justify-between text-xs text-brand-navy/60">
          <span>
            {formatDate(post.updatedAt)} - {minutes} min leestijd
          </span>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 font-semibold text-brand-navy"
          >
            Lees meer
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
