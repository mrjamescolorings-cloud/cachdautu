import Image from "next/image";
import { User, Linkedin, Twitter, Globe } from "lucide-react";

interface AuthorCardProps {
    name?: string;
    bio?: string;
    avatar?: string;
    social?: {
        website?: string;
        twitter?: string;
        linkedin?: string;
    };
}

export default function AuthorCard({
    name = "Cách Đầu Tư Team",
    bio = "Đội ngũ chuyên gia tài chính với hơn 10 năm kinh nghiệm trong lĩnh vực đầu tư chứng khoán, bất động sản và crypto.",
    avatar,
    social = {}
}: AuthorCardProps) {
    return (
        <div className="bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.06] rounded-3xl p-5 sm:p-6 text-center">
            {/* Avatar */}
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 mb-4">
                <div className="w-full h-full rounded-full bg-primary flex items-center justify-center overflow-hidden">
                    {avatar ? (
                        <Image
                            src={avatar}
                            alt={name}
                            width={76}
                            height={76}
                            className="object-cover"
                        />
                    ) : (
                        <User className="w-10 h-10 text-white/50" />
                    )}
                </div>
            </div>

            {/* Name & Bio */}
            <h4 className="font-bold text-white text-sm sm:text-base mb-2">{name}</h4>
            <p className="text-xs text-text-muted leading-relaxed mb-4">{bio}</p>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-3">
                {social.website && (
                    <a
                        href={social.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-purple-500/20 hover:text-purple-400 transition-colors text-text-muted"
                    >
                        <Globe className="w-4 h-4" />
                    </a>
                )}
                {social.twitter && (
                    <a
                        href={social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-blue-500/20 hover:text-blue-400 transition-colors text-text-muted"
                    >
                        <Twitter className="w-4 h-4" />
                    </a>
                )}
                {social.linkedin && (
                    <a
                        href={social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-blue-600/20 hover:text-blue-500 transition-colors text-text-muted"
                    >
                        <Linkedin className="w-4 h-4" />
                    </a>
                )}
            </div>
        </div>
    );
}
