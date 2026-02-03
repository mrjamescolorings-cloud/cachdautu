"use client";

import { useEffect, useState } from "react";
import { UserPlus, BookOpen, MessageCircle } from "lucide-react";

const names = [
    "Nguyễn V.A", "Trần T.B", "Lê H.C", "Phạm M.D", "Hoàng T.E",
    "Vũ T.F", "Đặng Q.G", "Bùi T.H", "Đỗ V.I", "Ngô T.K"
];

const actions = [
    { icon: UserPlus, text: "vừa đăng ký nhận bản tin", color: "bg-emerald-500/20 text-emerald-400" },
    { icon: BookOpen, text: "vừa đọc bài về Crypto", color: "bg-accent-blue/20 text-accent-blue" },
    { icon: MessageCircle, text: "vừa bình luận bài viết", color: "bg-accent-purple/20 text-accent-purple" },
];

export default function ActivityFeed() {
    const [notification, setNotification] = useState<{ name: string; action: typeof actions[0] } | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const showNotification = () => {
            const name = names[Math.floor(Math.random() * names.length)];
            const action = actions[Math.floor(Math.random() * actions.length)];

            setNotification({ name, action });
            setIsVisible(true);

            setTimeout(() => setIsVisible(false), 4000);
        };

        const initialTimeout = setTimeout(showNotification, 5000);
        const interval = setInterval(showNotification, 15000 + Math.random() * 15000);

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(interval);
        };
    }, []);

    if (!notification) return null;

    return (
        <div className={`fixed bottom-20 sm:bottom-24 left-3 sm:left-4 z-40 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}>
            <div className="bg-primary-light/95 backdrop-blur-md border border-primary-border rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl max-w-[280px] sm:max-w-xs">
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center ${notification.action.color}`}>
                        <notification.action.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-white text-xs sm:text-sm font-medium truncate">{notification.name}</p>
                        <p className="text-text-muted text-[10px] sm:text-xs truncate">{notification.action.text}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1 mt-2 text-text-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <p className="text-[10px] sm:text-xs">Vừa xong</p>
                </div>
            </div>
        </div>
    );
}
