import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  SITE_URL,
  SEO_KEYWORDS,
  DEFAULT_META,
  generateStructuredData,
} from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_META.title,
    template: DEFAULT_META.titleTemplate,
  },
  description: DEFAULT_META.description,
  keywords: SEO_KEYWORDS,
  applicationName: "Red Moros Studios",
  authors: [{ name: "Red Moros Studios", url: SITE_URL }],
  creator: "Red Moros Studios",
  publisher: "Red Moros Studios",
  category: "Video Game Development & Entertainment",
  classification: "Psychological Horror Video Games",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-US": SITE_URL,
    },
  },
  openGraph: {
    title: DEFAULT_META.title,
    description: DEFAULT_META.description,
    url: SITE_URL,
    siteName: DEFAULT_META.siteName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Red Moros Studios (RedMoros / RedMorosStudios) - Story-Driven Psychological Horror Thriller Game Experience",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: DEFAULT_META.twitterHandle,
    creator: DEFAULT_META.twitterHandle,
    title: DEFAULT_META.title,
    description: DEFAULT_META.description,
    images: [`${SITE_URL}/twitter-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  other: {
    "theme-color": "#09090C",
    "color-scheme": "dark",
    "apple-mobile-web-app-title": "Red Moros Studios",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    bingbot: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090C",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = generateStructuredData();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head>
        {/* Extreme Detailed Structured Data (JSON-LD) for Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#09090C] text-[#F7F2F3] font-sans selection:bg-[#FF3348] selection:text-[#09090C]">
        {children}
      </body>
    </html>
  );
}
