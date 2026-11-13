"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const transformations = [
  {
    id: 1,
    before: "/bridal/balikis-before.jpg",
    after: "/bridal/balikis-after.JPEG",
    title: "Bridal Transformation",
    category: "Bridal",
  },
  {
    id: 2,
    before: "/bridal/edo-bride-before.jpg",
    after: "/bridal/edo-bride-after.PNG",
    title: "Traditional Bridal Glam",
    category: "Bridal",
  },
  {
    id: 3,
    before: "/everyday-look/everyday-look-before.jpg",
    after: "/everyday-look/everyday-look-after.jpg",
    title: "Soft Glam Transformation",
    category: "Soft Glam",
  },
  {
    id: 4,
    before: "/birthday/birthday-makeover4-before.jpg",
    after: "/birthday/birthday-makeover4-after.jpg",
    title: "Birthday Makeover",
    category: "Event Glam",
  },
];

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
          priority
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
          priority
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

export default function TransformationsPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F5]">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-[#FF66C4] tracking-widest uppercase mb-4">
            TRANSFORMATIONS
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
            From Fresh Skin to a Finish That Holds
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every session begins with thoughtful skin prep, then builds into a
            polished look that enhances your features — never masks them.
          </p>
        </div>
      </section>

      {/* Transformations Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {transformations.map((item) => (
              <div key={item.id} className="group">
                <TransformationSlider
                  before={item.before}
                  after={item.after}
                  title={item.title}
                />
                <div className="mt-4 text-center">
                  <span className="inline-block bg-[#C4A895]/10 text-[#C4A895] px-3 py-1 rounded-full text-xs font-medium mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-serif text-gray-900">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">
            Ready for your own transformation?
          </h2>
          <p className="text-gray-600 mb-8">
            Book your session today and let's create a look that's uniquely you.
          </p>
          <Link
            href="/book"
            className="inline-block bg-[#FF66C4] text-white px-10 py-4 rounded-full font-medium hover:bg-[#ff4db8] transition-colors"
          >
            Book Your Transformation
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
