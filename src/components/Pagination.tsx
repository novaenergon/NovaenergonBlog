interface Props {
page: number;
pages: number;
onPage: (p: number) => void;
}
export default function Pagination({ page, pages, onPage }: Props) {
if (pages <= 1) return null;
const items = Array.from({ length: pages }, (_, i) => i + 1);
return (
<div className="pagination">
<button disabled={page === 1} onClick={() => onPage(page - 1)}>Prev</button>
{items.map((n) => (
<button key={n} className={n === page ? "active" : ""} onClick={() => onPage(n)}>{n}</button>
))}
<button disabled={page === pages} onClick={() => onPage(page + 1)}>Next</button>
</div>
);
}
