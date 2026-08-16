import ContactSection from '@/components/public/ContactSection';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { fetchBranches } from '@/lib/api';

export const metadata = {
  title: 'Contact Us | Stallion Xtreme Fitness',
  description: 'Get in touch with Stallion Xtreme Fitness. Find our branches, contact information, and send us a message.',
};

export default async function ContactPage() {
  const branches = await fetchBranches();

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 bg-black">
        <ContactSection branches={branches} />
      </div>
      <Footer />
    </main>
  );
}
