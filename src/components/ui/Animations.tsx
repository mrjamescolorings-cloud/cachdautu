"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    animation?: 'fade-in-up' | 'fade-in-left' | 'fade-in-right' | 'scale-in' | 'fade-in';
    delay?: number;
}

export default function AnimatedSection({
    children,
    className = "",
    animation = "fade-in-up",
    delay = 0
}: AnimatedSectionProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), delay);
                }
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [delay]);

    const animationClass = isVisible ? `animate-${animation}` : 'opacity-0';

    return (
        <div ref={ref} className={`${className} ${animationClass}`}>
            {children}
        </div>
    );
}

// Animated Counter Component
interface AnimatedCounterProps {
    end: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
}

export function AnimatedCounter({
    end,
    duration = 2000,
    prefix = "",
    suffix = "",
    className = ""
}: AnimatedCounterProps) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * end));

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }, [isVisible, end, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}{count.toLocaleString()}{suffix}
        </span>
    );
}

// Floating Particles Background
export function FloatingParticles({ count = 20 }: { count?: number }) {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(count)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-accent-blue/30 rounded-full animate-float"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 6}s`,
                        animationDuration: `${6 + Math.random() * 4}s`,
                    }}
                />
            ))}
        </div>
    );
}

// Gradient Orb Component
interface GradientOrbProps {
    color?: 'blue' | 'purple' | 'emerald';
    size?: 'sm' | 'md' | 'lg';
    position?: { top?: string; left?: string; right?: string; bottom?: string };
    animate?: boolean;
}

export function GradientOrb({
    color = 'blue',
    size = 'md',
    position = { top: '50%', left: '50%' },
    animate = true
}: GradientOrbProps) {
    const colorMap = {
        blue: 'bg-accent-blue/20',
        purple: 'bg-accent-purple/15',
        emerald: 'bg-accent-emerald/15',
    };

    const sizeMap = {
        sm: 'w-[300px] h-[300px]',
        md: 'w-[500px] h-[500px]',
        lg: 'w-[800px] h-[800px]',
    };

    return (
        <div
            className={`absolute ${colorMap[color]} ${sizeMap[size]} rounded-full blur-[120px] pointer-events-none ${animate ? 'animate-pulse-glow' : ''}`}
            style={position}
        />
    );
}
