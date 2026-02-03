"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: 'bot', text: 'Xin chào! 👋 Tôi là trợ lý ảo của Cách Đầu Tư. Bạn cần hỗ trợ gì?' }
    ]);
    const [input, setInput] = useState('');

    const quickReplies = [
        "Làm sao để bắt đầu?",
        "Chứng khoán hay Crypto?",
        "Cần bao nhiêu tiền?",
    ];

    const handleSend = (text: string) => {
        if (!text.trim()) return;

        setMessages([...messages, { from: 'user', text }]);
        setInput('');

        setTimeout(() => {
            setMessages(prev => [...prev, {
                from: 'bot',
                text: 'Cảm ơn câu hỏi của bạn! Đội ngũ của chúng tôi sẽ phản hồi sớm. Hãy khám phá các bài viết trên blog nhé!'
            }]);
        }, 1000);
    };

    return (
        <>
            {/* Chat Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-20 sm:bottom-24 right-3 sm:right-4 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-110 flex items-center justify-center ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
                aria-label="Mở chat"
            >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-50 w-[calc(100vw-24px)] sm:w-[360px] h-[450px] sm:h-[500px] max-w-[360px] bg-primary-light border border-primary-border rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-scale-in">
                    {/* Header */}
                    <div className="p-3 sm:p-4 bg-gradient-to-r from-accent-blue to-accent-purple flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center">
                                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm sm:text-base">Trợ lý Đầu tư</p>
                                <div className="flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                    <p className="text-white/70 text-xs">Online</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors"
                            aria-label="Đóng chat"
                        >
                            <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-2.5 sm:p-3 rounded-2xl text-xs sm:text-sm ${msg.from === 'user' ? 'bg-accent-blue text-white rounded-br-sm' : 'bg-white/10 text-white rounded-bl-sm'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Replies */}
                    <div className="px-3 sm:px-4 pb-2 flex flex-wrap gap-1.5 sm:gap-2">
                        {quickReplies.map((reply, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSend(reply)}
                                className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs text-text-secondary hover:bg-accent-blue/10 hover:border-accent-blue/30 hover:text-white transition-colors flex items-center gap-1"
                            >
                                <Sparkles className="w-3 h-3" />
                                {reply}
                            </button>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-3 sm:p-4 border-t border-white/5">
                        <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Nhập tin nhắn..."
                                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm placeholder-text-muted focus:border-accent-blue focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="p-2.5 sm:p-3 rounded-xl bg-accent-blue text-white hover:bg-blue-600 transition-colors"
                                aria-label="Gửi"
                            >
                                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
