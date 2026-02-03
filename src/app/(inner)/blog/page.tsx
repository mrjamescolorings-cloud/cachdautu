import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Filter, Clock, ArrowRight, Search, Sparkles, ArrowUpRight } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { Suspense } from "react";
import { BlogCardSkeleton } from "@/components/Skeleton";

// Enable dynamic rendering
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Blog - Cách Đầu Tư | Kiến thức đầu tư toàn diện",
    description: "Khám phá hàng trăm bài viết về chứng khoán, crypto, bất động sản, vàng, forex và nhiều loại đầu tư khác.",
    openGraph: {
        title: "Blog - Cách Đầu Tư",
        description: "Khám phá hàng trăm bài viết về chứng khoán, crypto, bất động sản, vàng, forex và nhiều loại đầu tư khác.",
        type: "website",
    }
};

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    featured_image: string | null;
    reading_time: string;
    is_published: boolean;
    created_at: string;
    category_id: string;
    categories?: { name: string; slug: string } | null;
}

interface Category {
    id: string;
    name: string;
    slug: string;
}

interface BlogPageProps {
    searchParams: Promise<{ q?: string; page?: string }>;
}

const POSTS_PER_PAGE = 12;

async function getPosts(searchQuery?: string, page: number = 1) {
    const from = (page - 1) * POSTS_PER_PAGE;
    const to = from + POSTS_PER_PAGE - 1;

    let query = supabase
        .from('posts')
        .select('*, categories(name, slug)', { count: 'exact' })
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .range(from, to);

    if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,excerpt.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
    }

    const { data: posts, count } = await query;
    return { posts: posts || [], total: count || 0 };
}

async function getCategories() {
    const { data } = await supabase.from('categories').select('*').order('name');
    return data || [];
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const params = await searchParams;
    const searchQuery = params?.q;
    const currentPage = parseInt(params?.page || '1', 10);

    const [{ posts, total }, categories] = await Promise.all([
        getPosts(searchQuery, currentPage),
        getCategories()
    ]);

    const totalPages = Math.ceil(total / POSTS_PER_PAGE);

    return (
        <div className="pt-24 sm:pt-32 pb-16 bg-primary min-h-screen text-text relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold uppercase tracking-wider text-xs mb-6">
                        <Sparkles className="w-4 h-4" />
                        Blog
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">
                        Kiến thức{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
                            đầu tư
                        </span>{' '}
                        toàn diện
                    </h1>
                    <p className="max-w-2xl mx-auto text-text-secondary text-base sm:text-lg">
                        Từ người mới bắt đầu đến nhà đầu tư chuyên nghiệp, chúng tôi có nội dung phù hợp với mọi trình độ.
                    </p>
                </div>

                {/* Search */}
                <form action="/blog" method="GET" className="relative max-w-md mx-auto mb-8">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input
                        type="text"
                        name="q"
                        defaultValue={searchQuery || ''}
                        placeholder="Tìm kiếm bài viết..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white focus:border-purple-500 focus:outline-none transition-colors placeholder-text-muted"
                    />
                </form>

                {searchQuery && (
                    <div className="text-center mb-6">
                        <span className="text-text-secondary">Kết quả cho: </span>
                        <span className="text-purple-400 font-medium">"{searchQuery}"</span>
                        <Link href="/blog" className="ml-4 text-sm text-text-muted hover:text-white">
                            ← Xóa bộ lọc
                        </Link>
                    </div>
                )}

                {/* Categories */}
                <div className="mb-8 sm:mb-12">
                    <div className="flex items-center justify-center gap-2 mb-4 text-text-muted text-xs sm:text-sm">
                        <Filter className="w-4 h-4" />
                        <span>Lọc theo chuyên mục:</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                        <Link
                            href="/blog"
                            className="px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold transition-all bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white shadow-glow-purple hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:-translate-y-0.5"
                        >
                            Tất cả
                        </Link>
                        {categories.map((cat: Category) => (
                            <Link
                                key={cat.slug}
                                href={`/blog/${cat.slug}`}
                                className="px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all bg-white/[0.03] border border-white/[0.06] text-text-secondary hover:text-white hover:bg-purple-500/10 hover:border-purple-500/30 hover:-translate-y-0.5"
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Posts Count */}
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <div className="flex items-center gap-2 text-text-muted text-xs sm:text-sm">
                        <BookOpen className="w-4 h-4" />
                        <span>{total} bài viết</span>
                    </div>
                    {totalPages > 1 && (
                        <div className="text-text-muted text-xs sm:text-sm">
                            Trang {currentPage} / {totalPages}
                        </div>
                    )}
                </div>

                {/* Posts Grid */}
                {posts.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 flex items-center justify-center mb-6">
                            <BookOpen className="w-10 h-10 text-purple-400" />
                        </div>
                        <p className="text-text-secondary text-lg">
                            {searchQuery ? `Không tìm thấy bài viết nào cho "${searchQuery}"` : 'Chưa có bài viết nào'}
                        </p>
                        {searchQuery && (
                            <Link href="/blog" className="text-purple-400 hover:underline mt-2 inline-block">
                                Xem tất cả bài viết
                            </Link>
                        )}
                    </div>
                ) : (
                    <Suspense fallback={
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                            {[1, 2, 3, 4, 5, 6].map(i => <BlogCardSkeleton key={i} />)}
                        </div>
                    }>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                            {posts.map((post: Post) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.categories?.slug || 'uncategorized'}/${post.slug}`}
                                    className="group bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] rounded-3xl overflow-hidden hover:border-purple-500/30 hover:shadow-glow-purple transition-all hover:-translate-y-1"
                                >
                                    {/* Image */}
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

                                        {/* Category badge */}
                                        {post.categories && (
                                            <div className="absolute top-4 left-4">
                                                <span className="inline-block px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur-md text-xs font-bold uppercase tracking-wide text-white">
                                                    {post.categories.name}
                                                </span>
                                            </div>
                                        )}

                                        {/* Arrow on hover */}
                                        <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 backdrop-blur-sm">
                                            <ArrowUpRight className="w-5 h-5 text-white" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <h3 className="text-white font-bold mt-2 mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
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
                    </Suspense>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-12">
                        {currentPage > 1 && (
                            <Link
                                href={`/blog?page=${currentPage - 1}${searchQuery ? `&q=${searchQuery}` : ''}`}
                                className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-text-secondary hover:text-white hover:bg-purple-500/10 hover:border-purple-500/30 transition-all"
                            >
                                ← Trước
                            </Link>
                        )}

                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                // Show first, last, current, and adjacent pages
                                if (
                                    page === 1 ||
                                    page === totalPages ||
                                    (page >= currentPage - 1 && page <= currentPage + 1)
                                ) {
                                    return (
                                        <Link
                                            key={page}
                                            href={`/blog?page=${page}${searchQuery ? `&q=${searchQuery}` : ''}`}
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all ${page === currentPage
                                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                                : 'bg-white/[0.03] border border-white/[0.06] text-text-secondary hover:text-white hover:bg-purple-500/10 hover:border-purple-500/30'
                                                }`}
                                        >
                                            {page}
                                        </Link>
                                    );
                                }
                                // Show ellipsis
                                if (page === currentPage - 2 || page === currentPage + 2) {
                                    return (
                                        <span key={page} className="w-10 h-10 flex items-center justify-center text-text-muted">
                                            ...
                                        </span>
                                    );
                                }
                                return null;
                            })}
                        </div>

                        {currentPage < totalPages && (
                            <Link
                                href={`/blog?page=${currentPage + 1}${searchQuery ? `&q=${searchQuery}` : ''}`}
                                className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-text-secondary hover:text-white hover:bg-purple-500/10 hover:border-purple-500/30 transition-all"
                            >
                                Sau →
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
