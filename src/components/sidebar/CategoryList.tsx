import Link from "next/link";
import { Folder, ChevronRight } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getCategoriesWithCount() {
    try {
        const { data: categories } = await supabase
            .from('categories')
            .select('id, name, slug')
            .order('name');

        if (!categories) return [];

        // Get post count for each category
        const result = await Promise.all(
            categories.map(async (cat) => {
                const { count } = await supabase
                    .from('posts')
                    .select('*', { count: 'exact', head: true })
                    .eq('category_id', cat.id)
                    .eq('is_published', true);
                return { ...cat, postCount: count || 0 };
            })
        );

        return result.filter(c => c.postCount > 0);
    } catch {
        return [];
    }
}

export default async function CategoryList() {
    const categories = await getCategoriesWithCount();

    if (categories.length === 0) return null;

    return (
        <div className="bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.06] rounded-3xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/20 flex items-center justify-center">
                    <Folder className="w-5 h-5 text-green-400" />
                </div>
                <h4 className="font-bold text-white text-sm sm:text-base">Danh mục</h4>
            </div>

            <div className="space-y-1">
                {categories.map((cat: any) => (
                    <Link
                        key={cat.id}
                        href={`/blog/${cat.slug}`}
                        className="group flex items-center justify-between py-2 px-3 -mx-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                        <span className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary group-hover:text-white transition-colors">
                            <ChevronRight className="w-3 h-3 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            {cat.name}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-text-muted">
                            {cat.postCount}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
