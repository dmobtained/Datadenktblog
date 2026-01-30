import type { ReactNode } from "react";
import { normalizeSlug } from "./slug";

export type Heading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type ContentBlock =
  | { type: "heading"; id: string; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; code: string };

export const parseMarkdown = (content: string) => {
  const lines = content.split(/\r?\n/);
  const blocks: ContentBlock[] = [];
  const headings: Heading[] = [];
  let index = 0;

  const pushHeading = (text: string, level: 2 | 3) => {
    const id = normalizeSlug(text);
    headings.push({ id, text, level });
    blocks.push({ type: "heading", id, level, text });
  };

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (trimmed.startsWith("```")) {
      const codeLines: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }
      blocks.push({ type: "code", code: codeLines.join("\n") });
      index += 1;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      pushHeading(trimmed.replace("### ", ""), 3);
      index += 1;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      pushHeading(trimmed.replace("## ", ""), 2);
      index += 1;
      continue;
    }

    if (trimmed.startsWith("> ")) {
      blocks.push({ type: "quote", text: trimmed.replace("> ", "") });
      index += 1;
      continue;
    }

    if (trimmed.startsWith("- ")) {
      const items: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        items.push(lines[index].trim().replace("- ", ""));
        index += 1;
      }
      blocks.push({ type: "list", items });
      continue;
    }

    const paragraph: string[] = [];
    while (index < lines.length && lines[index].trim()) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ type: "paragraph", text: paragraph.join(" ") });
  }

  return { blocks, headings };
};

export const renderInlineMarkdown = (text: string): ReactNode[] => {
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(pattern).filter(Boolean);

  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${part}-${idx}`} className="font-semibold text-brand-black">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={`${part}-${idx}`} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={`${part}-${idx}`}
          className="rounded bg-brand-navy/5 px-1 py-0.5 text-sm text-brand-navy"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    if (part.startsWith("[")) {
      const match = part.match(/^\[(.+)\]\((.+)\)$/);
      if (match) {
        const [, label, href] = match;
        return (
          <a
            key={`${part}-${idx}`}
            href={href}
            className="font-medium text-brand-blue underline decoration-brand-blue/30 underline-offset-4"
          >
            {label}
          </a>
        );
      }
    }

    return <span key={`${part}-${idx}`}>{part}</span>;
  });
};
