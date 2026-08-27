import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { PackShowcase } from "@/components/home/PackShowcase";
import { OffersSection } from "@/components/home/OffersSection";
import { PrizeDrawSection } from "@/components/home/PrizeDrawSection";
import { InteractiveChecklist } from "@/components/home/InteractiveChecklist";
import { VideoGuidesSection } from "@/components/home/VideoGuidesSection";
import { MagazineSection } from "@/components/home/MagazineSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FeedbackSection } from "@/components/home/FeedbackSection";
import { PartnerWithUsSection } from "@/components/home/PartnerWithUsSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 selection:bg-orange-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <PackShowcase />
        <OffersSection />
        <PrizeDrawSection />
        <InteractiveChecklist />
        <VideoGuidesSection />
        <MagazineSection />
        <TestimonialsSection />
        <FeedbackSection />
        <PartnerWithUsSection />
      </main>
      <Footer />
    </div>
  );
}
