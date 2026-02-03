"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

const navLinks = [
    { href: "/", label: "Trang chủ" },
    { href: "/about", label: "Giới thiệu" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Liên hệ" },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
            <div className="absolute inset-0 bg-primary/80 backdrop-blur-xl border-b border-white/5" />

            <div className="container mx-auto px-4 relative">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-xl shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all">
                            C
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">Cách Đầu Tư</span>
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-8" aria-label="Menu chính">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-text-secondary hover:text-white transition-colors relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href="/contact"
                            className="group relative px-6 py-2.5 rounded-full overflow-hidden"
                        >
                            {/* Gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-100 group-hover:opacity-90 transition-opacity" />
                            {/* Content */}
                            <span className="relative z-10 text-white font-medium text-sm flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Bắt đầu ngay
                            </span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-primary/95 backdrop-blur-xl border-b border-white/10 animate-fade-in">
                    <div className="container px-4 py-8 flex flex-col gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-lg font-medium text-text-secondary hover:text-white transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="text-center py-3 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Bắt đầu ngay
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
