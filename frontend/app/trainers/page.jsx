import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

async function getTrainers() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/trainers`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching trainers:', error);
    return [];
  }
}

export default async function TrainersPage() {
  const trainers = await getTrainers();

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-20 bg-[#262626] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-akira tracking-wider uppercase">
              OUR TRAINERS
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-degular">
              Meet our elite team of certified fitness professionals dedicated to your transformation journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainers.map((trainer) => (
              <div key={trainer._id} className="bg-gradient-to-br from-black/40 to-black/20 rounded-lg p-6 hover:scale-105 transition-all duration-300 border border-gray-700/50">
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                  {trainer.profileImage ? (
                    <Image
                      src={trainer.profileImage}
                      alt={trainer.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary text-3xl font-bold font-akira">
                      {trainer.name.charAt(0)}
                    </div>
                  )}
                </div>
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2 font-akira text-white">{trainer.name}</h3>
                  <p className="text-primary font-semibold mb-3 font-degular">{trainer.designation}</p>
                  
                  {trainer.specialization && trainer.specialization.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {trainer.specialization.slice(0, 3).map((spec, index) => (
                          <span key={index} className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full font-modernist">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <p className="text-gray-400 text-sm mb-4 font-degular">{trainer.experience} years experience</p>
                  
                  {trainer.branch && (
                    <p className="text-gray-300 text-sm font-modernist">📍 {trainer.branch.name}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {trainers.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg font-degular">No trainers available at the moment.</p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </main>
  );
}