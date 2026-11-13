"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/Footer";
import ImageModal from "@/components/ImageModal";

// Service data with images
const serviceData = {
  "soft-glam": {
    title: "SOFT GLAM",
    subtitle: "Oyris Beauty soft glam collection",
    video: "/everyday-look/soft-glam-video.mp4",
    images: [
      { src: "/everyday-look/everyday-look-after.jpg", title: "Soft Glam Perfection", category: "Soft Glam" },
      { src: "/everyday-look/everyday-look2.png", title: "Warm Glow Soft Glam", category: "Soft Glam" },
      { src: "/everyday-look/everyday-look3.png", title: "Natural Everyday Beauty", category: "Soft Glam" },
      { src: "/everyday-look/everyday-look4.jpg", title: "Camera Ready Perfection", category: "Soft Glam" },
    ],
    description: "Natural, polished, and perfect for daytime events — subtle contouring, neutral tones, and a fresh finish.",
  },
  "event-owambe": {
    title: "EVENT/OWAMBE GLAM",
    subtitle: "Oyris Beauty event/owambe glam collection",
    video: "/event-owambe-video.mp4",
    images: [
      { src: "/everyday-look/everyday-look-after.jpg", title: "Event Glam Look", category: "Event Glam" },
      { src: "/everyday-look/everyday-look2.png", title: "Owambe Ready", category: "Event Glam" },
      { src: "/everyday-look/everyday-look3.png", title: "Celebration Glam", category: "Event Glam" },
      { src: "/everyday-look/everyday-look4.jpg", title: "Party Perfect", category: "Event Glam" },
    ],
    description: "Owambe Glamour is designed to stand out beautifully at every celebration — bold, radiant, and unforgettable.",
  },
  "photoshoot": {
    title: "PHOTOSHOOT MAKEUP",
    subtitle: "Oyris Beauty photoshoot makeup collection",
    video: "/birthday/birthday-shoot-video.mp4",
    images: [
      { src: "/birthday/birthday-makeover1.jpg", title: "Camera Ready Glam", category: "Photoshoot" },
      { src: "/birthday/birthday-makeover2.jpg", title: "Studio Perfect", category: "Photoshoot" },
      { src: "/birthday/birthday-makeover3.jpg", title: "Editorial Beauty", category: "Photoshoot" },
      { src: "/birthday/birthday-makeover4-after.jpg", title: "Fashion Forward", category: "Photoshoot" },
    ],
    description: "Created to look just as beautiful on camera as it does in real life — flawless, defined, and photo-ready.",
  },
  "bridal": {
    title: "BRIDAL MAKEUP",
    subtitle: "Oyris Beauty bridal collection",
    video: "/bridal/bridal-video2.mp4",
    images: [
      { src: "/bridal/bride1.JPEG", title: "Elegant Bridal Glow", category: "Bridal" },
      { src: "/bridal/balikis-after.JPEG", title: "Classic Bridal Beauty", category: "Bridal" },
      { src: "/bridal/edo-bride-after.PNG", title: "Traditional Bridal Elegance", category: "Bridal" },
    ],
    description: "Beautiful, timeless bridal makeup that lets you enjoy every moment of your big day with confidence.",
  },
};

function ServicesContent() {
  const searchParams = useSearchParams();
  const service = searchParams.get("service") || "soft-glam";
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentService = serviceData[service] || serviceData["soft-glam"];

  const openImageModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

  return (
    <>
      {/* Hero Section with Video Background */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            key={service}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={currentService.video} type="video/mp4" />
          </video>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Title Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif tracking-wide">
              {currentService.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Collection Title */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif mb-4 text-gray-900">
            {currentService.subtitle}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {currentService.description}
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentService.images.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-200 cursor-pointer"
                onClick={() => openImageModal(image)}
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-lg font-serif">{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#FAF7F5]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-black font-serif mb-6">
            Ready to book your {currentService.title.toLowerCase()} look?
          </h2>
          <p className="text-gray-600 mb-8">
            Let's create a look that's perfect for you.
          </p>
          <Link
            href="/book"
            className="inline-block bg-[#FF66C4] text-white px-10 py-4 rounded-full font-medium hover:bg-[#ff4db8] transition-colors"
          >
            Book Your Session
          </Link>
        </div>
      </section>

      {/* Image Modal */}
      {isModalOpen && selectedImage && (
        <ImageModal
          image={selectedImage.src}
          title={selectedImage.title}
          onClose={closeModal}
        />
      )}
    </>
  );
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F5]">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>}>
        <ServicesContent />
      </Suspense>
      <Footer />
    </div>
  );
}
