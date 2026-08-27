import { Navbar } from "./_components/Navbar";
import { Hero } from "./_components/Hero";
import { PackShowcase } from "./_components/PackShowcase";
import { OffersSection } from "./_components/OffersSection";
import { PrizeDrawSection } from "./_components/PrizeDrawSection";
import { InteractiveChecklist } from "./_components/InteractiveChecklist";
import { VideoGuidesSection } from "./_components/VideoGuidesSection";
import { MagazineSection } from "./_components/MagazineSection";
import { TestimonialsSection } from "./_components/TestimonialsSection";
import { FeedbackSection } from "./_components/FeedbackSection";
import { PartnerWithUsSection } from "./_components/PartnerWithUsSection";
import { Footer } from "./_components/Footer";

export default function RedesignPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
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
    </>
  );
}
