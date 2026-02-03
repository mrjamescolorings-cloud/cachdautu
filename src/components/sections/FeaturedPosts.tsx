import Link from "next/link";
import Image from "next/image";
import { getFeaturedPosts } from "@/lib/posts";
import { ArrowRight, Clock, ArrowUpRight, BookOpen } from "lucide-react";

export default function FeaturedPosts() {
    const posts = getFeaturedPosts();

    return (
        <section
            className="py-16 sm:py-24 bg-primary relative overflow-hidden"
            aria-labelledby="featured-heading"
            id="featured-posts"
        >
            {/* Background glow - responsive sizing */}
            <div className="absolute right-0 bottom-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-500/10 rounded-full blur-[120px]" aria-hidden="true" />
            <div className="absolute left-0 top-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-pink-500/10 rounded-full blur-[120px]" aria-hidden="true" />

            <div className="container mx-auto px-4 relative z-10">
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 gap-4 sm:gap-6">
                    <div>
                        <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                            Blog
                        </span>
                        <h2 id="featured-heading" className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                            Insights <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">mới nhất</span>
                        </h2>
                    </div>
                    <Link href="/blog" className="flex items-center gap-2 text-purple-400 text-sm sm:text-base font-bold hover:text-white transition-colors group">
                        Xem tất cả bài viết
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </header>

                {/* Grid - 1 column on mobile, 2 on tablet, 3 on desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" role="list">
                    {posts.slice(0, 3).map((post, idx) => (
                        <Link key={post.slug} href={`/blog/${post.category}/${post.slug}`} className="group block" role="listitem">
                            <article className="bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] rounded-2xl sm:rounded-3xl overflow-hidden hover:border-purple-500/30 hover:shadow-glow-purple transition-all duration-500 h-full flex flex-col">
                                {/* Image - responsive height */}
                                <div className="h-36 sm:h-44 lg:h-48 bg-gradient-to-br from-purple-900/30 to-pink-900/30 relative overflow-hidden">
                                    {post.image ? (
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-white/20" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent" />

                                    {/* Category badge */}
                                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                                        <span className="inline-block px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur-md text-xs font-bold uppercase tracking-wide text-white">
                                            {post.category.replace(/-/g, ' ')}
                                        </span>
                                    </div>

                                    {/* Arrow on hover */}
                                    <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 backdrop-blur-sm">
                                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 sm:p-5 lg:p-6 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 text-xs text-text-muted mb-2 sm:mb-3">
                                        <Clock className="w-3 h-3" />
                                        <span>{post.readingTime}</span>
                                        <span className="text-white/20">•</span>
                                        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('vi-VN')}</time>
                                    </div>

                                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all line-clamp-2">
                                        {post.title}
                                    </h3>

                                    <p className="text-text-secondary text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 flex-1">
                                        {post.excerpt}
                                    </p>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
