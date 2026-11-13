"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// `introActive` is true while the logo intro is playing (see LogoIntro.js):
// only the logo shows above the intro screen, the rest of the header waits.
export default function Header({ introActive = false }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  // The header now lives in the layout (it no longer remounts on every page),
  // so close its menus when the route changes.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }

  // ...and when a page transition starts (covers links that only change ?query)
  useEffect(() => {
    const close = () => {
      setIsMobileMenuOpen(false);
      setIsServicesOpen(false);
    };
    window.addEventListener("oyris:navigate-start", close);
    return () => window.removeEventListener("oyris:navigate-start", close);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isServicesOpen && !event.target.closest('.services-dropdown')) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isServicesOpen]);

  return (
    <header
      data-site-header=""
      data-intro={introActive ? "active" : undefined}
      className={`site-header sticky top-0 z-50 border-b border-pink-500 ${
        isScrolled ? "site-header--scrolled" : ""
      }`}
      aria-label="Primary"
    >
      {/* Logo: sits in its final spot (top-left). The intro animates this element. */}
      <Link
        data-logo=""
        className="absolute left-6 top-4 z-20 block w-[7.5rem]"
        href="/"
        aria-label="Oyris Beauty home"
      >
        <Image
          src="/logo2.svg"
          alt="Oyris Beauty"
          width={1194}
          height={525}
          priority
          sizes="120px"
          className="block h-auto w-full"
        />
      </Link>

      {/* Desktop Navigation */}
      <nav data-header-ui="" className="hidden lg:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Link href="/" className="text-gray-700 hover:text-black transition-colors">
          Home
        </Link>
        
        {/* Services Dropdown */}
        <div className="relative services-dropdown">
          <button 
            className="flex items-center gap-1 text-gray-700 hover:text-black transition-colors"
            onClick={() => setIsServicesOpen(!isServicesOpen)}
          >
            Services
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isServicesOpen && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
              <Link href="/services?service=soft-glam" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                Soft Glam
              </Link>
              <Link href="/services?service=event-owambe" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                Event/Owambe Glam
              </Link>
              <Link href="/services?service=photoshoot" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                Photoshoot Makeup
              </Link>
              <Link href="/services?service=bridal" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                Bridal Makeup
              </Link>                                 
              <Link href="/services" className="block px-4 py-2 text-[#FF66C4] hover:bg-gray-50 transition-colors font-medium">
                View All Services →
              </Link>
            </div>
          )}
        </div>

        <Link href="/portfolio" className="text-gray-700 hover:text-black transition-colors">
          Portfolio
        </Link>
        <Link href="/transformations" className="text-gray-700 hover:text-black transition-colors">
          Transformations
        </Link>
        <Link href="/pricing" className="text-gray-700 hover:text-black transition-colors">
          Pricing
        </Link>
        <Link href="/reviews" className="text-gray-700 hover:text-black transition-colors">
          Reviews
        </Link>
      </nav>

      {/* Desktop Buttons */}
      <div data-header-ui="" className="hidden lg:flex items-center gap-3 absolute right-6 top-1/2 -translate-y-1/2">
        <Link 
          href="/book?type=check" 
          className="px-6 py-2 bg-[#FF66C4] text-white rounded-full hover:bg-[#ff4db8] transition-colors font-medium"
        >
          Check Availability
        </Link>
        <Link 
          href="/book" 
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:border-gray-400 hover:text-black transition-colors font-medium"
        >
          Book
        </Link>
        <button
          className="flex min-h-10 min-w-10 items-center justify-center rounded-full text-black hover:bg-pink-50 transition-colors"
          type="button"
          aria-label="Search"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Toggle & Search */}
      <div data-header-ui="" className="lg:hidden flex items-center gap-2 absolute right-6 top-1/2 -translate-y-1/2">
        <button
          className="flex min-h-10 min-w-10 items-center justify-center rounded-full text-black hover:bg-pink-50 transition-colors"
          type="button"
          aria-label="Search"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
        </button>
        
        <button
          className="flex min-h-10 min-w-10 items-center justify-center rounded-full text-black hover:bg-pink-50 transition-colors"
          type="button"
          aria-label="Menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-pink-500 shadow-lg">
          <nav className="flex flex-col py-4">
            <Link href="/" className="px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
              Home
            </Link>
            
            {/* Mobile Services Dropdown */}
            <div>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="w-full px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-between"
              >
                <span>Services</span>
                <svg
                  className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isServicesOpen && (
                <div className="bg-[#FAF7F5] py-2">
                  <Link href="/services?service=soft-glam" className="block px-10 py-2 text-gray-600 hover:text-gray-900 transition-colors text-sm">
                    Soft Glam
                  </Link>
                  <Link href="/services?service=event-owambe" className="block px-10 py-2 text-gray-600 hover:text-gray-900 transition-colors text-sm">
                    Event/Owambe Glam
                  </Link>
                  <Link href="/services?service=photoshoot" className="block px-10 py-2 text-gray-600 hover:text-gray-900 transition-colors text-sm">
                    Photoshoot Makeup
                  </Link>
                  <Link href="/services?service=bridal" className="block px-10 py-2 text-gray-600 hover:text-gray-900 transition-colors text-sm">
                    Bridal Makeup
                  </Link>
                  <Link href="/services" className="block px-10 py-2 text-[#FF66C4] hover:text-[#ff4db8] transition-colors text-sm font-medium">
                    View All Services →
                  </Link>
                </div>
              )}
            </div>
            
            <Link href="/portfolio" className="px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
              Portfolio
            </Link>
            <Link href="/transformations" className="px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
              Transformations
            </Link>
            <Link href="/pricing" className="px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
              Pricing
            </Link>
            <Link href="/reviews" className="px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
              Reviews
            </Link>
            <Link href="/book" className="px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
              Book
            </Link>
            <div className="px-6 py-3 flex flex-col gap-2">
              <Link 
                href="/book?type=check" 
                className="px-6 py-3 bg-[#FF66C4] text-white rounded-full hover:bg-[#ff4db8] transition-colors font-medium text-center"
              >
                Check Availability
              </Link>
              <Link 
                href="/book" 
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:border-gray-400 transition-colors font-medium text-center"
              >
                Book
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
