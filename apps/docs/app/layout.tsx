import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// Import the library's precompiled CSS first, then the docs' own Tailwind last.
// Both ship Tailwind utilities; keeping globals.css last lets the docs page's
// responsive variants (lg:*, md:*) win over the library's base utilities.
import "@confect-development/vud-components/styles.css";
import "@vismaux/vud-icons/dist/css/vud-icons.min.css";
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
  title: "VUD Components — React component library",
  description:
    "A React + Tailwind recreation of the Visma Unified Design (VUD) component library.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
