import Container from "@/components/Container";
import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <Container className="py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
        404
      </p>
      <h1 className="mt-4 text-3xl font-semibold text-brand-black">
        Deze pagina bestaat niet.
      </h1>
      <p className="mt-3 text-sm text-brand-navy/70">
        Bekijk onze nieuwste inzichten of ga terug naar de homepage.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <ButtonLink href="/" variant="primary">
          Naar home
        </ButtonLink>
        <ButtonLink href="/blog" variant="secondary">
          Naar blog
        </ButtonLink>
      </div>
    </Container>
  );
}
