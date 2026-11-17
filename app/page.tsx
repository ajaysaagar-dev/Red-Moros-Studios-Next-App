import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import CameraHero from "@/components/CameraHero";
import BrandSEOSection from "@/components/BrandSEOSection";
import Footer from "@/components/Footer";
import { SEO_KEYWORDS, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Red Moros Studios (RedMoros) | Psychological Horror Thriller Game Experience",
  description:
    "Official site of Red Moros Studios (also known as RedMoros, Red Moros, and RedMorosStudios). An independent game studio crafting story-driven psychological horror thriller experiences and cinematic video games.",
  keywords: SEO_KEYWORDS,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Red Moros Studios (RedMoros) | Psychological Horror Experience",
    description:
      "Official site of Red Moros Studios (RedMoros / Red Moros / RedMorosStudios). Story-driven psychological horror thriller game experience.",
    url: SITE_URL,
  },
};

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#09090C] text-[#F7F2F3] flex flex-col selection:bg-[#FF0000] selection:text-[#09090C]">
        {/* Primary Global Navigation */}
        <Navbar />

        {/* Main Presentation based on ref.svg */}
        <main className="flex-1 flex flex-col justify-center">
          {/* Hero Section: Exact ref.svg composition */}
          <CameraHero />

          {/* Studio Dossier / Detailed SEO & Brand Section */}
          <BrandSEOSection />
        </main>

        {/* Minimalist Editorial Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
