import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import FAQSection from '@/components/public/FAQSection';
import ContactSection from '@/components/public/ContactSection';
import GymVideoSection from '@/components/public/GymVideoSection';
import Image from 'next/image';
import Link from 'next/link';
import { fetchBranchBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin, Phone, Mail, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const branch = await fetchBranchBySlug(slug);
  if (!branch) return { title: 'Branch Not Found' };
  return {
    title: `${branch.name} Branch | Stallion Xtreme Fitness`,
    description: `Discover our ${branch.name} branch. See our facilities, trainers, and programs available at this location.`,
  };
}

// Helper to convert 24h to 12h AM/PM
function formatTime(time24) {
  if (!time24) return '';
  const [h, m] = time24.split(':');
  const hours = parseInt(h, 10);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${m} ${ampm}`;
}

// Format opening hours to Weekdays/Weekends strings
function formatOpeningHours(openingHours) {
  if (!openingHours) return [];
  const display = [];
  
  const wd = openingHours.monday;
  if (wd && !wd.closed) {
    display.push(`Weekdays: ${formatTime(wd.open)} - ${formatTime(wd.close)}`);
  }
  
  const we = openingHours.saturday;
  if (we && !we.closed) {
    display.push(`Weekends: ${formatTime(we.open)} - ${formatTime(we.close)}`);
  }
  
  return display;
}

export default async function BranchDetailPage({ params }) {
  const { slug } = await params;
  const branch = await fetchBranchBySlug(slug);

  if (!branch) {
    notFound();
  }

  const hoursArray = formatOpeningHours(branch.openingHours);

  const heroImage =
    branch.image ||
    (branch.images && branch.images.length > 0 ? branch.images[0] : null) ||
    '/images/hero.png';
    
  // Clean up branch name for display
  const shortName = branch.name.replace("Stallion Xtreme Fitness - ", "");

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Custom Top Bar */}
      <div className="bg-black w-full py-4 px-4 md:px-8 flex items-center border-b border-gray-900 sticky top-0 z-50">
        <Link href="/branches" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm font-degular group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to All Branches
        </Link>
      </div>

      {/* Hero */}
      <div className="relative h-[50vh] md:h-[60vh] w-full bg-black">
        
        <Image
          src={heroImage}
          alt={`${branch.name} Branch`}
          fill
          className="object-cover opacity-50"
          unoptimized={true}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center px-4 z-20">
          <div className="text-center flex flex-col items-center">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-akira font-bold uppercase tracking-widest mb-4 text-white drop-shadow-xl">
              STALLION XTREME FITNESS
            </h1>
            <p className="text-lg md:text-3xl font-degular font-medium text-gray-200 mb-6 drop-shadow-md">
              {shortName}
            </p>
            {branch.badge && (
               <span className="bg-[#e71b4b] text-white px-5 py-2 rounded font-degular font-medium uppercase tracking-wider text-sm shadow-lg">
                 {branch.badge}
               </span>
            )}
          </div>
        </div>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="font-akira text-2xl font-bold uppercase mb-6 text-black">
                About This Location
              </h3>
              <p className="text-black mb-6 leading-relaxed font-medium">
                {branch.description || `Welcome to ${branch.name}. Experience our top-tier facilities, dedicated trainers, and transformative programs designed for your fitness journey.`}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-black font-medium">
                  <MapPin className="w-5 h-5 text-[#e71b4b] shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span>{branch.address}</span>
                </div>
                {branch.phone && (
                  <div className="flex items-center gap-3 text-black font-medium">
                    <Phone className="w-5 h-5 text-[#e71b4b] shrink-0" strokeWidth={1.5} />
                    <span>{branch.phone}</span>
                  </div>
                )}
                {branch.email && (
                  <div className="flex items-center gap-3 text-black font-medium">
                    <Mail className="w-5 h-5 text-[#e71b4b] shrink-0" strokeWidth={1.5} />
                    <span>{branch.email}</span>
                  </div>
                )}
                {hoursArray.length > 0 && (
                  <div className="flex items-start gap-3 text-black font-medium">
                    <Clock className="w-5 h-5 text-[#e71b4b] shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div className="flex flex-col">
                      {hoursArray.map((hourString, i) => (
                        <div key={i}>{hourString}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-lg h-[350px] md:h-[450px]">
              {(branch.mapUrl || branch.googleMapsUrl) ? (
                <iframe
                  src={branch.mapUrl || branch.googleMapsUrl}
                  width="100%"
                  height="100%"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 font-degular">
                  Map not available
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 md:py-20 max-w-7xl space-y-24">
        
        {/* FACILITIES & EQUIPMENT */}
        {branch.programs && branch.programs.length > 0 && (
          <div className="space-y-12">
            <h2 className="text-3xl md:text-4xl font-akira font-extrabold uppercase tracking-widest text-black text-center">
              FACILITIES & EQUIPMENT
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {branch.programs.map((program) => (
                <div 
                  key={program._id}
                  className="bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl p-5 flex items-center gap-4 border border-gray-100 shadow-sm"
                >
                  <div className="w-2.5 h-2.5 bg-[#e71b4b] rounded-full shrink-0" />
                  <span className="font-degular text-lg text-black font-medium">{program.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INSIDE OUR GYM VIDEO SECTION */}
        <div className="-mx-4 md:-mx-8">
          <GymVideoSection branchSlug={slug} />
        </div>

        {/* OUR EXPERT TRAINERS */}
        {branch.trainers && branch.trainers.length > 0 && (
          <div className="space-y-12">
            <h2 className="text-3xl md:text-4xl font-akira font-extrabold uppercase tracking-widest text-black text-center">
              OUR EXPERT TRAINERS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {branch.trainers.map((trainer) => (
                <div 
                  key={trainer._id} 
                  className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 relative group transition-all duration-300 flex flex-col"
                >
                  {/* Red diagonal accent in top-left */}
                  <div className="absolute top-0 left-0 w-0 h-0 border-t-[70px] border-r-[70px] border-t-[#e71b4b] border-r-transparent z-10" />
                  
                  {/* Experience pill in top-right */}
                  {trainer.experience && (
                    <div className="absolute top-3 right-3 z-10 bg-[#e71b4b] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      {trainer.experience} years
                    </div>
                  )}
                  
                  <div className="relative w-full h-[320px] bg-gray-100 shrink-0">
                     <Image
                        src={trainer.profileImage || '/images/hero.png'}
                        alt={trainer.name}
                        fill
                        className="object-cover object-top"
                     />
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6 text-left flex-1 flex flex-col justify-start">
                    <h3 className="font-bold text-black uppercase tracking-wide mb-1.5 text-lg group-hover:text-[#e71b4b] transition-colors">
                      {trainer.name}
                    </h3>
                    <p className="text-[#e71b4b]/80 text-sm mb-4">
                      {trainer.designation}
                    </p>
                    <div className="mt-auto flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#e71b4b] opacity-80" />
                      <span className="text-gray-500 text-sm font-medium">
                        {trainer.experience ? `${trainer.experience} years Experience` : 'Experienced Trainer'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Bottom Hover Border (like in screenshot) */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#e71b4b] to-pink-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        )}
        
      </div>

      <FAQSection />
      <ContactSection branches={[branch]} />
      
      <Footer />
    </main>
  );
}
