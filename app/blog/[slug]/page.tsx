import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Clock3, RefreshCcw, User } from "lucide-react";
import Container from "@/components/Container";
import Badge from "@/components/Badge";
import TableOfContents from "@/components/TableOfContents";
import MarkdownContent from "@/components/MarkdownContent";
import { ButtonLink } from "@/components/Button";
import { parseMarkdown } from "@/lib/markdown";
import { formatDate } from "@/lib/format";
import { estimateReadingTime, getAllPosts, getPostBySlug } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {};
  }

  const canonical = `/blog/${post.slug}`;
  const title = post.title;
  const description = post.excerpt;
  const imageUrl = `${siteConfig.url}${post.coverImage}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${canonical}`,
      type: "article",
      locale: "nl_NL",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Cover voor ${post.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  const { blocks, headings } = parseMarkdown(post.content);
  const { minutes } = estimateReadingTime(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${siteConfig.url}${post.coverImage}`,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
  };

  return (
    <Container className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
        <article className="space-y-10">
          <header className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{post.category}</Badge>
              {post.liveUpdate && <Badge variant="live">Live update</Badge>}
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-brand-black sm:text-5xl">
              {post.title}
            </h1>
            <p className="text-base text-brand-navy/70">{post.excerpt}</p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-brand-navy/60">
              <span className="inline-flex items-center gap-2">
                <RefreshCcw className="h-4 w-4" aria-hidden="true" />
                Bijgewerkt op {formatDate(post.updatedAt)}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4" aria-hidden="true" />
                {minutes} min leestijd
              </span>
              <span className="inline-flex items-center gap-2">
                <User className="h-4 w-4" aria-hidden="true" />
                {post.author.name}
              </span>
            </div>
          </header>

          <section className="relative h-72 w-full overflow-hidden rounded-3xl border border-brand-navy/10 bg-white">
            <Image
              src={post.coverImage}
              alt={`Cover voor ${post.title}`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 70vw"
            />
          </section>

          <section>
            <MarkdownContent blocks={blocks} />
          </section>

          <footer className="rounded-3xl border border-brand-navy/10 bg-white p-6 shadow-card">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-full border border-brand-navy/10">
                <Image
                  src={post.author.avatar}
                  alt={`Avatar van ${post.author.name}`}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-black">{post.author.name}</p>
                <p className="text-xs text-brand-navy/60">{post.author.role}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/automatiseringen" variant="primary">
                Plan een data-audit
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Praat met ons team
              </ButtonLink>
            </div>
          </footer>
        </article>

        <aside className="space-y-6">
          <TableOfContents headings={headings} />
          <div className="rounded-3xl border border-brand-navy/10 bg-brand-navy p-6 text-white shadow-card">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
              Nieuwsbrief
            </p>
            <h3 className="mt-3 text-2xl font-semibold">Ontvang live updates in je inbox.</h3>
            <p className="mt-2 text-sm text-white/70">
              Maandelijkse inzichten over automatisering, SEO en datagedreven groei.
            </p>
            <ButtonLink href="/contact" variant="secondary" className="mt-6 w-full">
              Meld je aan
            </ButtonLink>
          </div>
        </aside>
      </div>
    </Container>
  );
}
