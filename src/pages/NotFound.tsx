import { Link } from "react-router-dom";
export default function NotFound() {
return (
<article className="post">
<h2>404 — Not Found</h2>
<p>That page doesn't exist. Try going back to the <Link to="/">home page</Link>.</p>
</article>
);
}