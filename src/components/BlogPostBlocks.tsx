import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { BlogBlock } from "../blog/blocks";

const resolveImage = (src: string) => /^(?:https?:|data:|blob:|\/)/i.test(src) ? src : `/${src}`;

export default function BlogPostBlocks({ blocks }: { blocks: BlogBlock[] }) {
  return <div className="space-y-7">
    {blocks.map(block => {
      if (block.type === "heading") {
        return block.level === 2
          ? <h2 key={block.id} className="text-3xl md:text-4xl font-bold text-white mt-12 mb-4">{block.text}</h2>
          : <h3 key={block.id} className="text-2xl md:text-3xl font-bold text-white mt-10 mb-3">{block.text}</h3>;
      }
      if (block.type === "image") {
        return <figure key={block.id} className="my-10">
          <img src={resolveImage(block.src)} alt={block.alt || block.caption || "Blog image"} className="w-full rounded-2xl border border-white/10 shadow-2xl object-cover" loading="lazy" />
          {block.caption && <figcaption className="text-center text-sm text-gray-500 mt-3">{block.caption}</figcaption>}
        </figure>;
      }
      if (block.type === "quote") {
        return <blockquote key={block.id} className="border-l-4 border-indigo-500 bg-indigo-500/[0.07] rounded-r-2xl px-6 py-5 text-lg italic text-indigo-100">
          {block.text}
        </blockquote>;
      }
      if (block.type === "list") {
        return <ul key={block.id} className="list-disc pl-6 space-y-2 text-gray-300 marker:text-indigo-400">
          {block.items.filter(Boolean).map((item, index) => <li key={`${block.id}-${index}`}><ReactMarkdown remarkPlugins={[remarkGfm]}>{item}</ReactMarkdown></li>)}
        </ul>;
      }
      return <div key={block.id} className="text-gray-300 text-lg leading-relaxed">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{block.text}</ReactMarkdown>
      </div>;
    })}
  </div>;
}
