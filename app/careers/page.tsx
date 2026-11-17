import type { Metadata } from "next";
import CareersClient from "@/components/CareersClient";
import { SITE_URL, DEFAULT_META } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Careers & Open Positions | Red Moros Studios (RedMoros / RedMorosStudios)",
  description:
    "Join Red Moros Studios (also known as RedMoros and RedMorosStudios). Explore open positions, technical roles, narrative positions, and career opportunities in psychological horror video game development.",
  keywords: [
    "Red Moros Careers",
    "RedMoros Jobs",
    "Red Moros Studios Careers",
    "RedMorosStudios Careers",
    "Red Moros Studio Hiring",
    "Game Development Jobs",
    "Psychological Horror Game Studio",
    "Indie Game Developer Careers",
    "Red Moros",
    "RedMoros",
  ],
  alternates: {
    canonical: `${SITE_URL}/careers`,
  },
  openGraph: {
    title: "Careers | Red Moros Studios (RedMoros / RedMorosStudios)",
    description:
      "Join the team at Red Moros Studios (RedMoros). Explore career opportunities building story-driven psychological horror games.",
    url: `${SITE_URL}/careers`,
    siteName: DEFAULT_META.siteName,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Careers at Red Moros Studios (RedMoros / RedMorosStudios)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers & Opportunities | Red Moros Studios (RedMoros)",
    description:
      "Explore open positions at Red Moros Studios (RedMoros / RedMorosStudios). Build the future of psychological horror thriller games.",
    images: [`${SITE_URL}/twitter-image.png`],
  },
};

export default function CareersPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Careers",
        item: `${SITE_URL}/careers`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CareersClient />
    </>
  );
}
