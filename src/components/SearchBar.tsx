import { useState } from "react";


export default function SearchBar({ onChange }: { onChange: (q: string) => void }) {
    const [q, setQ] = useState("");
    return (
        <div className="search">
            <input
                value={q}
                onChange={(e) => {
                    setQ(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder="Search posts…"
            />
        </div>
    );
}