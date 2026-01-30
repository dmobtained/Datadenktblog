import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Workflow } from "lucide-react";
import Container from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Automatiseringen",
  description:
    "Service pagina met n8n workflows, use cases en business value voor datagedreven teams.",
  alternates: {
    canonical: "/automatiseringen",
  },
  openGraph: {
    title: "Automatiseringen",
    description:
      "Service pagina met n8n workflows, use cases en business value voor datagedreven teams.",
    url: `${siteConfig.url}/automatiseringen`,
    type: "website",
  },
};

export default function AutomatiseringenPage() {
  return (
    <div className="space-y-20 pb-20">
      <section className="bg-brand-white">
        <Container className="grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
              Automatiseringen
            </p>
            <h1 className="text-4xl font-semibold text-brand-black sm:text-5xl">
              Workflow automatisering die content opschaalt zonder ruis.
            </h1>
            <p className="text-base text-brand-navy/70 sm:text-lg">
              We bouwen n8n pipelines die je content publiceren, optimaliseren en realtime
              monitoren. Alles blijft controleerbaar, auditbaar en future-proof.
            </p>
            <div className="flex flex-wrap gap-4">
              <ButtonLink href="/contact" variant="primary">
                Plan een automatiseringstraject
              </ButtonLink>
              <ButtonLink href="/blog" variant="secondary">
                Bekijk de cases
              </ButtonLink>
            </div>
          </div>
          <div className="relative h-72 w-full sm:h-96">
            <Image
              src="/images/automation.svg"
              alt="Workflow visualisatie"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </Container>
      </section>

      <section>
        <Container className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Content intake en validatie",
              text: "Automatische checks op SEO, tone-of-voice en metadata voordat iets live gaat.",
            },
            {
              title: "Realtime publishing",
              text: "Van n8n trigger naar live pagina in minuten, inclusief cache refresh.",
            },
            {
              title: "Insights en dashboards",
              text: "Koppel live KPI dashboards aan content, zodat elke update meetbaar is.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-brand-navy/10 bg-white p-8 shadow-card"
            >
              <Workflow className="h-8 w-8 text-brand-blue" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-semibold text-brand-black">{item.title}</h3>
              <p className="mt-2 text-sm text-brand-navy/70">{item.text}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="bg-brand-navy/5 py-16">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
              Bedrijfswaarde
            </p>
            <h2 className="text-3xl font-semibold text-brand-black">
              Minder handwerk, meer strategische impact.
            </h2>
            <p className="text-base text-brand-navy/70">
              Onze workflows zijn gebouwd voor teams die snelheid nodig hebben zonder kwaliteit
              te verliezen. Elke stap is traceerbaar en klaar voor audits.
            </p>
            <ul className="space-y-3 text-sm text-brand-navy/70">
              {[
                "Tot 60 procent snellere publicatiecycli",
                "Automatische SEO checks per update",
                "Realtime alerts bij performance shifts",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-blue" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-brand-navy/10 bg-white p-8 shadow-card">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
              Conversie
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-brand-black">
              Klaar om content te automatiseren?
            </h3>
            <p className="mt-2 text-sm text-brand-navy/70">
              We ontwerpen samen een workflow die past bij je data, tools en governance.
            </p>
            <ButtonLink href="/contact" variant="primary" className="mt-6">
              Start een intake
            </ButtonLink>
          </div>
        </Container>
      </section>
    </div>
  );
}
