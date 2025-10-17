// app/contact/page.tsx
"use client";

import FeaturesHeader from "@/components/header/featuresheader";
import { useState } from "react";

export default function ContactUsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent!");
  };
// variable for base input styles
  // يمكن تعديلها لاحقًا لتكون في ملف CSS منفصل أو استخدام Tailwind
  const baseInput =
    "w-full rounded-md px-4 py-3 border focus:outline-none focus:ring-2  bg-gray-100 border-[#bc880e] focus:ring-[#bc880e]";

  return (
    <div className={'${baseInput} min-h-screen'}>
      <FeaturesHeader
        title="Contact Us"
        subtitle="Get in Touch"
        background="/images/image4.jpg"
      />

      <div className="max-w-6xl mx-auto px-4 py-16 space-y-12 text-[#85610d] ">
        {/* Contact Form & Newsletter */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-2 space-y-4 bg-[#f6f4f4] p-6 rounded-xl shadow-lg"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className={`${baseInput}`}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className={`${baseInput} bg-gray-100 border-[#bc880e] focus:ring-[#bc880e]`}
              />
            </div>

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className={`${baseInput} `}
            />

            <textarea
              name="message"
              placeholder="Message"
              value={form.message}
              onChange={handleChange}
              className={`${baseInput}`}
            />

            <button
              type="submit"
              className="bg-[#85610d] hover:bg-amber-700 px-6 py-3 rounded-lg font-semibold text-white transition"
            >
              Send Message
            </button>
          </form>

          {/* Newsletter */}
          <div className={'${ baseInput} bg-[#f6f4f4] p-6 rounded-xl shadow-lg space-y-4' }>
            <h3 className="text-xl font-semibold mb-2">Subscribe</h3>
            <p className="text-sm text-gray-400 mb-4">
              Get updates on new offers, events and more.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Email"
                className={`${baseInput}focus:outline-none`} 
              />
              <button className="bg-[#85610d] px-4 py-2 rounded-lg hover:bg-white text-white transition">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Contact Info
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#2a2a2a] p-6 rounded-lg text-center">
            <p className="text-[#85610d] text-lg font-semibold">📞 +876 765 665</p>
            <p className="text-sm text-gray-400 mt-2">Call us anytime</p>
          </div>
          <div className="bg-[#2a2a2a] p-6 rounded-lg text-center">
            <p className="text-[#85610d] text-lg font-semibold">
              ✉️ mail@barista.com
            </p>
            <p className="text-sm text-gray-400 mt-2">Send us an email</p>
          </div>
          <div className="bg-[#2a2a2a] p-6 rounded-lg text-center">
            <p className="text-[#85610d] text-lg font-semibold">
              📍 London Eye, London
            </p>
            <p className="text-sm text-gray-400 mt-2">Visit our coffee shop</p>
          </div>
        </div> */}

        {/* Google Map */}
        <div className="w-full h-[400px] overflow-hidden rounded-xl shadow-lg">
          <iframe
            title="Google Map Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.705145248109!2d-0.12085068420424243!3d51.50329791819196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604c3b9c9f4ef%3A0xdeb4d3f1b9d3a9d6!2sLondon%20Eye!5e0!3m2!1sen!2suk!4v1676923678732!5m2!1sen!2suk"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
