import React from "react";
import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="pt-32 pb-20 px-5 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-[450px] w-full bg-white p-10 md:p-14 rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-orange-600"></div>
        <h2 className="text-4xl font-black text-gray-900 mb-2 text-center tracking-tight">Create Account</h2>
        <p className="text-gray-500 text-center mb-10 leading-relaxed font-medium">Join our community for exclusive hair care offers</p>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
            <input
              type="email"
              placeholder="jane@example.com"
              className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 outline-none transition-all focus:border-orange-500 focus:bg-white text-gray-900 font-medium shadow-inner"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 outline-none transition-all focus:border-orange-500 focus:bg-white text-gray-900 font-medium shadow-inner"
            />
          </div>

          <button className="w-full py-4 mt-4 bg-black text-white rounded-2xl font-black text-lg transition-all hover:bg-orange-500 shadow-xl shadow-gray-200 active:scale-[0.98] active:shadow-md">
            Create Account
          </button>
        </form>

        <p className="text-center mt-10 text-gray-500 font-medium">
          Already have an account? <Link href="/login" className="text-orange-500 hover:text-orange-600 font-black decoration-2 underline-offset-4 hover:underline transition-all">Sign in here</Link>
        </p>
      </div>
    </main>
  );
}
