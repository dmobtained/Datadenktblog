import type { Heading } from "@/lib/markdown";

type TableOfContentsProps = {
  headings: Heading[];
};

const TableOfContents = ({ headings }: TableOfContentsProps) => {
  if (!headings.length) {
    return null;
  }

  return (
    <nav aria-label="Inhoudsopgave" className="rounded-3xl border border-brand-navy/10 bg-white p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-navy">
        Inhoud
      </p>
      <ul className="mt-4 space-y-2 text-sm text-brand-navy/70">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "ml-4" : ""}>
            <a
              href={`#${heading.id}`}
              className="transition hover:text-brand-navy"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
