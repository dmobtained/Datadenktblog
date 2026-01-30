import type { ContentBlock } from "@/lib/markdown";
import { renderInlineMarkdown } from "@/lib/markdown";

type MarkdownContentProps = {
  blocks: ContentBlock[];
};

const MarkdownContent = ({ blocks }: MarkdownContentProps) => {
  return (
    <div className="space-y-6 text-base leading-relaxed text-brand-navy/80">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const HeadingTag = block.level === 2 ? "h2" : "h3";
          return (
            <HeadingTag
              key={`${block.id}-${index}`}
              id={block.id}
              className={`scroll-mt-28 font-semibold text-brand-black ${
                block.level === 2 ? "text-2xl" : "text-xl"
              }`}
            >
              {block.text}
            </HeadingTag>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={`${block.items[0]}-${index}`} className="space-y-2 pl-5">
              {block.items.map((item, itemIndex) => (
                <li key={`${item}-${itemIndex}`} className="list-disc">
                  {renderInlineMarkdown(item)}
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote
              key={`${block.text}-${index}`}
              className="rounded-2xl border-l-4 border-brand-blue bg-brand-blue/5 p-4 text-brand-navy"
            >
              {renderInlineMarkdown(block.text)}
            </blockquote>
          );
        }

        if (block.type === "code") {
          return (
            <pre
              key={`${block.code}-${index}`}
              className="overflow-x-auto rounded-2xl bg-brand-navy/95 p-4 text-sm text-white"
            >
              <code>{block.code}</code>
            </pre>
          );
        }

        return (
          <p key={`${block.text}-${index}`} className="text-base leading-relaxed">
            {renderInlineMarkdown(block.text)}
          </p>
        );
      })}
    </div>
  );
};

export default MarkdownContent;
