"use client";

import { useState } from "react";
import { Calculator as CalcIcon, TrendingUp, Wallet, Zap } from "lucide-react";
import AnimatedSection from "@/components/ui/Animations";

export default function Calculator() {
    const [principal, setPrincipal] = useState(10000000);
    const [rate, setRate] = useState(12);
    const [years, setYears] = useState(10);
    const [monthly, setMonthly] = useState(2000000);

    // Compound interest with monthly contributions
    const calculateFV = () => {
        const r = rate / 100 / 12;
        const n = years * 12;
        const fvPrincipal = principal * Math.pow(1 + r, n);
        const fvMonthly = monthly * ((Math.pow(1 + r, n) - 1) / r);
        return fvPrincipal + fvMonthly;
    };

    const futureValue = calculateFV();
    const totalContributed = principal + (monthly * years * 12);
    const totalInterest = futureValue - totalContributed;

    const formatCurrency = (value: number) => {
        if (value >= 1000000000) {
            return (value / 1000000000).toFixed(2) + ' tỷ';
        } else if (value >= 1000000) {
            return (value / 1000000).toFixed(1) + ' triệu';
        }
        return value.toLocaleString('vi-VN');
    };

    return (
        <section
            className="py-24 bg-primary relative overflow-hidden"
            aria-labelledby="calculator-heading"
            id="calculator"
        >
            {/* Background glow */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px]" aria-hidden="true" />

            <div className="container mx-auto px-4 relative z-10">
                <AnimatedSection className="text-center mb-16" animation="fade-in-up">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
                        <CalcIcon className="w-4 h-4" /> Công cụ
                    </span>
                    <h2 id="calculator-heading" className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Tính toán <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">Lãi kép</span>
                    </h2>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        Xem tiền của bạn có thể tăng trưởng như thế nào với sức mạnh của <strong className="text-white">lãi kép</strong>
                    </p>
                </AnimatedSection>

                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Input Side */}
                        <AnimatedSection animation="fade-in-left" delay={200}>
                            <form
                                className="bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] rounded-3xl p-8 space-y-8"
                                aria-label="Máy tính lãi kép"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 p-0.5">
                                        <div className="w-full h-full rounded-[10px] bg-primary flex items-center justify-center">
                                            <CalcIcon className="w-6 h-6 text-emerald-400" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Thông số đầu vào</h3>
                                </div>

                                {/* Principal */}
                                <div>
                                    <div className="flex justify-between mb-3">
                                        <label htmlFor="principal" className="text-text-secondary text-sm">Số tiền ban đầu</label>
                                        <span className="text-white font-bold" aria-live="polite">{formatCurrency(principal)}đ</span>
                                    </div>
                                    <input
                                        id="principal"
                                        type="range"
                                        min="0"
                                        max="500000000"
                                        step="1000000"
                                        value={principal}
                                        onChange={(e) => setPrincipal(Number(e.target.value))}
                                        className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-gradient-to-br [&::-webkit-slider-thumb]:from-emerald-400 [&::-webkit-slider-thumb]:to-green-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg"
                                    />
                                </div>

                                {/* Monthly */}
                                <div>
                                    <div className="flex justify-between mb-3">
                                        <label htmlFor="monthly" className="text-text-secondary text-sm">Góp thêm hàng tháng</label>
                                        <span className="text-white font-bold" aria-live="polite">{formatCurrency(monthly)}đ</span>
                                    </div>
                                    <input
                                        id="monthly"
                                        type="range"
                                        min="0"
                                        max="50000000"
                                        step="500000"
                                        value={monthly}
                                        onChange={(e) => setMonthly(Number(e.target.value))}
                                        className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-gradient-to-br [&::-webkit-slider-thumb]:from-purple-400 [&::-webkit-slider-thumb]:to-pink-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg"
                                    />
                                </div>

                                {/* Rate */}
                                <div>
                                    <div className="flex justify-between mb-3">
                                        <label htmlFor="rate" className="text-text-secondary text-sm">Lãi suất hàng năm</label>
                                        <span className="text-white font-bold" aria-live="polite">{rate}%</span>
                                    </div>
                                    <input
                                        id="rate"
                                        type="range"
                                        min="1"
                                        max="30"
                                        step="0.5"
                                        value={rate}
                                        onChange={(e) => setRate(Number(e.target.value))}
                                        className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-gradient-to-br [&::-webkit-slider-thumb]:from-orange-400 [&::-webkit-slider-thumb]:to-yellow-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg"
                                    />
                                </div>

                                {/* Years */}
                                <div>
                                    <div className="flex justify-between mb-3">
                                        <label htmlFor="years" className="text-text-secondary text-sm">Thời gian đầu tư</label>
                                        <span className="text-white font-bold" aria-live="polite">{years} năm</span>
                                    </div>
                                    <input
                                        id="years"
                                        type="range"
                                        min="1"
                                        max="40"
                                        step="1"
                                        value={years}
                                        onChange={(e) => setYears(Number(e.target.value))}
                                        className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-gradient-to-br [&::-webkit-slider-thumb]:from-blue-400 [&::-webkit-slider-thumb]:to-purple-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg"
                                    />
                                </div>
                            </form>
                        </AnimatedSection>

                        {/* Result Side */}
                        <AnimatedSection animation="fade-in-right" delay={400}>
                            <div className="relative h-full">
                                {/* Glow effect */}
                                <div className="absolute -inset-4 bg-gradient-to-br from-emerald-500/20 via-green-500/10 to-transparent blur-2xl rounded-3xl" aria-hidden="true" />

                                <div
                                    className="bg-gradient-to-b from-white/[0.04] to-transparent border border-emerald-500/20 rounded-3xl p-8 relative h-full flex flex-col justify-center"
                                    role="region"
                                    aria-label="Kết quả tính toán"
                                >
                                    <div className="text-center mb-8 relative z-10">
                                        <p className="text-text-muted mb-2">Sau {years} năm, bạn sẽ có</p>
                                        <p className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400 mb-2" aria-live="polite">
                                            {formatCurrency(futureValue)}đ
                                        </p>
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                            <Zap className="w-4 h-4 text-emerald-400" />
                                            <span className="text-emerald-400 font-bold">
                                                Lợi nhuận: +{formatCurrency(totalInterest)}đ
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 relative z-10">
                                        <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-4 text-center">
                                            <Wallet className="w-6 h-6 text-purple-400 mx-auto mb-2" aria-hidden="true" />
                                            <p className="text-xs text-text-muted mb-1">Tổng đã góp</p>
                                            <p className="text-white font-bold">{formatCurrency(totalContributed)}đ</p>
                                        </div>
                                        <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-4 text-center">
                                            <TrendingUp className="w-6 h-6 text-emerald-400 mx-auto mb-2" aria-hidden="true" />
                                            <p className="text-xs text-text-muted mb-1">Lãi suất thực</p>
                                            <p className="text-white font-bold">{((totalInterest / totalContributed) * 100).toFixed(0)}%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </div>
        </section>
    );
}
