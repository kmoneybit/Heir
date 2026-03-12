"use client";
import React from "react";
import Image from "next/image";

export default function ContactPage() {
  return (
    <main className="pt-40 pb-32 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-gray-900">Get In Touch</h1>
          <p className="text-xl text-gray-500 mb-16 leading-relaxed font-medium">
            Have questions about our products or need help with an order? 
            We&apos;re here to assist you! Reach out to us via any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* WhatsApp Card */}
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="w-16 h-16 mb-5 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-green-200">
              <Image src="/image/whatsapp-fill.svg" alt="WhatsApp" width={30} height={30} className="invert" />
            </div>
            <h3 className="text-xl font-bold mb-2">WhatsApp Us</h3>
            <p className="text-gray-500 mb-6 text-sm">Fastest response for inquiries and orders.</p>
            <a 
              href="https://wa.me/2347082417100" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3 bg-[#25D366] text-white rounded-lg no-underline font-bold shadow-md hover:bg-[#20bd5a] transition-all"
            >
              Chat Now
            </a>
          </div>

          {/* Contact Info Card */}
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="w-16 h-16 mb-5 bg-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-200">
              <span className="text-2xl text-white font-bold">@</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Contact Info</h3>
            <p className="text-gray-600 font-medium my-1">support@thaniablaq.com</p>
            <p className="text-gray-600 font-medium">+234 708 241 7100</p>
          </div>
        </div>

        <div className="py-10">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Follow Us</h2>
          <div className="flex justify-center gap-8">
            <a href="#" className="transition-all duration-300 hover:scale-110 hover:-translate-y-1">
              <Image src="/image/instagram-fill.svg" alt="Instagram" width={40} height={40} className="w-10 h-10" />
            </a>
            <a href="#" className="transition-all duration-300 hover:scale-110 hover:-translate-y-1">
              <Image src="/image/facebook-circle-fill (1).svg" alt="Facebook" width={40} height={40} className="w-10 h-10" />
            </a>
            <a href="#" className="transition-all duration-300 hover:scale-110 hover:-translate-y-1">
              <Image src="/image/tiktok-line (1).svg" alt="TikTok" width={40} height={40} className="w-10 h-10" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
