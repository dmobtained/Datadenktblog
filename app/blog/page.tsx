import type { Metadata } from "next";
import Container from "@/components/Container";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/Button";
import { getCategories, searchPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

const PAGE_SIZE = 6;

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Strategie, automatisering en SEO-inzichten voor datagedreven teams die sneller willen publiceren.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "DataDenkt Blog",
    description:
      "Strategie, automatisering en SEO-inzichten voor datagedreven teams die sneller willen publiceren.",
    url: `${siteConfig.url}/blog`,
    type: "website",
  },
};

const buildQueryString = (params: Record<string, string | number | undefined>) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      query.set(key, String(value));
    }
  });
  const string = query.toString();
  return string ? `?${string}` : "";
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: { q?: string; categorie?: string; page?: string };
}) {
  const query = searchParams?.q ?? "";
  const activeCategory = searchParams?.categorie ?? "";
  const page = Number(searchParams?.page ?? "1") || 1;

  const [categories, filteredPosts] = await Promise.all([
    getCategories(),
    searchPosts(query, activeCategory),
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pagedPosts = filteredPosts.slice(start, start + PAGE_SIZE);

  return (
    <Container className="space-y-10 py-12">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
          DataDenkt Blog
        </p>
        <h1 className="text-4xl font-semibold text-brand-black">Kennis die impact maakt.</h1>
        <p className="max-w-2xl text-base text-brand-navy/70">
          Zoek direct op categorie of onderwerp. Alle artikelen zijn geoptimaliseerd voor
          prestaties, vindbaarheid en live bijwerkingen via n8n.
        </p>
      </header>

      <section className="space-y-6 rounded-3xl border border-brand-navy/10 bg-white p-6 shadow-card">
        <form method="get" className="grid gap-4 md:grid-cols-[1fr_auto_auto]">
          <div className="space-y-2">
            <label htmlFor="q" className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-navy">
              Zoek
            </label>
            <input
              id="q"
              name="q"
              defaultValue={query}
              placeholder="Zoek op titel, tag of onderwerp"
              className="w-full rounded-2xl border border-brand-navy/15 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="categorie"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-navy"
            >
              Categorie
            </label>
            <select
              id="categorie"
              name="categorie"
              defaultValue={activeCategory}
              className="w-full rounded-2xl border border-brand-navy/15 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              <option value="">Alle categorieen</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <Button type="submit" variant="primary" className="w-full md:w-auto">
              Filteren
            </Button>
          </div>
        </form>

        <div className="flex flex-wrap gap-2">
          <a
            href={`/blog${buildQueryString({ q: query })}`}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide ${
              !activeCategory
                ? "bg-brand-navy text-white"
                : "border border-brand-navy/15 text-brand-navy/70"
            }`}
          >
            Alles
          </a>
          {categories.map((category) => (
            <a
              key={category}
              href={`/blog${buildQueryString({ q: query, categorie: category })}`}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide ${
                activeCategory === category
                  ? "bg-brand-navy text-white"
                  : "border border-brand-navy/15 text-brand-navy/70"
              }`}
            >
              {category}
            </a>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        {pagedPosts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-brand-navy/20 bg-white p-10 text-center text-sm text-brand-navy/70">
            Geen artikelen gevonden. Probeer een andere zoekterm of categorie.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {pagedPosts.map((post, index) => (
              <PostCard key={post.slug} post={post} priority={index < 2 && currentPage === 1} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-brand-navy/70">
            <span>
              Pagina {currentPage} van {totalPages} - {filteredPosts.length} resultaten
            </span>
            <div className="flex gap-2">
              {currentPage > 1 && (
                <a
                  href={`/blog${buildQueryString({
                    q: query,
                    categorie: activeCategory,
                    page: currentPage - 1,
                  })}`}
                  className="rounded-full border border-brand-navy/15 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand-navy/70 hover:bg-brand-navy/5"
                >
                  Vorige
                </a>
              )}
              {currentPage < totalPages && (
                <a
                  href={`/blog${buildQueryString({
                    q: query,
                    categorie: activeCategory,
                    page: currentPage + 1,
                  })}`}
                  className="rounded-full border border-brand-navy/15 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand-navy/70 hover:bg-brand-navy/5"
                >
                  Volgende
                </a>
              )}
            </div>
          </div>
        )}
      </section>
    </Container>
  );
}
