import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AWS Cloud Club | Atria Institute of Technology",
  description: "AWS Cloud Club at Atria - Light, Minimalist, Brutalist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="page-grid min-h-screen font-[family-name:var(--font-sans)] bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
        <Navbar />
        <main className="flex min-h-screen flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
