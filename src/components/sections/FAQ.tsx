"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import AnimatedSection from "@/components/ui/Animations";

const faqs = [
    {
        q: "Cách Đầu Tư dành cho ai?",
        a: "Chúng tôi phục vụ tất cả - từ người mới bắt đầu muốn tìm hiểu đầu tư, đến nhà đầu tư có kinh nghiệm muốn nâng cao chiến lược."
    },
    {
        q: "Có cần kiến thức tài chính trước không?",
        a: "Không cần! Các bài viết được viết dễ hiểu từ cơ bản đến nâng cao. Bạn có thể học từ zero."
    },
    {
        q: "Thông tin có được cập nhật thường xuyên?",
        a: "Có, chúng tôi cập nhật nội dung hàng ngày về thị trường chứng khoán, crypto, bất động sản và tài chính cá nhân."
    },
    {
        q: "Tôi có thể bắt đầu từ đâu?",
        a: "Bắt đầu với mục Tài chính cá nhân để xây nền móng, sau đó khám phá các kênh đầu tư phù hợp với mục tiêu của bạn."
    },
];

// JSON-LD for FAQ
const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
        }
    }))
};

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            <section
                className="py-16 sm:py-24 bg-primary relative overflow-hidden"
                aria-labelledby="faq-heading"
                id="faq"
            >
                {/* Background glow - smaller on mobile */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-orange-500/10 rounded-full blur-[120px]" aria-hidden="true" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto">
                        <AnimatedSection className="text-center mb-8 sm:mb-12" animation="fade-in-up">
                            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                                <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4" /> FAQ
                            </span>
                            <h2 id="faq-heading" className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                                Câu hỏi <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">thường gặp</span>
                            </h2>
                        </AnimatedSection>

                        {/* FAQ Items */}
                        <div className="space-y-3 sm:space-y-4" role="list">
                            {faqs.map((faq, idx) => (
                                <AnimatedSection key={idx} animation="fade-in-up" delay={idx * 100}>
                                    <div
                                        className={`bg-gradient-to-b from-white/[0.03] to-transparent border rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === idx ? 'border-orange-500/30 shadow-glow-orange' : 'border-white/[0.05] hover:border-white/[0.1]'
                                            }`}
                                        role="listitem"
                                    >
                                        <button
                                            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                            className="w-full px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center text-left gap-4"
                                            aria-expanded={openIndex === idx}
                                            aria-controls={`faq-answer-${idx}`}
                                        >
                                            <span className={`font-bold text-sm sm:text-base transition-colors ${openIndex === idx ? 'text-orange-400' : 'text-white'}`}>
                                                {faq.q}
                                            </span>
                                            <ChevronDown
                                                className={`w-4 h-4 sm:w-5 sm:h-5 text-text-muted transition-transform duration-300 flex-shrink-0 ${openIndex === idx ? 'rotate-180 text-orange-400' : ''}`}
                                                aria-hidden="true"
                                            />
                                        </button>
                                        <div
                                            id={`faq-answer-${idx}`}
                                            className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-48 pb-4 sm:pb-5' : 'max-h-0'}`}
                                        >
                                            <p className="px-4 sm:px-6 text-text-secondary text-sm sm:text-base">{faq.a}</p>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>

                        {/* CTA */}
                        <AnimatedSection className="text-center mt-8 sm:mt-12" animation="fade-in-up" delay={400}>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 text-orange-400 text-sm sm:text-base font-bold hover:bg-orange-500/20 transition-colors"
                            >
                                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                Còn thắc mắc? Liên hệ ngay
                            </Link>
                        </AnimatedSection>
                    </div>
                </div>
            </section>
        </>
    );
}
