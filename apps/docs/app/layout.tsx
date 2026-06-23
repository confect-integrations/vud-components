import type { Metadata } from "next";
import { Open_Sans, Ubuntu, Geist_Mono } from "next/font/google";
// Import the library's precompiled CSS first, then the docs' own Tailwind last.
// Both ship Tailwind utilities; keeping globals.css last lets the docs page's
// responsive variants (lg:*, md:*) win over the library's base utilities.
import "@confect-development/vud-components/styles.css";
import "@confect-development/vud-components/icons.css";
import "./globals.css";

// Confect brand type: Open Sans for body, Ubuntu for headings.
const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VUD Components — Confect",
  description:
    "A React + Tailwind recreation of the Visma Unified Design (VUD) component library, by Confect.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${ubuntu.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
