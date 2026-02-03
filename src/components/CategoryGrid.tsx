import Link from "next/link";
import { categories } from "@/lib/posts";

const categoryIcons: Record<string, string> = {
    "chung-khoan": "📈",
    "crypto": "₿",
    "bat-dong-san": "🏠",
    "vang": "🥇",
    "forex": "💱",
    "trai-phieu": "📜",
    "quy-dau-tu": "💼",
    "khoi-nghiep": "🚀",
    "dau-tu-thay-the": "🎨",
    "tai-chinh-ca-nhan": "💰",
};

export default function CategoryGrid() {
    return (
        <section className="section bg-primary-dark">
            <div className="container">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="text-sm font-medium uppercase tracking-wider text-accent-emerald">
                        Chuyên mục đầu tư
                    </span>
                    <h2 className="mt-2 text-3xl md:text-4xl font-bold">
                        Khám phá <span className="text-transparent bg-clip-text bg-gradient-gold">mọi loại tài sản</span>
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-text-secondary">
                        Từ chứng khoán truyền thống đến crypto, từ bất động sản đến nghệ thuật -
                        chúng tôi hướng dẫn bạn đầu tư vào bất kỳ loại tài sản nào.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {categories.map((category) => (
                        <Link
                            key={category.slug}
                            href={`/blog/${category.slug}`}
                            className="glass-card p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:border-accent-gold group"
                        >
                            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                                {categoryIcons[category.slug] || "📊"}
                            </div>
                            <h4 className="text-sm font-semibold group-hover:text-accent-gold transition-colors">
                                {category.name}
                            </h4>
                            <p className="text-xs mt-1 text-text-muted">
                                {category.description.split(' ').slice(0, 4).join(' ')}...
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
