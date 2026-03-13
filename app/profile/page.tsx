"use client";

import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="pt-40 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <main className="pt-40 pb-32 px-6 bg-[#f8f9fc] min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-gray-200/50 border border-gray-100 mb-8 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <div className="w-32 h-32 rounded-full border-4 border-orange-500/20 p-1 relative">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-orange-400 to-rose-400 flex items-center justify-center text-white text-4xl font-black">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="absolute bottom-1 right-1 w-8 h-8 bg-green-500 border-4 border-white rounded-full"></div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">Your Profile</h1>
            <p className="text-gray-500 font-medium text-lg mb-6">{user.email}</p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <span className="px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-black uppercase tracking-widest border border-orange-100">
                Premium Member
              </span>
              <span className="px-4 py-1.5 bg-gray-50 text-gray-400 rounded-full text-xs font-black uppercase tracking-widest border border-gray-100">
                Verified Account
              </span>
            </div>
          </div>

          <button 
            onClick={logout}
            className="px-8 py-4 bg-red-50 text-red-600 rounded-2xl font-black hover:bg-red-500 hover:text-white transition-all active:scale-95"
          >
            Logout
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/30 hover:-translate-y-1 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2">My Orders</h3>
            <p className="text-gray-500 text-sm font-medium">Track your luxury hair bundles and deliveries</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/30 hover:-translate-y-1 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center mb-6 group-hover:bg-rose-500 group-hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2">Wishlist</h3>
            <p className="text-gray-500 text-sm font-medium">Items you&apos;ve saved for your next transformation</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/30 hover:-translate-y-1 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2">Settings</h3>
            <p className="text-gray-500 text-sm font-medium">Manage your security and preferences</p>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-12 bg-black rounded-[2.5rem] p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-4">Thaniablaq Rewards</h2>
            <p className="text-white/60 mb-8 max-w-lg font-medium leading-relaxed">
              As a valued member, you earn points on every purchase. Use them to get exclusive discounts on our premium hair extensions.
            </p>
            <Link href="/shop" className="inline-block px-8 py-4 bg-[#d78455] text-black rounded-2xl font-black hover:bg-[#c06a3b] transition-all">
              Redeem Points
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
