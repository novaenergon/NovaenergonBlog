export interface Post {
    id: number;
    slug: string;
    title: string;
    author: string;
    avatar?: string;
    category: string;
    tags: string[];
    date: string; // ISO
    excerpt: string;
    content: string; // simple markdown-ish text
}