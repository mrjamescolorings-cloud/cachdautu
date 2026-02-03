import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, Clock, ArrowRight, Sparkles, ArrowUpRight } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";

// Enable dynamic rendering
export const dynamic = 'force-dynamic';

interface CategoryPageProps {
    params: Promise<{ category: string }>;
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getCategory(slug: string) {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .eq('slug', slug)
            .single();
        if (error) return null;
        return data;
    } catch {
        return null;
    }
}

async function getCategories() {
    try {
        const { data } = await supabase.from('categories').select('*').order('name');
        return data || [];
    } catch {
        return [];
    }
}

async function getPostsByCategory(categoryId: string) {
    try {
        const { data, error } = await supabase
            .from('posts')
            .select('*, categories(name, slug)')
            .eq('category_id', categoryId)
            .eq('is_published', true)
            .order('created_at', { ascending: false });

        console.log('[CategoryPage] getPostsByCategory:', {
            categoryId,
            count: data?.length || 0,
            error: error?.message || null
        });

        return data || [];
    } catch {
        return [];
    }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { category } = await params;
    const cat = await getCategory(category);
    if (!cat) return { title: "Không tìm thấy" };

    return {
        title: `${cat.name} - Cách Đầu Tư`,
        description: cat.description || `Khám phá kiến thức đầu tư về ${cat.name.toLowerCase()}`,
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = await params;
    const cat = await getCategory(category);
    if (!cat) notFound();

    const [posts, allCategories] = await Promise.all([
        getPostsByCategory(cat.id),
        getCategories()
    ]);

    return (
        <div className="pt-24 sm:pt-32 pb-16 bg-primary min-h-screen text-text relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Breadcrumb */}
                <nav className="mb-8 text-sm text-text-muted flex items-center gap-2">
                    <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
                    <span className="text-white/20">/</span>
                    <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                    <span className="text-white/20">/</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-medium">{cat.name}</span>
                </nav>

                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">{cat.icon || '📁'}</span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border border-purple-500/20">
                            {posts.length} bài viết
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
                            {cat.name}
                        </span>
                    </h1>
                    <p className="text-text-secondary text-base sm:text-lg max-w-3xl">
                        {cat.description}
                    </p>
                </div>

                {/* Category Navigation */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12 border-b border-white/5 pb-6 sm:pb-8">
                    <Link
                        href="/blog"
                        className="px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all bg-white/[0.03] border border-white/[0.06] text-text-secondary hover:text-white hover:bg-purple-500/10 hover:border-purple-500/30"
                    >
                        Tất cả
                    </Link>
                    {allCategories.map((c: any) => (
                        <Link
                            key={c.slug}
                            href={`/blog/${c.slug}`}
                            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all border ${c.slug === category
                                ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white border-transparent shadow-glow-purple'
                                : 'bg-white/[0.03] border-white/[0.06] text-text-secondary hover:text-white hover:bg-purple-500/10 hover:border-purple-500/30'
                                }`}
                        >
                            {c.name}
                        </Link>
                    ))}
                </div>

                {/* Posts */}
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {posts.map((post: any) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.categories?.slug || category}/${post.slug}`}
                                className="group bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] rounded-3xl overflow-hidden hover:border-purple-500/30 hover:shadow-glow-purple transition-all hover:-translate-y-1"
                            >
                                <div className="aspect-video bg-gradient-to-br from-purple-900/30 to-pink-900/30 relative overflow-hidden">
                                    {post.featured_image ? (
                                        <Image
                                            src={post.featured_image}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <BookOpen className="w-12 h-12 text-white/20" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent" />

                                    {/* Arrow on hover */}
                                    <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 backdrop-blur-sm">
                                        <ArrowUpRight className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-white font-bold mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
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
                                        <span className="flex items-center gap-1 text-purple-400 group-hover:gap-2 transition-all">
                                            Đọc tiếp <ArrowRight className="w-3 h-3" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-gradient-to-b from-white/[0.04] to-transparent rounded-3xl border border-white/[0.06]">
                        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 flex items-center justify-center mb-6">
                            <BookOpen className="w-10 h-10 text-purple-400" />
                        </div>
                        <p className="text-lg sm:text-xl mb-6 text-text-secondary">Chưa có bài viết nào trong chuyên mục này</p>
                        <Link href="/blog" className="inline-block px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold hover:shadow-glow-purple transition-all">
                            Xem tất cả bài viết
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
