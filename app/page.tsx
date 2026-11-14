import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import CameraHero from "@/components/CameraHero";
import Footer from "@/components/Footer";

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
        </main>

        {/* Minimalist Editorial Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
