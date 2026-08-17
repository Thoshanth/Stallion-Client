import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';

async function getPricingPlans() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/pricing`, {
      next: { revalidate: 300 }
    });
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching pricing plans:', error);
    return [];
  }
}

export default async function PricingPage() {
  const pricingPlans = await getPricingPlans();

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-20 bg-[#262626] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-akira tracking-wider uppercase">
              PRICING PLANS
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-degular">
              Choose the perfect plan for your fitness journey. All plans include access to premium equipment and expert guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div 
                key={plan._id} 
                className={`rounded-lg p-8 border transition-all duration-300 hover:scale-105 ${
                  plan.highlighted 
                    ? 'bg-gradient-to-br from-primary/20 to-secondary/20 border-primary' 
                    : 'bg-gradient-to-br from-black/40 to-black/20 border-gray-700/50'
                }`}
              >
                {plan.highlighted && (
                  <div className="text-center mb-4">
                    <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold font-modernist">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2 font-akira text-white">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-primary font-akira">₹{plan.price}</span>
                    <span className="text-gray-400 font-degular">/{plan.billingPeriod}</span>
                  </div>
                  <p className="text-gray-400 font-degular">{plan.description}</p>
                </div>

                {plan.features && plan.features.length > 0 && (
                  <div className="mb-8">
                    <ul className="space-y-3 text-gray-300 font-modernist">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className="text-primary mr-3">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button className={`w-full py-3 font-semibold transition-all duration-300 font-modernist ${
                  plan.highlighted
                    ? 'bg-primary hover:bg-primary/80 text-white'
                    : 'bg-gray-800 border border-gray-600 text-white hover:bg-gray-700'
                }`}>
                  Choose Plan
                </button>
              </div>
            ))}
          </div>

          {pricingPlans.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg font-degular">No pricing plans available at the moment.</p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </main>
  );
}