import BranchesHero from '@/components/public/BranchesHero';
import BranchesInfoSection from '@/components/public/BranchesInfoSection';
import FAQSection from '@/components/public/FAQSection';
import EventsContactSection from '@/components/public/EventsContactSection';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';

export const metadata = {
  title: 'Our Branches | Stallion Xtreme Fitness',
  description: 'Find a Stallion Xtreme Fitness branch near you in Hyderabad.',
};

const branchesFAQs = [
  {
    question: "I'm a beginner. Will I survive the workouts?",
    answer: "Everyone starts somewhere. Our coaches scale workouts – but expect to be pushed harder than you'd push yourself."
  },
  {
    question: "Will I fit in if I'm not a pro athlete?",
    answer: "Our community includes everyone from first-timers to competitive powerlifters. What unites us is attitude, not experience. We have zero tolerance for ego or judgment – just a shared commitment to growth."
  },
  {
    question: "I work 60 hours a week. Is 2 days a week enough?",
    answer: "Absolutely. We'll design your program to maximize those two sessions, focusing on compound movements and strategic intensity. Many of our members with demanding careers see significant progress on 2x/week plans."
  },
  {
    question: "Do you force members to follow strict meal plans?",
    answer: "No. We assess your metabolism, preferences, and lifestyle before creating your nutrition strategy. Our approach focuses on sustainable habits and education rather than rigid meal plans that fail long-term."
  },
  {
    question: "Are your trainers actually qualified?",
    answer: "Our trainers complete 500+ hours of practical training beyond certification. They're required to maintain their own training practice and continue education quarterly. Most importantly, they're held accountable to your results."
  },
  {
    question: "Do you have short workouts for people in a rush?",
    answer: "Yes! Our 45-minute Express Sessions are designed for busy professionals. We're located near major tech offices, and our changing rooms have everything you need to get back to work refreshed."
  },
  {
    question: "Are your trainers just there to chat?",
    answer: "Our trainers are evaluated on your progress, not how much you like them. Every session follows a structured plan with clear objectives. We're friendly, but focused – your time and investment deserve results, not small talk."
  }
];

export default function BranchesPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <BranchesHero />
      <BranchesInfoSection />
      
      <div className="bg-zinc-900 border-t border-zinc-800">
        <FAQSection 
          faqs={branchesFAQs} 
          title="ANY QUESTION? WE GOT YOU." 
          subtitle="No fluff. No jargon. Just straight facts about our gym memberships, and training philosophy. If you're serious about results, start here."
        />
      </div>

      <EventsContactSection />
      <Footer />
    </main>
  );
}
