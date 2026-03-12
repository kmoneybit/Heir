"use client";
import React, { useState } from "react";

export default function AboutPage() {
  const [teamVisible, setTeamVisible] = useState(false);

  return (
    <main className="pt-20">
      {/* ABOUT SECTION */}
      <section id="about" className="py-20 px-10 bg-white text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">About Us</h2>
        <p className="max-w-4xl mx-auto leading-relaxed text-gray-700 text-lg md:text-xl px-4">
          At Thaniablaq, we are passionate about providing premium-quality hair
          that reflects elegance, confidence, and timeless beauty. Hair is more
          than a style — it is an expression of personality and confidence. We
          carefully select the finest collections to enhance natural beauty. Our
          products are soft, durable, and easy to maintain for long-lasting
          satisfaction. Whether you prefer sleek straight styles, glamorous
          curls, or natural textures, we deliver hair that helps you look and
          feel your best.
        </p>
      </section>

      {/* TEAM SECTION */}
      <section id="team" className="py-20 px-5 bg-gray-50 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">Meet Our Team</h2>
          <button
            className="px-8 py-3 bg-orange-500 text-black border-none rounded-lg font-bold cursor-pointer mb-12 shadow-lg transition-all duration-300 hover:bg-[#ffb347] hover:-translate-y-1 hover:shadow-xl active:translate-y-0"
            onClick={() => setTeamVisible(!teamVisible)}
          >
            {teamVisible ? "Hide Team" : "Show Team"}
          </button>

          {teamVisible && (
            <div className="animate-[slideDown_0.4s_ease-out_forwards]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="bg-white p-10 rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center font-bold text-3xl text-white shadow-lg">KM</div>
                  <h3 className="text-xl font-bold text-gray-900">KMONEY</h3>
                  <p className="text-orange-500 font-bold mb-3">Founder & Designer</p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Creative mind behind Thaniablaq Hair&apos;s vision and design.
                  </p>
                </div>
                <div className="bg-white p-10 rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center font-bold text-3xl text-white shadow-lg">TH</div>
                  <h3 className="text-xl font-bold text-gray-900">Thaniablaq</h3>
                  <p className="text-orange-500 font-bold mb-3">Brand Owner</p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Passionate about premium quality and customer satisfaction.
                  </p>
                </div>
                <div className="bg-white p-10 rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center font-bold text-3xl text-white shadow-lg">CM</div>
                  <h3 className="text-xl font-bold text-gray-900">Community Manager</h3>
                  <p className="text-orange-500 font-bold mb-3">Customer Relations</p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Dedicated to providing exceptional customer support and engagement.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <style jsx global>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
