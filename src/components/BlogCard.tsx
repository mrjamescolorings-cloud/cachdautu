import Link from "next/link";
import { BlogPost } from "@/lib/posts";

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
    return (
        <article className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-accent-gold/50 transition-all duration-300 hover:-translate-y-2 group flex flex-col h-full">
            {/* Image placeholder with gradient */}
            <div className="h-48 relative bg-gradient-to-br from-primary-light to-primary flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <span className="text-6xl relative z-10 group-hover:scale-110 transition-transform duration-500">📊</span>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                    <span className="inline-block px-2 py-1 rounded bg-black/50 backdrop-blur-md text-xs font-bold uppercase tracking-wide text-white border border-white/10">
                        {post.category.replace(/-/g, ' ')}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
                {/* Meta */}
                <div className="flex items-center gap-3 text-xs mb-3 text-text-muted">
                    <span>{new Date(post.date).toLocaleDateString('vi-VN')}</span>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold mb-3 text-white group-hover:text-accent-gold transition-colors line-clamp-2">
                    <Link href={`/blog/${post.category}/${post.slug}`} className="focus:outline-none">
                        <span className="absolute inset-0" />
                        {post.title}
                    </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-text-secondary line-clamp-3 mb-4 flex-1">
                    {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 relative z-10">
                    {post.tags.slice(0, 3).map(tag => (
                        <span
                            key={tag}
                            className="text-xs px-2 py-1 rounded bg-white/5 text-text-muted"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
}
