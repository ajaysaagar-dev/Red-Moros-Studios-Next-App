import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "RED MOROS STUDIOS // Psychological Horror Thriller Experience",
  description:
    "A story-driven psychological horror thriller game experience with best visuals. Coming soon from Red Moros Studios.",
  keywords: [
    "Red Moros Studios",
    "Psychological Horror",
    "Story-Driven Thriller",
    "Horror Game",
    "Cinematic Visuals",
    "Best Visuals",
    "Coming Soon",
  ],
  authors: [{ name: "Red Moros Studios" }],
  openGraph: {
    title: "RED MOROS STUDIOS // Psychological Horror Thriller Experience",
    description:
      "A story-driven psychological horror thriller game experience with best visuals. Coming soon.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#09090C] text-[#F7F2F3] font-sans selection:bg-[#FF3348] selection:text-[#09090C]">
        {children}
      </body>
    </html>
  );
}
