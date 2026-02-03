import Link from "next/link";
import { Hash } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getTrendingTags() {
    try {
        const { data: posts } = await supabase
            .from('posts')
            .select('tags')
            .eq('is_published', true);

        if (!posts) return [];

        // Count tag occurrences
        const tagCount: Record<string, number> = {};
        posts.forEach((post: any) => {
            if (post.tags && Array.isArray(post.tags)) {
                post.tags.forEach((tag: string) => {
                    tagCount[tag] = (tagCount[tag] || 0) + 1;
                });
            }
        });

        // Sort by count and get top 15
        const sortedTags = Object.entries(tagCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 15)
            .map(([tag, count]) => ({ tag, count }));

        return sortedTags;
    } catch {
        return [];
    }
}

export default async function TagCloud() {
    const tags = await getTrendingTags();

    if (tags.length === 0) return null;

    // Calculate font sizes based on count
    const maxCount = Math.max(...tags.map(t => t.count));
    const minCount = Math.min(...tags.map(t => t.count));

    const getSize = (count: number) => {
        if (maxCount === minCount) return 'text-xs';
        const ratio = (count - minCount) / (maxCount - minCount);
        if (ratio > 0.7) return 'text-sm font-bold';
        if (ratio > 0.4) return 'text-xs font-medium';
        return 'text-xs';
    };

    return (
        <div className="bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.06] rounded-3xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 flex items-center justify-center">
                    <Hash className="w-5 h-5 text-purple-400" />
                </div>
                <h4 className="font-bold text-white text-sm sm:text-base">Tags phổ biến</h4>
            </div>

            <div className="flex flex-wrap gap-2">
                {tags.map(({ tag, count }) => (
                    <Link
                        key={tag}
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        className={`
                            px-2.5 py-1 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20
                            text-text-muted hover:text-white transition-all
                            ${getSize(count)}
                        `}
                        title={`${count} bài viết`}
                    >
                        #{tag}
                    </Link>
                ))}
            </div>
        </div>
    );
}
