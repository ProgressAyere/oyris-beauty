"use client";

import Link from "next/link";
import Footer from "@/components/Footer";

const pricingPackages = [
  {
    name: "Soft Glam",
    value: "soft-glam",
    badge: "MOST BOOKED",
    description: "A polished look perfect for everyday elegance and special occasions.",
    price: "₦25,000",
    features: [
      "Subtle contour, blush and highlight.",
      "Long-wear makeup application.",
      "Carefully blended eyeshadow with soft definition.",
    ],
  },
  {
    name: "Event/Owambe Glam",
    value: "event-owambe",
    description: "Owambe Glamour is designed to stand out beautifully at every celebration.",
    price: "₦30,000",
    features: [
      "Gele / Turban",
      "Defined eyes and more detailed eyeshadow.",
      "Sculpted contour and radiant finishing.",
      "Long-wear makeup techniques.",
    ],
  },
  {
    name: "Photoshoot Makeup",
    value: "photoshoot",
    description: "Created to look just as beautiful on camera as it does in real life.",
    price: "₦30,000",
    features: [
      "More defined complexion and facial sculpting.",
      "Detailed eye makeup to complement the shoot concept.",
      "Long-wear makeup application.",
      "Camera-conscious finishing and blending.",
    ],
  },
  {
    name: "Bridal Makeup",
    value: "bridal",
    description: "Beautiful, timeless bridal makeup that lets you enjoy every moment of your big day with confidence.",
    price: "₦120,000",
    features: [
      "Skin preparation.",
      "Personalized bridal look.",
      "Long-wear makeup application.",
      "Professional finishing and detailing.",
      "Assistance with maintaining your makeup throughout the agreed touch-up period.",
    ],
  },
];

const allServices = [
  {
    name: "Bridal Makeup",
    price: "₦120,000",
    included: "Consultation, skin prep, full bridal glam, lashes, setting",
    homeService: true,
  },
  {
    name: "Soft Glam",
    price: "₦25,000",
    included: "Skin prep, soft glam application, lash enhancement, setting spray",
    homeService: true,
  },
  {
    name: "Event Glam",
    price: "₦30,000",
    included: "Skin prep, full event glam, defined features, flesh-ready finish",
    homeService: true,
  },
  {
    name: "Photoshoot Glam",
    price: "₦30,000",
    included: "Skin prep, custom glam, lash application, photo-ready setting",
    homeService: true,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F5]">
      {/* Header Section */}
      <section className="bg-[#FAF7F5] py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-[#FF66C4] tracking-widest uppercase mb-4">
            PRICING
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
            Packages That Help You Plan Ahead
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transparent starting prices for every service, your final quote
            depends on your event details.
          </p>
        </div>
      </section>

      {/* Pricing Packages Section */}
      <section className="bg-[#FAF7F5] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {pricingPackages.map((pkg, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm relative border border-transparent hover:border-[#FF66C4] transition-all"
              >
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF66C4] text-white text-xs px-4 py-1 rounded-full font-medium">
                    {pkg.badge}
                  </div>
                )}
                <h3 className="text-2xl font-serif mb-3 text-center">
                  {pkg.name}
                </h3>
                <p className="text-sm text-gray-600 mb-6 text-center min-h-[3rem]">
                  {pkg.description}
                </p>
                <div className="text-center mb-6">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    FROM
                  </p>
                  <p className="text-3xl font-serif text-[#FF66C4]">
                    {pkg.price}
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg
                        className="w-5 h-5 text-[#FF66C4] flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/book?service=${pkg.value}`}
                  className="block w-full text-center bg-transparent border-2 border-[#FF66C4] text-[#FF66C4] py-3 rounded-full font-medium hover:bg-[#FF66C4] hover:text-white transition-colors"
                >
                  Request Quote →
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center bg-white rounded-2xl p-6 max-w-4xl mx-auto">
            <p className="text-sm text-gray-600">
              Final pricing may depend on location, date, number of faces, and
              travel requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Group Discount Section - NEW */}
      <section className="bg-gradient-to-br from-[#FF66C4] to-[#C4A895] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-4">
                <p className="text-white text-sm font-medium tracking-widest uppercase">
                  🎉 GROUP BOOKING DISCOUNT
                </p>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-4">
                Save More When You Book Together
              </h2>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                Planning to glam up with friends or family? The more you book, the more you save!
              </p>
            </div>

            {/* Discount Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Soft Glam Discount */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-serif text-gray-900 mb-1">
                      Soft Glam
                    </h3>
                    <p className="text-sm text-gray-600">Everyday elegance for groups</p>
                  </div>
                  <div className="bg-[#FF66C4]/10 p-3 rounded-full">
                    <svg className="w-6 h-6 text-[#FF66C4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-[#FF66C4] to-[#ff4db8] rounded-xl p-6 mb-4">
                  <div className="text-center">
                    <p className="text-white/80 text-sm mb-2">Book 3 or more people and save</p>
                    <p className="text-5xl font-bold text-white mb-1">₦1,500</p>
                    <p className="text-white/90 text-sm">off per person</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-[#FF66C4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Perfect for birthdays, bridal parties, or friend gatherings</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-[#FF66C4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>All locations qualify</span>
                  </div>
                </div>
              </div>

              {/* Other Services Discount */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-serif text-gray-900 mb-1">
                      Event / Bridal / Photoshoot Glam
                    </h3>
                    <p className="text-sm text-gray-600">Premium services for groups</p>
                  </div>
                  <div className="bg-[#C4A895]/10 p-3 rounded-full">
                    <svg className="w-6 h-6 text-[#C4A895]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-[#C4A895] to-[#B5917F] rounded-xl p-6 mb-4">
                  <div className="text-center">
                    <p className="text-white/80 text-sm mb-2">Book 3 or more people and save</p>
                    <p className="text-5xl font-bold text-white mb-1">₦2,000</p>
                    <p className="text-white/90 text-sm">off per person</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-[#C4A895] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Applies to Event/Owambe and Photoshoot Makeup</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-[#C4A895] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Valid for locations outside Ojodu/Alagbole/Akute</span>
                  </div>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-xl font-serif text-white mb-6 text-center">
                How Group Discounts Work
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-[#FF66C4] font-bold text-lg">1</span>
                  </div>
                  <p className="text-white text-sm">
                    Book 3 or more people for the same date and location
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-[#FF66C4] font-bold text-lg">2</span>
                  </div>
                  <p className="text-white text-sm">
                    Mention "group discount" in your booking request
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-[#FF66C4] font-bold text-lg">3</span>
                  </div>
                  <p className="text-white text-sm">
                    Enjoy automatic savings on your final quote
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-8">
              <Link
                href="/book"
                className="inline-block bg-white text-[#FF66C4] px-10 py-4 rounded-full font-medium text-lg hover:bg-gray-50 transition-colors shadow-lg"
              >
                Book Your Group Now →
              </Link>
              <p className="text-white/80 text-sm mt-4">
                Questions about group bookings? <a href="https://wa.me/2348089292454" className="underline hover:text-white">WhatsApp us</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Pricing Works Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left Column */}
            <div>
              <p className="text-sm text-[#FF66C4] tracking-widest uppercase mb-4">
                PRICING GUIDE
              </p>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">
                How Pricing Works
              </h2>
              <p className="text-gray-700 mb-6">
                I believe in clarity upfront — services start from ₦25,000. From
                there, your final quote is shaped by your location and travel
                distance, your event date, and how many faces we're glamming.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF66C4]">—</span>
                  <span>Number of faces and group size</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF66C4]">—</span>
                  <span>Event date and peak-season demand</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF66C4]">—</span>
                  <span>Venue location and travel distance</span>
                </li>
              </ul>
              <Link
                href="/book"
                className="inline-block mt-8 bg-transparent border-2 border-[#FF66C4] text-[#FF66C4] px-8 py-4 rounded-full font-medium hover:bg-[#FF66C4] hover:text-white transition-colors"
              >
                Request a Custom Quote
              </Link>
              <p className="mt-6 text-sm text-gray-600">
                Want a detailed cost breakdown?{" "}
                <Link href="/pricing#guide" className="text-[#FF66C4] hover:underline">
                  Read our Lagos bridal makeup pricing guide →
                </Link>
              </p>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-[#FAF7F5] rounded-2xl p-6">
                <h3 className="font-semibold mb-2">Securing Your Date</h3>
                <p className="text-sm text-gray-600">
                  50% deposit required to secure your date. You'll receive
                  confirmation and prep guidance once your deposit is received.
                </p>
              </div>
              <div className="bg-[#FAF7F5] rounded-2xl p-6">
                <h3 className="font-semibold mb-2">Home Service & Travel</h3>
                <p className="text-sm text-gray-600">
                  I travel across Lagos & nearby areas (Ikeja, Lekki, Victoria
                  Island, Mainland) with a full professional kit. A travel fee
                  may apply based on distance and timing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Services Table */}
      <section className="bg-[#FAF7F5] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif mb-8 text-center">
            All Services at a Glance
          </h2>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#FAF7F5] border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#FF66C4] uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#FF66C4] uppercase tracking-wider">
                      Starting Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#FF66C4] uppercase tracking-wider">
                      What's Included
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-[#FF66C4] uppercase tracking-wider">
                      Home Service
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {allServices.map((service, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {service.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#FF66C4] font-medium">
                        {service.price}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {service.included}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {service.homeService && (
                          <svg
                            className="w-5 h-5 text-[#FF66C4] mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
