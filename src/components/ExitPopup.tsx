"use client";

import { useState, useEffect } from "react";
import { X, Gift, Mail, Download } from "lucide-react";

export default function ExitPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !isDismissed) {
                setIsVisible(true);
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [isDismissed]);

    const dismiss = () => {
        setIsVisible(false);
        setIsDismissed(true);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={dismiss} />

            {/* Modal */}
            <div className="relative bg-primary-light border border-primary-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-md w-full animate-scale-in shadow-2xl">
                <button
                    onClick={dismiss}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-text-muted hover:text-white"
                    aria-label="Đóng"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center">
                    {/* Icon */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center mb-5 sm:mb-6">
                        <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                        Khoan đã!
                    </h3>

                    <p className="text-text-secondary text-sm sm:text-base mb-5 sm:mb-6 leading-relaxed">
                        Nhận ngay <span className="text-accent-blue font-semibold">Ebook miễn phí</span>:
                        <br className="hidden sm:block" />
                        "10 Sai lầm Đầu tư Phổ biến và Cách Tránh"
                    </p>

                    <form className="space-y-3 sm:space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-text-muted" />
                            <input
                                type="email"
                                placeholder="Email của bạn"
                                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm sm:text-base placeholder-text-muted focus:border-accent-blue focus:outline-none transition-colors"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 sm:py-4 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white font-bold text-sm sm:text-base hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        >
                            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                            Nhận Ebook ngay
                        </button>
                    </form>

                    <p className="text-xs text-text-muted mt-3 sm:mt-4">
                        Chúng tôi tôn trọng quyền riêng tư của bạn.
                    </p>
                </div>
            </div>
        </div>
    );
}
