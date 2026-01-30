import Container from "./Container";
import { siteConfig } from "@/lib/site";

const Footer = () => {
  return (
    <footer className="border-t border-brand-navy/10 bg-white">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-navy">
            DataDenkt
          </p>
          <p className="text-sm text-brand-navy/70">{siteConfig.description}</p>
          <p className="text-xs text-brand-navy/60">
            Vertrouwd door datateams die schaal, veiligheid en snelheid eisen.
          </p>
        </div>
        <div className="space-y-2 text-sm text-brand-navy/70">
          <p className="font-semibold text-brand-navy">Contact</p>
          <p>{siteConfig.email}</p>
          <p>{siteConfig.phone}</p>
          <p>{siteConfig.location}</p>
        </div>
        <div className="space-y-2 text-sm text-brand-navy/70">
          <p className="font-semibold text-brand-navy">Vertrouwenssignalen</p>
          <p>WCAG AA klaar</p>
          <p>AVG-first workflows</p>
          <p>24/7 content bewaking</p>
        </div>
      </Container>
      <div className="border-t border-brand-navy/10 py-4 text-center text-xs text-brand-navy/50">
        (c) {new Date().getFullYear()} DataDenkt. Alle rechten voorbehouden.
      </div>
    </footer>
  );
};

export default Footer;
