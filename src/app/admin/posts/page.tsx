"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase, Post, Category } from "@/lib/supabase";
import {
    Plus,
    Search,
    Trash2,
    Eye,
    Edit3,
    FileText,
    Filter,
    MoreHorizontal,
    Check,
    X,
    Clock,
    ChevronDown
} from "lucide-react";

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
    const [selectedPosts, setSelectedPosts] = useState<string[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setLoading(true);
        const [postsRes, catsRes] = await Promise.all([
            supabase.from('posts').select('*').order('created_at', { ascending: false }),
            supabase.from('categories').select('*')
        ]);
        setPosts(postsRes.data || []);
        setCategories(catsRes.data || []);
        setLoading(false);
    }

    async function togglePublish(post: Post) {
        await supabase.from('posts').update({ is_published: !post.is_published }).eq('id', post.id);
        fetchData();
    }

    async function deletePost(id: string) {
        if (!confirm('Xóa bài viết này?')) return;
        await supabase.from('posts').delete().eq('id', id);
        fetchData();
    }

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === "all" ||
            (filterStatus === "published" && post.is_published) ||
            (filterStatus === "draft" && !post.is_published);
        return matchesSearch && matchesFilter;
    });

    const getCategoryName = (categoryId: string) => {
        const cat = categories.find(c => c.id === categoryId);
        return cat?.name || 'Không có';
    };

    const toggleSelectPost = (id: string) => {
        setSelectedPosts(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedPosts.length === filteredPosts.length) {
            setSelectedPosts([]);
        } else {
            setSelectedPosts(filteredPosts.map(p => p.id));
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Bài viết</h1>
                    <p className="text-gray-500 text-sm mt-0.5">{posts.length} bài viết</p>
                </div>
                <Link
                    href="/admin/posts/new"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-white font-medium text-sm hover:bg-gray-800 transition-all hover:shadow-lg hover:shadow-gray-900/20 w-fit"
                >
                    <Plus className="w-4 h-4" />
                    Bài viết mới
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm bài viết..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-300 focus:bg-white transition-all"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="flex gap-2">
                        {[
                            { key: "all", label: "Tất cả" },
                            { key: "published", label: "Đã xuất bản" },
                            { key: "draft", label: "Nháp" }
                        ].map(filter => (
                            <button
                                key={filter.key}
                                onClick={() => setFilterStatus(filter.key as typeof filterStatus)}
                                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${filterStatus === filter.key
                                        ? 'bg-gray-900 text-white'
                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Posts Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-8">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="flex items-center gap-4 py-4 border-b border-gray-50 last:border-0">
                                <div className="w-5 h-5 bg-gray-100 rounded animate-pulse" />
                                <div className="w-14 h-14 bg-gray-100 rounded-lg animate-pulse" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-100 rounded w-1/2 animate-pulse" />
                                    <div className="h-3 bg-gray-100 rounded w-1/4 animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <div className="p-16 text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-10 h-10 text-gray-400" />
                        </div>
                        <p className="text-gray-900 font-medium mb-1">Không có bài viết nào</p>
                        <p className="text-gray-500 text-sm mb-6">Bắt đầu tạo bài viết đầu tiên của bạn</p>
                        <Link
                            href="/admin/posts/new"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-white font-medium text-sm hover:bg-gray-800 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Tạo bài viết
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="col-span-1 flex items-center">
                                <button onClick={toggleSelectAll} className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors">
                                    {selectedPosts.length === filteredPosts.length && filteredPosts.length > 0 && (
                                        <Check className="w-3 h-3 text-gray-600" />
                                    )}
                                </button>
                            </div>
                            <div className="col-span-5 sm:col-span-4">Tiêu đề</div>
                            <div className="col-span-2 hidden sm:block">Chuyên mục</div>
                            <div className="col-span-2">Trạng thái</div>
                            <div className="col-span-2 hidden sm:block">Ngày tạo</div>
                            <div className="col-span-1"></div>
                        </div>

                        {/* Table Body */}
                        <div className="divide-y divide-gray-100">
                            {filteredPosts.map((post) => (
                                <div
                                    key={post.id}
                                    className={`grid grid-cols-12 gap-4 px-5 py-4 items-center hover:bg-gray-50 transition-colors ${selectedPosts.includes(post.id) ? 'bg-blue-50/50' : ''
                                        }`}
                                >
                                    {/* Checkbox */}
                                    <div className="col-span-1">
                                        <button
                                            onClick={() => toggleSelectPost(post.id)}
                                            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedPosts.includes(post.id)
                                                    ? 'bg-gray-900 border-gray-900'
                                                    : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                        >
                                            {selectedPosts.includes(post.id) && (
                                                <Check className="w-3 h-3 text-white" />
                                            )}
                                        </button>
                                    </div>

                                    {/* Title & Image */}
                                    <div className="col-span-5 sm:col-span-4 flex items-center gap-3 min-w-0">
                                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                                            {post.featured_image ? (
                                                <img src={post.featured_image} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <FileText className="w-5 h-5 text-gray-400" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <Link
                                                href={`/admin/posts/${post.id}`}
                                                className="text-gray-900 font-medium text-sm truncate block hover:text-emerald-600 transition-colors"
                                            >
                                                {post.title}
                                            </Link>
                                            <p className="text-gray-400 text-xs truncate mt-0.5">/{post.slug}</p>
                                        </div>
                                    </div>

                                    {/* Category */}
                                    <div className="col-span-2 hidden sm:block">
                                        <span className="text-sm text-gray-600">{getCategoryName(post.category_id)}</span>
                                    </div>

                                    {/* Status */}
                                    <div className="col-span-2">
                                        <button
                                            onClick={() => togglePublish(post)}
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${post.is_published
                                                    ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                                    : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                                                }`}
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full ${post.is_published ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                            {post.is_published ? 'Xuất bản' : 'Nháp'}
                                        </button>
                                    </div>

                                    {/* Date */}
                                    <div className="col-span-2 hidden sm:flex items-center gap-1.5 text-gray-500 text-sm">
                                        <Clock className="w-3.5 h-3.5" />
                                        {new Date(post.created_at).toLocaleDateString('vi-VN')}
                                    </div>

                                    {/* Actions */}
                                    <div className="col-span-1 flex items-center justify-end gap-1">
                                        <Link
                                            href={`/bai-viet/${post.slug}`}
                                            target="_blank"
                                            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                        <Link
                                            href={`/admin/posts/${post.id}`}
                                            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => deletePost(post.id)}
                                            className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Bulk Actions */}
            {selectedPosts.length > 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:left-[calc(50%+130px)] bg-gray-900 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-4 z-50">
                    <span className="text-sm">{selectedPosts.length} bài viết đã chọn</span>
                    <div className="w-px h-5 bg-gray-700" />
                    <button
                        onClick={() => setSelectedPosts([])}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        Bỏ chọn
                    </button>
                    <button className="text-sm text-red-400 hover:text-red-300 transition-colors">
                        Xóa
                    </button>
                </div>
            )}
        </div>
    );
}
