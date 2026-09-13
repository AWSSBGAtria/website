import React from "react";

// Minimal, XSS-safe markdown renderer for Meetup event descriptions.
// Builds React nodes from plain text (React escapes text automatically),
// so embedded HTML in the source can never become live markup.
// Supports: **bold**, *italic*, `code`, [links](http…), ## headings,
// - /* lists, paragraphs. Nesting (e.g. links inside bold) works.

function unescape(text: string): string {
  return text.replace(/\\([\s\S])/g, "$1");
}

const INLINE_PATTERN =
  /(\[[^\]\n]+\]\(https?:[^)\s]+\)|\*\*.+?\*\*|__.*?__|\*[^*\n]+?\*|_[^_\n]+_|`[^`\n]+?`)/g;

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const tokens = unescape(text).split(INLINE_PATTERN);

  return tokens.map((token, i) => {
    const key = `${keyPrefix}-${i}`;
    const link = token.match(/^\[([^\]\n]+)\]\((https?:[^)\s]+)\)$/);
    if (link) {
      return (
        <a
          key={key}
          href={link[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="md-link"
        >
          {renderInline(link[1], `${key}-t`)}
        </a>
      );
    }
    if (
      (token.startsWith("**") && token.endsWith("**") && token.length > 4) ||
      (token.startsWith("__") && token.endsWith("__") && token.length > 4)
    ) {
      return (
        <strong key={key}>
          {renderInline(token.slice(2, -2), `${key}-b`)}
        </strong>
      );
    }
    if (
      (token.startsWith("*") && token.endsWith("*") && token.length > 2) ||
      (token.startsWith("_") && token.endsWith("_") && token.length > 2)
    ) {
      return <em key={key}>{renderInline(token.slice(1, -1), `${key}-i`)}</em>;
    }
    if (token.startsWith("`") && token.endsWith("`") && token.length > 2) {
      return <code key={key}>{token.slice(1, -1)}</code>;
    }
    return <React.Fragment key={key}>{token}</React.Fragment>;
  });
}

function renderParagraphLines(text: string, keyPrefix: string): React.ReactNode[] {
  const lines = text.split("\n");
  return lines.flatMap((line, i) => [
    ...(i > 0 ? [<br key={`${keyPrefix}-br-${i}`} />] : []),
    ...renderInline(line, `${keyPrefix}-l${i}`),
  ]);
}

export function MarkdownText({ text }: { text: string }) {
  const lines = text.split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i += 1;
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      blocks.push(
        <p key={key++} className="md-h">
          {renderInline(heading[2], `h${key}`)}
        </p>,
      );
      i += 1;
      continue;
    }

    if (/^([*-])\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^([*-])\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^([*-])\s+/, ""));
        i += 1;
      }
      blocks.push(
        <ul key={key++}>
          {items.map((item, j) => (
            <li key={j}>{renderInline(item, `li${key}-${j}`)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,4})\s+/.test(lines[i].trim()) &&
      !/^([*-])\s+/.test(lines[i].trim())
    ) {
      para.push(lines[i]);
      i += 1;
    }
    blocks.push(
      <p key={key++}>{renderParagraphLines(para.join("\n"), `p${key}`)}</p>,
    );
  }

  return <>{blocks}</>;
}
