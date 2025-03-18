import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Calculator App",
  description: "A multi-brand calculator app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}>
        {/* Navbar */}
        <nav className="bg-black text-white p-4 flex justify-center space-x-6">
          <Link href="/apple" className="hover:text-gray-400">Apple Calculator</Link>
          <Link href="/samsung" className="hover:text-gray-400">Samsung Calculator</Link>
          <Link href="/xiaomi" className="hover:text-gray-400">Xiaomi Calculator</Link>
        </nav>

        {/* Page Content */}
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
