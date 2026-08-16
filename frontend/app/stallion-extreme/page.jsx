import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';

export const metadata = {
  title: 'Stallion Extreme | Stallion Xtreme Fitness',
  description: 'Learn more about Stallion Extreme program.',
};

export default function StallionExtremePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-32 pb-20 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-akira uppercase tracking-wider mb-6 text-primary">Stallion Extreme</h1>
        <p className="font-degular text-gray-300 max-w-2xl mx-auto text-lg">
          Our signature high-intensity program designed to push you beyond your limits.
          Check back soon for more details!
        </p>
      </div>
      <Footer />
    </main>
  );
}
