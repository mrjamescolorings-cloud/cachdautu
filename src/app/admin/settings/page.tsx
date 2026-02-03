"use client";

import { useState } from "react";
import { Save, Globe, Mail, Share2 } from "lucide-react";

export default function SettingsPage() {
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState({
        siteName: "Cách Đầu Tư",
        siteDescription: "Nền tảng kiến thức đầu tư hàng đầu Việt Nam",
        contactEmail: "contact@cachdautu.com",
        facebook: "",
        youtube: "",
        telegram: "",
    });

    async function handleSave() {
        setSaving(true);
        await new Promise(r => setTimeout(r, 500));
        setSaving(false);
        alert("Đã lưu cài đặt!");
    }

    return (
        <div className="pt-12 lg:pt-0 max-w-2xl">
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Cài đặt</h1>
                <p className="text-gray-500 text-sm mt-1">Cấu hình website</p>
            </div>

            <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Globe className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="font-bold text-gray-900">Thông tin chung</h2>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-2">Tên website</label>
                            <input type="text" value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:border-emerald-500 focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-2">Mô tả</label>
                            <textarea value={settings.siteDescription} onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })} rows={3}
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:border-emerald-500 focus:outline-none resize-none" />
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                            <Mail className="w-5 h-5 text-purple-600" />
                        </div>
                        <h2 className="font-bold text-gray-900">Liên hệ</h2>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-2">Email liên hệ</label>
                        <input type="email" value={settings.contactEmail} onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:border-emerald-500 focus:outline-none" />
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                            <Share2 className="w-5 h-5 text-emerald-600" />
                        </div>
                        <h2 className="font-bold text-gray-900">Mạng xã hội</h2>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-2">Facebook</label>
                            <input type="url" value={settings.facebook} onChange={(e) => setSettings({ ...settings, facebook: e.target.value })} placeholder="https://facebook.com/..."
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-2">YouTube</label>
                            <input type="url" value={settings.youtube} onChange={(e) => setSettings({ ...settings, youtube: e.target.value })} placeholder="https://youtube.com/..."
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-2">Telegram</label>
                            <input type="url" value={settings.telegram} onChange={(e) => setSettings({ ...settings, telegram: e.target.value })} placeholder="https://t.me/..."
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none" />
                        </div>
                    </div>
                </div>

                <button onClick={handleSave} disabled={saving}
                    className="w-full py-3 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 shadow-sm">
                    <Save className="w-4 h-4" />{saving ? 'Đang lưu...' : 'Lưu cài đặt'}
                </button>
            </div>
        </div>
    );
}
