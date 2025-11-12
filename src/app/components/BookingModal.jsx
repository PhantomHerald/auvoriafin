"use client";
import React, { useState, useEffect } from "react";
import { Raleway } from "next/font/google";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { useBookingModal } from "../context/BookingModalContext";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const BookingModal = () => {
  const { isOpen, closeModal } = useBookingModal();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    contactNumber: "",
    roomStyle: "classic",
  });

  const roomStyles = ["classic", "mini", "village"];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.to(".modal-overlay", {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(".modal-content", {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
        delay: 0.1,
      });

      document.body.style.overflow = "hidden";
    } else {
      gsap.to(".modal-overlay", {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });

      gsap.to(".modal-content", {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "back.in(1.7)",
      });

      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 300);
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Data:", formData);
    // Here you can send the data to your backend
    closeModal();
    // Reset form
    setFormData({
      name: "",
      surname: "",
      email: "",
      contactNumber: "",
      roomStyle: "classic",
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  if (!mounted || !isOpen) return null;

  const modalContent = (
    <div
      className="modal-overlay fixed inset-0 bg-black/50 flex items-center justify-center z-[100] opacity-0"
      onClick={handleOverlayClick}
    >
      <div
        className="modal-content bg-white rounded-lg shadow-2xl p-8 md:p-12 w-full max-w-2xl mx-4 opacity-0 scale-90"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 transition-colors text-2xl"
        >
          ×
        </button>

        {/* Header */}
        <h2
          className={`${raleway.className} text-3xl md:text-4xl font-bold text-gray-900 mb-2`}
        >
          Book Your Stay
        </h2>
        <p className="text-gray-600 mb-8">
          Fill in your details to reserve your perfect room at Auvoria
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Surname Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className={`${raleway.className} block text-sm font-semibold text-gray-700 mb-2`}
              >
                First Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b6ab87] focus:border-transparent outline-none transition"
                placeholder="John"
              />
            </div>

            <div>
              <label
                htmlFor="surname"
                className={`${raleway.className} block text-sm font-semibold text-gray-700 mb-2`}
              >
                Last Name
              </label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b6ab87] focus:border-transparent outline-none transition"
                placeholder="Doe"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className={`${raleway.className} block text-sm font-semibold text-gray-700 mb-2`}
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b6ab87] focus:border-transparent outline-none transition"
              placeholder="john@example.com"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label
              htmlFor="contactNumber"
              className={`${raleway.className} block text-sm font-semibold text-gray-700 mb-2`}
            >
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b6ab87] focus:border-transparent outline-none transition"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Room Style Selection */}
          <div>
            <label
              className={`${raleway.className} block text-sm font-semibold text-gray-700 mb-4`}
            >
              Room Style
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {roomStyles.map((style) => (
                <div key={style} className="relative">
                  <input
                    type="radio"
                    id={style}
                    name="roomStyle"
                    value={style}
                    checked={formData.roomStyle === style}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <label
                    htmlFor={style}
                    className={`${raleway.className} block p-4 border-2 rounded-lg cursor-pointer transition-all font-semibold capitalize text-center ${
                      formData.roomStyle === style
                        ? "border-[#b6ab87] bg-[#f5f3f0] text-gray-900"
                        : "border-gray-300 hover:border-[#b6ab87]"
                    }`}
                  >
                    {style}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={closeModal}
              className={`${raleway.className} flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${raleway.className} flex-1 px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition`}
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return mounted
    ? createPortal(
        modalContent,
        document.getElementById("modal-root") || document.body
      )
    : null;
};

export default BookingModal;
