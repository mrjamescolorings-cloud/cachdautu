"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase, Post } from "@/lib/supabase";
import { Plus, Search, Trash2, Edit } from "lucide-react";

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchPosts();
    }, []);

    async function fetchPosts() {
        setLoading(true);
        const { data } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });
        setPosts(data || []);
        setLoading(false);
    }

    async function deletePost(id: string) {
        if (!confirm('Bạn có chắc muốn xóa bài viết này?')) return;
        await supabase.from('posts').delete().eq('id', id);
        fetchPosts();
    }

    async function togglePublish(post: Post) {
        await supabase
            .from('posts')
            .update({ is_published: !post.is_published })
            .eq('id', post.id);
        fetchPosts();
    }

    const filtered = posts.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="pt-12 lg:pt-0">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Bài viết</h1>
                    <p className="text-gray-500 text-sm mt-1">{posts.length} bài viết</p>
                </div>
                <Link
                    href="/admin/posts/new"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 text-white font-medium text-sm hover:bg-emerald-600 transition-colors w-fit shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    Bài viết mới
                </Link>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Tìm kiếm bài viết..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                />
            </div>

            {/* Posts List */}
            {loading ? (
                <div className="text-center py-12 text-gray-500">Đang tải...</div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                    <p className="text-gray-500 mb-4">
                        {search ? 'Không tìm thấy bài viết' : 'Chưa có bài viết nào'}
                    </p>
                    {!search && (
                        <Link
                            href="/admin/posts/new"
                            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                        >
                            <Plus className="w-4 h-4" />
                            Tạo bài viết đầu tiên
                        </Link>
                    )}
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    {/* Table Header */}
                    <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-gray-50 text-xs text-gray-500 uppercase tracking-wider font-medium">
                        <div className="col-span-5">Tiêu đề</div>
                        <div className="col-span-2">Trạng thái</div>
                        <div className="col-span-3">Ngày tạo</div>
                        <div className="col-span-2 text-right">Hành động</div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-gray-100">
                        {filtered.map((post) => (
                            <div key={post.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 p-4 hover:bg-gray-50 transition-colors">
                                <div className="sm:col-span-5">
                                    <Link
                                        href={`/admin/posts/${post.id}`}
                                        className="font-medium text-gray-900 hover:text-emerald-600 transition-colors"
                                    >
                                        {post.title}
                                    </Link>
                                    <p className="text-xs text-gray-400 mt-1 truncate">{post.excerpt}</p>
                                </div>
                                <div className="sm:col-span-2 flex items-center">
                                    <button
                                        onClick={() => togglePublish(post)}
                                        className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${post.is_published
                                                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                                : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                            }`}
                                    >
                                        {post.is_published ? 'Đã xuất bản' : 'Nháp'}
                                    </button>
                                </div>
                                <div className="sm:col-span-3 flex items-center text-sm text-gray-500">
                                    {new Date(post.created_at).toLocaleDateString('vi-VN', {
                                        day: 'numeric', month: 'short', year: 'numeric'
                                    })}
                                </div>
                                <div className="sm:col-span-2 flex items-center justify-end gap-2">
                                    <Link
                                        href={`/admin/posts/${post.id}`}
                                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() => deletePost(post.id)}
                                        className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
