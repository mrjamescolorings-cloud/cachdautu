"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase, uploadImage, Category } from "@/lib/supabase";
import { ArrowLeft, Save, Image, Link2, X, Upload, Clock, Trash2, Eye } from "lucide-react";
import Link from "next/link";

export default function EditPostPage() {
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [showSchedule, setShowSchedule] = useState(false);
    const [form, setForm] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        category_id: "",
        tags: "",
        is_published: false,
        reading_time: "5 phút",
        featured_image: "",
        scheduled_at: ""
    });

    useEffect(() => {
        async function fetchData() {
            const [{ data: post }, { data: cats }] = await Promise.all([
                supabase.from('posts').select('*').eq('id', id).single(),
                supabase.from('categories').select('*')
            ]);

            if (post) {
                setForm({
                    title: post.title || "",
                    slug: post.slug || "",
                    excerpt: post.excerpt || "",
                    content: post.content || "",
                    category_id: post.category_id || "",
                    tags: (post.tags || []).join(', '),
                    is_published: post.is_published || false,
                    reading_time: post.reading_time || "5 phút",
                    featured_image: post.featured_image || "",
                    scheduled_at: post.scheduled_at ? new Date(post.scheduled_at).toISOString().slice(0, 16) : ""
                });
                if (post.scheduled_at) setShowSchedule(true);
            }
            setCategories(cats || []);
            setLoading(false);
        }
        fetchData();
    }, [id]);

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        const url = await uploadImage(file);
        setUploading(false);
        if (url) setForm({ ...form, featured_image: url });
        else alert("Lỗi upload ảnh");
    }

    function insertLink() {
        const url = prompt("Nhập URL:");
        const text = prompt("Nhập text:");
        if (url && text) setForm({ ...form, content: form.content + `[${text}](${url})` });
    }

    function insertImage() {
        const url = prompt("Nhập URL ảnh:");
        const alt = prompt("Mô tả:");
        if (url) setForm({ ...form, content: form.content + `![${alt || 'image'}](${url})\n` });
    }

    async function handleSubmit() {
        if (!form.title || !form.slug) { alert("Nhập tiêu đề"); return; }
        setSaving(true);
        const { error } = await supabase.from('posts').update({
            title: form.title,
            slug: form.slug,
            excerpt: form.excerpt,
            content: form.content,
            category_id: form.category_id || null,
            tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
            is_published: form.is_published,
            reading_time: form.reading_time,
            featured_image: form.featured_image || null,
            scheduled_at: form.scheduled_at ? new Date(form.scheduled_at).toISOString() : null,
            updated_at: new Date().toISOString()
        }).eq('id', id);
        setSaving(false);
        if (error) alert("Lỗi: " + error.message);
        else router.push('/admin/posts');
    }

    async function handleDelete() {
        if (!confirm('Xóa bài viết này?')) return;
        await supabase.from('posts').delete().eq('id', id);
        router.push('/admin/posts');
    }

    if (loading) return <div className="pt-12 lg:pt-0 text-center text-gray-500">Đang tải...</div>;

    return (
        <div className="pt-12 lg:pt-0 max-w-5xl">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/posts" className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa</h1>
                        <p className="text-gray-500 text-sm">{form.title.slice(0, 40)}...</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => window.open(`/blog/${form.slug}`, '_blank')} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500" title="Xem">
                        <Eye className="w-5 h-5" />
                    </button>
                    <button onClick={handleDelete} className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-500">
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề</label>
                        <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-lg focus:border-emerald-500 focus:outline-none" />

                        <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">URL</label>
                        <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 text-sm focus:border-emerald-500 focus:outline-none" />
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả ngắn</label>
                        <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2}
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:border-emerald-500 focus:outline-none resize-none" />
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-gray-700">Nội dung</label>
                            <div className="flex gap-1">
                                <button onClick={insertImage} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600"><Image className="w-4 h-4" /></button>
                                <button onClick={insertLink} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600"><Link2 className="w-4 h-4" /></button>
                            </div>
                        </div>
                        <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={18}
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:border-emerald-500 focus:outline-none resize-none font-mono text-sm" />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Ảnh đại diện</label>
                        {form.featured_image ? (
                            <div className="relative">
                                <img src={form.featured_image} alt="Featured" className="w-full aspect-video object-cover rounded-lg" />
                                <button onClick={() => setForm({ ...form, featured_image: "" })} className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow text-gray-500 hover:text-red-500">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center w-full aspect-video rounded-lg border-2 border-dashed border-gray-200 hover:border-emerald-400 cursor-pointer bg-gray-50">
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <span className="text-sm text-gray-500">{uploading ? 'Đang tải...' : 'Upload'}</span>
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                            </label>
                        )}
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Chuyên mục</label>
                        <select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 text-sm focus:border-emerald-500 focus:outline-none">
                            <option value="">Chọn chuyên mục</option>
                            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                        </select>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Tags</label>
                        <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 text-sm focus:border-emerald-500 focus:outline-none" />
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Clock className="w-4 h-4 text-purple-500" />Lên lịch
                            </label>
                            <button onClick={() => setShowSchedule(!showSchedule)} className={`w-10 h-6 rounded-full ${showSchedule ? 'bg-emerald-500' : 'bg-gray-200'}`}>
                                <span className={`block w-4 h-4 rounded-full bg-white shadow ${showSchedule ? 'translate-x-5' : 'translate-x-1'}`} />
                            </button>
                        </div>
                        {showSchedule && <input type="datetime-local" value={form.scheduled_at} onChange={(e) => setForm({ ...form, scheduled_at: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 text-sm focus:border-emerald-500 focus:outline-none" />}
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="w-5 h-5 rounded accent-emerald-500" />
                            <span className="text-gray-700 text-sm font-medium">Đã xuất bản</span>
                        </label>
                    </div>

                    <button onClick={handleSubmit} disabled={saving}
                        className="w-full py-3 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 shadow-sm">
                        <Save className="w-4 h-4" />{saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </button>
                </div>
            </div>
        </div>
    );
}
