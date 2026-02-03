"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, FolderOpen, Settings, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Bài viết", href: "/admin/posts", icon: FileText },
    { name: "Chuyên mục", href: "/admin/categories", icon: FolderOpen },
    { name: "Cài đặt", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white border border-gray-200 shadow-sm"
            >
                {isOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/20 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed left-0 top-0 h-full w-64 bg-gray-900 z-50 transform transition-transform lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Logo */}
                <div className="p-6 border-b border-gray-800">
                    <Link href="/admin" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">C</span>
                        </div>
                        <div>
                            <p className="font-bold text-white">Cách Đầu Tư</p>
                            <p className="text-xs text-gray-400">Admin Panel</p>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                        ? 'bg-emerald-500 text-white'
                                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        Về trang chủ
                    </Link>
                </div>
            </aside>
        </>
    );
}
