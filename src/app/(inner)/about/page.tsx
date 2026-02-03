import { Metadata } from "next";
import Link from "next/link";
import {
    Target, Eye, Gem, ShieldAlert, Users, TrendingUp, Award,
    CheckCircle, ArrowRight, BookOpen, Lightbulb, Shield,
    BarChart3, Globe, Heart, Star, Zap, MessageCircle, Sparkles
} from "lucide-react";

export const metadata: Metadata = {
    title: "Về chúng tôi - Cách Đầu Tư | Nền tảng kiến thức đầu tư #1 Việt Nam",
    description: "Tìm hiểu về sứ mệnh và đội ngũ Cách Đầu Tư - nơi giúp bạn đầu tư thông minh dựa trên kiến thức và quản lý rủi ro.",
};

const stats = [
    { icon: <Users className="w-6 h-6" />, value: "12,500+", label: "Nhà đầu tư tin tưởng", gradient: "from-purple-500 to-pink-500" },
    { icon: <BookOpen className="w-6 h-6" />, value: "150+", label: "Bài phân tích chuyên sâu", gradient: "from-pink-500 to-orange-500" },
    { icon: <Award className="w-6 h-6" />, value: "5+", label: "Năm kinh nghiệm", gradient: "from-emerald-500 to-green-500" },
    { icon: <Globe className="w-6 h-6" />, value: "10+", label: "Loại tài sản đầu tư", gradient: "from-orange-500 to-yellow-500" },
];

const values = [
    {
        icon: <Target className="w-8 h-8" />,
        title: "Sứ mệnh",
        desc: "Giúp mọi người tiếp cận thị trường đầu tư một cách có hệ thống, dựa trên kiến thức và quản lý rủi ro - không phải may mắn hay tin đồn.",
        gradient: "from-purple-500 to-pink-500"
    },
    {
        icon: <Eye className="w-8 h-8" />,
        title: "Tầm nhìn",
        desc: "Trở thành nền tảng kiến thức đầu tư uy tín hàng đầu Việt Nam, nơi mọi người đều có thể học cách đạt tự do tài chính.",
        gradient: "from-pink-500 to-orange-500"
    },
    {
        icon: <Gem className="w-8 h-8" />,
        title: "Giá trị cốt lõi",
        desc: "Minh bạch, trung thực, không cam kết lợi nhuận. Tập trung vào bảo vệ vốn và giáo dục nhà đầu tư.",
        gradient: "from-emerald-500 to-green-500"
    }
];

const features = [
    {
        icon: <BarChart3 className="w-6 h-6" />,
        title: "Phân tích chuyên sâu",
        desc: "Mỗi bài viết được nghiên cứu kỹ lưỡng với dữ liệu thực tế"
    },
    {
        icon: <Shield className="w-6 h-6" />,
        title: "Quản lý rủi ro",
        desc: "Luôn đặt bảo vệ vốn lên hàng đầu trong mọi chiến lược"
    },
    {
        icon: <Lightbulb className="w-6 h-6" />,
        title: "Dễ hiểu, thực tế",
        desc: "Nội dung phù hợp từ người mới đến chuyên gia"
    },
    {
        icon: <Zap className="w-6 h-6" />,
        title: "Cập nhật liên tục",
        desc: "Theo dõi sát sao diễn biến thị trường mỗi ngày"
    },
];

const testimonials = [
    {
        quote: "Cách Đầu Tư giúp tôi hiểu rõ hơn về quản lý rủi ro. Từ khi áp dụng, tôi không còn cảm xúc khi giao dịch nữa.",
        author: "Minh Tuấn",
        role: "Nhà đầu tư cá nhân, Hà Nội"
    },
    {
        quote: "Nội dung rất chất lượng và thực tế. Đây là nguồn tin đáng tin cậy nhất mà tôi theo dõi.",
        author: "Thảo Nguyên",
        role: "Trader, TP.HCM"
    },
];

const assetCategories = [
    "Chứng khoán", "Crypto", "Bất động sản", "Vàng", "Forex",
    "ETF", "Trái phiếu", "Startup", "Tiết kiệm", "Bảo hiểm"
];

export default function AboutPage() {
    return (
        <div className="pt-24 sm:pt-32 pb-0 bg-primary min-h-screen text-text">
            {/* Hero Section */}
            <section className="py-16 sm:py-24 relative overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold uppercase tracking-wider text-xs mb-6">
                            <Sparkles className="w-4 h-4" />
                            Về chúng tôi
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
                            Đồng hành cùng bạn trên con đường{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
                                tự do tài chính
                            </span>
                        </h1>
                        <p className="text-text-secondary text-lg sm:text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
                            Chúng tôi tin rằng <strong className="text-white">đầu tư là kỹ năng quan trọng nhất</strong> để đạt được tự do tài chính.
                            Với hơn 5 năm kinh nghiệm, chúng tôi đã giúp hàng ngàn người Việt tiếp cận thị trường một cách thông minh và có hệ thống.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                            <Link
                                href="/blog"
                                className="group px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold transition-all shadow-glow-purple hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transform hover:-translate-y-1 flex items-center gap-2"
                            >
                                Khám phá kiến thức <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/contact"
                                className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 hover:border-purple-500/30 transition-all flex items-center gap-2"
                            >
                                <MessageCircle className="w-5 h-5" /> Liên hệ ngay
                            </Link>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-8 max-w-4xl mx-auto">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] hover:border-purple-500/30 hover:shadow-glow-purple transition-all group">
                                <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${stat.gradient} p-0.5 mb-3`}>
                                    <div className="w-full h-full rounded-[10px] bg-primary flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                        {stat.icon}
                                    </div>
                                </div>
                                <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
                                <p className="text-xs sm:text-sm text-text-muted mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What We Cover */}
            <section className="py-16 sm:py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
                            Chúng tôi phân tích <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">10+ loại tài sản</span>
                        </h2>
                        <p className="text-text-secondary max-w-2xl mx-auto">
                            Từ chứng khoán truyền thống đến crypto, bất động sản đến forex - chúng tôi giúp bạn hiểu sâu về mọi loại đầu tư.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                        {assetCategories.map((cat, idx) => (
                            <Link
                                key={idx}
                                href="/blog"
                                className="px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-text-secondary hover:text-white hover:bg-purple-500/10 hover:border-purple-500/30 transition-all text-sm font-medium"
                            >
                                {cat}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 sm:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium mb-6">
                            Giá trị
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white">
                            Điều chúng tôi <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">tin tưởng</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        {values.map((item, idx) => (
                            <div
                                key={idx}
                                className="group bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] rounded-3xl p-6 sm:p-8 text-center hover:border-purple-500/30 hover:shadow-glow-purple transition-all"
                            >
                                <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-gradient-to-br ${item.gradient} p-0.5 mb-6`}>
                                    <div className="w-full h-full rounded-[14px] bg-primary flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">{item.title}</h3>
                                <p className="text-text-secondary text-sm sm:text-base leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 sm:py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/5 to-transparent" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
                                Tại sao chọn chúng tôi
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
                                Tại sao <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">12,500+ người</span> tin tưởng chúng tôi?
                            </h2>
                            <div className="space-y-5">
                                {features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-4 group">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 p-0.5 flex-shrink-0">
                                            <div className="w-full h-full rounded-[10px] bg-primary flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                                {feature.icon}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white mb-1">{feature.title}</h4>
                                            <p className="text-text-secondary text-sm">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Testimonials */}
                        <div className="space-y-6">
                            {testimonials.map((t, idx) => (
                                <div key={idx} className="bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] rounded-2xl p-6 hover:border-purple-500/30 hover:shadow-glow-purple transition-all">
                                    <div className="flex gap-1 text-yellow-400 mb-4">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                                    </div>
                                    <p className="text-text-secondary mb-4 italic">"{t.quote}"</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5">
                                            <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                                                {t.author.charAt(0)}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-sm">{t.author}</p>
                                            <p className="text-text-muted text-xs">{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Disclaimer */}
            <section className="py-12 sm:py-16">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 p-0.5 flex-shrink-0">
                                <div className="w-full h-full rounded-[10px] bg-primary flex items-center justify-center text-orange-400">
                                    <ShieldAlert className="w-6 h-6" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-2 text-orange-400">
                                    Tuyên bố miễn trừ trách nhiệm
                                </h3>
                                <p className="text-text-secondary text-sm leading-relaxed">
                                    Tất cả nội dung trên Cách Đầu Tư chỉ mang tính chất thông tin và giáo dục,
                                    không phải là lời khuyên đầu tư. Mọi quyết định đầu tư đều do bạn tự chịu trách nhiệm.
                                    Đầu tư luôn có rủi ro, bao gồm rủi ro mất vốn.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 sm:py-28 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="max-w-2xl mx-auto">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 mb-6">
                            <div className="w-full h-full rounded-[14px] bg-primary flex items-center justify-center">
                                <Heart className="w-8 h-8 text-pink-400" />
                            </div>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                            Sẵn sàng bắt đầu hành trình đầu tư?
                        </h2>
                        <p className="text-text-secondary mb-8 text-lg">
                            Tham gia cộng đồng 12,500+ nhà đầu tư thông minh. Hoàn toàn miễn phí.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/blog"
                                className="group px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold hover:shadow-glow-purple transition-all flex items-center gap-2"
                            >
                                <BookOpen className="w-5 h-5" /> Đọc bài viết ngay
                            </Link>
                            <Link
                                href="/contact"
                                className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 hover:border-purple-500/30 transition-all"
                            >
                                Liên hệ tư vấn
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
