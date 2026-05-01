import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AWS Student Builder Group | Atria Institute of Technology",
  description:
    "The official AWS Student Builder Group at Atria I.T. Join a vibrant community of student developers, cloud enthusiasts, and future architects building on the world's most comprehensive cloud platform.",
  openGraph: {
    title: "AWS Student Builder Group | Atria Institute of Technology",
    description:
      "The official AWS Student Builder Group at Atria I.T. Join a vibrant community of student developers, cloud enthusiasts, and future architects building on the world's most comprehensive cloud platform.",
    url: "https://awsatria.tech",
    siteName: "AWS Student Builder Group | Atria Institute of Technology",
    images: [
      {
        url: "https://awsatria.tech/Program_Icon.svg",
        width: 500,
        height: 500,
        alt: "AWS Student Builder Group at Atria Institute of Technology",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "AWS Student Builder Group | Atria Institute of Technology",
    description:
      "The official AWS Student Builder Group at Atria I.T. Join a vibrant community of student developers, cloud enthusiasts, and future architects building on the world's most comprehensive cloud platform.",
    creator: "@Dqrshan",
    images: [
      {
        url: "https://awsatria.tech/Program_Icon.svg",
        width: 500,
        height: 500,
        alt: "AWS Student Builder Group at Atria Institute of Technology",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="page-grid min-h-screen font-sans bg-(--color-bg) text-(--color-text)">
        <Navbar />
        <main className="flex min-h-screen flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
