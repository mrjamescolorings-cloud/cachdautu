"use client";

import { Star, Quote } from "lucide-react";
import AnimatedSection from "@/components/ui/Animations";

const testimonials = [
    {
        name: "Minh Hoàng",
        role: "Nhà đầu tư chứng khoán",
        content: "Kiến thức từ Cách Đầu Tư giúp tôi tự tin hơn khi ra quyết định. ROI tăng 35% trong năm đầu.",
        rating: 5,
        avatar: "MH"
    },
    {
        name: "Thu Trang",
        role: "Freelancer",
        content: "Nhờ bài viết về tài chính cá nhân, tôi đã xây dựng được quỹ dự phòng 6 tháng lương.",
        rating: 5,
        avatar: "TT"
    },
    {
        name: "Quốc Bảo",
        role: "Doanh nhân",
        content: "Phân tích crypto rất sâu và thực tế. Giúp tôi tránh được nhiều cạm bẫy trên thị trường.",
        rating: 5,
        avatar: "QB"
    },
];

// JSON-LD for Reviews
const reviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Cách Đầu Tư",
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "12500",
        "bestRating": "5"
    }
};

export default function Testimonials() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
            />

            <section
                className="py-24 bg-primary relative overflow-hidden"
                aria-labelledby="testimonials-heading"
                id="testimonials"
            >
                {/* Background glow */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-500/10 rounded-full blur-[100px]" aria-hidden="true" />

                <div className="container mx-auto px-4 relative z-10">
                    <AnimatedSection className="text-center mb-16" animation="fade-in-up">
                        <span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
                            Đánh giá
                        </span>
                        <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Cộng đồng <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">nói gì về chúng tôi</span>
                        </h2>
                        <p className="text-text-secondary text-lg max-w-xl mx-auto">
                            Hơn 12,500 nhà đầu tư đã tin tưởng và đồng hành cùng Cách Đầu Tư.
                        </p>
                    </AnimatedSection>

                    {/* Testimonials Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6" role="list">
                        {testimonials.map((item, idx) => (
                            <AnimatedSection key={idx} animation="fade-in-up" delay={idx * 150}>
                                <article
                                    className="group relative bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] rounded-3xl p-8 hover:border-purple-500/30 hover:shadow-glow-purple transition-all duration-500 h-full"
                                    role="listitem"
                                >
                                    {/* Glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" aria-hidden="true" />

                                    {/* Quote icon */}
                                    <Quote className="w-10 h-10 text-purple-500/20 mb-4" aria-hidden="true" />

                                    {/* Content */}
                                    <blockquote className="relative z-10">
                                        <p className="text-text-secondary mb-6 leading-relaxed">{item.content}</p>
                                    </blockquote>

                                    {/* Stars */}
                                    <div className="flex gap-1 mb-4" aria-label={`${item.rating} sao`}>
                                        {[...Array(item.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                                        ))}
                                    </div>

                                    {/* Author */}
                                    <footer className="flex items-center gap-4 relative z-10">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5">
                                            <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                                                {item.avatar}
                                            </div>
                                        </div>
                                        <div>
                                            <cite className="font-bold text-white not-italic">{item.name}</cite>
                                            <div className="text-xs text-text-muted">{item.role}</div>
                                        </div>
                                    </footer>
                                </article>
                            </AnimatedSection>
                        ))}
                    </div>

                    {/* Trust Banner */}
                    <AnimatedSection className="mt-12 text-center" animation="fade-in-up" delay={500}>
                        <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 border border-white/10">
                            <div className="flex -space-x-2">
                                {["MH", "TT", "QB", "PN"].map((initials, i) => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 border-2 border-primary">
                                        <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-white">
                                            {initials}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-white font-bold">4.9</span>
                                <span className="text-text-muted text-sm">từ 12,500+ đánh giá</span>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </>
    );
}
