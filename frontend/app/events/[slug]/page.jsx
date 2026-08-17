import { notFound } from 'next/navigation';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';

export const dynamic = 'force-dynamic';

async function getEvent(slug) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/events/${slug}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
}

export default async function EventPage({ params }) {
  const event = await getEvent(params.slug);
  
  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="pt-20 bg-black text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-akira tracking-wider uppercase">
              {event.title}
            </h1>
            
            <div className="mb-8">
              <p className="text-xl text-gray-300 font-degular">
                {event.description}
              </p>
            </div>
            
            {event.date && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 font-akira text-primary">EVENT DETAILS</h2>
                <p className="text-lg font-degular">
                  <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                </p>
                {event.time && (
                  <p className="text-lg font-degular">
                    <strong>Time:</strong> {event.time}
                  </p>
                )}
                {event.branch && (
                  <p className="text-lg font-degular">
                    <strong>Location:</strong> {event.branch.name}
                  </p>
                )}
              </div>
            )}
            
            {event.registrationUrl && (
              <div className="mt-12">
                <a 
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary hover:bg-primary/80 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 inline-block font-modernist"
                >
                  Register Now
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}