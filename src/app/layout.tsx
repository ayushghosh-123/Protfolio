import type { Metadata } from "next";
import { Onest, Figtree, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SmoothScrollProvider from "@/components/smooth-scroll-provider";
import ScrollProgressBar from "@/components/scroll-progress-bar";


const onest = Onest({ variable: "--font-onest", subsets: ["latin"], display: "swap" });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ayush Ghosh | Agentic AI & Full Stack",
  description: "Modern portfolio of a Full Stack Designer & Developer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${onest.variable} ${figtree.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      <body className="bg-background text-white min-h-screen flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <ScrollProgressBar />
          <SmoothScrollProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer/>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
