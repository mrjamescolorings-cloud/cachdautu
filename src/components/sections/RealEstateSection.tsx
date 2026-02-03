"use client";

import Link from "next/link";
import { Building2, Home, Factory, ArrowRight, MapPin, TrendingUp } from "lucide-react";
import AnimatedSection from "@/components/ui/Animations";

const properties = [
    { location: "Thảo Điền, TP.HCM", name: "Biệt thự Ven Sông", price: "25.5 Tỷ", area: "450m²", hot: true },
    { location: "Quận 2, TP.HCM", name: "Căn hộ Cao cấp", price: "8.5 Tỷ", area: "120m²", hot: false },
];

export default function RealEstateSection() {
    return (
        <section
            className="py-24 bg-primary relative overflow-hidden"
            aria-labelledby="realestate-heading"
            id="real-estate"
        >
            {/* Background glow */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px]" aria-hidden="true" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">

                    {/* Content */}
                    <div className="lg:w-1/2">
                        <AnimatedSection animation="fade-in-right">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium mb-6">
                                <Building2 className="w-4 h-4" /> Bất động sản
                            </span>
                            <h2 id="realestate-heading" className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                                Đầu tư vào <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">Giá trị Thực</span>
                            </h2>
                            <p className="text-text-secondary text-lg mb-8 max-w-xl">
                                Tìm kiếm cơ hội sinh lời bền vững từ thị trường <strong className="text-white">bất động sản</strong> và các kênh đầu tư thay thế.
                            </p>
                            <Link
                                href="/blog/bat-dong-san"
                                className="inline-flex items-center gap-2 text-pink-400 font-bold hover:text-white transition-colors group"
                            >
                                Khám phá thị trường
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </AnimatedSection>
                    </div>

                    {/* Visual Widgets */}
                    <AnimatedSection className="lg:w-1/2 w-full" animation="fade-in-left">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Featured Property */}
                            <Link
                                href="/blog/bat-dong-san"
                                className="col-span-2 group relative bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] rounded-3xl p-6 hover:border-pink-500/30 hover:shadow-glow-pink transition-all overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <div>
                                        <div className="text-sm text-text-muted mb-1 flex items-center gap-1">
                                            <MapPin className="w-3 h-3" /> {properties[0].location}
                                        </div>
                                        <div className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">
                                            {properties[0].name}
                                        </div>
                                    </div>
                                    {properties[0].hot && (
                                        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 text-xs font-bold text-white">
                                            Hot
                                        </span>
                                    )}
                                </div>

                                {/* Image placeholder */}
                                <div className="h-32 rounded-2xl bg-gradient-to-br from-pink-900/30 to-purple-900/30 mb-4 border border-white/5 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600')] bg-cover bg-center opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
                                </div>

                                <div className="flex justify-between items-end relative z-10">
                                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">
                                        {properties[0].price}
                                    </div>
                                    <div className="text-sm text-text-secondary flex items-center gap-1">
                                        {properties[0].area}
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                            </Link>

                            {/* Category Cards */}
                            <Link
                                href="/blog/bat-dong-san"
                                className="group bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.05] rounded-2xl p-6 hover:border-blue-500/30 hover:shadow-glow-purple transition-all"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 p-0.5 mb-4">
                                    <div className="w-full h-full rounded-[10px] bg-primary flex items-center justify-center text-white">
                                        <Building2 className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">Căn hộ</div>
                                <p className="text-xs text-text-muted">Cao cấp & trung cấp</p>
                            </Link>

                            <Link
                                href="/blog/bat-dong-san"
                                className="group bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.05] rounded-2xl p-6 hover:border-purple-500/30 hover:shadow-glow-purple transition-all"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-orange-500 p-0.5 mb-4">
                                    <div className="w-full h-full rounded-[10px] bg-primary flex items-center justify-center text-white">
                                        <Factory className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className="text-lg font-bold text-white mb-1 group-hover:text-pink-400 transition-colors">Đất nền</div>
                                <p className="text-xs text-text-muted">Khu công nghiệp & ven đô</p>
                            </Link>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
