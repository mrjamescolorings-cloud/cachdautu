"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase, Post } from "@/lib/supabase";
import { FileText, FolderOpen, TrendingUp, Plus, Clock } from "lucide-react";

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
        { label: "Tổng bài viết", value: stats.posts, icon: FileText, color: "bg-blue-500" },
        { label: "Đã xuất bản", value: stats.published, icon: TrendingUp, color: "bg-emerald-500" },
        { label: "Chuyên mục", value: stats.categories, icon: FolderOpen, color: "bg-purple-500" },
    ];

    return (
        <div className="pt-12 lg:pt-0">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500 text-sm mt-1">Chào mừng đến Admin Panel</p>
                </div>
                <Link
                    href="/admin/posts/new"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 text-white font-medium text-sm hover:bg-emerald-600 transition-colors w-fit shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    Bài viết mới
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
                {statCards.map((stat, idx) => (
                    <div
                        key={idx}
                        className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 mb-1">
                            {loading ? "..." : stat.value}
                        </p>
                        <p className="text-gray-500 text-sm">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Posts */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Bài viết gần đây</h2>
                    <Link href="/admin/posts" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                        Xem tất cả →
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-8 text-gray-500">Đang tải...</div>
                ) : recentPosts.length === 0 ? (
                    <div className="text-center py-8">
                        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">Chưa có bài viết nào</p>
                        <Link
                            href="/admin/posts/new"
                            className="inline-flex items-center gap-2 mt-4 text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                        >
                            <Plus className="w-4 h-4" />
                            Tạo bài viết đầu tiên
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {recentPosts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/admin/posts/${post.id}`}
                                className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors group"
                            >
                                <div className="min-w-0 flex-1">
                                    <p className="text-gray-900 font-medium truncate group-hover:text-emerald-600 transition-colors">
                                        {post.title}
                                    </p>
                                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {new Date(post.created_at).toLocaleDateString('vi-VN')}
                                        </span>
                                    </div>
                                </div>
                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${post.is_published ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {post.is_published ? 'Đã xuất bản' : 'Nháp'}
                                </span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
