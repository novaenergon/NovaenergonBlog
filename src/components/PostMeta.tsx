import { formatDate, readingTime } from "../utils/format";
import type { Post } from "../types";

export default function PostMeta({ post }: { post: Post }) {
    return (
        <div className="meta">
            <span>🏷 {post.tags[0]}</span>
            <span>👤 {post.author}</span>
            <span>📅 {formatDate(post.date)}</span>
            <span className="time">📰 {readingTime(post.content)}</span>
        </div>
    );
}