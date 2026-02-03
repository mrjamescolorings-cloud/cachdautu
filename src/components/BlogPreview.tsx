import Link from "next/link";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getFeaturedPosts() {
    const { data } = await supabase
        .from('posts')
        .select('*, categories(name, slug)')
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(3);
    return data || [];
}

export default async function BlogPreview() {
    const featuredPosts = await getFeaturedPosts();

    if (featuredPosts.length === 0) return null;

    return (
        <section className="section">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div>
                        <span className="text-sm font-medium uppercase tracking-wider text-accent-blue">
                            Bài viết nổi bật
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-white">
                            Nhận định & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-emerald to-emerald-400">Phân tích</span>
                        </h2>
                    </div>
                    <Link
                        href="/blog"
                        className="mt-4 md:mt-0 text-sm font-medium flex items-center gap-2 text-text-secondary hover:text-accent-blue transition-colors"
                    >
                        Xem tất cả bài viết
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredPosts.map((post: any) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.categories?.slug || 'uncategorized'}/${post.slug}`}
                            className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-accent-blue/30 transition-all hover:-translate-y-1"
                        >
                            {/* Image */}
                            <div className="aspect-video bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 relative overflow-hidden">
                                {post.featured_image ? (
                                    <img
                                        src={post.featured_image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <BookOpen className="w-12 h-12 text-white/20" />
                                    </div>
                                )}
                                {post.categories && (
                                    <span className="absolute top-3 left-3 px-2 py-1 rounded bg-black/50 backdrop-blur-sm text-xs font-bold text-white">
                                        {post.categories.name}
                                    </span>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-white font-bold mb-2 line-clamp-2 group-hover:text-accent-blue transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-text-secondary text-sm line-clamp-2 mb-4">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center justify-between text-xs text-text-muted">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {post.reading_time || '5 phút'}
                                    </span>
                                    <span className="flex items-center gap-1 text-accent-blue group-hover:gap-2 transition-all">
                                        Đọc tiếp <ArrowRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
