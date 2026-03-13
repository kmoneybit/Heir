"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useCart();
  const { user, logout } = useAuth();

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#1a1c23] text-white text-[11px] font-bold uppercase tracking-[0.2em] py-2.5 px-6 flex justify-between items-center relative z-[60]">
        <div className="hidden md:block"></div>
        <div className="flex items-center gap-4 mx-auto md:mx-0">
          <span className="opacity-60">&lt;</span>
          <span>60 days free return. No Questions Asked</span>
          <span className="opacity-60">&gt;</span>
        </div>
        <button
          type="button"
          aria-label="Dismiss announcement"
          className="hidden md:flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>
      </div>

      <header className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex justify-between items-center">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/image/logo_image.jpg"
              alt="Logo"
              width={35}
              height={35}
              className="w-[35px] rounded-lg shadow-sm group-hover:scale-105 transition-transform"
            />
            <p className="text-black font-black text-xl tracking-tighter uppercase">Thaniablaq</p>
          </Link>

          {/* Desktop Nav - Center */}
          <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            <Link
              href="/"
              className="text-[13px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-[13px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
            >
              Hair Styles
            </Link>
            <Link
              href="/about"
              className="text-[13px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
            >
              Our Story
            </Link>
            <Link
              href="/contact"
              className="text-[13px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Right Utilities */}
          <div className="flex items-center gap-5 md:gap-7">
            {user ? (
              <div className="flex items-center gap-4">
                <button 
                  onClick={logout}
                  className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-orange-500 transition-colors hidden md:block"
                >
                  Logout
                </button>
                <div className="hidden md:flex items-center justify-center text-gray-700">
                  <span className="sr-only">Account</span>
                  <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M20 21a8 8 0 1 0-16 0" />
                    <circle cx="12" cy="8" r="4" />
                  </svg>
                </div>
              </div>
            ) : (
              <Link href="/login" className="hidden md:flex items-center justify-center text-gray-700 hover:text-black transition-colors">
                <span className="sr-only">Account</span>
                <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M20 21a8 8 0 1 0-16 0" />
                  <circle cx="12" cy="8" r="4" />
                </svg>
              </Link>
            )}
            
            <Link href="/cart" className="relative group text-gray-700 hover:text-black transition-colors">
              <span className="sr-only">Cart</span>
              <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 9h12l-1 11H7L6 9z" />
                <path d="M9 9V7a3 3 0 0 1 6 0v2" />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm">
                  {cart.length}
                </span>
              )}
            </Link>
            <button
              className="lg:hidden text-black text-2xl focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6l-12 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl transition-all duration-300 overflow-hidden ${
            menuOpen ? "max-h-screen opacity-100 py-8" : "max-h-0 opacity-0 py-0"
          }`}
        >
          <nav className="flex flex-col items-center gap-6">
            <Link href="/" onClick={() => setMenuOpen(false)} className="text-lg font-bold text-gray-900">
              Home
            </Link>
            <Link href="/shop" onClick={() => setMenuOpen(false)} className="text-lg font-bold text-gray-900">
              Shop
            </Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="text-lg font-bold text-gray-900">
              About
            </Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="text-lg font-bold text-gray-900">
              Contact
            </Link>
            {user ? (
               <button 
               onClick={() => { logout(); setMenuOpen(false); }}
               className="text-lg font-bold text-red-500"
             >
               Logout
             </button>
            ) : (
              <Link href="/login" onClick={() => setMenuOpen(false)} className="text-lg font-bold text-orange-500">
                Account
              </Link>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}
