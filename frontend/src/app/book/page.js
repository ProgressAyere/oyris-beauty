"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/Footer";

const services = [
  { name: "Soft Glam", price: 25000, value: "soft-glam" },
  { name: "Event/Owambe Glam", price: 30000, value: "event-owambe" },
  { name: "Photoshoot Makeup", price: 30000, value: "photoshoot" },
  { name: "Bridal Makeup", price: 120000, value: "bridal" },
];

const eventAreas = [
  { name: "Where is your event?", value: "", cost: 0 },
  { name: "Ojodu / Alagbole / Akute — No travel included", value: "ojodu", cost: 0 },
  { name: "Ajah / Sangotedo / Chevron — +₦20,000 travel", value: "ajah", cost: 20000 },
  { name: "Ikeja / GRA / Magodo — +₦15,000 travel", value: "gra", cost: 15000 },
  { name: "Yaba / Surulere / Gbagada — +₦15,000 travel", value: "yaba", cost: 15000 },
  { name: "Festac / Amuwo / Oshodi — +₦15,000 travel", value: "festac", cost: 15000 },
  { name: "Lekki / VI / Ikoyi — +₦20,000 travel", value: "ikorodu", cost: 20000 },
  { name: "Outside Lagos (Ibadan, Abeokuta, etc.) — Quote on request", value: "outside", cost: 0 },
];

function BookingContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service");
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedService, setSelectedService] = useState("");
  const [currentMonth, setCurrentMonth] = useState(null);

  useEffect(() => {
    setCurrentMonth(new Date());
    
    // Pre-select service if coming from pricing/home page
    if (serviceParam) {
      const service = services.find(s => s.value === serviceParam);
      if (service) {
        setSelectedService(service.name);
      }
    }
  }, [serviceParam]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    eventArea: "",
    numberOfFaces: "1",
    message: "",
  });

  const [showPaymentInfo, setShowPaymentInfo] = useState(false);

  // Calculate total cost
  const calculateTotal = () => {
    const service = services.find(s => s.name === selectedService);
    const area = eventAreas.find(a => a.value === formData.eventArea);
    
    if (!service || !area) return null;
    
    const servicePrice = service.price;
    const travelCost = area.cost;
    const total = servicePrice + travelCost;
    
    return {
      service: service.name,
      servicePrice,
      travelCost,
      total
    };
  };

  const formatPrice = (price) => {
    return `₦${price.toLocaleString()}`;
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const isDateInPast = (day) => {
    if (!currentMonth) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateToCheck = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return dateToCheck < today;
  };

  const { daysInMonth, startingDayOfWeek } = currentMonth
    ? getDaysInMonth(currentMonth)
    : { daysInMonth: 0, startingDayOfWeek: 0 };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const handlePreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const handleDateClick = (day) => {
    if (!isDateInPast(day)) {
      setSelectedDate(day);
    }
  };

  const handleStep1Continue = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setCurrentStep(2);
    }
  };

  const handleStep2Continue = (e) => {
    e.preventDefault();
    if (selectedDate && selectedService) {
      setCurrentStep(3);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPaymentInfo(true);
  };

  const handleWhatsApp = () => {
    const message = `Hi! I'd like to book:\nName: ${formData.name}\nPhone: ${formData.phone}\nDate: ${selectedDate} ${currentMonth ? monthNames[currentMonth.getMonth()] : ""} ${currentMonth ? currentMonth.getFullYear() : ""}\nService: ${selectedService}\nLocation: ${formData.eventArea}\nNumber of Faces: ${formData.numberOfFaces}\nMessage: ${formData.message}`;
    window.open(`https://wa.me/2348089292454?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5]">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-sm text-[#FF66C4] tracking-widest uppercase mb-4">
            BOOK NOW
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
            Let's Find a Date for Your Glam
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The fastest way to hear back is WhatsApp. Prefer a form? Fill it in
            below — I'll confirm availability within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Booking Form */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-serif text-[#FF66C4] mb-2">
              Booking Request Form
            </h2>
            <p className="text-sm text-gray-600 mb-8">
              Share a few details about your event. Required fields are marked,
              everything else helps me prepare your quote.
            </p>

            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= 1 ? 'bg-[#FF66C4] text-white' : 'bg-gray-200 text-gray-600'}`}>
                  1
                </div>
                <div className={`flex-1 h-1 mx-2 ${currentStep >= 2 ? 'bg-[#FF66C4]' : 'bg-gray-200'}`}></div>
              </div>
              <div className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= 2 ? 'bg-[#FF66C4] text-white' : 'bg-gray-200 text-gray-600'}`}>
                  2
                </div>
                <div className={`flex-1 h-1 mx-2 ${currentStep >= 3 ? 'bg-[#FF66C4]' : 'bg-gray-200'}`}></div>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= 3 ? 'bg-[#FF66C4] text-white' : 'bg-gray-200 text-gray-600'}`}>
                3
              </div>
            </div>

            {/* Step 1: Your Info */}
            {currentStep === 1 && (
              <form onSubmit={handleStep1Continue} className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-[#FF66C4] text-white flex items-center justify-center text-sm font-medium">
                      1
                    </div>
                    <h3 className="font-medium">Your Info</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => {
                          // Only allow alphabets and spaces
                          const filteredValue = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                          setFormData({ ...formData, name: filteredValue });
                        }}
                        className="w-full px-4 py-3 border-2 border-[#FF66C4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF66C4] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="+234 8012345678"
                        value={formData.phone}
                        onChange={(e) => {
                          // Only allow digits, +, and spaces
                          const filteredValue = e.target.value.replace(/[^\d+\s]/g, '');
                          setFormData({ ...formData, phone: filteredValue });
                        }}
                        className="w-full px-4 py-3 border-2 border-[#FF66C4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF66C4] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-transparent border-2 border-[#FF66C4] text-[#FF66C4] py-4 rounded-full font-medium hover:bg-[#FF66C4] hover:text-white transition-colors"
                >
                  Continue
                </button>
              </form>
            )}

            {/* Step 2: Event Details */}
            {currentStep === 2 && (
              <form onSubmit={handleStep2Continue} className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-[#FF66C4] text-white flex items-center justify-center text-sm font-medium">
                      2
                    </div>
                    <h3 className="font-medium">Event Details</h3>
                  </div>

                  {/* Calendar */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pick Your Date *
                    </label>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <button
                          type="button"
                          onClick={handlePreviousMonth}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <div className="text-center">
                          <p className="font-serif text-lg">
                            {currentMonth ? `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}` : ""}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleNextMonth}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>

                      <div className="grid grid-cols-7 gap-2">
                        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                            {day}
                          </div>
                        ))}
                        {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                          <div key={`empty-${index}`} />
                        ))}
                        {Array.from({ length: daysInMonth }).map((_, index) => {
                          const day = index + 1;
                          const isPast = isDateInPast(day);
                          const isSelected = selectedDate === day;

                          return (
                            <button
                              key={day}
                              type="button"
                              onClick={() => handleDateClick(day)}
                              disabled={isPast}
                              className={`
                                aspect-square flex items-center justify-center rounded-lg text-sm
                                ${isPast ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-100 cursor-pointer"}
                                ${isSelected ? "bg-[#FF66C4] text-white hover:bg-[#B5917F]" : ""}
                              `}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex items-center gap-4 mt-4 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 border border-gray-200 rounded"></div>
                          <span>Available</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-gray-200 rounded"></div>
                          <span>Unavailable</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-[#FF66C4] rounded"></div>
                          <span>Selected</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Needed *
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF66C4] focus:border-transparent appearance-none bg-white"
                      required
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service.name} value={service.name}>
                          {service.name} — from {formatPrice(service.price)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 border border-gray-300 text-gray-700 py-4 rounded-full font-medium hover:border-gray-400 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-transparent border-2 border-[#FF66C4] text-[#FF66C4] py-4 rounded-full font-medium hover:bg-[#FF66C4] hover:text-white transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Additional Details */}
            {currentStep === 3 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-[#FF66C4] text-white flex items-center justify-center text-sm font-medium">
                      3
                    </div>
                    <h3 className="font-medium">Additional Details</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Area *
                      </label>
                      <select
                        value={formData.eventArea}
                        onChange={(e) =>
                          setFormData({ ...formData, eventArea: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-[#FF66C4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF66C4] focus:border-transparent appearance-none bg-white"
                        required
                      >
                        {eventAreas.map((area) => (
                          <option key={area.value} value={area.value}>
                            {area.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Faces *
                      </label>
                      <input
                        type="number"
                        min="1"
                        placeholder="1"
                        value={formData.numberOfFaces}
                        onChange={(e) =>
                          setFormData({ ...formData, numberOfFaces: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-[#FF66C4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF66C4] focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message / Inspiration
                      </label>
                      <textarea
                        placeholder="Share your vision, reference links, or inspiration..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-[#FF66C4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF66C4] focus:border-transparent resize-none"
                      />
                    </div>

                    {/* Cost Breakdown */}
                    {(() => {
                      const total = calculateTotal();
                      if (total && formData.eventArea) {
                        return (
                          <div className="bg-[#FAF7F5] border-2 border-[#FF66C4] rounded-lg p-4 space-y-2">
                            <h4 className="font-medium text-gray-900 mb-3">Cost Breakdown</h4>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-700">{total.service}</span>
                              <span className="font-medium">{formatPrice(total.servicePrice)}</span>
                            </div>
                            {total.travelCost > 0 && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-700">Travel Fee</span>
                                <span className="font-medium">{formatPrice(total.travelCost)}</span>
                              </div>
                            )}
                            <div className="pt-2 border-t border-[#FF66C4] flex justify-between">
                              <span className="font-semibold text-gray-900">Total</span>
                              <span className="font-bold text-[#FF66C4] text-lg">{formatPrice(total.total)}</span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })()}
                  </div>
                </div>

                <div className="space-y-3">
                  {!showPaymentInfo ? (
                    <>
                      <button
                        type="submit"
                        className="w-full bg-transparent border-2 border-[#FF66C4] text-[#FF66C4] py-4 rounded-full font-medium hover:bg-[#FF66C4] hover:text-white transition-colors"
                      >
                        Submit Booking Request
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="w-full text-gray-600 hover:text-gray-900 py-2 text-sm"
                      >
                        ← Back to previous step
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Payment Information Section */}
                      <div className="bg-white border-2 border-[#FF66C4] rounded-2xl p-6 space-y-4">
                        <div className="text-center mb-4">
                          <div className="w-16 h-16 bg-[#FF66C4] rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-serif text-gray-900 mb-2">
                            50% Deposit Required
                          </h3>
                          <p className="text-sm text-gray-600">
                            To secure your booking, please pay 50% of the total service fee as a non-refundable deposit.
                          </p>
                        </div>

                        {/* Deposit Breakdown */}
                        {(() => {
                          const total = calculateTotal();
                          if (total) {
                            const depositAmount = total.total * 0.5;
                            const remainingAmount = total.total - depositAmount;
                            return (
                              <div className="bg-[#FAF7F5] rounded-lg p-4 space-y-2">
                                <h4 className="font-medium text-gray-900 mb-3">Payment Breakdown</h4>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-700">Total Amount</span>
                                  <span className="font-medium">{formatPrice(total.total)}</span>
                                </div>
                                <div className="pt-2 border-t border-gray-300 flex justify-between">
                                  <span className="font-semibold text-[#FF66C4]">50% Deposit (Pay Now)</span>
                                  <span className="font-bold text-[#FF66C4] text-lg">{formatPrice(depositAmount)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                  <span>Remaining Balance (Pay Later)</span>
                                  <span>{formatPrice(remainingAmount)}</span>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })()}

                        {/* Bank Account Details */}
                        <div className="space-y-3 pt-4 border-t border-gray-200">
                          <h4 className="font-medium text-gray-900">Transfer to Either Account:</h4>
                          
                          {/* Palmpay Account */}
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-[#FF66C4] rounded-full flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">Palmpay</p>
                                <p className="text-lg font-mono font-bold text-gray-900">8183634915</p>
                                <p className="text-sm text-gray-600">Priscilla Ayere</p>
                              </div>
                            </div>
                          </div>

                          {/* UBA Account */}
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-[#FF66C4] rounded-full flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">UBA</p>
                                <p className="text-lg font-mono font-bold text-gray-900">2124391857</p>
                                <p className="text-sm text-gray-600">Priscilla Ayere</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Instructions */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <div className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm text-yellow-800">
                              After making payment, please send the receipt via WhatsApp using the button below to confirm your booking.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* WhatsApp Button */}
                      <button
                        type="button"
                        onClick={handleWhatsApp}
                        className="w-full bg-[#25D366] text-white py-4 rounded-full font-medium hover:bg-[#20BA5A] transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        Send Receipt on WhatsApp
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowPaymentInfo(false)}
                        className="w-full text-gray-600 hover:text-gray-900 py-2 text-sm"
                      >
                        ← Back to form
                      </button>
                    </>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* WhatsApp Section */}
          <div className="bg-[#F5F0ED] rounded-2xl p-8">
            <h2 className="text-2xl font-serif text-[#FF66C4] mb-4">
              Prefer WhatsApp?
            </h2>
            <p className="text-gray-600 mb-6">
              Send your name, date, location, and the service you need. Most
              inquiries get a reply the same day during business hours.
            </p>

            <a
              href="https://wa.me/2348089292454"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-full font-medium hover:bg-[#20BA5A] transition-colors mb-8"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Send Booking Details
            </a>

            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#FF66C4] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+234 703 869 9245</span>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#FF66C4] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>priscillaoyen@gmail.com</span>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#FF66C4] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Lagos & nearby areas (Ojodu-Berger, Alagbole-Akute, Mainland)</span>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#FF66C4] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Mon – Sat: 7:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function BookingPage() {
  return (
    <>
      <Suspense fallback={
        <div className="min-h-screen bg-[#FAF7F5] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#FF66C4] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading booking form...</p>
          </div>
        </div>
      }>
        <BookingContent />
      </Suspense>
    </>
  );
}
