import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="h-10 w-32 relative">
                <Image
                  src="/images/stallion.png"
                  alt="Stallion Logo"
                  fill
                  sizes="(max-width: 768px) 128px, 128px"
                  className="object-contain" />
                
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md font-degular leading-relaxed">
              Six premier facilities across Hyderabad, all with one mission: forge strength that extends beyond the gym. 
              Join 3,000+ members in their transformation journey.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                aria-label="Facebook">
                
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                aria-label="Instagram">
                
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C23.975 5.367 18.608.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.328-1.297C4.243 14.894 3.752 13.743 3.752 12.446c0-1.297.491-2.448 1.369-3.328C5.999 8.24 7.15 7.749 8.447 7.749c1.297 0 2.448.491 3.328 1.369.878.88 1.369 2.031 1.369 3.328 0 1.297-.491 2.448-1.369 3.328-.88.807-2.031 1.297-3.328 1.297zm8.687-6.164h-1.297V9.527c0-.245-.2-.445-.445-.445h-1.297c-.245 0-.445.2-.445.445v1.297H12.355c-.245 0-.445.2-.445.445v1.297c0 .245.2.445.445.445h1.297v1.297c0 .245.2.445.445.445h1.297c.245 0 .445-.2.445-.445V12.911h1.297c.245 0 .445-.2.445-.445V11.169c0-.245-.2-.445-.445-.445z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                aria-label="Twitter">
                
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                aria-label="YouTube">
                
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 font-akira uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-primary transition-colors duration-200 font-degular">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-primary transition-colors duration-200 font-degular">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/trainers" className="text-gray-300 hover:text-primary transition-colors duration-200 font-degular">
                  Trainers
                </Link>
              </li>
              <li>
                <Link href="/branches" className="text-gray-300 hover:text-primary transition-colors duration-200 font-degular">
                  Branches
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-primary transition-colors duration-200 font-degular">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-lg font-semibold mb-6 font-akira uppercase tracking-wider">Programs</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/stallion-classic" className="text-gray-300 hover:text-primary transition-colors duration-200 font-degular">
                  Stallion Classic
                </Link>
              </li>
              <li>
                <Link href="/stallion-extreme" className="text-gray-300 hover:text-primary transition-colors duration-200 font-degular">
                  Stallion Extreme
                </Link>
              </li>
              <li>
                <Link href="/stallion-academy" className="text-gray-300 hover:text-primary transition-colors duration-200 font-degular">
                  Stallion Academy
                </Link>
              </li>
              <li>
                <span className="text-gray-300 font-degular">Personal Training</span>
              </li>
              <li>
                <span className="text-gray-300 font-degular">Group Classes</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Branch Info */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h3 className="text-lg font-semibold mb-6 font-akira uppercase tracking-wider">Our Locations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-white mb-2 font-degular">GajulRamaram</h4>
              <p className="text-gray-300 font-degular">Main Branch - Since 2018</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2 font-degular">IDPL</h4>
              <p className="text-gray-300 font-degular">Chinthal Branch</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2 font-degular">Kompally</h4>
              <p className="text-gray-300 font-degular">Subash Nagar Branch</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2 font-degular">Kondapur</h4>
              <p className="text-gray-300 font-degular">Premium Location</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2 font-degular">Suchitra</h4>
              <p className="text-gray-300 font-degular">Suchitra Branch</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2 font-degular">Ashok Nagar Bhel</h4>
              <p className="text-gray-300 font-degular">BHEL Branch</p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-300 text-sm font-degular">
              © 2024 Stallion Xtreme Fitness. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-gray-300 hover:text-primary transition-colors duration-200 text-sm font-degular">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-300 hover:text-primary transition-colors duration-200 text-sm font-degular">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>);

};

export default Footer;