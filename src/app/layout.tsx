import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";


const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ayush Ghosh | Agentic AI & Full Stack",
  description: "Modern portfolio of a Full Stack Designer & Developer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      <body className="bg-black text-white min-h-screen flex flex-col" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
