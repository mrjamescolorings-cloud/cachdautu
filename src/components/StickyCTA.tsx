"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, X, Rocket } from "lucide-react";

export default function StickyCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > window.innerHeight * 0.5);
        };

        window.addEventListener('scroll', handleScroll, true);
        return () => window.removeEventListener('scroll', handleScroll, true);
    }, []);

    if (isDismissed || !isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-2 sm:p-4 animate-fade-in-up">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-accent-blue to-accent-purple rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 sm:gap-4 shadow-2xl shadow-blue-500/20">
                <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                    <div className="hidden sm:flex w-10 h-10 rounded-xl bg-white/20 items-center justify-center flex-shrink-0">
                        <Rocket className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-white font-bold text-sm sm:text-base truncate">Sẵn sàng bắt đầu?</p>
                        <p className="text-white/70 text-xs sm:text-sm hidden sm:block">150+ bài phân tích chuyên sâu</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    <Link
                        href="/blog"
                        className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-white text-primary font-bold hover:bg-white/90 transition-all flex items-center gap-1 sm:gap-2 text-xs sm:text-sm whitespace-nowrap"
                    >
                        <span className="hidden xs:inline">Bắt đầu</span>
                        <span className="xs:hidden">GO</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Link>
                    <button
                        onClick={() => setIsDismissed(true)}
                        className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white flex-shrink-0"
                        aria-label="Đóng"
                    >
                        <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
