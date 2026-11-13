"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const testimonials = [
  {
    text: "Hi Dear! I love my look. Thank you for making me look this beautiful. You understood the assignment, you ate. Your hands are blessed.",
    name: "NNEKA",
    date: "November 3",
  },
  {
    text: "Aww sis, I love my makeup ooo everybody was just asking me is it AI, cause it is too fine, thank you momma.",
    name: "MARIAM",
    date: "November 4",
  },
];

export default function ReviewsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    serviceDate: "",
    review: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Review submitted:", formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5]">

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-[#FF66C4] tracking-widest uppercase mb-4">
            REVIEWS
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic mb-12 text-black">
            What brides are saying
          </h1>

          {/* Testimonials */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-8 hover:border-[#FF66C4] transition-colors"
              >
                <p className="text-gray-700 italic mb-6 text-lg leading-relaxed">
                  <span className="text-[#FF66C4]">"</span>{testimonial.text}<span className="text-[#FF66C4]">"</span>
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[#FF66C4] uppercase tracking-wider">
                    — {testimonial.name}
                  </span>
                  <span className="text-gray-500">{testimonial.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Share Your Experience Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif italic mb-4 text-black text-center">
            Share Your Experience
          </h2>
          <p className="text-[#FF66C4] mb-12">
            Had the pleasure of working with Toni? We'd love to hear about it.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-[#FF66C4] tracking-wider mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  placeholder="First name or full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:border-[#FF66C4] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-[#FF66C4] tracking-wider mb-2">
                  Date of Service
                </label>
                <input
                  type="text"
                  placeholder="e.g. April 2025"
                  value={formData.serviceDate}
                  onChange={(e) =>
                    setFormData({ ...formData, serviceDate: e.target.value })
                  }
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:border-[#FF66C4] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#FF66C4] tracking-wider mb-2">
                Email Address *
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:border-[#FF66C4] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-[#FF66C4] tracking-wider mb-2">
                Your Review *
              </label>
              <textarea
                placeholder="Tell us about your experience with Toni..."
                value={formData.review}
                onChange={(e) =>
                  setFormData({ ...formData, review: e.target.value })
                }
                rows={6}
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:border-[#FF66C4] transition-colors resize-none"
                required
              />
            </div>

            <div className="flex items-start justify-between">
              <button
                type="submit"
                className="bg-transparent border-2 border-[#FF66C4] text-[#FF66C4] px-8 py-3 rounded-lg uppercase tracking-wider text-sm font-medium hover:bg-[#FF66C4] hover:text-white transition-colors"
              >
                Submit Review
              </button>
              <p className="text-xs text-gray-500 max-w-xs">
                Reviews are approved before posting
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#FAF7F5]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-6 text-black">
            Ready to look your best?
          </h2>
          <p className="text-gray-600 mb-8">
            Book your appointment today and experience the Oyris Beauty difference.
          </p>
          <a
            href="/book"
            className="inline-block bg-[#FF66C4] text-white px-10 py-4 rounded-full font-medium hover:bg-[#ff4db8] transition-colors"
          >
            Book Your Session
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
}
