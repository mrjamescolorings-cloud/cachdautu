"use client";

import { useState } from "react";
import { ArrowRight, ChevronLeft, Target, Shield, Zap, TrendingUp, Brain } from "lucide-react";
import AnimatedSection from "@/components/ui/Animations";

const questions = [
    {
        question: "Bạn sẵn sàng chờ đợi bao lâu để thấy lợi nhuận?",
        options: [
            { text: "Dưới 1 tháng", value: "aggressive" },
            { text: "1-6 tháng", value: "moderate" },
            { text: "1-3 năm", value: "balanced" },
            { text: "5-10 năm hoặc hơn", value: "conservative" },
        ]
    },
    {
        question: "Nếu danh mục giảm 20%, bạn sẽ làm gì?",
        options: [
            { text: "Bán ngay để cắt lỗ", value: "conservative" },
            { text: "Giữ nguyên và lo lắng", value: "moderate" },
            { text: "Không làm gì, tiếp tục kế hoạch", value: "balanced" },
            { text: "Mua thêm vì đang giảm giá!", value: "aggressive" },
        ]
    },
    {
        question: "Mục tiêu tài chính chính của bạn là gì?",
        options: [
            { text: "Bảo toàn vốn an toàn", value: "conservative" },
            { text: "Thu nhập ổn định từ cổ tức", value: "moderate" },
            { text: "Tăng trưởng vốn dài hạn", value: "balanced" },
            { text: "Tối đa hóa lợi nhuận bằng mọi giá", value: "aggressive" },
        ]
    },
    {
        question: "Kinh nghiệm đầu tư của bạn?",
        options: [
            { text: "Hoàn toàn mới, chưa từng đầu tư", value: "conservative" },
            { text: "Đã gửi tiết kiệm ngân hàng", value: "moderate" },
            { text: "Từng mua cổ phiếu/quỹ", value: "balanced" },
            { text: "Giao dịch thường xuyên, hiểu phái sinh", value: "aggressive" },
        ]
    },
    {
        question: "Bạn dành bao nhiêu thu nhập cho đầu tư?",
        options: [
            { text: "Dưới 10%", value: "conservative" },
            { text: "10-20%", value: "moderate" },
            { text: "20-40%", value: "balanced" },
            { text: "Trên 40%", value: "aggressive" },
        ]
    },
];

const profiles: Record<string, { title: string; icon: any; color: string; gradient: string; description: string; assets: string[] }> = {
    conservative: {
        title: "Nhà đầu tư Thận trọng",
        icon: Shield,
        color: "emerald",
        gradient: "from-emerald-500 to-green-500",
        description: "Bạn ưu tiên bảo toàn vốn và tăng trưởng ổn định. Phù hợp với trái phiếu, tiết kiệm lãi suất cao, và quỹ cân bằng.",
        assets: ["Trái phiếu Chính phủ", "Tiết kiệm kỳ hạn", "Quỹ ETF trái phiếu"]
    },
    moderate: {
        title: "Nhà đầu tư Cân bằng",
        icon: Target,
        color: "blue",
        gradient: "from-blue-500 to-purple-500",
        description: "Bạn muốn cân bằng giữa rủi ro và lợi nhuận. Phù hợp với cổ phiếu blue-chip, quỹ mở, và Bất động sản.",
        assets: ["Cổ phiếu VN30", "Quỹ mở cổ phiếu", "BĐS cho thuê"]
    },
    balanced: {
        title: "Nhà đầu tư Tăng trưởng",
        icon: TrendingUp,
        color: "purple",
        gradient: "from-purple-500 to-pink-500",
        description: "Bạn chấp nhận biến động để đổi lấy tăng trưởng dài hạn. Phù hợp với cổ phiếu tăng trưởng và đa dạng hóa quốc tế.",
        assets: ["Cổ phiếu midcap", "Crypto BTC/ETH", "Quỹ ETF Mỹ"]
    },
    aggressive: {
        title: "Nhà đầu tư Mạo hiểm",
        icon: Zap,
        color: "orange",
        gradient: "from-orange-500 to-yellow-500",
        description: "Bạn sẵn sàng chấp nhận rủi ro cao để tối đa hóa lợi nhuận. Phù hợp với altcoin, phái sinh và cổ phiếu đầu cơ.",
        assets: ["Altcoins", "Cổ phiếu penny", "Phái sinh/Margin"]
    }
};

export default function InvestorQuiz() {
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [showResult, setShowResult] = useState(false);

    const handleAnswer = (value: string) => {
        const newAnswers = [...answers, value];
        setAnswers(newAnswers);

        if (currentQ < questions.length - 1) {
            setCurrentQ(currentQ + 1);
        } else {
            setShowResult(true);
        }
    };

    const getResult = () => {
        const counts: Record<string, number> = { conservative: 0, moderate: 0, balanced: 0, aggressive: 0 };
        answers.forEach(a => counts[a]++);
        return Object.entries(counts).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    };

    const reset = () => {
        setCurrentQ(0);
        setAnswers([]);
        setShowResult(false);
    };

    const profile = showResult ? profiles[getResult()] : null;

    return (
        <section
            className="py-24 bg-primary relative overflow-hidden"
            aria-labelledby="quiz-heading"
            id="quiz"
        >
            {/* Background glow */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" aria-hidden="true" />

            <div className="container mx-auto px-4 relative z-10">
                {!showResult ? (
                    <AnimatedSection className="max-w-2xl mx-auto" animation="fade-in-up">
                        <div className="text-center mb-8">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
                                <Brain className="w-4 h-4" /> Quiz thông minh
                            </span>
                            <h2 id="quiz-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Bạn thuộc tuýp <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">nhà đầu tư</span> nào?
                            </h2>

                            {/* Progress */}
                            <div className="flex justify-center gap-2 mb-4" role="progressbar" aria-valuenow={currentQ + 1} aria-valuemin={1} aria-valuemax={questions.length}>
                                {questions.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`h-1.5 rounded-full transition-all ${idx === currentQ ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-8' :
                                                idx < currentQ ? 'bg-purple-500 w-4' : 'bg-white/10 w-4'
                                            }`}
                                    />
                                ))}
                            </div>
                            <p className="text-text-muted text-sm">Câu {currentQ + 1}/{questions.length}</p>
                        </div>

                        <div className="bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] rounded-3xl p-8" role="form">
                            <p className="text-xl text-white font-medium mb-6 text-center">
                                {questions[currentQ].question}
                            </p>

                            <div className="space-y-3" role="radiogroup">
                                {questions[currentQ].options.map((opt, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswer(opt.value)}
                                        className="w-full p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-left text-white hover:bg-purple-500/10 hover:border-purple-500/30 transition-all group"
                                        role="radio"
                                        aria-checked="false"
                                    >
                                        <span className="flex items-center justify-between">
                                            {opt.text}
                                            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {currentQ > 0 && (
                                <button
                                    onClick={() => { setCurrentQ(currentQ - 1); setAnswers(answers.slice(0, -1)); }}
                                    className="mt-6 flex items-center gap-2 text-text-muted hover:text-white transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4" /> Quay lại
                                </button>
                            )}
                        </div>
                    </AnimatedSection>
                ) : (
                    <AnimatedSection className="max-w-2xl mx-auto text-center" animation="scale-in">
                        {/* Result Glow */}
                        <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br ${profile?.gradient} opacity-10 rounded-full blur-[100px]`} />

                        <div className={`w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br ${profile?.gradient} p-0.5 mb-8`}>
                            <div className="w-full h-full rounded-[22px] bg-primary flex items-center justify-center text-white">
                                {profile && <profile.icon className="w-12 h-12" />}
                            </div>
                        </div>

                        <h2 className={`text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${profile?.gradient} mb-4`}>
                            {profile?.title}
                        </h2>

                        <p className="text-text-secondary text-lg mb-8 max-w-lg mx-auto">
                            {profile?.description}
                        </p>

                        <div className="bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] rounded-2xl p-6 mb-8">
                            <p className="text-sm text-text-muted mb-4">Danh mục đề xuất:</p>
                            <ul className="flex flex-wrap justify-center gap-3">
                                {profile?.assets.map((asset, idx) => (
                                    <li key={idx} className={`px-4 py-2 rounded-full bg-gradient-to-r ${profile?.gradient} p-0.5`}>
                                        <span className="block px-3 py-1 rounded-full bg-primary text-white text-sm font-medium">
                                            {asset}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            onClick={reset}
                            className={`px-8 py-3 rounded-full bg-gradient-to-r ${profile?.gradient} text-white font-bold hover:shadow-glow-purple transition-all`}
                        >
                            Làm lại Quiz
                        </button>
                    </AnimatedSection>
                )}
            </div>
        </section>
    );
}
