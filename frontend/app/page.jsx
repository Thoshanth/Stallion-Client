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
import { fetchPrograms, fetchBranches, fetchReviews, fetchFAQs, fetchPricingPlans } from '@/lib/api';

export default async function Home() {
  const [programs, branches, reviews, faqs, pricingPlans] = await Promise.all([
  fetchPrograms(),
  fetchBranches(),
  fetchReviews(),
  fetchFAQs(),
  fetchPricingPlans()]
  );
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProgramsSection programs={programs} />
      <BrandsSection />
      <BranchesSection branches={branches} />
      <ReviewsSection reviews={reviews} />
      <PricingSection pricingPlans={pricingPlans} />
      <FAQSection faqs={faqs} />
      <ContactSection />
      <Footer />
    </main>);

}