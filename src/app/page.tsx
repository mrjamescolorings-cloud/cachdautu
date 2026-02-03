import { Metadata } from "next";
import SmoothScrollContainer from "@/components/SmoothScrollContainer";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/sections/Stats";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TradingSection from "@/components/sections/TradingSection";
import RealEstateSection from "@/components/sections/RealEstateSection";
import FinanceSection from "@/components/sections/FinanceSection";
import Testimonials from "@/components/sections/Testimonials";
import FeaturedPosts from "@/components/sections/FeaturedPosts";
import FAQ from "@/components/sections/FAQ";
import Calculator from "@/components/sections/Calculator";
import InvestorQuiz from "@/components/sections/InvestorQuiz";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import ActivityFeed from "@/components/ActivityFeed";
import ExitPopup from "@/components/ExitPopup";
import ChatWidget from "@/components/ChatWidget";
import { Mail } from "lucide-react";

// SEO Metadata for homepage
export const metadata: Metadata = {
    title: "Cách Đầu Tư - Nền tảng kiến thức đầu tư #1 Việt Nam | Chứng khoán, Crypto, Bất động sản",
    description: "Học cách đầu tư thông minh vào chứng khoán, crypto, bất động sản, vàng, forex với 150+ bài phân tích chuyên sâu. Tham gia 12,500+ nhà đầu tư tin tưởng.",
    keywords: ["đầu tư", "chứng khoán", "crypto", "bất động sản", "forex", "vàng", "tài chính cá nhân", "tự do tài chính"],
    openGraph: {
        title: "Cách Đầu Tư - Nền tảng kiến thức đầu tư #1 Việt Nam",
        description: "Học cách đầu tư thông minh với 150+ bài phân tích chuyên sâu. Tham gia 12,500+ nhà đầu tư.",
        url: "https://cachdautu.com",
        siteName: "Cách Đầu Tư",
        locale: "vi_VN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Cách Đầu Tư - Nền tảng kiến thức đầu tư #1 Việt Nam",
        description: "Học cách đầu tư thông minh với 150+ bài phân tích chuyên sâu.",
    },
    alternates: {
        canonical: "https://cachdautu.com",
    },
};

// Partner logos section with proper semantics
function PartnerLogos() {
    const partners = ["VnExpress", "CafeF", "The Leader", "Forbes VN", "Zing News"];
    return (
        <aside className="py-12 bg-primary border-y border-white/5" aria-label="Đối tác truyền thông">
            <div className="container mx-auto px-4">
                <p className="text-center text-text-muted text-sm mb-6">Được đề cập trên</p>
                <ul className="flex flex-wrap justify-center items-center gap-8 md:gap-16" role="list">
                    {partners.map((partner, idx) => (
                        <li key={idx} className="text-text-secondary/30 font-bold text-lg hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all cursor-default">
                            {partner}
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

// Newsletter section with proper form labels
function NewsletterSection() {
    return (
        <section
            className="min-h-screen flex flex-col justify-between py-24 bg-primary relative overflow-hidden"
            aria-labelledby="newsletter-heading"
            id="newsletter"
        >
            {/* Glow Ambience */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" aria-hidden="true" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

            {/* Newsletter Content */}
            <div className="container mx-auto px-4 relative z-10 flex-1 flex items-center justify-center">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 flex items-center justify-center mb-8" aria-hidden="true">
                        <Mail className="w-10 h-10 text-purple-400" />
                    </div>
                    <h2 id="newsletter-heading" className="text-4xl md:text-5xl font-bold mb-6 text-white">
                        Đăng ký nhận <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">Bản tin Đầu tư</span>
                    </h2>
                    <p className="text-text-secondary mb-10 text-lg max-w-xl mx-auto">
                        Nhận phân tích thị trường, cơ hội đầu tư và bài học kinh nghiệm trực tiếp vào hộp thư của bạn mỗi tuần.
                    </p>

                    <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto relative z-10" aria-label="Form đăng ký nhận tin">
                        <label htmlFor="newsletter-email" className="sr-only">Địa chỉ email</label>
                        <input
                            id="newsletter-email"
                            type="email"
                            name="email"
                            placeholder="Email của bạn"
                            required
                            aria-required="true"
                            className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-text-muted focus:border-purple-500 focus:outline-none transition-colors"
                        />
                        <button
                            type="submit"
                            className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold hover:shadow-glow-purple transition-all transform hover:-translate-y-0.5"
                        >
                            Đăng ký ngay
                        </button>
                    </form>
                </div>
            </div>

            {/* Footer integrated */}
            <Footer />
        </section>
    );
}

// JSON-LD structured data
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Cách Đầu Tư",
    "url": "https://cachdautu.com",
    "description": "Nền tảng kiến thức đầu tư hàng đầu Việt Nam về chứng khoán, crypto, bất động sản",
    "potentialAction": {
        "@type": "SearchAction",
        "target": "https://cachdautu.com/blog?q={search_term_string}",
        "query-input": "required name=search_term_string"
    },
    "publisher": {
        "@type": "Organization",
        "name": "Cách Đầu Tư",
        "logo": {
            "@type": "ImageObject",
            "url": "https://cachdautu.com/logo.png"
        }
    }
};

const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Cách Đầu Tư",
    "url": "https://cachdautu.com",
    "logo": "https://cachdautu.com/logo.png",
    "description": "Nền tảng kiến thức đầu tư hàng đầu Việt Nam",
    "sameAs": [
        "https://facebook.com/cachdautu",
        "https://youtube.com/cachdautu"
    ],
    "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "email": "contact@cachdautu.com"
    }
};

export default function HomePage() {
    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
            />

            <SmoothScrollContainer>
                {/* Skip to main content link for accessibility */}
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent-blue focus:text-white focus:rounded-lg"
                >
                    Bỏ qua đến nội dung chính
                </a>

                {/* Fixed Elements */}
                <Navbar />
                <StickyCTA />
                <ActivityFeed />
                <ExitPopup />
                <ChatWidget />

                {/* Main Content */}
                <main id="main-content">
                    {/* Hero Section - h1 inside */}
                    <div className="snap-section">
                        <Hero />
                    </div>

                    {/* Partner Logos */}
                    <PartnerLogos />

                    {/* Stats Section */}
                    <div className="snap-section">
                        <Stats />
                    </div>

                    {/* Calculator */}
                    <div className="snap-section">
                        <Calculator />
                    </div>

                    {/* Why Choose Us */}
                    <div className="snap-section">
                        <WhyChooseUs />
                    </div>

                    {/* Quiz */}
                    <div className="snap-section">
                        <InvestorQuiz />
                    </div>

                    {/* Trading Section */}
                    <div className="snap-section">
                        <TradingSection />
                    </div>

                    {/* Real Estate Section */}
                    <div className="snap-section">
                        <RealEstateSection />
                    </div>

                    {/* Finance Section */}
                    <div className="snap-section">
                        <FinanceSection />
                    </div>

                    {/* Testimonials */}
                    <div className="snap-section">
                        <Testimonials />
                    </div>

                    {/* Featured Posts */}
                    <div className="snap-section">
                        <FeaturedPosts />
                    </div>

                    {/* FAQ */}
                    <div className="snap-section">
                        <FAQ />
                    </div>

                    {/* Newsletter + Footer */}
                    <div className="snap-section">
                        <NewsletterSection />
                    </div>
                </main>
            </SmoothScrollContainer>
        </>
    );
}
