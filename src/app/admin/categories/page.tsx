"use client";

import { useEffect, useState } from "react";
import { supabase, Category } from "@/lib/supabase";
import { Plus, Trash2, Edit, FolderOpen, X, Check } from "lucide-react";

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

    return (
        <div className="pt-12 lg:pt-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Chuyên mục</h1>
                    <p className="text-gray-500 text-sm mt-1">{categories.length} chuyên mục</p>
                </div>
                {!showForm && (
                    <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 text-white font-medium text-sm hover:bg-emerald-600 transition-colors w-fit shadow-sm">
                        <Plus className="w-4 h-4" />Thêm mới
                    </button>
                )}
            </div>

            {showForm && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4">{editingId ? 'Chỉnh sửa' : 'Thêm chuyên mục'}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Tên *</label>
                            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: generateSlug(e.target.value) })} placeholder="Chứng khoán"
                                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 text-sm focus:border-emerald-500 focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Slug</label>
                            <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="chung-khoan"
                                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 text-sm focus:border-emerald-500 focus:outline-none" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-xs text-gray-500 mb-1">Mô tả</label>
                            <input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Phân tích chứng khoán"
                                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 text-sm focus:border-emerald-500 focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Icon (emoji)</label>
                            <input type="text" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="📈"
                                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 text-sm focus:border-emerald-500 focus:outline-none" />
                        </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                        <button onClick={handleSubmit} className="px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 flex items-center gap-2">
                            <Check className="w-4 h-4" />{editingId ? 'Cập nhật' : 'Thêm'}
                        </button>
                        <button onClick={cancelForm} className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm hover:bg-gray-200 flex items-center gap-2">
                            <X className="w-4 h-4" />Hủy
                        </button>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="text-center py-12 text-gray-500">Đang tải...</div>
            ) : categories.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                    <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 mb-4">Chưa có chuyên mục</p>
                    <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                        <Plus className="w-4 h-4" />Tạo chuyên mục đầu tiên
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((cat) => (
                        <div key={cat.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-emerald-300 transition-colors group shadow-sm">
                            <div className="flex items-start justify-between mb-3">
                                <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center text-2xl">{cat.icon || '📁'}</div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => startEdit(cat)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700"><Edit className="w-4 h-4" /></button>
                                    <button onClick={() => deleteCategory(cat.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1">{cat.name}</h3>
                            <p className="text-xs text-gray-400 mb-2">/{cat.slug}</p>
                            {cat.description && <p className="text-sm text-gray-500">{cat.description}</p>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
