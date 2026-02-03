"use client";

import { Facebook, Twitter, Linkedin, Link2, Check } from "lucide-react";
import { useState } from "react";

interface SocialShareProps {
    url: string;
    title: string;
}

export default function SocialShare({ url, title }: SocialShareProps) {
    const [copied, setCopied] = useState(false);
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = [
        {
            name: "Facebook",
            icon: <Facebook className="w-4 h-4" />,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            color: "hover:bg-blue-600 hover:border-blue-600"
        },
        {
            name: "Twitter",
            icon: <Twitter className="w-4 h-4" />,
            href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            color: "hover:bg-sky-500 hover:border-sky-500"
        },
        {
            name: "LinkedIn",
            icon: <Linkedin className="w-4 h-4" />,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            color: "hover:bg-blue-700 hover:border-blue-700"
        },
    ];

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div className="flex items-center gap-2">
            {shareLinks.map((link) => (
                <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white transition-all ${link.color}`}
                    title={`Chia sẻ lên ${link.name}`}
                >
                    {link.icon}
                </a>
            ))}
            <button
                onClick={copyToClipboard}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:bg-accent-purple hover:border-accent-purple transition-all"
                title="Sao chép link"
            >
                {copied ? <Check className="w-4 h-4 text-accent-emerald" /> : <Link2 className="w-4 h-4" />}
            </button>
        </div>
    );
}
