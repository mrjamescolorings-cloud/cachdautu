"use client";

import { useEffect, useRef } from "react";

export default function useSmoothScroll() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let isScrolling = false;
        let targetScrollTop = container.scrollTop;
        let currentScrollTop = container.scrollTop;
        const ease = 0.08; // Lower = smoother but slower

        // Smooth scroll animation using requestAnimationFrame
        const smoothScroll = () => {
            if (!container) return;

            const diff = targetScrollTop - currentScrollTop;

            if (Math.abs(diff) > 0.5) {
                currentScrollTop += diff * ease;
                container.scrollTop = currentScrollTop;
                requestAnimationFrame(smoothScroll);
            } else {
                currentScrollTop = targetScrollTop;
                container.scrollTop = targetScrollTop;
                isScrolling = false;
            }
        };

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();

            // Get all sections
            const sections = container.querySelectorAll('.snap-section');
            const containerHeight = container.clientHeight;

            // Determine scroll direction
            const direction = e.deltaY > 0 ? 1 : -1;

            // Find current section
            let currentSectionIndex = 0;
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= containerHeight / 2) {
                    currentSectionIndex = index;
                }
            });

            // Calculate target section
            const targetIndex = Math.max(0, Math.min(sections.length - 1, currentSectionIndex + direction));
            const targetSection = sections[targetIndex] as HTMLElement;

            if (targetSection) {
                targetScrollTop = targetSection.offsetTop;

                if (!isScrolling) {
                    isScrolling = true;
                    currentScrollTop = container.scrollTop;
                    smoothScroll();
                }
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, []);

    return containerRef;
}
