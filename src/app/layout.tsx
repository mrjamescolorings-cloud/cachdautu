import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
    title: "Cách Đầu Tư - Hiểu thị trường, hiểu rủi ro",
    description: "Học cách đầu tư thông minh vào chứng khoán, crypto, bất động sản, vàng, forex.",
    metadataBase: new URL("https://cachdautu.com"),
    openGraph: {
        title: "Cách Đầu Tư - Hiểu thị trường, hiểu rủi ro",
        description: "Học cách đầu tư thông minh vào chứng khoán, crypto, bất động sản, vàng, forex.",
        url: "https://cachdautu.com",
        siteName: "Cách Đầu Tư",
        locale: "vi_VN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Cách Đầu Tư - Hiểu thị trường, hiểu rủi ro",
        description: "Học cách đầu tư thông minh vào chứng khoán, crypto, bất động sản, vàng, forex.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="vi" className="dark">
            <head>
                <link rel="icon" href="/favicon.png" type="image/png" />
                <link rel="apple-touch-icon" href="/logo.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            </head>
            <body className="font-sans antialiased">
                <ThemeProvider>
                    {children}
                </ThemeProvider>
                {/* Add your GA4 measurement ID here */}
                <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_ID || ""} />
            </body>
        </html>
    );
}
