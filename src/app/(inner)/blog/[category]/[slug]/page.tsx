import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, BookOpen, Mail, ChevronRight, ArrowRight, Sparkles, ArrowUpRight, Link as LinkIcon, Info, AlertTriangle, Lightbulb } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import ReadingProgress from "@/components/ReadingProgress";
import SocialShare from "@/components/SocialShare";
import TableOfContents from "@/components/sidebar/TableOfContents";
import PopularPosts from "@/components/sidebar/PopularPosts";
import CategoryList from "@/components/sidebar/CategoryList";
import AuthorCard from "@/components/sidebar/AuthorCard";
import TagCloud from "@/components/sidebar/TagCloud";

// Enable dynamic rendering
export const dynamic = 'force-dynamic';

interface PostPageProps {
    params: Promise<{ category: string; slug: string }>;
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getPost(slug: string) {
    try {
        const { data, error } = await supabase
            .from('posts')
            .select('*, categories(id, name, slug, description)')
            .eq('slug', slug)
            .eq('is_published', true)
            .single();
        if (error) return null;
        return data;
    } catch {
        return null;
    }
}

async function getRelatedPosts(categoryId: string, currentSlug: string) {
    try {
        const { data } = await supabase
            .from('posts')
            .select('*, categories(name, slug)')
            .eq('category_id', categoryId)
            .eq('is_published', true)
            .neq('slug', currentSlug)
            .limit(3);
        return data || [];
    } catch {
        return [];
    }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const { category, slug } = await params;
    const post = await getPost(slug);
    if (!post) return { title: "Không tìm thấy bài viết" };

    const url = `https://cachdautu.com/blog/${category}/${slug}`;

    return {
        title: `${post.title} - Cách Đầu Tư`,
        description: post.excerpt,
        authors: [{ name: "Cách Đầu Tư" }],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            url,
            siteName: "Cách Đầu Tư",
            images: post.featured_image ? [{
                url: post.featured_image,
                width: 1200,
                height: 630,
                alt: post.title
            }] : [],
            publishedTime: post.created_at,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: post.featured_image ? [post.featured_image] : [],
        },
    };
}

export default async function PostPage({ params }: PostPageProps) {
    const { category, slug } = await params;
    const post = await getPost(slug);

    if (!post) notFound();

    const relatedPosts = post.category_id ? await getRelatedPosts(post.category_id, slug) : [];
    const postUrl = `https://cachdautu.com/blog/${category}/${slug}`;

    // Enhanced markdown to HTML conversion with rich styling
    function renderContent(content: string) {
        if (!content) return null;

        const lines = content.split('\n');
        const elements: JSX.Element[] = [];
        let inTable = false;
        let tableRows: string[] = [];

        const processTable = () => {
            if (tableRows.length < 2) return null;
            const headers = tableRows[0].split('|').filter(c => c.trim());
            const rows = tableRows.slice(2).map(r => r.split('|').filter(c => c.trim()));

            return (
                <div key={`table-${elements.length}`} className="overflow-x-auto my-6 rounded-xl border border-white/10">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                                {headers.map((h, i) => (
                                    <th key={i} className="px-4 py-3 text-left text-white font-bold border-b border-white/10">
                                        {h.trim()}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, i) => (
                                <tr key={i} className={`${i % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'} hover:bg-white/5 transition-colors`}>
                                    {row.map((cell, j) => (
                                        <td key={j} className="px-4 py-3 text-text-secondary border-b border-white/5">
                                            {cell.trim()}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        };

        lines.forEach((line, idx) => {
            // Table detection
            if (line.includes('|') && line.trim().startsWith('|')) {
                if (!inTable) {
                    inTable = true;
                    tableRows = [];
                }
                tableRows.push(line);
                return;
            } else if (inTable) {
                const tableElement = processTable();
                if (tableElement) elements.push(tableElement);
                inTable = false;
                tableRows = [];
            }

            // H2 with anchor link and gradient
            if (line.startsWith('## ')) {
                const text = line.replace('## ', '');
                elements.push(
                    <h2 key={idx} id={`heading-${idx}`} className="group flex items-center gap-3 text-xl sm:text-2xl font-bold text-white mt-10 mb-5 pt-6 border-t border-white/5 first:border-0 first:pt-0">
                        <span className="w-1 h-6 rounded-full bg-gradient-to-b from-purple-400 to-pink-400" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-purple-200">
                            {text}
                        </span>
                        <a href={`#heading-${idx}`} className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <LinkIcon className="w-4 h-4 text-purple-400" />
                        </a>
                    </h2>
                );
            }
            // H3 with subtle styling
            else if (line.startsWith('### ')) {
                const text = line.replace('### ', '');
                elements.push(
                    <h3 key={idx} id={`heading-${idx}`} className="group flex items-center gap-2 text-lg sm:text-xl font-bold text-white mt-8 mb-4">
                        <span className="w-2 h-2 rounded-full bg-purple-400/50" />
                        {text}
                        <a href={`#heading-${idx}`} className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <LinkIcon className="w-3 h-3 text-purple-400" />
                        </a>
                    </h3>
                );
            }
            // Blockquote / Callout
            else if (line.startsWith('> ')) {
                const text = line.replace('> ', '');
                elements.push(
                    <blockquote key={idx} className="my-6 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-l-4 border-purple-400 text-text-secondary italic">
                        {text}
                    </blockquote>
                );
            }
            // Info callout
            else if (line.startsWith('[INFO]')) {
                const text = line.replace('[INFO]', '').trim();
                elements.push(
                    <div key={idx} className="my-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex gap-3">
                        <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <p className="text-text-secondary text-sm">{text}</p>
                    </div>
                );
            }
            // Warning callout
            else if (line.startsWith('[WARNING]')) {
                const text = line.replace('[WARNING]', '').trim();
                elements.push(
                    <div key={idx} className="my-6 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 flex gap-3">
                        <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                        <p className="text-text-secondary text-sm">{text}</p>
                    </div>
                );
            }
            // Tip callout
            else if (line.startsWith('[TIP]')) {
                const text = line.replace('[TIP]', '').trim();
                elements.push(
                    <div key={idx} className="my-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex gap-3">
                        <Lightbulb className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <p className="text-text-secondary text-sm">{text}</p>
                    </div>
                );
            }
            // Unordered list item
            else if (line.startsWith('- ')) {
                elements.push(
                    <li key={idx} className="flex items-start gap-2 text-text-secondary mb-2 ml-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400/50 mt-2 flex-shrink-0" />
                        <span>{line.replace('- ', '')}</span>
                    </li>
                );
            }
            // Ordered list item
            else if (/^\d+\.\s/.test(line)) {
                const match = line.match(/^(\d+)\.\s(.*)$/);
                if (match) {
                    elements.push(
                        <li key={idx} className="flex items-start gap-3 text-text-secondary mb-2 ml-2">
                            <span className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-xs font-bold text-purple-400 flex-shrink-0">
                                {match[1]}
                            </span>
                            <span className="pt-0.5">{match[2]}</span>
                        </li>
                    );
                }
            }
            // Regular paragraph
            else if (line.trim()) {
                elements.push(
                    <p key={idx} className="text-text-secondary leading-relaxed mb-4 text-sm sm:text-base">
                        {line}
                    </p>
                );
            }
        });

        // Process remaining table if any
        if (inTable && tableRows.length > 0) {
            const tableElement = processTable();
            if (tableElement) elements.push(tableElement);
        }

        return elements;
    }

    // JSON-LD structured data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: post.featured_image,
        datePublished: post.created_at,
        dateModified: post.updated_at || post.created_at,
        author: {
            "@type": "Organization",
            name: "Cách Đầu Tư",
            url: "https://cachdautu.com"
        },
        publisher: {
            "@type": "Organization",
            name: "Cách Đầu Tư",
            logo: {
                "@type": "ImageObject",
                url: "https://cachdautu.com/logo.png"
            }
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": postUrl
        }
    };

    return (
        <>
            <ReadingProgress />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="pt-24 sm:pt-32 pb-16 bg-primary min-h-screen relative overflow-hidden">
                {/* Background effects */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                        {/* Main Content */}
                        <article className="lg:col-span-8">
                            {/* Breadcrumb with structured data */}
                            <nav className="mb-6 sm:mb-8 flex items-center gap-2 text-xs sm:text-sm text-text-muted flex-wrap" aria-label="Breadcrumb">
                                <ol className="flex items-center gap-2 flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
                                    <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                                        <Link href="/" itemProp="item" className="hover:text-white transition-colors">
                                            <span itemProp="name">Trang chủ</span>
                                        </Link>
                                        <meta itemProp="position" content="1" />
                                    </li>
                                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                                        <Link href="/blog" itemProp="item" className="hover:text-white transition-colors">
                                            <span itemProp="name">Blog</span>
                                        </Link>
                                        <meta itemProp="position" content="2" />
                                    </li>
                                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                                        <Link href={`/blog/${post.categories?.slug}`} itemProp="item" className="hover:text-white transition-colors">
                                            <span itemProp="name">{post.categories?.name}</span>
                                        </Link>
                                        <meta itemProp="position" content="3" />
                                    </li>
                                </ol>
                            </nav>

                            {/* Header */}
                            <header className="mb-8 sm:mb-10">
                                <span className="inline-block px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border border-purple-500/20 mb-4">
                                    {post.categories?.name}
                                </span>
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                                    {post.title}
                                </h1>

                                {/* Meta */}
                                <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-text-muted">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                        <time dateTime={post.created_at}>
                                            {new Date(post.created_at).toLocaleDateString('vi-VN', {
                                                year: 'numeric', month: 'short', day: 'numeric'
                                            })}
                                        </time>
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                        {post.reading_time || '5 phút'}
                                    </span>
                                </div>
                            </header>

                            {/* Featured Image */}
                            <div className="w-full aspect-video rounded-3xl mb-8 sm:mb-10 bg-gradient-to-br from-purple-900/30 to-pink-900/30 flex items-center justify-center border border-white/[0.06] overflow-hidden relative">
                                {post.featured_image ? (
                                    <Image
                                        src={post.featured_image}
                                        alt={post.title}
                                        fill
                                        priority
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 800px"
                                    />
                                ) : (
                                    <BookOpen className="w-16 h-16 sm:w-24 sm:h-24 text-white/10" />
                                )}
                            </div>

                            {/* Excerpt */}
                            <p className="text-base sm:text-xl text-white leading-relaxed mb-6 sm:mb-8 font-medium">
                                {post.excerpt}
                            </p>

                            {/* Content */}
                            <div className="prose prose-invert prose-sm sm:prose-lg max-w-none">
                                {renderContent(post.content)}
                            </div>

                            {/* Tags */}
                            {post.tags && post.tags.length > 0 && (
                                <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/5">
                                    <h4 className="text-xs sm:text-sm text-text-muted mb-3 sm:mb-4">Tags:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag: string) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1.5 rounded-full text-xs sm:text-sm bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-400"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Share */}
                            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/5 flex items-center gap-4">
                                <span className="text-xs sm:text-sm text-text-muted">Chia sẻ:</span>
                                <SocialShare url={postUrl} title={post.title} />
                            </div>

                            {/* Back Button */}
                            <div className="mt-8 sm:mt-10">
                                <Link
                                    href={`/blog/${category}`}
                                    className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-purple-400 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Quay lại {post.categories?.name}
                                </Link>
                            </div>
                        </article>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4">
                            <div className="sticky top-24 sm:top-32 space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin pr-2">
                                {/* Table of Contents */}
                                <TableOfContents content={post.content || ''} />

                                {/* Author Card */}
                                <AuthorCard />

                                {/* Newsletter CTA */}
                                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-3xl p-5 sm:p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-0.5">
                                            <div className="w-full h-full rounded-[10px] bg-primary flex items-center justify-center">
                                                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm sm:text-base">Đăng ký nhận tin</h4>
                                            <p className="text-xs text-text-muted">Bài viết mới mỗi tuần</p>
                                        </div>
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="Email của bạn"
                                        className="w-full px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm bg-white/[0.03] border border-white/[0.06] text-white mb-3 focus:border-purple-500 focus:outline-none transition-colors placeholder-text-muted"
                                    />
                                    <button className="w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold text-xs sm:text-sm hover:shadow-glow-purple transition-all">
                                        Đăng ký
                                    </button>
                                </div>

                                {/* Popular Posts */}
                                <PopularPosts />

                                {/* Category List */}
                                <CategoryList />

                                {/* Tag Cloud */}
                                <TagCloud />
                            </div>
                        </aside>
                    </div>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <section className="mt-12 sm:mt-16 pt-12 sm:pt-16 border-t border-white/5">
                            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">
                                Bài viết <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">liên quan</span>
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                                {relatedPosts.map((p: any) => (
                                    <Link
                                        key={p.id}
                                        href={`/blog/${p.categories?.slug || 'uncategorized'}/${p.slug}`}
                                        className="group bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] rounded-3xl overflow-hidden hover:border-purple-500/30 hover:shadow-glow-purple transition-all hover:-translate-y-1"
                                    >
                                        <div className="aspect-video bg-gradient-to-br from-purple-900/30 to-pink-900/30 relative overflow-hidden">
                                            {p.featured_image ? (
                                                <Image
                                                    src={p.featured_image}
                                                    alt={p.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    sizes="(max-width: 768px) 100vw, 400px"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <BookOpen className="w-10 h-10 text-white/20" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent" />

                                            {/* Arrow on hover */}
                                            <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 backdrop-blur-sm">
                                                <ArrowUpRight className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-white font-bold line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all text-sm">
                                                {p.title}
                                            </h3>
                                            <span className="flex items-center gap-1 text-purple-400 text-xs mt-2 group-hover:gap-2 transition-all">
                                                Đọc tiếp <ArrowRight className="w-3 h-3" />
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </>
    );
}
