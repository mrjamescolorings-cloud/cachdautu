"use client";

import { useEffect, useState } from "react";
import { supabase, Category } from "@/lib/supabase";
import { Plus, Trash2, Edit3, FolderOpen, X, Check, Sparkles } from "lucide-react";

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState({ name: "", slug: "", description: "", icon: "" });

    useEffect(() => { fetchCategories(); }, []);

    async function fetchCategories() {
        setLoading(true);
        const { data } = await supabase.from('categories').select('*').order('name');
        setCategories(data || []);
        setLoading(false);
    }

    function generateSlug(name: string) {
        return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    }

    async function handleSubmit() {
        if (!form.name || !form.slug) { alert("Nhập tên chuyên mục"); return; }
        if (editingId) await supabase.from('categories').update(form).eq('id', editingId);
        else await supabase.from('categories').insert(form);
        setForm({ name: "", slug: "", description: "", icon: "" });
        setShowForm(false);
        setEditingId(null);
        fetchCategories();
    }

    function startEdit(cat: Category) {
        setForm({ name: cat.name, slug: cat.slug, description: cat.description || "", icon: cat.icon || "" });
        setEditingId(cat.id);
        setShowForm(true);
    }

    async function deleteCategory(id: string) {
        if (!confirm('Xóa chuyên mục này?')) return;
        await supabase.from('categories').delete().eq('id', id);
        fetchCategories();
    }

    function cancelForm() {
        setForm({ name: "", slug: "", description: "", icon: "" });
        setShowForm(false);
        setEditingId(null);
    }

    const emojiOptions = ["📈", "💰", "🏠", "🪙", "📊", "💳", "🎯", "💎", "🌍", "🔐"];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Chuyên mục</h1>
                    <p className="text-gray-500 text-sm mt-0.5">{categories.length} chuyên mục</p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-white font-medium text-sm hover:bg-gray-800 transition-all hover:shadow-lg hover:shadow-gray-900/20 w-fit"
                    >
                        <Plus className="w-4 h-4" />
                        Thêm chuyên mục
                    </button>
                )}
            </div>

            {/* Add/Edit Form */}
            {showForm && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">{editingId ? 'Chỉnh sửa chuyên mục' : 'Thêm chuyên mục mới'}</h3>
                        <button onClick={cancelForm} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="p-6 space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tên chuyên mục *</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value, slug: generateSlug(e.target.value) })}
                                    placeholder="VD: Chứng khoán"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:border-gray-300 focus:bg-white focus:outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                                <input
                                    type="text"
                                    value={form.slug}
                                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                                    placeholder="chung-khoan"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:border-gray-300 focus:bg-white focus:outline-none transition-all"
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                                <input
                                    type="text"
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    placeholder="Kiến thức về đầu tư chứng khoán"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:border-gray-300 focus:bg-white focus:outline-none transition-all"
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="text"
                                        value={form.icon}
                                        onChange={(e) => setForm({ ...form, icon: e.target.value })}
                                        placeholder="📈"
                                        className="w-24 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm text-center focus:border-gray-300 focus:bg-white focus:outline-none transition-all text-xl"
                                    />
                                    <div className="flex gap-1.5 flex-wrap">
                                        {emojiOptions.map(emoji => (
                                            <button
                                                key={emoji}
                                                type="button"
                                                onClick={() => setForm({ ...form, icon: emoji })}
                                                className={`w-10 h-10 rounded-lg text-lg flex items-center justify-center transition-all ${form.icon === emoji ? 'bg-gray-900 shadow-lg' : 'bg-gray-100 hover:bg-gray-200'}`}
                                            >
                                                {emoji}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={handleSubmit}
                                className="px-6 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
                            >
                                <Check className="w-4 h-4" />
                                {editingId ? 'Cập nhật' : 'Thêm mới'}
                            </button>
                            <button
                                onClick={cancelForm}
                                className="px-6 py-2.5 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition-colors"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Categories Grid */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 animate-pulse">
                            <div className="w-14 h-14 bg-gray-100 rounded-xl mb-4" />
                            <div className="h-5 bg-gray-100 rounded w-2/3 mb-2" />
                            <div className="h-4 bg-gray-100 rounded w-1/3" />
                        </div>
                    ))}
                </div>
            ) : categories.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <FolderOpen className="w-10 h-10 text-gray-400" />
                    </div>
                    <p className="text-gray-900 font-medium mb-1">Chưa có chuyên mục nào</p>
                    <p className="text-gray-500 text-sm mb-6">Tạo chuyên mục đầu tiên để phân loại bài viết</p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-white font-medium text-sm hover:bg-gray-800 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Thêm chuyên mục
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-2xl shadow-sm">
                                    {cat.icon || '📁'}
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => startEdit(cat)}
                                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => deleteCategory(cat.id)}
                                        className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">{cat.name}</h3>
                            <p className="text-xs text-gray-400 mb-2 font-mono">/{cat.slug}</p>
                            {cat.description && (
                                <p className="text-sm text-gray-500 line-clamp-2">{cat.description}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
