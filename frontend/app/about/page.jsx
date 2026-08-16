import AboutHero from '@/components/public/AboutHero';
import AboutSection from '@/components/public/AboutSection';
import VisionariesSection from '@/components/public/VisionariesSection';
import WhyChooseUsSection from '@/components/public/WhyChooseUsSection';
import FAQSection from '@/components/public/FAQSection';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';

export const metadata = {
  title: 'About Us | Stallion Xtreme Fitness',
  description: 'Learn about the history, founders, and mission of Stallion Xtreme Fitness.',
};

export default async function AboutPage() {
  // Fetch FAQs from API
  let faqs = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/faqs`, { next: { revalidate: 60 } });
    const data = await res.json();
    if (data.success) {
      faqs = data.data;
    }
  } catch (err) {
    console.error('Failed to fetch FAQs:', err);
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <AboutHero />
      <div className="py-12 bg-gray-100">
        <AboutSection hideTitle={true} />
      </div>
      <VisionariesSection />
      <WhyChooseUsSection />
      <FAQSection faqs={faqs} />
      <Footer />
    </main>
  );
}
