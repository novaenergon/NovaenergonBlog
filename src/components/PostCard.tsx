import { Link } from "react-router-dom";
import type { Post } from "../types";
import PostMeta from "./PostMeta";


export default function PostCard({ post }: { post: Post }) {
    return (
        <article className="post">
            <PostMeta post={post} />
            <h2 className="post-title"><Link to={`/post/${post.slug}`}>{post.title}</Link></h2>
            <p>{post.excerpt}</p>
        </article>
    );
}