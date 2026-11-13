"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import ImageModal from "@/components/ImageModal";

const portfolioItems = [
  {
    id: 1,
    image: "/bridal/bride1.JPEG",
    category: "Bridal",
    title: "Elegant Bridal Glow",
  },
  {
    id: 2,
    image: "/bridal/balikis-after.JPEG",
    category: "Bridal",
    title: "Classic Bridal Beauty",
  },
  {
    id: 3,
    image: "/everyday-look/everyday-look2.png",
    category: "Soft Glam",
    title: "Warm Glow Soft Glam",
  },
  {
    id: 4,
    image: "/bridal/edo-bride-after.PNG",
    category: "Bridal",
    title: "Traditional Bridal Elegance",
  },
  {
    id: 5,
    image: "/birthday/birthday-makeover1.jpg",
    category: "Event Glam",
    title: "Birthday Celebration Glam",
  },
  {
    id: 6,
    image: "/everyday-look/everyday-look3.png",
    category: "Soft Glam",
    title: "Natural Everyday Beauty",
  },
  {
    id: 7,
    image: "/birthday/birthday-makeover2.jpg",
    category: "Event Glam",
    title: "Party Ready Glam",
  },
  {
    id: 8,
    image: "/birthday/birthday-makeover3.jpg",
    category: "Event Glam",
    title: "Sophisticated Event Look",
  },
  {
    id: 9,
    image: "/everyday-look/everyday-look4.jpg",
    category: "Photoshoot",
    title: "Camera Ready Perfection",
  },
];

const categories = ["All", "Bridal", "Soft Glam", "Event Glam", "Photoshoot"];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [modalImage, setModalImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredItems =
    selectedCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

  const openModal = (item) => {
    setModalImage(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setModalImage(null), 300);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5]">

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-[#FF66C4] tracking-widest uppercase mb-4">
            PORTFOLIO
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
            A Curated Gallery of Client Glam
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Filter by style, study the details, and picture how your own look
            could come together.
          </p>
        </div>
      </section>

      {/* Description */}
      <section className="pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-700 mb-2">
            These are real sessions — bridal, traditional, soft glam, events,
            and shoots across Lagos.
          </p>
          <p className="text-gray-700">
            Tap any look to view larger, or message me to book something similar.
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-[#FF66C4] text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-[#FF66C4]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => openModal(item)}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Title and CTA */}
                <div className="p-6">
                  <h3 className="text-lg font-serif mb-3 text-gray-900">
                    {item.title}
                  </h3>
                  <Link
                    href="/book"
                    className="block w-full text-center bg-[#FF66C4] text-white py-3 rounded-full text-sm font-medium hover:bg-[white] hover:text-[#FF66C4] transition-colors"
                  >
                    Book This Look
                  </Link>
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
            Ready to create your own stunning look?
          </h2>
          <p className="text-gray-600 mb-8">
            Let's bring your vision to life. Book your session today.
          </p>
          <Link
            href="/book"
            className="inline-block bg-[#FF66C4] text-white px-10 py-4 rounded-full font-medium hover:bg-[#ff4db8] transition-colors"
          >
            Book Your Session
          </Link>
        </div>
      </section>

      <Footer />

      {/* Image Zoom Modal */}
      {modalOpen && modalImage && (
        <ImageModal
          image={modalImage.image}
          title={modalImage.title}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
