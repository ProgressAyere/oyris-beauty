"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const [expandedLocation, setExpandedLocation] = useState(null);
  const [currentYear, setCurrentYear] = useState(2024);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const locations = {
    "Festac & Amuwo-Odofin": ["Festac", "Amuwo-Odofin", "Oshodi"],
    "Ikeja": ["Ikeja GRA", "Maryland", "Magodo", "Omole", "Berger"],
    "Ikorodu & Epe": ["Ikorodu", "Epe"],
    "Lekki": ["Lekki Phase 1", "Lekki Phase 2", "Ajah", "VGC"],
    "Surulere & Yaba": ["Surulere", "Yaba", "Ebute Metta"],
    "Victoria Island": ["Victoria Island", "Ikoyi", "Lagos Island"],
  };

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover opacity-40"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/bridal/bridal-video1.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content - Single Row on Desktop */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="lg:max-w-xs">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo2.svg"
                alt="Oyris Beauty"
                width={160}
                height={70}
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium makeup artistry in Lagos, Nigeria — soft glam, event, and
              bridal makeup. Making every special moment beautifully
              unforgettable.
            </p>
          </div>

          {/* Navigate */}
          <div className="lg:min-w-[140px]">
            <h3 className="text-[#FF66C4] uppercase tracking-wider text-xs font-semibold mb-4">
              Navigate
            </h3>
            <nav className="space-y-2.5">
              <Link
                href="/"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Home
              </Link>
              <Link
                href="/services"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Services
              </Link>
              <Link
                href="/portfolio"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Portfolio
              </Link>
              <Link
                href="/pricing"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Pricing
              </Link>
              <Link
                href="/reviews"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Reviews
              </Link>
              <Link
                href="/book"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Book
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="lg:min-w-[180px]">
            <h3 className="text-[#FF66C4] uppercase tracking-wider text-xs font-semibold mb-4">
              Services
            </h3>
            <nav className="space-y-2.5">
              <Link
                href="/services?service=soft-glam"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Soft Glam
              </Link>
              <Link
                href="/services?service=event-owambe"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Event/Owambe Glam
              </Link>
              <Link
                href="/services?service=photoshoot"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Photoshoot Makeup
              </Link>
              <Link
                href="/services?service=bridal"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Bridal Makeup
              </Link>
            </nav>
          </div>

          {/* Locations */}
          <div className="lg:min-w-[180px]">
            <h3 className="text-[#FF66C4] uppercase tracking-wider text-xs font-semibold mb-4">
              Locations
            </h3>
            <div className="space-y-2">
              {Object.keys(locations).map((location) => (
                <div key={location}>
                  <button
                    onClick={() =>
                      setExpandedLocation(
                        expandedLocation === location ? null : location
                      )
                    }
                    className="flex items-center justify-between w-full text-left text-gray-400 hover:text-white transition-colors text-sm py-1"
                  >
                    <span>{location}</span>
                    <svg
                      className={`w-3 h-3 transition-transform ${
                        expandedLocation === location ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {expandedLocation === location && (
                    <div className="pl-3 mt-1 space-y-1">
                      {locations[location].map((area) => (
                        <p key={area} className="text-gray-500 text-xs">
                          {area}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Get in Touch */}
          <div className="lg:min-w-[240px]">
            <h3 className="text-[#FF66C4] uppercase tracking-wider text-xs font-semibold mb-4">
              Get in Touch
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-500 text-xs mb-1.5">WhatsApp Booking</p>
                <a
                  href="https://wa.me/2348089292454"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#FF66C4] transition-colors text-sm flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  +234 808 929 2454
                </a>
              </div>

              <a
                href="mailto:priscillaoyen@gmail.com"
                className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                priscillaoyen@gmail.com
              </a>

              <p className="text-gray-400 text-sm">
                Lagos & nearby areas (Ikeja, Lekki, Victoria Island, Mainland)
              </p>

              <p className="text-gray-400 text-sm">Mon – Sat: 7:00 AM – 6:00 PM</p>

              {/* Social Media */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center hover:border-[#FF66C4] hover:text-[#FF66C4] transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center hover:border-[#FF66C4] hover:text-[#FF66C4] transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center hover:border-[#FF66C4] hover:text-[#FF66C4] transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
            <p>&copy; {currentYear} Oyris Beauty. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/2348089292454"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-[#20BA5A] transition-colors z-50"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </footer>
  );
}
