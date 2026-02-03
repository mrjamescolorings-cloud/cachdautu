"use client";

import { useEffect, useRef, ReactNode } from "react";

interface SmoothScrollContainerProps {
    children: ReactNode;
    className?: string;
}

export default function SmoothScrollContainer({ children, className = "" }: SmoothScrollContainerProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let isScrolling = false;
        let targetScrollTop = container.scrollTop;
        let currentScrollTop = container.scrollTop;
        const ease = 0.1; // Easing factor - higher = faster snap

        // Smooth scroll animation using requestAnimationFrame
        const smoothScroll = () => {
            if (!container) return;

            const diff = targetScrollTop - currentScrollTop;

            if (Math.abs(diff) > 1) {
                currentScrollTop += diff * ease;
                container.scrollTop = currentScrollTop;
                requestAnimationFrame(smoothScroll);
            } else {
                currentScrollTop = targetScrollTop;
                container.scrollTop = targetScrollTop;
                isScrolling = false;
            }
        };

        let scrollTimeout: NodeJS.Timeout | null = null;
        let accumulatedDelta = 0;
        const scrollThreshold = 50; // Pixels needed to trigger section change

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();

            // Accumulate scroll delta
            accumulatedDelta += e.deltaY;

            // Clear previous timeout
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }

            // Debounce scroll
            scrollTimeout = setTimeout(() => {
                if (Math.abs(accumulatedDelta) < scrollThreshold) {
                    accumulatedDelta = 0;
                    return;
                }

                // Get all sections
                const sections = container.querySelectorAll('.snap-section');
                const containerHeight = container.clientHeight;

                // Determine scroll direction
                const direction = accumulatedDelta > 0 ? 1 : -1;
                accumulatedDelta = 0;

                // Find current section
                let currentSectionIndex = 0;
                sections.forEach((section, index) => {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= containerHeight / 3) {
                        currentSectionIndex = index;
                    }
                });

                // Calculate target section
                const targetIndex = Math.max(0, Math.min(sections.length - 1, currentSectionIndex + direction));
                const targetSection = sections[targetIndex] as HTMLElement;

                if (targetSection && targetIndex !== currentSectionIndex) {
                    targetScrollTop = targetSection.offsetTop;

                    if (!isScrolling) {
                        isScrolling = true;
                        currentScrollTop = container.scrollTop;
                        smoothScroll();
                    }
                }
            }, 50);
        };

        // Only apply to desktop - let mobile use native scroll
        const isMobile = window.matchMedia('(max-width: 768px)').matches;

        if (!isMobile) {
            container.addEventListener('wheel', handleWheel, { passive: false });
        }

        return () => {
            if (!isMobile) {
                container.removeEventListener('wheel', handleWheel);
            }
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`snap-container bg-primary text-text ${className}`}
        >
            {children}
        </div>
    );
}
