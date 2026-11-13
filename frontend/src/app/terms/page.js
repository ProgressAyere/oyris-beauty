"use client";

import Link from "next/link";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F5]">

      {/* Hero Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 text-gray-900">
            Terms of Service
          </h1>
          <p className="text-gray-600">
            Please read our terms carefully before booking your session.
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="pb-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Oyris Appreciation Gift */}
          <div>
            <h2 className="text-2xl md:text-3xl font-serif mb-4 text-gray-900">
              The Oyris Appreciation Gift
            </h2>
            <p className="text-lg text-[#FF66C4] font-medium mb-4">
              Because every client matters to us.
            </p>
            <p className="text-gray-700 leading-relaxed">
              At Oyris Beauty, your patronage means so much to us. That's why every client receives 1 complimentary glam video and 2 edited pictures as a little thank-you for choosing us.
            </p>
          </div>

          {/* Booking Confirmation */}
          <div>
            <h2 className="text-2xl md:text-3xl font-serif mb-4 text-gray-900">
              Booking Confirmation
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Require 50% of the total service fee as a non-refundable booking deposit to secure an appointment.
            </p>
          </div>

          {/* Rescheduling */}
          <div>
            <h2 className="text-2xl md:text-3xl font-serif mb-4 text-gray-900">
              Rescheduling
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Clients may reschedule their appointments once, with at least 48 hours' notice. All rescheduled appointments are subject to availability.
            </p>
          </div>

          {/* Cancellations */}
          <div>
            <h2 className="text-2xl md:text-3xl font-serif mb-4 text-gray-900">
              Cancellations
            </h2>
            <p className="text-gray-700 leading-relaxed">
              All booking deposits are non-refundable. If you need to cancel your appointment, please notify us at least 48 hours in advance.
            </p>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#FAF7F5]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">
            Ready to book your session?
          </h2>
          <p className="text-gray-600 mb-8">
            We look forward to making you look and feel beautiful.
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
    </div>
  );
}
