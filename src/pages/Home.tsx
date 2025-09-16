import { useEffect, useMemo, useState } from "react";
import { getPosts, getAllCategories, getAllTags } from "../data/posts";
import type { Post } from "../types";
import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | "all">("all");
  const [tag, setTag] = useState<string | "all">("all");
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const pageSize = 5;

  // 🔹 Load posts + categories + tags once
  useEffect(() => {
    async function loadData() {
      const loadedPosts = await getPosts();
      const loadedCategories = await getAllCategories();
      const loadedTags = await getAllTags();

      setPosts(loadedPosts);
      setCategories(loadedCategories);
      setTags(loadedTags);
    }
    loadData();
  }, []);

  // 🔹 Filtering logic
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return posts.filter((p) => {
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q);

      const matchesCategory = category === "all" || p.category === category;
      const matchesTag = tag === "all" || p.tags.includes(tag);

      return matchesQuery && matchesCategory && matchesTag;
    });
  }, [query, category, tag, posts]);

  // 🔹 Pagination
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const start = (page - 1) * pageSize;
  const pagePosts = filtered.slice(start, start + pageSize);

  return (
    <div>
      {/* Filters */}
      <div className="filters flex gap-4 mb-4">
        <SearchBar
          onChange={(q) => {
            setPage(1);
            setQuery(q);
          }}
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value as any);
            setPage(1);
          }}
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={tag}
          onChange={(e) => {
            setTag(e.target.value as any);
            setPage(1);
          }}
        >
          <option value="all">All Tags</option>
          {tags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Posts */}
      <main className="posts space-y-4">
        {pagePosts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
        {pagePosts.length === 0 && <p>No posts match your filters.</p>}
      </main>

      {/* Pagination */}
      <Pagination page={page} pages={pages} onPage={setPage} />
    </div>
  );
}
