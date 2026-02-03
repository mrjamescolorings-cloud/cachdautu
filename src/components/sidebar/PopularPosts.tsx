import Link from "next/link";
import { TrendingUp, ArrowRight } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getPopularPosts() {
    try {
        const { data } = await supabase
            .from('posts')
            .select('id, title, slug, view_count, categories(slug)')
            .eq('is_published', true)
            .order('view_count', { ascending: false })
            .limit(5);
        return data || [];
    } catch {
        return [];
    }
}

export default async function PopularPosts() {
    const posts = await getPopularPosts();

    if (posts.length === 0) return null;

    return (
        <div className="bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.06] rounded-3xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-orange-400" />
                </div>
                <h4 className="font-bold text-white text-sm sm:text-base">Bài viết nổi bật</h4>
            </div>

            <div className="space-y-3">
                {posts.map((post: any, idx: number) => (
                    <Link
                        key={post.id}
                        href={`/blog/${post.categories?.slug || 'uncategorized'}/${post.slug}`}
                        className="group flex items-start gap-3 py-2 border-b border-white/5 last:border-0 hover:bg-white/5 -mx-2 px-2 rounded-lg transition-colors"
                    >
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-xs font-bold text-purple-400">
                            {idx + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm text-text-secondary group-hover:text-white line-clamp-2 transition-colors">
                                {post.title}
                            </p>
                            <span className="flex items-center gap-1 text-[10px] text-purple-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                Đọc ngay <ArrowRight className="w-3 h-3" />
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
