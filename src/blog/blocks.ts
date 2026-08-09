export type BlogBlock =
  | { id: string; type: "paragraph"; text: string }
  | { id: string; type: "heading"; text: string; level: 2 | 3 }
  | { id: string; type: "image"; src: string; alt: string; caption: string }
  | { id: string; type: "quote"; text: string }
  | { id: string; type: "list"; items: string[] };

export function createBlockId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `block-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

const cleanHeading = (value: string) => value.replace(/^\*\*(.*)\*\*$/, "$1").trim();

export function markdownToBlocks(markdown: string): BlogBlock[] {
  const blocks: BlogBlock[] = [];
  const paragraph: string[] = [];
  const lines = markdown.replace(/\r/g, "").trim().split("\n");

  const flushParagraph = () => {
    const text = paragraph.join(" ").trim();
    if (text) blocks.push({ id: createBlockId(), type: "paragraph", text });
    paragraph.length = 0;
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line) {
      flushParagraph();
      continue;
    }

    const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) {
      flushParagraph();
      blocks.push({ id: createBlockId(), type: "image", alt: image[1], caption: image[1], src: image[2] });
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      blocks.push({ id: createBlockId(), type: "heading", level: heading[1].length <= 2 ? 2 : 3, text: cleanHeading(heading[2]) });
      continue;
    }

    const boldHeading = line.match(/^\*\*(.+)\*\*$/);
    if (boldHeading) {
      flushParagraph();
      blocks.push({ id: createBlockId(), type: "heading", level: 3, text: boldHeading[1].trim() });
      continue;
    }

    if (line.startsWith(">")) {
      flushParagraph();
      blocks.push({ id: createBlockId(), type: "quote", text: line.replace(/^>\s?/, "") });
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      flushParagraph();
      const items: string[] = [];
      while (index < lines.length && /^[-*]\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[-*]\s+/, ""));
        index += 1;
      }
      index -= 1;
      blocks.push({ id: createBlockId(), type: "list", items });
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  return blocks;
}
