"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";

const navLinks = [
    { href: "/", label: "Trang chủ" },
    { href: "/about", label: "Giới thiệu" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Liên hệ" },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-2" : "py-4"}`}
        >
            <div
                className={`absolute inset-0 transition-all duration-300 ${isScrolled
                    ? "bg-primary/80 backdrop-blur-xl border-b border-white/5 shadow-lg"
                    : "bg-transparent border-transparent"
                    }`}
            />

            <div className="container mx-auto px-4 relative">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all group-hover:scale-105">
                            <Image
                                src="/logo.png"
                                alt="Cách Đầu Tư Logo"
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-200 transition-all">
                            Cách Đầu Tư
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-8" aria-label="Menu chính">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-text-secondary hover:text-white transition-colors relative group py-2"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href="/contact"
                            className="group relative px-6 py-2.5 rounded-full overflow-hidden shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all transform hover:-translate-y-0.5"
                        >
                            {/* Gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-100 group-hover:opacity-90 transition-opacity" />
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />

                            {/* Content */}
                            <span className="relative z-10 text-white font-medium text-sm flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Bắt đầu ngay
                            </span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-primary/95 backdrop-blur-xl border-b border-white/10 animate-fade-in shadow-2xl">
                    <div className="container px-4 py-8 flex flex-col gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-lg font-medium text-text-secondary hover:text-white transition-colors flex items-center justify-between group"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        ))}
                        <div className="h-px bg-white/10 my-2" />
                        <Link
                            href="/contact"
                            className="text-center py-3 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold shadow-lg shadow-purple-500/25"
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
