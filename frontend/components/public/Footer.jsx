import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#262626] text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-12">
          
          {/* Left Side: Logo & Description */}
          <div className="max-w-md flex flex-col items-start text-left">
            <div className="h-10 w-48 relative mb-6">
              <Image
                src="/images/stallion.png"
                alt="Stallion Logo"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-gray-300 mb-8 font-degular leading-relaxed text-sm">
              Six premier facilities across town, all with one mission: forge strength that extends beyond the gym.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-5">
              <a href="#" className="text-white hover:text-[#e71b4b] transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-[#e71b4b] transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C23.975 5.367 18.608.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.328-1.297C4.243 14.894 3.752 13.743 3.752 12.446c0-1.297.491-2.448 1.369-3.328C5.999 8.24 7.15 7.749 8.447 7.749c1.297 0 2.448.491 3.328 1.369.878.88 1.369 2.031 1.369 3.328 0 1.297-.491 2.448-1.369 3.328-.88.807-2.031 1.297-3.328 1.297zm8.687-6.164h-1.297V9.527c0-.245-.2-.445-.445-.445h-1.297c-.245 0-.445.2-.445.445v1.297H12.355c-.245 0-.445.2-.445.445v1.297c0 .245.2.445.445.445h1.297v1.297c0 .245.2.445.445.445h1.297c.245 0 .445-.2.445-.445V12.911h1.297c.245 0 .445-.2.445-.445V11.169c0-.245-.2-.445-.445-.445z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-[#e71b4b] transition-colors" aria-label="YouTube">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Side: Contact Info */}
          <div className="flex flex-col items-start md:items-end text-left md:text-right max-w-sm">
            <h3 className="text-lg font-bold mb-4 font-degular tracking-wide">Contact</h3>
            <p className="text-gray-300 font-degular text-sm leading-relaxed mb-1">
              Plot No. 119/120, Kukatpally Rd,beside Ramky one marvel
            </p>
            <p className="text-gray-300 font-degular text-sm leading-relaxed mb-1">
              above More Super Market, Prakasham Panthulu Nagar,
            </p>
            <p className="text-gray-300 font-degular text-sm leading-relaxed mb-4">
              Rodamestri Nagar, Hyderabad
            </p>
            <p className="text-gray-300 font-degular text-sm leading-relaxed mb-2">
              Telangana 500055
            </p>
            <p className="text-gray-300 font-degular text-sm leading-relaxed">
              support@stallionxtremefitness.com
            </p>
          </div>
          
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700/50 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 font-degular">
              © 2023 Stallion Xtreme Fitness. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200 font-degular">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200 font-degular">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;