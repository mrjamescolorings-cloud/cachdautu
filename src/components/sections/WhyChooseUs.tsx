"use client";

import Link from "next/link";
import { ShieldCheck, TrendingUp, Zap, ArrowRight, Target, Lightbulb, BarChart3 } from "lucide-react";
import AnimatedSection from "@/components/ui/Animations";

const strategies = [
    {
        icon: <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8" />,
        title: "Đầu tư An toàn",
        desc: "Chiến lược bảo toàn vốn với rủi ro thấp, phù hợp người mới bắt đầu.",
        color: "from-emerald-500 to-green-500",
        href: "/blog/tai-chinh-ca-nhan"
    },
    {
        icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
        title: "Dự đoán Thị trường",
        desc: "Phân tích kỹ thuật và cơ bản để đón đầu xu hướng thị trường.",
        color: "from-purple-500 to-pink-500",
        href: "/blog/chung-khoan"
    },
    {
        icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
        title: "Tăng trưởng Nhanh",
        desc: "Cơ hội sinh lời cao với các kênh đầu tư năng động.",
        color: "from-orange-500 to-yellow-500",
        href: "/blog/crypto"
    },
];

const features = [
    { icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Phân tích Danh mục", desc: "Công cụ tối ưu hóa và cân bằng danh mục đầu tư." },
    { icon: <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Xu hướng Thị trường", desc: "Cập nhật xu hướng và tín hiệu giao dịch hàng ngày." },
    { icon: <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Quyết định Thông minh", desc: "Chia sẻ kinh nghiệm từ chuyên gia lâu năm." },
    { icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Công cụ Mạnh mẽ", desc: "Máy tính lãi kép và bộ lọc cổ phiếu chuyên nghiệp." },
];

export default function WhyChooseUs() {
    return (
        <section
            className="py-16 sm:py-24 bg-primary relative overflow-hidden"
            aria-labelledby="strategies-heading"
            id="strategies"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/5 to-transparent" aria-hidden="true" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Strategies Section */}
                <AnimatedSection className="text-center mb-10 sm:mb-16" animation="fade-in-up">
                    <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                        Chiến lược
                    </span>
                    <h2 id="strategies-heading" className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 px-2">
                        Chiến lược cho <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Mọi Khẩu vị Rủi ro</span>
                    </h2>
                    <p className="text-text-secondary text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
                        Dù bạn muốn an toàn hay chấp nhận mạo hiểm, chúng tôi có giải pháp phù hợp.
                    </p>
                </AnimatedSection>

                {/* Strategy Cards - responsive grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-24" role="list">
                    {strategies.map((strategy, idx) => (
                        <AnimatedSection key={idx} animation="fade-in-up" delay={idx * 150}>
                            <Link
                                href={strategy.href}
                                className="group block relative bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 hover:border-purple-500/30 hover:shadow-glow-purple transition-all duration-500 h-full"
                                role="listitem"
                            >
                                {/* Glow on hover */}
                                <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${strategy.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} aria-hidden="true" />

                                {/* Icon */}
                                <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mb-4 sm:mb-6 rounded-xl sm:rounded-2xl bg-gradient-to-br ${strategy.color} p-0.5`}>
                                    <div className="w-full h-full rounded-[10px] sm:rounded-[14px] bg-primary flex items-center justify-center text-white">
                                        {strategy.icon}
                                    </div>
                                </div>

                                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                                    {strategy.title}
                                </h3>
                                <p className="text-text-secondary text-sm sm:text-base mb-3 sm:mb-4">{strategy.desc}</p>

                                <div className="flex items-center gap-2 text-purple-400 text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                    Tìm hiểu <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        </AnimatedSection>
                    ))}
                </div>

                {/* Features Section */}
                <AnimatedSection className="text-center mb-8 sm:mb-12" animation="fade-in-up">
                    <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                        Công cụ
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                        Nền tảng <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">Tối ưu hóa</span>
                    </h2>
                </AnimatedSection>

                {/* Features - 2 columns on mobile, 4 on desktop */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                    {features.map((feature, idx) => (
                        <AnimatedSection key={idx} animation="fade-in-up" delay={idx * 100}>
                            <div className="group bg-white/[0.02] border border-white/[0.05] rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 hover:bg-white/[0.04] hover:border-purple-500/20 transition-all duration-300 h-full">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-purple-400 mb-3 sm:mb-4 group-hover:scale-110 transition-transform" aria-hidden="true">
                                    {feature.icon}
                                </div>
                                <h3 className="text-white font-bold text-sm sm:text-base mb-1 sm:mb-2">{feature.title}</h3>
                                <p className="text-text-muted text-xs sm:text-sm">{feature.desc}</p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
