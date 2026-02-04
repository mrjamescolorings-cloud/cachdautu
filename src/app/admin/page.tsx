"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase, Post } from "@/lib/supabase";
import {
    FileText,
    FolderOpen,
    TrendingUp,
    Plus,
    Clock,
    ArrowUpRight,
    Eye,
    Edit3,
    MoreHorizontal
} from "lucide-react";

interface Stats {
    posts: number;
    categories: number;
    published: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({ posts: 0, categories: 0, published: 0 });
    const [recentPosts, setRecentPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const { count: postsCount } = await supabase.from('posts').select('*', { count: 'exact', head: true });
                const { count: catsCount } = await supabase.from('categories').select('*', { count: 'exact', head: true });
                const { count: pubCount } = await supabase.from('posts').select('*', { count: 'exact', head: true }).eq('is_published', true);

                setStats({
                    posts: postsCount || 0,
                    categories: catsCount || 0,
                    published: pubCount || 0,
                });

                const { data: posts } = await supabase
                    .from('posts')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(5);

                setRecentPosts(posts || []);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const statCards = [
        {
            label: "Tổng bài viết",
            value: stats.posts,
            icon: FileText,
            color: "bg-blue-500",
            bgLight: "bg-blue-50",
            trend: "+12%",
            trendUp: true
        },
        {
            label: "Đã xuất bản",
            value: stats.published,
            icon: TrendingUp,
            color: "bg-emerald-500",
            bgLight: "bg-emerald-50",
            trend: "+8%",
            trendUp: true
        },
        {
            label: "Chuyên mục",
            value: stats.categories,
            icon: FolderOpen,
            color: "bg-purple-500",
            bgLight: "bg-purple-50",
            trend: "0%",
            trendUp: false
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tổng quan</h1>
                    <p className="text-gray-500 text-sm mt-0.5">Chào mừng trở lại! Đây là tình hình website hôm nay.</p>
                </div>
                <Link
                    href="/admin/posts/new"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-white font-medium text-sm hover:bg-gray-800 transition-all hover:shadow-lg hover:shadow-gray-900/20 w-fit"
                >
                    <Plus className="w-4 h-4" />
                    Bài viết mới
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {statCards.map((stat, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-11 h-11 rounded-xl ${stat.bgLight} flex items-center justify-center`}>
                                <stat.icon className={`w-5 h-5 ${stat.color.replace('bg-', 'text-')}`} />
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
                                {stat.trend}
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 mb-1">
                            {loading ? (
                                <span className="inline-block w-12 h-8 bg-gray-100 rounded animate-pulse" />
                            ) : (
                                stat.value
                            )}
                        </p>
                        <p className="text-gray-500 text-sm">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Posts - Takes 2 columns */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between p-5 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-900">Bài viết gần đây</h2>
                        <Link href="/admin/posts" className="text-sm text-gray-500 hover:text-gray-900 font-medium flex items-center gap-1 transition-colors">
                            Xem tất cả
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="p-5 space-y-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center gap-4 p-3 rounded-xl">
                                    <div className="w-12 h-12 bg-gray-100 rounded-lg animate-pulse" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse" />
                                        <div className="h-3 bg-gray-100 rounded w-1/4 animate-pulse" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : recentPosts.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500 mb-4">Chưa có bài viết nào</p>
                            <Link
                                href="/admin/posts/new"
                                className="inline-flex items-center gap-2 text-gray-900 hover:text-emerald-600 text-sm font-medium transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Tạo bài viết đầu tiên
                            </Link>
                        </div>
                    ) : (
                        <div className="p-3">
                            {recentPosts.map((post) => (
                                <div
                                    key={post.id}
                                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                        {post.featured_image ? (
                                            <img src={post.featured_image} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <FileText className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-gray-900 font-medium truncate text-sm group-hover:text-emerald-600 transition-colors">
                                            {post.title}
                                        </p>
                                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {new Date(post.created_at).toLocaleDateString('vi-VN')}
                                            </span>
                                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${post.is_published ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                                {post.is_published ? 'Xuất bản' : 'Nháp'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link href={`/bai-viet/${post.slug}`} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                        <Link href={`/admin/posts/${post.id}`} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                                            <Edit3 className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Actions - Takes 1 column */}
                <div className="space-y-4">
                    {/* Quick Actions Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                        <h3 className="font-semibold text-gray-900 mb-4">Thao tác nhanh</h3>
                        <div className="space-y-2">
                            <Link href="/admin/posts/new" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                                <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center">
                                    <Plus className="w-4 h-4 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">Tạo bài viết</p>
                                    <p className="text-xs text-gray-400">Viết bài mới</p>
                                </div>
                            </Link>
                            <Link href="/admin/categories" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                                <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center">
                                    <FolderOpen className="w-4 h-4 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 group-hover:text-purple-600 transition-colors">Quản lý chuyên mục</p>
                                    <p className="text-xs text-gray-400">Thêm, sửa, xóa</p>
                                </div>
                            </Link>
                            <Link href="/" target="_blank" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                                <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <Eye className="w-4 h-4 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">Xem trang chủ</p>
                                    <p className="text-xs text-gray-400">Mở trong tab mới</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Tips Card */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 text-white">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold mb-2">Mẹo SEO</h3>
                        <p className="text-sm text-gray-300 mb-4">Viết tiêu đề hấp dẫn và mô tả meta độc đáo để tăng thứ hạng tìm kiếm.</p>
                        <Link href="#" className="text-sm text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors">
                            Tìm hiểu thêm
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
