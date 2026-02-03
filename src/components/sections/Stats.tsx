"use client";

import { BookOpen, Users, TrendingUp, Award } from "lucide-react";
import AnimatedSection from "@/components/ui/Animations";

const stats = [
    { icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />, value: "12,500+", label: "Nhà đầu tư", desc: "đang học hỏi" },
    { icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />, value: "150+", label: "Bài phân tích", desc: "chuyên sâu" },
    { icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />, value: "10+", label: "Lớp tài sản", desc: "đa dạng hóa" },
    { icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />, value: "5+", label: "Năm kinh nghiệm", desc: "trên thị trường" },
];

export default function Stats() {
    return (
        <section
            className="py-16 sm:py-24 bg-primary relative overflow-hidden"
            aria-labelledby="stats-heading"
            id="stats"
        >
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" aria-hidden="true" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[150px] sm:h-[300px] bg-purple-500/10 rounded-full blur-[100px]" aria-hidden="true" />

            <div className="container mx-auto px-4 relative z-10">
                <AnimatedSection className="text-center mb-10 sm:mb-16" animation="fade-in-up">
                    <h2 id="stats-heading" className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">10+ Lớp tài sản</span>
                        <br />
                        <span className="text-white">sẵn sàng để bạn khám phá</span>
                    </h2>
                    <p className="text-text-secondary text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
                        Từ <strong className="text-white">chứng khoán</strong>, <strong className="text-white">crypto</strong> đến <strong className="text-white">bất động sản</strong> - chúng tôi có tất cả kiến thức bạn cần.
                    </p>
                </AnimatedSection>

                {/* Stats Grid - 2 columns on mobile, 4 on desktop */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6" role="list" aria-label="Số liệu thống kê">
                    {stats.map((stat, idx) => (
                        <AnimatedSection key={idx} animation="fade-in-up" delay={idx * 100}>
                            <div
                                className="group relative bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.06] rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 text-center hover:border-purple-500/30 hover:shadow-glow-purple transition-all duration-500"
                                role="listitem"
                            >
                                {/* Icon - smaller on mobile */}
                                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-3 sm:mb-4 lg:mb-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:text-pink-400 transition-all duration-500" aria-hidden="true">
                                    {stat.icon}
                                </div>

                                {/* Value */}
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                                    {stat.value}
                                </div>

                                {/* Label */}
                                <div className="text-white font-medium text-sm sm:text-base mb-0.5 sm:mb-1">{stat.label}</div>
                                <div className="text-xs sm:text-sm text-text-muted">{stat.desc}</div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
