import type { Metadata } from "next";
import Container from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Neem contact op met DataDenkt voor data, SEO en automatisering.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact",
    description: "Neem contact op met DataDenkt voor data, SEO en automatisering.",
    url: `${siteConfig.url}/contact`,
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <Container className="space-y-10 py-12">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
          Contact
        </p>
        <h1 className="text-4xl font-semibold text-brand-black">Laten we samenwerken.</h1>
        <p className="max-w-2xl text-base text-brand-navy/70">
          Plan een kennismaking of stuur direct een bericht. We reageren binnen 24 uur.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <div className="rounded-3xl border border-brand-navy/10 bg-white p-8 shadow-card">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
            Direct contact
          </p>
          <div className="mt-4 space-y-2 text-sm text-brand-navy/70">
            <p>Email: {siteConfig.email}</p>
            <p>Telefoon: {siteConfig.phone}</p>
            <p>Locatie: {siteConfig.location}</p>
          </div>
        </div>
        <div className="rounded-3xl border border-brand-navy/10 bg-brand-navy p-8 text-white shadow-card">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
            Snelle start
          </p>
          <h2 className="mt-3 text-2xl font-semibold">Plan een intakegesprek.</h2>
          <p className="mt-2 text-sm text-white/70">
            We brengen je content flow en n8n stack in kaart en sturen een voorstel.
          </p>
          <ButtonLink href="/automatiseringen" variant="secondary" className="mt-6">
            Bekijk automatiseringen
          </ButtonLink>
        </div>
      </section>
    </Container>
  );
}
