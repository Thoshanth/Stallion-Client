import HeroSection from '@/components/public/HeroSection';
import AboutSection from '@/components/public/AboutSection';
import ProgramsSection from '@/components/public/ProgramsSection';
import BrandsSection from '@/components/public/BrandsSection';
import BranchesSection from '@/components/public/BranchesSection';
import ReviewsSection from '@/components/public/ReviewsSection';
import PricingSection from '@/components/public/PricingSection';
import FAQSection from '@/components/public/FAQSection';
import ContactSection from '@/components/public/ContactSection';
import Footer from '@/components/public/Footer';
import Navbar from '@/components/public/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <BrandsSection />
      <BranchesSection />
      <ReviewsSection />
      <PricingSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
