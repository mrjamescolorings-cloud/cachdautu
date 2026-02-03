"use client";

import Link from "next/link";
import { TrendingUp, Bitcoin, DollarSign, Coins, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import AnimatedSection from "@/components/ui/Animations";

// Mock Data for Market Tickers
const marketData = [
    { symbol: "VN-INDEX", price: "1,250.45", change: "+0.85%", up: true },
    { symbol: "BTC/USD", price: "45,230.00", change: "+2.15%", up: true },
    { symbol: "GOLD", price: "2,045.50", change: "-0.45%", up: false },
    { symbol: "EUR/USD", price: "1.0850", change: "+0.12%", up: true },
];

const tradingCategories = [
    { slug: "chung-khoan", name: "Chứng khoán", icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />, desc: "Phân tích kỹ thuật & cơ bản", color: "from-blue-500 to-purple-500" },
    { slug: "crypto", name: "Crypto", icon: <Bitcoin className="w-5 h-5 sm:w-6 sm:h-6" />, desc: "Blockchain & DeFi", color: "from-orange-500 to-yellow-500" },
    { slug: "forex", name: "Forex", icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />, desc: "Thị trường ngoại hối", color: "from-green-500 to-emerald-500" },
    { slug: "vang", name: "Vàng", icon: <Coins className="w-5 h-5 sm:w-6 sm:h-6" />, desc: "Hàng hóa & Kim loại quý", color: "from-yellow-500 to-orange-500" },
];

export default function TradingSection() {
    return (
        <section
            className="py-16 sm:py-24 bg-primary relative overflow-hidden"
            aria-labelledby="trading-heading"
            id="trading"
        >
            {/* Background glow */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-500/10 rounded-full blur-[120px]" aria-hidden="true" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">

                    {/* Content Side */}
                    <div className="lg:w-1/2 w-full">
                        <AnimatedSection animation="fade-in-left">
                            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                                <Activity className="w-3 h-3 sm:w-4 sm:h-4" /> Phân tích thị trường
                            </span>
                            <h2 id="trading-heading" className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white leading-tight">
                                Làm chủ <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Nhịp đập Thị trường</span>
                            </h2>
                            <p className="text-text-secondary text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-xl">
                                Công cụ, kiến thức và chiến lược giao dịch chuyên sâu dành cho <strong className="text-white">nhà đầu tư</strong> chủ động.
                            </p>

                            <nav className="grid grid-cols-2 gap-3 sm:gap-4" aria-label="Danh mục đầu tư">
                                {tradingCategories.map((cat) => (
                                    <Link
                                        key={cat.slug}
                                        href={`/blog/${cat.slug}`}
                                        className="group relative bg-white/[0.02] border border-white/[0.05] rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:border-purple-500/30 transition-all duration-300 overflow-hidden"
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                                        <div className="flex items-center gap-2 sm:gap-4 relative z-10">
                                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${cat.color} p-0.5 flex-shrink-0`}>
                                                <div className="w-full h-full rounded-[7px] sm:rounded-[10px] bg-primary flex items-center justify-center text-white">
                                                    {cat.icon}
                                                </div>
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="font-bold text-white text-sm sm:text-base group-hover:text-purple-400 transition-colors truncate">{cat.name}</h3>
                                                <p className="text-xs text-text-muted truncate hidden xs:block">{cat.desc}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </nav>
                        </AnimatedSection>
                    </div>

                    {/* Visual Side - Dashboard Widget */}
                    <AnimatedSection className="lg:w-1/2 w-full" animation="fade-in-right">
                        <div className="relative">
                            {/* Glow Effect */}
                            <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-transparent blur-2xl rounded-3xl" aria-hidden="true" />

                            <div className="bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.08] rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 relative backdrop-blur-xl">
                                {/* Mock Chart Header */}
                                <div className="flex justify-between items-center mb-6 sm:mb-8">
                                    <div>
                                        <div className="text-xs sm:text-sm text-text-muted mb-1">Portfolio Balance</div>
                                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">₫1,245,000,000</div>
                                    </div>
                                    <div className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs sm:text-sm font-bold border border-emerald-500/20 flex items-center gap-1">
                                        <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" /> +12.5%
                                    </div>
                                </div>

                                {/* Bars */}
                                <div className="h-24 sm:h-32 lg:h-40 flex items-end justify-between gap-1 sm:gap-1.5 mb-6 sm:mb-8">
                                    {[40, 65, 45, 78, 55, 90, 85, 100, 80, 70, 95, 110].map((h, i) => (
                                        <div
                                            key={i}
                                            className="w-full rounded-t-sm sm:rounded-t-md bg-gradient-to-t from-purple-500 to-pink-500"
                                            style={{
                                                height: `${h}%`,
                                                opacity: i > 7 ? 1 : 0.3 + (i * 0.08)
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* Tickers */}
                                <div className="space-y-1.5 sm:space-y-2">
                                    {marketData.map((item, i) => (
                                        <div key={i} className="flex justify-between items-center p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer group">
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${item.up ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                                <div className="font-medium text-white text-xs sm:text-sm">{item.symbol}</div>
                                            </div>
                                            <div className="flex items-center gap-2 sm:gap-4">
                                                <div className="text-xs sm:text-sm text-white font-medium">{item.price}</div>
                                                <div className={`text-xs px-1.5 sm:px-2 py-0.5 rounded flex items-center gap-0.5 sm:gap-1 ${item.up ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                                                    {item.up ? <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> : <ArrowDownRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
                                                    <span className="hidden xs:inline">{item.change}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
