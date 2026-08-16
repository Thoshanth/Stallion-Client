import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import Image from 'next/image';
import { fetchBranchBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const branch = await fetchBranchBySlug(slug);
  if (!branch) return { title: 'Branch Not Found' };
  return {
    title: `${branch.name} Branch | Stallion Xtreme Fitness`,
    description: `Discover our ${branch.name} branch. See our facilities, trainers, and programs available at this location.`,
  };
}

// Convert openingHours object {monday:{open,close,closed},...} to a display array
function formatOpeningHours(openingHours) {
  if (!openingHours) return [];
  const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  return dayOrder
    .filter((day) => openingHours[day])
    .map((day) => ({
      day: day.charAt(0).toUpperCase() + day.slice(1),
      open: openingHours[day].open,
      close: openingHours[day].close,
      closed: openingHours[day].closed,
    }));
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

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[50vh] md:h-[60vh] w-full pt-20">
        <Image
          src={heroImage}
          alt={`${branch.name} Branch`}
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-akira font-bold uppercase tracking-wider mb-4">
              {branch.name} Branch
            </h1>
            <p className="text-base md:text-xl font-degular max-w-2xl mx-auto text-gray-300">
              {branch.address}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Branch Details */}
            <section className="bg-gray-900 rounded-lg p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-akira uppercase tracking-wider mb-6">
                Branch Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-degular">
                <div>
                  <h3 className="text-primary font-semibold mb-2">Location</h3>
                  <p className="text-gray-300">{branch.address}</p>
                </div>
                <div>
                  <h3 className="text-primary font-semibold mb-2">Contact</h3>
                  {branch.phone && <p className="text-gray-300">{branch.phone}</p>}
                  {branch.email && <p className="text-gray-300">{branch.email}</p>}
                </div>

                {hoursArray.length > 0 && (
                  <div className="sm:col-span-2">
                    <h3 className="text-primary font-semibold mb-3">Opening Hours</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-300">
                      {hoursArray.map((hours) => (
                        <div
                          key={hours.day}
                          className="flex justify-between border-b border-gray-800 pb-2 text-sm"
                        >
                          <span>{hours.day}</span>
                          <span>
                            {hours.closed ? 'Closed' : `${hours.open} – ${hours.close}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Programs */}
            {branch.programs && branch.programs.length > 0 && (
              <section>
                <h2 className="text-xl md:text-2xl font-akira uppercase tracking-wider mb-6">
                  Available Programs
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {branch.programs.map((program) => (
                    <div
                      key={program._id}
                      className="bg-gray-900 rounded-lg p-5 md:p-6 hover:border-primary border border-transparent transition-colors"
                    >
                      <h3 className="text-lg md:text-xl font-bold font-akira uppercase tracking-wider mb-2">
                        {program.name}
                      </h3>
                      <p className="text-gray-400 font-degular text-sm line-clamp-3">
                        {program.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:space-y-8">

            {/* Map */}
            {(branch.mapUrl || branch.googleMapsUrl) && (
              <div className="bg-gray-900 rounded-lg overflow-hidden h-[260px] md:h-[300px]">
                <iframe
                  src={branch.mapUrl || branch.googleMapsUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}

            {/* Trainers */}
            {branch.trainers && branch.trainers.length > 0 && (
              <section className="bg-gray-900 rounded-lg p-5 md:p-6">
                <h2 className="text-lg md:text-xl font-akira uppercase tracking-wider mb-5">
                  Our Trainers
                </h2>
                <div className="space-y-4">
                  {branch.trainers.map((trainer) => (
                    <div key={trainer._id} className="flex items-center gap-4">
                      <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={trainer.profileImage || '/images/hero.png'}
                          alt={trainer.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold font-degular text-white">{trainer.name}</h4>
                        <p className="text-primary text-sm font-degular">{trainer.designation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
