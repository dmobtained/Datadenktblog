import Image from "next/image";
import { Activity, Globe, Zap } from "lucide-react";
import Container from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import PostCard from "@/components/PostCard";
import { getLatestPosts } from "@/lib/posts";

export const revalidate = 60;

export default async function HomePage() {
  const latestPosts = await getLatestPosts(4);

  return (
    <div className="space-y-20 pb-20">
      <section className="bg-brand-white">
        <Container className="grid items-center gap-12 py-16 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
              Efficientie door Innovatie
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-brand-black sm:text-5xl">
              De meest premium datagedreven blog voor groei, automatisering en SEO.
            </h1>
            <p className="text-base text-brand-navy/70 sm:text-lg">
              DataDenkt combineert realtime content, slimme workflows en meetbare impact.
              Alles is ontworpen voor performance, schaalbaarheid en vertrouwen.
            </p>
            <div className="flex flex-wrap gap-4">
              <ButtonLink href="/blog" variant="primary">
                Ontdek het blog
              </ButtonLink>
              <ButtonLink href="/automatiseringen" variant="secondary">
                Bekijk automatiseringen
              </ButtonLink>
            </div>
          </div>
          <div className="relative h-72 w-full sm:h-96">
            <Image
              src="/images/hero.svg"
              alt="Abstracte datavisualisatie"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </Container>
      </section>

      <section>
        <Container className="space-y-8">
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
                Laatste artikelen
              </p>
              <h2 className="text-3xl font-semibold text-brand-black">
                Live inzichten en strategie, direct uit de data.
              </h2>
            </div>
            <ButtonLink href="/blog" variant="ghost" className="hidden sm:inline-flex">
              Alle artikelen
            </ButtonLink>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {latestPosts.map((post, index) => (
              <PostCard key={post.slug} post={post} priority={index < 2} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-navy/5 py-16">
        <Container className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "SEO op enterprise-niveau",
              description:
                "Van technische basis tot long-tail content. Alles is geoptimaliseerd voor zoekmachines.",
              icon: Globe,
            },
            {
              title: "Live bijwerkingen in realtime",
              description:
                "Publiceer direct vanuit n8n workflows met realtime indicatoren en metadata.",
              icon: Activity,
            },
            {
              title: "Data dashboards als stuurinstrument",
              description:
                "Verbind content met KPI's en meet direct de impact van elke publicatie.",
              icon: Zap,
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-brand-navy/10 bg-white p-8 shadow-card"
            >
              <item.icon className="h-8 w-8 text-brand-blue" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-semibold text-brand-black">{item.title}</h3>
              <p className="mt-2 text-sm text-brand-navy/70">{item.description}</p>
            </div>
          ))}
        </Container>
      </section>
    </div>
  );
}
