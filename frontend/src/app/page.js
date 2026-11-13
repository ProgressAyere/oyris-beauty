"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Transformation Slider Component
function TransformationSlider({ before, after, title }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (e) => {
    if (!isDragging && e.type !== "click") return;

    const container = e.currentTarget.getBoundingClientRect();
    const position = ((e.clientX - container.left) / container.width) * 100;
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const container = e.currentTarget.getBoundingClientRect();
    const position = ((touch.clientX - container.left) / container.width) * 100;
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  return (
    <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl bg-gray-200 select-none">
      {/* After Image (Full) */}
      <div className="absolute inset-0">
        <Image
          src={after}
          alt={`${title} - After`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
          After
        </div>
      </div>

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={before}
          alt={`${title} - Before`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
          Before
        </div>
      </div>

      {/* Slider Control */}
      <div
        className="absolute inset-0 cursor-ew-resize"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMove}
        onClick={handleMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
      >
        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Slider Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// FAQ Item Component
function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-gray-900 font-medium pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-[#FF66C4] flex-shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
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
      {isOpen && (
        <div className="px-6 pb-5">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

// Portfolio Gallery Modal Component
function PortfolioModal({ images, isOpen, onClose, initialIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (!isOpen) return null;

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white text-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Previous Button */}
      <button
        onClick={goToPrev}
        className="absolute left-4 text-white hover:text-gray-300 transition-colors"
      >
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Image */}
      <div className="relative w-full max-w-4xl h-[80vh] mx-4">
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].title}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
        {/* Image Title */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <h3 className="text-white text-xl font-serif">{images[currentIndex].title}</h3>
          <p className="text-gray-300 text-sm">{images[currentIndex].category}</p>
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="absolute right-4 text-white hover:text-gray-300 transition-colors"
      >
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Thumbnail Strip */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-full px-4">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden ${
              idx === currentIndex ? "ring-2 ring-white" : "opacity-50 hover:opacity-100"
            }`}
          >
            <Image
              src={img.src}
              alt={img.title}
              fill
              className="object-cover"
              sizes="64px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryStartIndex, setGalleryStartIndex] = useState(0);

  const transformations = [
    {
      id: 1,
      before: "/bridal/balikis-before.jpg",
      after: "/bridal/balikis-after.JPEG",
      title: "Bridal Transformation",
    },
    {
      id: 2,
      before: "/bridal/edo-bride-before.jpg",
      after: "/bridal/edo-bride-after.PNG",
      title: "Traditional Bridal Glam",
    },
    {
      id: 3,
      before: "/everyday-look/everyday-look-before.jpg",
      after: "/everyday-look/everyday-look-after.jpg",
      title: "Soft Glam Transformation",
    },
  ];

  const portfolioImages = [
    { src: "/bridal/bride1.JPEG", title: "Elegant Bridal Glow", category: "Bridal" },
    { src: "/birthday/birthday-glam.jpg", title: "Warm Birthday Glow", category: "Event" },
    { src: "/everyday-look/everyday-look4.jpg", title: "Camera Ready Perfection", category: "Photoshoot" },
    { src: "/bridal/balikis-after.JPEG", title: "Classic Bridal Beauty", category: "Bridal" },
    { src: "/bridal/edo-bride-after.PNG", title: "Traditional Bridal Elegance", category: "Bridal" },
    { src: "/everyday-look/everyday-look2.png", title: "Warm Glow Soft Glam", category: "Soft Glam" },
    { src: "/everyday-look/everyday-look3.png", title: "Natural Everyday Beauty", category: "Soft Glam" },
    
    { src: "/everyday-look/everyday-look-after.jpg", title: "Soft Glam Perfection", category: "Soft Glam" },
    { src: "/birthday/birthday-makeover1.jpg", title: "Birthday Celebration Glam", category: "Event Glam" },
    { src: "/birthday/birthday-makeover2.jpg", title: "Party Ready Glam", category: "Event Glam" },
    { src: "/birthday/birthday-makeover3.jpg", title: "Sophisticated Event Look", category: "Event Glam" },
    { src: "/birthday/birthday-makeover4-after.jpg", title: "Birthday Makeover", category: "Event Glam" },
  ];

  const openGallery = (index = 0) => {
    setGalleryStartIndex(index);
    setIsGalleryOpen(true);
  };

  const faqs = [
    {
      id: 1,
      question: "How early should I book my makeup session?",
      answer:
        "For weddings, I recommend booking 3–6 months ahead — popular dates in Lagos fill quickly. Events and birthdays can often be secured 2–4 weeks out, but earlier is always safer. If your date is soon, message me on WhatsApp and I'll check availability honestly.",
    },
    {
      id: 2,
      question: "Is a deposit required to confirm my booking?",
      answer:
        "Yes, a deposit is required to secure your date. This ensures your time slot is reserved exclusively for you. The remaining balance is due on or before your session date. Deposit details will be provided when you book.",
    },
    {
      id: 3,
      question: "What's the difference between soft glam and full glam?",
      answer:
        "Soft glam is natural, polished, and perfect for daytime events — subtle contouring, neutral tones, and a fresh finish. Full glam is bold and dramatic with heavier coverage, sculpted features, statement eyes, and long-lasting finish ideal for evening events and photoshoots.",
    },
    {
      id: 4,
      question: "Do you offer home service in Lagos?",
      answer:
        "Yes! I offer mobile makeup services across Lagos including Ikeja, Lekki, Victoria Island, Mainland areas, and more. Travel fees apply based on location and distance. Contact me with your event location for a custom quote.",
    },
  ];

  return (
    <div className="site-shell">
      <main className="home-stage" aria-label="Oyris Beauty home">
        {/* Desktop: Split screen | Mobile: Stacked */}
        <div className="flex min-h-[calc(100vh-5rem)] flex-col md:flex-row">
          {/* Video Section */}
          <section className="relative h-[100vh] w-full overflow-hidden bg-black md:h-[calc(100vh-5rem)] md:w-1/2">
            <video
              className="block h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              aria-label="Bridal makeup showcase video"
            >
              <source src="/home.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </section>

          {/* About Section */}
          <section className="flex flex-1 items-center justify-center bg-[#FAF7F5] px-6 py-12 md:h-[calc(100vh-5rem)] md:w-1/2 md:px-12 md:py-16 lg:px-16 lg:py-20">
            <div className={`w-full max-w-2xl antialiased ${inter.className}`}>
              <h1 className="mb-6 text-3xl font-serif leading-tight text-black md:text-5xl lg:text-6xl">
                About Oyris Beauty
              </h1>
              <div className="max-w-prose space-y-6 text-base font-serif leading-relaxed text-gray-700 md:text-lg">
                <p>
                  Oyris Beauty offers professional makeup and hairstyling
                  services for weddings, birthdays, photoshoots, and other
                  special occasions. We specialise in creating beautiful looks,
                  from soft glam to bold transformations, with convenient mobile
                  services tailored to your needs.
                </p>
                <p>
                  Our goal is to help every client look beautiful, feel
                  confident, and express their unique style.
                </p>
              </div>
              <p className="mt-8 text-xl font-medium italic text-[#FF66C4] md:text-2xl lg:text-3xl">
                stay beautiful
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Meet the Artist Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Text Content - Left */}
            <div className="flex-1 lg:pr-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 text-gray-900">
                Meet the Artist
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                I'm the creative mind behind Oyris Beauty. Beautifying people and making them feel confident has always been my passion. I love using my creativity to enhance beauty and make every person feel special.
              </p>
            </div>

            {/* Image - Right */}
            <div className="flex-1 relative aspect-[3/4] w-full max-w-md rounded-2xl overflow-hidden">
              <Image
                src="/ceo/CEO.jpg"
                alt="Meet the Artist - Oyris Beauty"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Transformations Section */}
      <section className="py-20 px-4 bg-[#FAF7F5]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-sm text-[#FF66C4] tracking-widest uppercase mb-4">
              TRANSFORMATIONS
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">
              From Fresh Skin to a Finish That Holds
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every session begins with thoughtful skin prep, then builds into a
              polished look that enhances your features — never masks them.
            </p>
          </div>

          {/* Transformations Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {transformations.map((item) => (
              <div key={item.id} className="group">
                <TransformationSlider
                  before={item.before}
                  after={item.after}
                  title={item.title}
                />
                <h3 className="mt-4 text-center text-lg font-serif text-gray-900">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="inline-block bg-[#FF66C4] text-white px-8 py-3 rounded-full font-medium hover:bg-[#ff4db8] transition-colors"
            >
              Book Your Transformation
            </Link>
            <Link
              href="/transformations"
              className="inline-block bg-transparent border-2 border-[#FF66C4] text-[#FF66C4] px-8 py-3 rounded-full font-medium hover:bg-[#FF66C4] hover:text-white transition-colors"
            >
              See More Transformations
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-sm text-[#FF66C4] tracking-widest uppercase mb-4">
              PORTFOLIO
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4">
              Looks Created for Real Celebrations
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every face tells a different story. Browse bridal, soft glam, and event looks — then imagine yours.
            </p>
          </div>

          {/* Portfolio Grid - 3 visible images + overlay */}
          <div className="grid grid-cols-2 gap-4 max-w-5xl mx-auto">
            {/* First large image */}
            <button
              onClick={() => openGallery(0)}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer"
            >
              <Image
                src={portfolioImages[0].src}
                alt={portfolioImages[0].title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </button>

            {/* Right column - 2 images stacked */}
            <div className="flex flex-col gap-4">
              {/* Second image */}
              <button
                onClick={() => openGallery(1)}
                className="relative aspect-[3/2] rounded-2xl overflow-hidden group cursor-pointer"
              >
                <Image
                  src={portfolioImages[1].src}
                  alt={portfolioImages[1].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </button>

              {/* Third image with overlay */}
              <button
                onClick={() => openGallery(2)}
                className="relative aspect-[3/2] rounded-2xl overflow-hidden group cursor-pointer"
              >
                <Image
                  src={portfolioImages[2].src}
                  alt={portfolioImages[2].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                {/* Overlay with +X more */}
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white group-hover:bg-black/70 transition-colors">
                  <span className="text-4xl font-serif mb-2">+{portfolioImages.length - 3}</span>
                  <span className="text-sm tracking-wider">Explore more looks</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Modal */}
      <PortfolioModal
        images={portfolioImages}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        initialIndex={galleryStartIndex}
      />

      {/* Pricing Packages Section */}
      <section className="py-20 px-4 bg-[#FAF7F5]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-sm text-[#FF66C4] tracking-widest uppercase mb-4">
              PRICING
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4">
              Packages That Help You Plan Ahead
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Transparent starting prices for every service, your final quote depends on your event details.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Soft Glam Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm relative border border-transparent hover:border-[#FF66C4] transition-all">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF66C4] text-white text-xs px-4 py-1 rounded-full font-medium">
                MOST BOOKED
              </div>
              <h3 className="text-2xl font-serif mb-3 text-center">
                Soft Glam
              </h3>
              <p className="text-sm text-gray-600 mb-6 text-center min-h-[3rem]">
                A polished look perfect for everyday elegance and special occasions.
              </p>
              <div className="text-center mb-6">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  FROM
                </p>
                <p className="text-3xl font-serif text-[#FF66C4]">
                  ₦25,000
                </p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-[#FF66C4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Subtle contour, blush and highlight.
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-[#FF66C4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Long-wear makeup application.
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-[#FF66C4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Carefully blended eyeshadow with soft definition.
                </li>
              </ul>
              <Link
                href="/book?service=soft-glam"
                className="block w-full text-center bg-transparent border-2 border-[#FF66C4] text-[#FF66C4] py-3 rounded-full font-medium hover:bg-[#FF66C4] hover:text-white transition-colors"
              >
                Request Quote →
              </Link>
            </div>

            {/* Event/Owambe Glam Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm relative border border-transparent hover:border-[#FF66C4] transition-all">
              <h3 className="text-2xl font-serif mb-3 text-center">
                Event/Owambe Glam
              </h3>
              <p className="text-sm text-gray-600 mb-6 text-center min-h-[3rem]">
                Owambe Glamour is designed to stand out beautifully at every celebration.
              </p>
              <div className="text-center mb-6">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  FROM
                </p>
                <p className="text-3xl font-serif text-[#FF66C4]">
                  ₦30,000
                </p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-[#FF66C4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Gele / Turban
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-[#FF66C4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Defined eyes and more detailed eyeshadow.
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-[#FF66C4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Sculpted contour and radiant finishing.
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-[#FF66C4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Long-wear makeup techniques.
                </li>
              </ul>
              <Link
                href="/book?service=event-owambe"
                className="block w-full text-center bg-transparent border-2 border-[#FF66C4] text-[#FF66C4] py-3 rounded-full font-medium hover:bg-[#FF66C4] hover:text-white transition-colors"
              >
                Request Quote →
              </Link>
            </div>

            {/* Photoshoot Makeup Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm relative border border-transparent hover:border-[#FF66C4] transition-all">
              <h3 className="text-2xl font-serif mb-3 text-center">
                Photoshoot Makeup
              </h3>
              <p className="text-sm text-gray-600 mb-6 text-center min-h-[3rem]">
                Created to look just as beautiful on camera as it does in real life.
              </p>
              <div className="text-center mb-6">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  FROM
                </p>
                <p className="text-3xl font-serif text-[#FF66C4]">
                  ₦30,000
                </p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-[#FF66C4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  More defined complexion and facial sculpting.
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-[#FF66C4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Detailed eye makeup to complement the shoot concept.
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-[#FF66C4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Long-wear makeup application.
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-[#FF66C4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Camera-conscious finishing and blending.
                </li>
              </ul>
              <Link
                href="/book?service=photoshoot"
                className="block w-full text-center bg-transparent border-2 border-[#FF66C4] text-[#FF66C4] py-3 rounded-full font-medium hover:bg-[#FF66C4] hover:text-white transition-colors"
              >
                Request Quote →
              </Link>
            </div>

            {/* Bridal Makeup Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm relative border border-transparent hover:border-[#FF66C4] transition-all lg:col-span-3 max-w-md mx-auto w-full">
              <h3 className="text-2xl font-serif mb-3 text-center">
                Bridal Makeup
              </h3>
              <p className="text-sm text-gray-600 mb-6 text-center min-h-[3rem]">
                Beautiful, timeless bridal makeup that lets you enjoy every moment of your big day with confidence.
              </p>
              <div className="text-center mb-6">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  FROM
                </p>
                <p className="text-3xl font-serif text-[#FF66C4]">
                  ₦120,000
                </p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-[#FF66C4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Skin preparation.
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-[#FF66C4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Personalized bridal look.
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-[#FF66C4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Long-wear makeup application.
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-[#FF66C4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Professional finishing and detailing.
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-[#FF66C4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Assistance with maintaining your makeup throughout the agreed touch-up period.
                </li>
              </ul>
              <Link
                href="/book?service=bridal"
                className="block w-full text-center bg-transparent border-2 border-[#FF66C4] text-[#FF66C4] py-3 rounded-full font-medium hover:bg-[#FF66C4] hover:text-white transition-colors"
              >
                Request Quote →
              </Link>
            </div>
          </div>

          {/* Note */}
          <div className="mt-12 text-center bg-white rounded-2xl p-6 max-w-4xl mx-auto">
            <p className="text-sm text-gray-600">
              Final pricing may depend on location, date, number of faces, and travel requirements.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-sm text-[#FF66C4] tracking-widest uppercase mb-4">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4">
              Questions Before You Book
            </h2>
            <p className="text-gray-600">
              Straight answers — so you can decide with confidence.
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq) => (
              <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-[#FAF7F5]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-[#FF66C4] tracking-widest uppercase mb-4">
            YOUR DATE IS WAITING
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-black mb-6">
            Ready to Reserve Your Glam Session?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Tell me your date, your event, and the look you're dreaming of. I'll
            confirm availability and guide you through the next steps.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="inline-block bg-transparent border-2 border-[#FF66C4] text-[#FF66C4] px-8 py-3 rounded-full font-medium hover:bg-[#FF66C4] hover:text-white transition-colors"
            >
              Check Availability
            </Link>
            <a
              href="https://wa.me/2348089292454"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-3 rounded-full font-medium hover:bg-[#20BA5A] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Book on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
