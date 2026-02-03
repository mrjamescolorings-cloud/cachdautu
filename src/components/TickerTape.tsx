"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const marketData = [
    { symbol: "VN-INDEX", price: 1250.45, change: 0.85 },
    { symbol: "BTC", price: 45230.00, change: 2.15 },
    { symbol: "ETH", price: 2450.00, change: 1.82 },
    { symbol: "GOLD", price: 2045.50, change: -0.45 },
    { symbol: "EUR/USD", price: 1.0850, change: 0.12 },
    { symbol: "VCB", price: 92.5, change: 1.23 },
    { symbol: "FPT", price: 118.0, change: -0.67 },
];

export default function TickerTape() {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setOffset(prev => prev - 0.5);
        }, 20);
        return () => clearInterval(interval);
    }, []);

    const items = [...marketData, ...marketData, ...marketData];

    return (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-primary/95 backdrop-blur-md border-b border-white/5 overflow-hidden">
            <div
                className="flex items-center gap-4 sm:gap-8 py-1.5 sm:py-2 whitespace-nowrap"
                style={{ transform: `translateX(${offset}px)` }}
            >
                {items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 sm:gap-3 px-2 sm:px-4">
                        <span className="text-[10px] sm:text-sm font-medium text-white">{item.symbol}</span>
                        <span className="text-[10px] sm:text-sm text-text-secondary">
                            {item.price < 100 ? item.price.toFixed(2) : item.price.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                        </span>
                        <span className={`text-[9px] sm:text-xs flex items-center gap-0.5 ${item.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {item.change >= 0 ? <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> : <TrendingDown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
                            <span className="hidden sm:inline">{item.change >= 0 ? '+' : ''}{item.change}%</span>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
