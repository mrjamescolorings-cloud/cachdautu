import { Metadata } from "next";
import { Mail, MessageCircle, Clock, HelpCircle, Send, User, Sparkles } from "lucide-react";

export const metadata: Metadata = {
    title: "Liên hệ - Cách Đầu Tư",
    description: "Liên hệ với đội ngũ Cách Đầu Tư để được hỗ trợ và giải đáp thắc mắc về đầu tư.",
};

const contactInfo = [
    {
        icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />,
        title: "Email",
        value: "contact@cachdautu.com",
        gradient: "from-purple-500 to-pink-500"
    },
    {
        icon: <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
        title: "Mạng xã hội",
        value: "Facebook, YouTube, Telegram",
        gradient: "from-pink-500 to-orange-500"
    },
    {
        icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6" />,
        title: "Thời gian phản hồi",
        value: "Trong vòng 24-48 giờ",
        gradient: "from-emerald-500 to-green-500"
    },
];

export default function ContactPage() {
    return (
        <div className="pt-24 sm:pt-32 pb-16 bg-primary min-h-screen text-text relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                {/* Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold uppercase tracking-wider text-xs mb-6">
                        <Sparkles className="w-4 h-4" />
                        Liên hệ
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">
                        Kết nối với{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
                            chúng tôi
                        </span>
                    </h1>
                    <p className="text-text-secondary text-base sm:text-lg max-w-xl mx-auto">
                        Bạn có câu hỏi hoặc cần hỗ trợ? Hãy liên hệ với chúng tôi.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                    {/* Contact Form */}
                    <div className="bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] rounded-3xl p-6 sm:p-8 hover:border-purple-500/30 transition-all">
                        <h3 className="text-lg sm:text-xl font-bold mb-6 text-white flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-0.5">
                                <div className="w-full h-full rounded-[10px] bg-primary flex items-center justify-center">
                                    <Send className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            Gửi tin nhắn
                        </h3>
                        <form className="space-y-4 sm:space-y-5">
                            <div>
                                <label className="block text-xs sm:text-sm mb-2 text-text-secondary">
                                    Họ và tên
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-text-muted" />
                                    <input
                                        type="text"
                                        placeholder="Nguyễn Văn A"
                                        className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white text-sm sm:text-base focus:border-purple-500 focus:outline-none transition-colors placeholder-text-muted"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm mb-2 text-text-secondary">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-text-muted" />
                                    <input
                                        type="email"
                                        placeholder="email@example.com"
                                        className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white text-sm sm:text-base focus:border-purple-500 focus:outline-none transition-colors placeholder-text-muted"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm mb-2 text-text-secondary">
                                    Chủ đề
                                </label>
                                <select
                                    className="w-full px-4 py-3 sm:py-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white text-sm sm:text-base focus:border-purple-500 focus:outline-none transition-colors"
                                >
                                    <option>Câu hỏi chung</option>
                                    <option>Hợp tác kinh doanh</option>
                                    <option>Góp ý &amp; phản hồi</option>
                                    <option>Hỗ trợ kỹ thuật</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm mb-2 text-text-secondary">
                                    Nội dung
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="Nội dung tin nhắn..."
                                    className="w-full px-4 py-3 sm:py-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white text-sm sm:text-base focus:border-purple-500 focus:outline-none transition-colors resize-none placeholder-text-muted"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 sm:py-4 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold text-sm sm:text-base hover:shadow-glow-purple transition-all flex items-center justify-center gap-2"
                            >
                                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                                Gửi tin nhắn
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4 sm:space-y-6">
                        {contactInfo.map((item, idx) => (
                            <div
                                key={idx}
                                className="group bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] rounded-2xl p-5 sm:p-6 flex items-center gap-4 hover:border-purple-500/30 hover:shadow-glow-purple transition-all"
                            >
                                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${item.gradient} p-0.5`}>
                                    <div className="w-full h-full rounded-[10px] bg-primary flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm sm:text-base">{item.title}</h4>
                                    <p className="text-text-secondary text-xs sm:text-sm">{item.value}</p>
                                </div>
                            </div>
                        ))}

                        {/* FAQ Link */}
                        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-5 sm:p-6 hover:border-purple-500/30 transition-all">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 p-0.5">
                                    <div className="w-full h-full rounded-[10px] bg-primary flex items-center justify-center text-orange-400">
                                        <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm sm:text-base mb-1">Câu hỏi thường gặp</h4>
                                    <p className="text-text-secondary text-xs sm:text-sm mb-3">
                                        Có thể bạn sẽ tìm thấy câu trả lời trong phần FAQ.
                                    </p>
                                    <a
                                        href="/#faq"
                                        className="text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 hover:from-white hover:to-white transition-all"
                                    >
                                        Xem FAQ →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
