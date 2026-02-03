import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function InnerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-primary min-h-screen text-text">
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
