import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import Image from 'next/image';

async function getPrograms() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/programs`, {
      next: { revalidate: 300 }
    });
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching programs:', error);
    return [];
  }
}

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-20 bg-[#262626] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-akira tracking-wider uppercase">
              TRAINING PROGRAMS
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-degular">
              Discover our comprehensive fitness programs designed for every level and goal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <div key={program._id} className="bg-gradient-to-br from-black/40 to-black/20 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 border border-gray-700/50">
                {program.image && (
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20">
                    <Image
                      src={program.image}
                      alt={program.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 font-akira text-white">{program.name}</h3>
                  <p className="text-gray-400 mb-4 font-degular">{program.description}</p>
                  
                  {program.features && program.features.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-primary font-semibold mb-2 font-akira">Features:</h4>
                      <ul className="text-sm text-gray-300 space-y-1 font-modernist">
                        {program.features.slice(0, 4).map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <button className="w-full bg-primary hover:bg-primary/80 text-white py-3 transition-all duration-300 font-modernist font-semibold">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {programs.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg font-degular">No programs available at the moment.</p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </main>
  );
}