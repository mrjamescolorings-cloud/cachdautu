"use client";

import { useState, useEffect } from "react";

export default function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setProgress(Math.min(100, Math.max(0, scrollPercent)));
        };

        window.addEventListener("scroll", updateProgress, { passive: true });
        return () => window.removeEventListener("scroll", updateProgress);
    }, []);

    if (progress === 0) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-white/10">
            <div
                className="h-full bg-gradient-to-r from-accent-blue to-accent-purple transition-all duration-150"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
