'use client';

import Image from 'next/image';

const AboutHero = () => {
  return (
    <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-black pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.png" // We can use the same hero image or another gym image
          alt="About Stallion Xtreme Fitness"
          fill
          className="object-cover object-center opacity-40"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-20 text-center">
        <div className="max-w-3xl mx-auto animate-fade-in-up">
          <h1 className="font-akira text-3xl md:text-5xl font-extrabold uppercase tracking-wider mb-4 text-white">
            ABOUT US
          </h1>
          <div className="w-16 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-lg md:text-xl text-gray-200 font-degular">
            Building bodies. Building lifestyles.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
