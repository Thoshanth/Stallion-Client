'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu whenever route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Events', href: '/events' },
    { name: 'Branches', href: '/branches' },
    { name: 'Stallion Classic', href: '/stallion-classic' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
          isScrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" prefetch className="flex items-center">
              <div className="h-10 w-32 relative">
                <Image
                  src="/images/stallion.png"
                  alt="Stallion Logo"
                  fill
                  sizes="(max-width: 768px) 128px, 128px"
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white focus:outline-none relative z-50 p-2"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              )}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 text-white">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  prefetch
                  className={`transition-colors duration-200 text-sm md:text-base font-modernist hover:text-primary ${
                    pathname === item.href ? 'text-primary' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Contact Button */}
            <div className="hidden md:block">
              <Link
                href="/contact"
                prefetch
                className="px-4 py-2 transition-colors duration-200 md:text-base bg-primary text-white hover:bg-primary/80"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 md:hidden flex flex-col items-center justify-center space-y-6 px-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              prefetch
              className={`text-2xl font-modernist hover:text-primary transition-colors duration-200 ${
                pathname === item.href ? 'text-primary' : 'text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/contact"
            prefetch
            className="w-full max-w-xs text-center px-6 py-3 text-xl bg-primary text-white hover:bg-primary/80 transition-colors duration-200"
          >
            Contact Us
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
