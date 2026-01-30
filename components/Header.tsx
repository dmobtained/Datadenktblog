import Link from "next/link";
import { Sparkles } from "lucide-react";
import Container from "./Container";
import { navigation } from "@/lib/site";
import { ButtonLink } from "./Button";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-navy/10 bg-white/90 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-[0.2em]">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-white">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>DATADENKT</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-brand-navy/80 transition hover:text-brand-navy"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ButtonLink href="/blog" variant="secondary" className="hidden sm:inline-flex">
            Naar blog
          </ButtonLink>
          <ButtonLink href="/automatiseringen" variant="primary">
            Automatiseren
          </ButtonLink>
        </div>
      </Container>
    </header>
  );
};

export default Header;
