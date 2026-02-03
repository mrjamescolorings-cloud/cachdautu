"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase, uploadImage, Category } from "@/lib/supabase";
import { ArrowLeft, Save, Send, Image, Link2, Calendar, X, Upload, Clock } from "lucide-react";
import Link from "next/link";

export default function NewPostPage() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
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
        reading_time: "5 phút",
        featured_image: "",
        scheduled_at: ""
    });

    useEffect(() => {
        supabase.from('categories').select('*').then(({ data }) => {
            setCategories(data || []);
        });
    }, []);

    function generateSlug(title: string) {
        return title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    }

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const url = await uploadImage(file);
        setUploading(false);

        if (url) {
            setForm({ ...form, featured_image: url });
        } else {
            alert("Lỗi upload ảnh. Hãy đảm bảo đã tạo bucket 'images' trong Supabase Storage.");
        }
    }

    function insertLink() {
        const url = prompt("Nhập URL:");
        const text = prompt("Nhập text hiển thị:");
        if (url && text) {
            setForm({ ...form, content: form.content + `[${text}](${url})` });
        }
    }

    function insertImage() {
        const url = prompt("Nhập URL ảnh:");
        const alt = prompt("Mô tả ảnh:");
        if (url) {
            setForm({ ...form, content: form.content + `![${alt || 'image'}](${url})\n` });
        }
    }

    async function handleSubmit(publish: boolean) {
        if (!form.title || !form.slug) {
            alert("Vui lòng nhập tiêu đề");
            return;
        }

        setSaving(true);
        const postData = {
            title: form.title,
            slug: form.slug,
            excerpt: form.excerpt,
            content: form.content,
            category_id: form.category_id || null,
            tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
            reading_time: form.reading_time,
            featured_image: form.featured_image || null,
            scheduled_at: form.scheduled_at ? new Date(form.scheduled_at).toISOString() : null,
            is_published: publish && !form.scheduled_at,
        };

        const { error } = await supabase.from('posts').insert(postData);
        setSaving(false);

        if (error) {
            alert("Lỗi: " + error.message);
        } else {
            router.push('/admin/posts');
        }
    }

    return (
        <div className="pt-12 lg:pt-0 max-w-5xl">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/posts"
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Bài viết mới</h1>
                    <p className="text-gray-500 text-sm mt-1">Tạo nội dung mới</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Title */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề *</label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({
                                ...form,
                                title: e.target.value,
                                slug: generateSlug(e.target.value)
                            })}
                            placeholder="Nhập tiêu đề bài viết"
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-lg placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                        />

                        <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">URL</label>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-400 text-sm">/blog/</span>
                            <input
                                type="text"
                                value={form.slug}
                                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                                className="flex-1 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 text-sm focus:border-emerald-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Excerpt */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả ngắn (SEO)</label>
                        <textarea
                            value={form.excerpt}
                            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                            placeholder="Mô tả ngắn sẽ hiển thị trên Google..."
                            rows={2}
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none resize-none"
                        />
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-gray-700">Nội dung (Markdown)</label>
                            <div className="flex gap-1">
                                <button
                                    type="button"
                                    onClick={insertImage}
                                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                                    title="Chèn ảnh"
                                >
                                    <Image className="w-4 h-4" />
                                </button>
                                <button
                                    type="button"
                                    onClick={insertLink}
                                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                                    title="Chèn link"
                                >
                                    <Link2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <textarea
                            value={form.content}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                            placeholder="Viết nội dung bài viết...

## Heading 2
### Heading 3

**Bold** và *italic*

- Bullet point
1. Numbered list

[Link](https://...)
![Image](https://...)"
                            rows={18}
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none resize-none font-mono text-sm"
                        />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Featured Image */}
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Ảnh đại diện</label>
                        {form.featured_image ? (
                            <div className="relative">
                                <img
                                    src={form.featured_image}
                                    alt="Featured"
                                    className="w-full aspect-video object-cover rounded-lg"
                                />
                                <button
                                    onClick={() => setForm({ ...form, featured_image: "" })}
                                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow text-gray-500 hover:text-red-500 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center w-full aspect-video rounded-lg border-2 border-dashed border-gray-200 hover:border-emerald-400 cursor-pointer transition-colors bg-gray-50">
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <span className="text-sm text-gray-500">
                                    {uploading ? 'Đang tải...' : 'Click để upload'}
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    disabled={uploading}
                                />
                            </label>
                        )}
                    </div>

                    {/* Category */}
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Chuyên mục</label>
                        <select
                            value={form.category_id}
                            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 text-sm focus:border-emerald-500 focus:outline-none"
                        >
                            <option value="">Chọn chuyên mục</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Tags */}
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Tags</label>
                        <input
                            type="text"
                            value={form.tags}
                            onChange={(e) => setForm({ ...form, tags: e.target.value })}
                            placeholder="crypto, bitcoin, ..."
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 text-sm focus:border-emerald-500 focus:outline-none placeholder-gray-400"
                        />
                        <p className="text-xs text-gray-400 mt-2">Phân cách bằng dấu phẩy</p>
                    </div>

                    {/* Schedule */}
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Clock className="w-4 h-4 text-purple-500" />
                                Lên lịch
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowSchedule(!showSchedule)}
                                className={`w-10 h-6 rounded-full transition-colors ${showSchedule ? 'bg-emerald-500' : 'bg-gray-200'}`}
                            >
                                <span className={`block w-4 h-4 rounded-full bg-white shadow transition-transform ${showSchedule ? 'translate-x-5' : 'translate-x-1'}`} />
                            </button>
                        </div>
                        {showSchedule && (
                            <input
                                type="datetime-local"
                                value={form.scheduled_at}
                                onChange={(e) => setForm({ ...form, scheduled_at: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 text-sm focus:border-emerald-500 focus:outline-none"
                            />
                        )}
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                        <button
                            onClick={() => handleSubmit(false)}
                            disabled={saving}
                            className="w-full py-3 rounded-lg bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            Lưu nháp
                        </button>
                        <button
                            onClick={() => handleSubmit(true)}
                            disabled={saving}
                            className="w-full py-3 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 shadow-sm"
                        >
                            {form.scheduled_at ? (
                                <>
                                    <Calendar className="w-4 h-4" />
                                    Lên lịch
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" />
                                    Xuất bản ngay
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
