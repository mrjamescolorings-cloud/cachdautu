"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function BlogSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") || "");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/blog?q=${encodeURIComponent(query.trim())}`);
        } else {
            router.push("/blog");
        }
    };

    const clearSearch = () => {
        setQuery("");
        router.push("/blog");
    };

    return (
        <form onSubmit={handleSearch} className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm kiếm bài viết..."
                className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-accent-blue focus:outline-none transition-colors placeholder-text-muted"
            />
            {query && (
                <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            )}
        </form>
    );
}
