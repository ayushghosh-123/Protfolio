import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SmoothScrollProvider from "@/components/smooth-scroll-provider";
import ScrollProgressBar from "@/components/scroll-progress-bar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const siteUrl = "https://ayushghosh.dev";
const siteName = "Ayush Ghosh";
const siteDescription =
  "Full Stack & Agentic AI Developer. I build modern web applications, AI-powered workflows, and intelligent automation systems.";
const ogImage = `${siteUrl}/Images/hero_image.jpeg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ayush Ghosh | Full Stack & Agentic AI Developer",
    template: "%s | Ayush Ghosh",
  },
  description: siteDescription,
  keywords: [
    "Ayush Ghosh",
    "Full Stack Developer",
    "Agentic AI",
    "Next.js",
    "React",
    "LangChain",
    "LangGraph",
    "AI Developer",
    "Portfolio",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: "Ayush Ghosh | Full Stack & Agentic AI Developer",
    description: siteDescription,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Ayush Ghosh — Full Stack & Agentic AI Developer",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: "@AyushGhosh30804",
    creator: "@AyushGhosh30804",
    title: "Ayush Ghosh | Full Stack & Agentic AI Developer",
    description: siteDescription,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Ayush Ghosh — Full Stack & Agentic AI Developer",
      },
    ],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <ScrollProgressBar />
          <SmoothScrollProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
