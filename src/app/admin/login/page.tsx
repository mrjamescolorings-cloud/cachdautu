"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, AlertCircle, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError("Email hoặc mật khẩu không đúng");
                setLoading(false);
                return;
            }

            if (data.session) {
                router.push("/admin");
                router.refresh();
            }
        } catch {
            setError("Đã xảy ra lỗi. Vui lòng thử lại.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg mb-4">
                        C
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin CMS</h1>
                    <p className="text-gray-500 mt-1">Đăng nhập để quản lý nội dung</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                    <form onSubmit={handleLogin} className="space-y-5">
                        {error && (
                            <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@example.com"
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mật khẩu
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Đang đăng nhập...
                                </>
                            ) : (
                                "Đăng nhập"
                            )}
                        </button>
                    </form>
                </div>

                {/* Back to site */}
                <p className="text-center mt-6 text-sm text-gray-500">
                    <a href="/" className="text-emerald-600 hover:underline">← Quay về trang chủ</a>
                </p>
            </div>
        </div>
    );
}
