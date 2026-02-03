"use client";

import Link from "next/link";
import { PiggyBank, Wallet, CreditCard, Target, TrendingUp, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/ui/Animations";

const financeCategories = [
    { icon: <PiggyBank className="w-6 h-6" />, name: "Tiết kiệm", desc: "Quỹ dự phòng & mục tiêu", href: "/blog/tai-chinh-ca-nhan", color: "from-emerald-500 to-green-500" },
    { icon: <Wallet className="w-6 h-6" />, name: "Ngân sách", desc: "Quản lý chi tiêu", href: "/blog/tai-chinh-ca-nhan", color: "from-purple-500 to-pink-500" },
    { icon: <CreditCard className="w-6 h-6" />, name: "Nợ & Tín dụng", desc: "Tối ưu nợ xấu", href: "/blog/tai-chinh-ca-nhan", color: "from-blue-500 to-purple-500" },
    { icon: <Target className="w-6 h-6" />, name: "Mục tiêu", desc: "Lộ trình FIRE", href: "/blog/tai-chinh-ca-nhan", color: "from-orange-500 to-yellow-500" },
];

export default function FinanceSection() {
    return (
        <section
            className="py-24 bg-primary relative overflow-hidden"
            aria-labelledby="finance-heading"
            id="finance"
        >
            {/* Background glow */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" aria-hidden="true" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* Content */}
                    <div className="lg:w-1/2">
                        <AnimatedSection animation="fade-in-left">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
                                <TrendingUp className="w-4 h-4" /> Tài chính cá nhân
                            </span>
                            <h2 id="finance-heading" className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                                Xây dựng <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">Tự do Tài chính</span>
                            </h2>
                            <p className="text-text-secondary text-lg mb-8 max-w-xl">
                                Không cần thu nhập khủng mới có thể làm giàu. Học cách <strong className="text-white">quản lý chi tiêu</strong>, <strong className="text-white">tiết kiệm thông minh</strong> và <strong className="text-white">đầu tư vào bản thân</strong>.
                            </p>
                            <Link
                                href="/blog/tai-chinh-ca-nhan"
                                className="inline-flex items-center gap-2 text-emerald-400 font-bold hover:text-white transition-colors group"
                            >
                                Bắt đầu hành trình
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </AnimatedSection>
                    </div>

                    {/* Visual Cards */}
                    <AnimatedSection className="lg:w-1/2 w-full" animation="fade-in-right">
                        <div className="grid grid-cols-2 gap-4">
                            {financeCategories.map((cat, idx) => (
                                <Link
                                    key={idx}
                                    href={cat.href}
                                    className="group relative bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] rounded-2xl p-6 hover:border-emerald-500/30 hover:shadow-glow-purple transition-all overflow-hidden"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} p-0.5 mb-4`}>
                                        <div className="w-full h-full rounded-[10px] bg-primary flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                            {cat.icon}
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-white text-lg mb-1 group-hover:text-emerald-400 transition-colors">{cat.name}</h3>
                                    <p className="text-xs text-text-muted">{cat.desc}</p>
                                </Link>
                            ))}
                        </div>

                        {/* Motivational Quote */}
                        <div className="mt-6 bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-2xl p-6">
                            <p className="text-text-secondary italic text-sm">
                                "Tự do tài chính không phải là có nhiều tiền, mà là có đủ thời gian cho những gì quan trọng."
                            </p>
                            <p className="text-emerald-400 font-bold text-xs mt-2">— Financial Wisdom</p>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
