import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPosts } from "../data/posts";
import type { Post } from "../types";
import PostMeta from "../components/PostMeta";

function renderMarkdown(text: string) {
  // Tiny, safe-ish renderer (bold, h3, blockquote, list)
  const lines = text.split(/\n\n/);
  return (
    <>
      {lines.map((block, i) => {
        if (block.startsWith("### "))
          return <h3 key={i}>{block.replace(/^###\s+/, "")}</h3>;
        if (block.startsWith("> "))
          return <blockquote key={i}>{block.replace(/^>\s+/, "")}</blockquote>;
        if (block.startsWith("- ")) {
          const items = block.split("\n").map((l) => l.replace(/^\-\s+/, ""));
          return (
            <ul key={i}>
              {items.map((it, j) => (
                <li key={j}>{it}</li>
              ))}
            </ul>
          );
        }
        // bold **text**
        const html = block.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        return <p key={i} dangerouslySetInnerHTML={{ __html: html }} />;
      })}
    </>
  );
}

export default function PostPage() {
  const { slug } = useParams();
  const nav = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Load posts from Markdown
  useEffect(() => {
    async function loadPost() {
      setLoading(true);
      const allPosts = await getPosts();
      const found = allPosts.find((p) => p.slug === slug);
      setPost(found || null);
      setLoading(false);
    }
    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="post">
        <p>Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="post">
        <p>Post not found.</p>
        <button onClick={() => nav(-1)}>Go Back</button>
      </div>
    );
  }

  const share = () => {
    const url = window.location.href;
    const text = `${post.title} — ${post.excerpt}`;
    // @ts-ignore
    if (navigator.share) navigator.share({ title: post.title, text, url });
    else navigator.clipboard.writeText(url).then(() => alert("Link copied!"));
  };

  return (
    <article className="post detail">
      <div className="author-row">
        <img className="avatar" src={post.avatar} alt={post.author} />
        <div>
          <h2 className="post-title">{post.title}</h2>
          <PostMeta post={post} />
        </div>
      </div>

      <div className="content">{renderMarkdown(post.content)}</div>

      <div className="post-actions">
        <button onClick={share}>Share</button>
        <button onClick={() => nav(-1)} className="secondary">
          Back
        </button>
      </div>
    </article>
  );
}
