# DataDenkt blog platform

Premium, data-driven blog gebouwd met Next.js (App Router), Tailwind CSS en TypeScript.
De site is volledig Nederlands, extreem SEO-gericht en klaar voor n8n content automatisering.

## Lokale start

```bash
npm install
npm run dev
```

## Belangrijke bestanden

- `app/layout.tsx` - Globale layout, metadata en fonts.
- `app/page.tsx` - Home met hero, CTAs en laatste posts.
- `app/blog/page.tsx` - Blog index met filters, search en paginatie.
- `app/blog/[slug]/page.tsx` - Artikelpagina met JSON-LD, TOC en CTA.
- `app/automatiseringen/page.tsx` - Service pagina voor workflows en conversie.
- `app/api/posts/route.ts` - GET/POST API voor n8n.
- `app/sitemap.ts` en `app/robots.ts` - Dynamische SEO assets.
- `lib/posts.ts` - Data model, file storage en filtering.
- `lib/markdown.tsx` - Markdown parsing en TOC generatie.
- `data/posts.json` - File-based content opslag (DB ready).
- `docs/n8n-payload.md` - Voorbeeld payload voor n8n workflows.
- `components/*` - Herbruikbare UI componenten.

## SEO en performance

- Dynamische sitemap en robots.txt
- Canonical URL's per pagina
- OpenGraph en Twitter cards
- JSON-LD per artikel
- Next/Image voor alle visuals
- Minimal client JS, server components waar mogelijk
- Revalidate caching op content pagina's
