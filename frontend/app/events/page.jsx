import EventsSection from '@/components/public/EventsSection';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import EventsHero from '@/components/public/EventsHero';
import EventsFeatures from '@/components/public/EventsFeatures';
import FAQSection from '@/components/public/FAQSection';
import EventsContactSection from '@/components/public/EventsContactSection';
import { fetchEvents, fetchBranches } from '@/lib/api';

export const metadata = {
  title: 'Events | Stallion Xtreme Fitness',
  description: 'Join our upcoming fitness events, challenges, and workshops.',
};

const faqs = [
  {
    question: "I am a beginner. Will I survive this?",
    answer: "Everyone starts somewhere. Our coaches scale workouts – but expect to be pushed harder than you'd push yourself."
  },
  {
    question: "What is the community like?",
    answer: "Our community includes everyone from first-timers to competitive powerlifters. What unites us is attitude, not experience. We have zero tolerance for ego or judgment – just a shared commitment to growth."
  },
  {
    question: "I can only train 2 days a week. Is that enough?",
    answer: "Absolutely. We'll design your program to maximize those two sessions, focusing on compound movements and strategic intensity. Many of our members with demanding careers see significant progress on 2x/week plans."
  },
  {
    question: "Do you provide rigid meal plans?",
    answer: "No. We assess your metabolism, preferences, and lifestyle before creating your nutrition strategy. Our approach focuses on sustainable habits and education rather than rigid meal plans that fail long-term."
  },
  {
    question: "What are the qualifications of your trainers?",
    answer: "Our trainers complete 500+ hours of practical training beyond certification. They're required to maintain their own training practice and continue education quarterly. Most importantly, they're held accountable to your results."
  },
  {
    question: "Do you have options for busy professionals?",
    answer: "Yes! Our 45-minute Express Sessions are designed for busy professionals. We're located near major tech offices, and our changing rooms have everything you need to get back to work refreshed."
  },
  {
    question: "Are your trainers friendly?",
    answer: "Our trainers are evaluated on your progress, not how much you like them. Every session follows a structured plan with clear objectives. We're friendly, but focused – your time and investment deserve results, not small talk."
  }
];

export default async function EventsPage() {
  const [events, branches] = await Promise.all([
    fetchEvents(),
    fetchBranches()
  ]);

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <EventsHero />
      <EventsSection events={events} />
      <EventsFeatures />
      <FAQSection 
        faqs={faqs} 
        title="ANY QUESTION? WE GOT YOU." 
        subtitle="No fluff. No jargon. Just straight facts about our gym memberships, and training philosophy. If you're serious about results, start here."
      />
      <EventsContactSection branches={branches} />
      <Footer />
    </main>
  );
}
