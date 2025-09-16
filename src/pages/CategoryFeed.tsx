import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPosts } from "../data/posts";
import type { Post } from "../types";
import PostCard from "../components/PostCard";

export default function CategoryFeed() {
  const { name } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Load posts from Markdown
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const loadedPosts = await getPosts();
      setPosts(loadedPosts);
      setLoading(false);
    }
    loadData();
  }, []);

  // 🔹 Filter by category (case-insensitive, safer)
  const filtered = posts.filter(
    (p) => p.category.toLowerCase() === (name || "").toLowerCase()
  );

  return (
    <div>
      <h2 className="section-title">Category: {name}</h2>

      {loading && <p>Loading posts...</p>}

      {!loading && (
        <main className="posts">
          {filtered.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
          {filtered.length === 0 && (
            <p>No posts available in this category.</p>
          )}
        </main>
      )}
    </div>
  );
}
