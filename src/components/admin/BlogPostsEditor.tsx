import { useState } from "react";
import {
  ArrowDown, ArrowUp, ChevronDown, ChevronRight, Heading2, ImagePlus,
  List, Loader2, Plus, Quote, Text, Trash2,
} from "lucide-react";
import type { PortfolioContent } from "../../cms/ContentProvider";
import { createBlockId, type BlogBlock } from "../../blog/blocks";

type BlogPost = PortfolioContent["blogPosts"][number];

interface Props {
  posts: BlogPost[];
  onChange: (posts: BlogPost[]) => void;
  onUpload: (file: File) => Promise<string>;
}

const blockLabel: Record<BlogBlock["type"], string> = {
  paragraph: "Text",
  heading: "Heading",
  image: "Image",
  quote: "Quote",
  list: "Bullet list",
};

const newBlock = (type: BlogBlock["type"]): BlogBlock => {
  const id = createBlockId();
  if (type === "heading") return { id, type, level: 2, text: "New heading" };
  if (type === "image") return { id, type, src: "", alt: "", caption: "" };
  if (type === "quote") return { id, type, text: "" };
  if (type === "list") return { id, type, items: [""] };
  return { id, type: "paragraph", text: "" };
};

export default function BlogPostsEditor({ posts, onChange, onUpload }: Props) {
  const [openPost, setOpenPost] = useState<number | null>(posts[0]?.id ?? null);
  const [uploading, setUploading] = useState("");
  const [error, setError] = useState("");

  const updatePost = (index: number, patch: Partial<BlogPost>) => {
    onChange(posts.map((post, postIndex) => postIndex === index ? { ...post, ...patch } : post));
  };

  const movePost = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= posts.length) return;
    const next = [...posts];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const addPost = () => {
    const id = Date.now();
    const post: BlogPost = {
      id,
      title: "New blog post",
      excerpt: "",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      category: "General",
      image: "",
      content: "",
      blocks: [newBlock("paragraph")],
    };
    onChange([...posts, post]);
    setOpenPost(id);
  };

  const upload = async (key: string, file: File, apply: (url: string) => void, input: HTMLInputElement) => {
    setUploading(key);
    setError("");
    try { apply(await onUpload(file)); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to upload this image."); }
    finally { setUploading(""); input.value = ""; }
  };

  return <div className="space-y-5">
    <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/[0.06] p-5">
      <p className="font-bold text-white">Visual blog builder</p>
      <p className="text-sm text-slate-400 mt-1">Build posts using movable text, heading, image, quote, and list blocks. No image code is required.</p>
    </div>

    {error && <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}

    {posts.map((post, postIndex) => {
      const open = openPost === post.id;
      return <article key={post.id} className="rounded-2xl border border-white/10 bg-white/[0.025] overflow-hidden">
        <div className="flex items-center gap-2 p-4">
          <button type="button" onClick={() => setOpenPost(open ? null : post.id)} className="min-w-0 flex-1 flex items-center gap-3 text-left">
            {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            <span className="min-w-0"><span className="block font-bold text-white truncate">{post.title || "Untitled post"}</span><span className="block text-xs text-slate-500 mt-1">{post.category} · {post.date} · {post.blocks.length} blocks</span></span>
          </button>
          <button type="button" aria-label="Move post up" onClick={() => movePost(postIndex, -1)} className="admin-icon-btn"><ArrowUp size={15} /></button>
          <button type="button" aria-label="Move post down" onClick={() => movePost(postIndex, 1)} className="admin-icon-btn"><ArrowDown size={15} /></button>
          <button type="button" aria-label="Delete post" onClick={() => {
            if (!confirm(`Delete “${post.title}” from the draft?`)) return;
            onChange(posts.filter((_, index) => index !== postIndex));
          }} className="admin-icon-btn hover:!text-red-300"><Trash2 size={15} /></button>
        </div>

        {open && <div className="border-t border-white/10 p-4 md:p-6 space-y-7">
          <div className="grid md:grid-cols-2 gap-4">
            <label className="md:col-span-2 text-sm text-slate-300">Post title<input className="admin-input mt-2" value={post.title} onChange={event => updatePost(postIndex, { title: event.target.value })} /></label>
            <label className="text-sm text-slate-300">Category<input className="admin-input mt-2" value={post.category} onChange={event => updatePost(postIndex, { category: event.target.value })} /></label>
            <label className="text-sm text-slate-300">Publication date<input className="admin-input mt-2" value={post.date} onChange={event => updatePost(postIndex, { date: event.target.value })} /></label>
            <label className="md:col-span-2 text-sm text-slate-300">Short excerpt<textarea className="admin-input mt-2 resize-y" rows={3} value={post.excerpt} onChange={event => updatePost(postIndex, { excerpt: event.target.value })} /></label>
          </div>

          <div className="rounded-2xl border border-white/10 p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-44 aspect-video rounded-xl overflow-hidden bg-slate-950 border border-white/10 shrink-0 flex items-center justify-center">
                {post.image ? <img src={post.image} alt="Cover preview" className="w-full h-full object-cover" /> : <ImagePlus className="text-slate-600" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white">Cover image</p>
                <p className="text-xs text-slate-500 mt-1 mb-3">Used on the Blog page and at the top of this article.</p>
                <div className="flex gap-2">
                  <input className="admin-input" value={post.image} placeholder="Image URL" onChange={event => updatePost(postIndex, { image: event.target.value })} />
                  <label className="admin-icon-btn h-11 w-11 shrink-0 cursor-pointer" title="Upload cover image">
                    {uploading === `cover-${post.id}` ? <Loader2 size={17} className="animate-spin" /> : <ImagePlus size={17} />}
                    <input type="file" accept="image/*" className="hidden" disabled={Boolean(uploading)} onChange={async event => {
                      const file = event.target.files?.[0]; if (!file) return;
                      await upload(`cover-${post.id}`, file, url => updatePost(postIndex, { image: url }), event.currentTarget);
                    }} />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-end justify-between gap-3 mb-4">
              <div><h3 className="text-xl font-bold text-white">Article content</h3><p className="text-xs text-slate-500 mt-1">Visitors see these blocks in this exact order.</p></div>
              <span className="text-xs text-slate-500">{post.blocks.length} blocks</span>
            </div>

            <div className="space-y-3">
              {post.blocks.map((block, blockIndex) => <div key={block.id} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-black uppercase tracking-widest text-indigo-300">{blockIndex + 1}. {blockLabel[block.type]}</span>
                  <div className="flex gap-1">
                    <button type="button" aria-label="Move block up" onClick={() => {
                      const target = blockIndex - 1; if (target < 0) return;
                      const blocks = [...post.blocks]; [blocks[blockIndex], blocks[target]] = [blocks[target], blocks[blockIndex]]; updatePost(postIndex, { blocks });
                    }} className="admin-icon-btn"><ArrowUp size={15} /></button>
                    <button type="button" aria-label="Move block down" onClick={() => {
                      const target = blockIndex + 1; if (target >= post.blocks.length) return;
                      const blocks = [...post.blocks]; [blocks[blockIndex], blocks[target]] = [blocks[target], blocks[blockIndex]]; updatePost(postIndex, { blocks });
                    }} className="admin-icon-btn"><ArrowDown size={15} /></button>
                    <button type="button" aria-label="Delete block" onClick={() => updatePost(postIndex, { blocks: post.blocks.filter(item => item.id !== block.id) })} className="admin-icon-btn hover:!text-red-300"><Trash2 size={15} /></button>
                  </div>
                </div>

                {block.type === "heading" && <div className="flex gap-2"><select className="admin-input !w-28" value={block.level} onChange={event => updatePost(postIndex, { blocks: post.blocks.map(item => item.id === block.id ? { ...block, level: Number(event.target.value) as 2 | 3 } : item) })}><option value={2}>Large</option><option value={3}>Medium</option></select><input className="admin-input" value={block.text} onChange={event => updatePost(postIndex, { blocks: post.blocks.map(item => item.id === block.id ? { ...block, text: event.target.value } : item) })} /></div>}
                {block.type === "paragraph" && <textarea className="admin-input resize-y" rows={5} placeholder="Write a paragraph…" value={block.text} onChange={event => updatePost(postIndex, { blocks: post.blocks.map(item => item.id === block.id ? { ...block, text: event.target.value } : item) })} />}
                {block.type === "quote" && <textarea className="admin-input resize-y" rows={3} placeholder="Write a quotation…" value={block.text} onChange={event => updatePost(postIndex, { blocks: post.blocks.map(item => item.id === block.id ? { ...block, text: event.target.value } : item) })} />}
                {block.type === "list" && <textarea className="admin-input resize-y" rows={5} placeholder="One list item per line" value={block.items.join("\n")} onChange={event => updatePost(postIndex, { blocks: post.blocks.map(item => item.id === block.id ? { ...block, items: event.target.value.split("\n") } : item) })} />}
                {block.type === "image" && <div className="grid lg:grid-cols-[220px_1fr] gap-4">
                  <div className="aspect-video rounded-xl overflow-hidden bg-black border border-white/10 flex items-center justify-center">{block.src ? <img src={block.src} alt={block.alt || "Block preview"} className="w-full h-full object-cover" /> : <ImagePlus className="text-slate-600" />}</div>
                  <div className="space-y-3">
                    <div className="flex gap-2"><input className="admin-input" value={block.src} placeholder="Image URL" onChange={event => updatePost(postIndex, { blocks: post.blocks.map(item => item.id === block.id ? { ...block, src: event.target.value } : item) })} /><label className="admin-action secondary cursor-pointer shrink-0">{uploading === block.id ? <Loader2 size={17} className="animate-spin" /> : <ImagePlus size={17} />} Upload<input type="file" accept="image/*" className="hidden" disabled={Boolean(uploading)} onChange={async event => { const file = event.target.files?.[0]; if (!file) return; await upload(block.id, file, url => updatePost(postIndex, { blocks: post.blocks.map(item => item.id === block.id ? { ...block, src: url, alt: block.alt || file.name.replace(/\.[^.]+$/, "") } : item) }), event.currentTarget); }} /></label></div>
                    <input className="admin-input" value={block.alt} placeholder="Image description for accessibility" onChange={event => updatePost(postIndex, { blocks: post.blocks.map(item => item.id === block.id ? { ...block, alt: event.target.value } : item) })} />
                    <input className="admin-input" value={block.caption} placeholder="Visible caption (optional)" onChange={event => updatePost(postIndex, { blocks: post.blocks.map(item => item.id === block.id ? { ...block, caption: event.target.value } : item) })} />
                  </div>
                </div>}
              </div>)}
            </div>

            <div className="mt-4 rounded-2xl border border-dashed border-indigo-400/30 p-4">
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Add content block</p>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => updatePost(postIndex, { blocks: [...post.blocks, newBlock("paragraph")] })} className="admin-action secondary"><Text size={16} /> Text</button>
                <button type="button" onClick={() => updatePost(postIndex, { blocks: [...post.blocks, newBlock("heading")] })} className="admin-action secondary"><Heading2 size={16} /> Heading</button>
                <button type="button" onClick={() => updatePost(postIndex, { blocks: [...post.blocks, newBlock("image")] })} className="admin-action secondary"><ImagePlus size={16} /> Image</button>
                <button type="button" onClick={() => updatePost(postIndex, { blocks: [...post.blocks, newBlock("quote")] })} className="admin-action secondary"><Quote size={16} /> Quote</button>
                <button type="button" onClick={() => updatePost(postIndex, { blocks: [...post.blocks, newBlock("list")] })} className="admin-action secondary"><List size={16} /> List</button>
              </div>
            </div>
          </div>
        </div>}
      </article>;
    })}

    <button type="button" onClick={addPost} className="w-full rounded-2xl border border-dashed border-indigo-400/40 text-indigo-300 hover:bg-indigo-500/10 py-4 flex items-center justify-center gap-2 font-bold"><Plus size={18} /> Add blog post</button>
  </div>;
}
