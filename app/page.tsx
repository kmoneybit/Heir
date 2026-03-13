"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { Product } from "./context/CartContext";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        // Just show first 4 products as "Featured"
        setProducts(data.slice(0, 4));
      } catch {
        // Fallback featured products
        setProducts([
          {
            id: 1,
            name: "Sample Straight",
            price: 2999,
            image: "/image/product-img6.jpg",
            colors: ["#000", "#8b4513"],
          },
          {
            id: 2,
            name: "Sample Curls",
            price: 3999,
            image: "/image/product-img6.jpg",
            colors: ["#000"],
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <main className="overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[120vh] bg-[#0b0b0f] text-white flex justify-center items-center overflow-hidden py-32">
        {/* Background Image with optimized blend */}
        <div
          className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat opacity-30 grayscale-[35%]"
          style={{ backgroundImage: "url('/image/hero-image.jpg')" }}
        ></div>

        {/* Subtle Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80 z-0"></div>

        <div className="max-w-4xl px-6 relative z-10 text-center flex flex-col items-center">
          <span className="text-[11px] md:text-xs font-black uppercase tracking-[0.3em] text-white/60 mb-6 opacity-0 translate-y-4 animate-[fadeUp_0.8s_ease_forwards]">
            Your Hair, Your Statement
          </span>

          <h1 className="text-[2rem] md:text-[4rem] leading-[1.1] font-black text-white mb-8 tracking-[-0.03em] opacity-0 translate-y-8 animate-[fadeUp_1s_0.2s_ease_forwards]">
            Make a bold look with <br className="hidden md:block" />
            your attractive hair style!
          </h1>

          <p className="text-base md:text-xl text-white/70 max-w-2xl leading-relaxed mb-12 opacity-0 translate-y-8 animate-[fadeUp_1s_0.4s_ease_forwards] font-medium">
            Discover premium hair designed to match your style, boost your
            confidence, and let you express yourself effortlessly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-14 opacity-0 translate-y-8 animate-[fadeUp_1s_0.6s_ease_forwards]">
            <Link
              className="px-10 py-5 bg-[#d78455] text-black rounded-2xl no-underline font-black text-lg shadow-xl shadow-black/30 hover:bg-[#c06a3b] transition-all hover:-translate-y-1 active:scale-95"
              href="/shop"
            >
              Classic Collection
            </Link>
            <Link
              className="px-10 py-5 bg-white/10 text-white rounded-2xl no-underline font-black text-lg border border-white/20 shadow-xl shadow-black/30 hover:bg-white/20 transition-all hover:-translate-y-1 active:scale-95"
              href="/shop"
            >
              Luxury Collection
            </Link>
          </div>

          {/* Social Proof Section */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 opacity-0 translate-y-8 animate-[fadeUp_1s_0.8s_ease_forwards]">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-lg font-black text-white">Ratings</span>
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-400" fill="currentColor" aria-hidden="true">
                  <path d="M12 3.5l2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17.7 6.6 20.3l1-6.1-4.4-4.3 6.1-.9L12 3.5z" />
                </svg>
                <span className="text-lg font-black text-white">5.0</span>
              </div>
              <p className="text-xs font-bold text-white/60 uppercase tracking-widest px-1">Trusted by 4k+ Clients</p>
            </div>

            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-14 h-14 rounded-full border-4 border-white/40 overflow-hidden shadow-lg shadow-black/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-14 h-14 rounded-full border-4 border-white/40 bg-black flex items-center justify-center text-white text-[10px] font-black shadow-lg shadow-black/40">
                +4k
              </div>
            </div>
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-orange-500/15 rounded-full blur-3xl z-0"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-rose-500/15 rounded-full blur-3xl z-0"></div>
      </section>

      {/* ABOUT TEASER */}
      <section className="py-32 px-6 text-center bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight text-gray-900">Our Story</h2>
          <p className="max-w-3xl mx-auto leading-relaxed text-gray-600 text-xl font-medium mb-10">
            At Thaniablaq, we are passionate about providing premium-quality hair
            that reflects elegance, confidence, and timeless beauty. We carefully select the finest collections to enhance natural beauty...
          </p>
          <Link href="/about" className="inline-flex items-center gap-2 text-orange-500 font-black no-underline text-xl hover:translate-x-2 transition-all group">
            Read Our Full Story <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-32 px-6 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-6xl font-black mb-16 tracking-tight text-gray-900">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {loading ? (
              <p className="text-center w-full col-span-full py-20 text-gray-400 font-medium text-xl">Loading products...</p>
            ) : (
              products.map((p) => <ProductCard key={p.id} product={p} />)
            )}
          </div>
          <div className="text-center mt-20">
            <Link href="/shop" className="inline-block px-12 py-5 border-2 border-black text-black rounded-2xl no-underline font-black text-lg transition-all duration-300 hover:bg-black hover:text-white shadow-xl shadow-gray-200">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-32 px-6 bg-black text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">Ready for a new look?</h2>
          <p className="text-xl md:text-2xl mb-12 text-gray-400 leading-relaxed">Join thousands of women who trust Thaniablaq for their premium hair needs.</p>
          <Link href="/signup" className="inline-block px-12 py-5 bg-orange-500 text-black rounded-2xl no-underline font-black text-xl shadow-2xl shadow-orange-500/20 transition-all duration-300 hover:bg-[#ffb347] hover:-translate-y-1 hover:shadow-orange-500/40 active:scale-95">
            Create Account Now
          </Link>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(2rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
