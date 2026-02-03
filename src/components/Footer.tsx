import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
    { slug: "chung-khoan", label: "Chứng khoán" },
    { slug: "crypto", label: "Crypto" },
    { slug: "bat-dong-san", label: "Bất động sản" },
    { slug: "vang", label: "Vàng" },
    { slug: "forex", label: "Forex" },
];

export default function Footer() {
    return (
        <footer className="bg-primary pt-24 pb-10 border-t border-white/5 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Large Brand Name - Quantra Style */}
                <div className="text-center mb-12 sm:mb-20">
                    <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 select-none tracking-tighter leading-none">
                        <span className="block sm:inline">CÁCH</span>{" "}
                        <span className="block sm:inline">ĐẦU TƯ</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-xl">
                                C
                            </div>
                            <span className="text-xl font-bold text-white">Cách Đầu Tư</span>
                        </Link>
                        <p className="text-sm text-text-muted leading-relaxed mb-6">
                            Nền tảng kiến thức đầu tư hàng đầu Việt Nam.
                            Hỗ trợ bạn đưa ra quyết định đầu tư sáng suốt.
                        </p>
                        <div className="flex gap-3">
                            {/* Social Icons */}
                            {[
                                { label: 'FB', href: 'https://facebook.com' },
                                { label: 'YT', href: 'https://youtube.com' },
                                { label: 'TG', href: 'https://t.me' },
                                { label: 'X', href: 'https://x.com' },
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-xs text-text-secondary hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all border border-white/5 hover:border-transparent"
                                >
                                    {social.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Khám phá</h4>
                        <ul className="space-y-3">
                            {categories.map((cat) => (
                                <li key={cat.slug}>
                                    <Link href={`/blog/${cat.slug}`} className="text-sm text-text-secondary hover:text-purple-400 transition-colors">
                                        {cat.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Công ty</h4>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="text-sm text-text-secondary hover:text-purple-400 transition-colors">Về chúng tôi</Link></li>
                            <li><Link href="/contact" className="text-sm text-text-secondary hover:text-purple-400 transition-colors">Liên hệ</Link></li>
                            <li><Link href="/blog" className="text-sm text-text-secondary hover:text-purple-400 transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Widget */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Bản tin đầu tư</h4>
                        <p className="text-sm text-text-muted mb-4">
                            Nhận định thị trường hàng tuần gửi trực tiếp vào inbox của bạn.
                        </p>
                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Email của bạn"
                                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-text-muted focus:border-purple-500 focus:outline-none transition-colors"
                            />
                            <button
                                type="submit"
                                className="px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold hover:shadow-glow-purple transition-all flex items-center justify-center gap-2"
                            >
                                Đăng ký ngay
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-text-muted">
                        © 2026 Cách Đầu Tư. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/about" className="text-sm text-text-muted hover:text-purple-400 transition-colors">Chính sách bảo mật</Link>
                        <Link href="/about" className="text-sm text-text-muted hover:text-purple-400 transition-colors">Điều khoản sử dụng</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
