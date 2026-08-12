import type { Metadata } from 'next';
import { Inter, Oswald, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-degular' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-akira' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-modernist' });

export const metadata: Metadata = {
  title: 'Stallion Xtreme Fitness | Best Gym in Hyderabad',
  description: 'Achieve your fitness goals at the best gym in Hyderabad. Stallion offers advanced equipment, transformation plans, and certified trainers.',
  keywords: 'Best gym in Hyderabad, Stallion Xtreme Fitness, Hyderabad fitness center, Weight loss gym Hyderabad, Personal trainer Hyderabad',
  authors: [{ name: 'Stallion Team', url: 'https://www.stallionxtremefitness.com' }],
  creator: 'Stallion Xtreme Fitness',
  publisher: 'Stallion Xtreme Fitness',
  robots: 'index, follow',
  openGraph: {
    title: 'Stallion Xtreme Fitness | Best Gym in Hyderabad',
    description: 'Achieve your fitness goals at the best gym in Hyderabad. Stallion offers advanced equipment, transformation plans, and certified trainers.',
    url: 'https://www.stallionxtremefitness.com',
    siteName: 'Stallion Xtreme Fitness',
    images: [
      {
        url: '/images/hero.png',
        width: 1200,
        height: 630,
        alt: 'Stallion Xtreme Fitness Hyderabad',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stallion Xtreme Fitness | Best Gym in Hyderabad',
    description: 'Top-rated gym in Hyderabad with modern facilities and expert trainers.',
    images: ['/images/hero.png'],
    creator: '@stallionfitness',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} ${inter.variable} ${oswald.variable} ${outfit.variable}`}>
        {children}
      </body>
    </html>
  );
}
