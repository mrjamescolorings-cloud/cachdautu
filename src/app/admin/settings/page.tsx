"use client";

import { useState } from "react";
import { Save, Globe, Mail, Share2, Check, Bell, Palette } from "lucide-react";

export default function SettingsPage() {
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
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
        await new Promise(r => setTimeout(r, 800));
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    }

    interface SettingsSectionProps {
        icon: React.ReactNode;
        title: string;
        description: string;
        children: React.ReactNode;
        color: string;
    }

    const SettingsSection = ({ icon, title, description, children, color }: SettingsSectionProps) => (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
                    {icon}
                </div>
                <div>
                    <h2 className="font-semibold text-gray-900">{title}</h2>
                    <p className="text-sm text-gray-500">{description}</p>
                </div>
            </div>
            <div className="p-6 space-y-5">
                {children}
            </div>
        </div>
    );

    const InputField = ({ label, type = "text", value, onChange, placeholder }: {
        label: string;
        type?: string;
        value: string;
        onChange: (value: string) => void;
        placeholder?: string;
    }) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:border-gray-300 focus:bg-white focus:outline-none transition-all placeholder-gray-400"
            />
        </div>
    );

    return (
        <div className="space-y-6 max-w-3xl">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Cài đặt</h1>
                <p className="text-gray-500 text-sm mt-0.5">Quản lý cấu hình website của bạn</p>
            </div>

            {/* General Settings */}
            <SettingsSection
                icon={<Globe className="w-5 h-5 text-blue-600" />}
                title="Thông tin chung"
                description="Cấu hình cơ bản của website"
                color="bg-blue-50"
            >
                <InputField
                    label="Tên website"
                    value={settings.siteName}
                    onChange={(value) => setSettings({ ...settings, siteName: value })}
                />
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                    <textarea
                        value={settings.siteDescription}
                        onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:border-gray-300 focus:bg-white focus:outline-none resize-none transition-all"
                    />
                </div>
            </SettingsSection>

            {/* Contact Settings */}
            <SettingsSection
                icon={<Mail className="w-5 h-5 text-purple-600" />}
                title="Liên hệ"
                description="Thông tin liên hệ hiển thị trên website"
                color="bg-purple-50"
            >
                <InputField
                    label="Email liên hệ"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(value) => setSettings({ ...settings, contactEmail: value })}
                />
            </SettingsSection>

            {/* Social Media */}
            <SettingsSection
                icon={<Share2 className="w-5 h-5 text-emerald-600" />}
                title="Mạng xã hội"
                description="Liên kết đến các kênh social media"
                color="bg-emerald-50"
            >
                <InputField
                    label="Facebook"
                    value={settings.facebook}
                    onChange={(value) => setSettings({ ...settings, facebook: value })}
                    placeholder="https://facebook.com/cachdautu"
                />
                <InputField
                    label="YouTube"
                    value={settings.youtube}
                    onChange={(value) => setSettings({ ...settings, youtube: value })}
                    placeholder="https://youtube.com/@cachdautu"
                />
                <InputField
                    label="Telegram"
                    value={settings.telegram}
                    onChange={(value) => setSettings({ ...settings, telegram: value })}
                    placeholder="https://t.me/cachdautu"
                />
            </SettingsSection>

            {/* Save Button */}
            <div className="sticky bottom-6 flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className={`px-6 py-3 rounded-xl font-medium text-sm flex items-center gap-2 transition-all shadow-lg ${saved
                            ? 'bg-emerald-500 text-white shadow-emerald-500/25'
                            : 'bg-gray-900 text-white hover:bg-gray-800 shadow-gray-900/20 hover:shadow-gray-900/30'
                        }`}
                >
                    {saving ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Đang lưu...
                        </>
                    ) : saved ? (
                        <>
                            <Check className="w-4 h-4" />
                            Đã lưu!
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4" />
                            Lưu thay đổi
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
