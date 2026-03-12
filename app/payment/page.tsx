"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Product } from "../context/CartContext";

export default function PaymentPage() {
  const [cart, setCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    try {
      const savedCart = sessionStorage.getItem("checkout_cart");
      if (savedCart) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCart(JSON.parse(savedCart));
      }
    } catch {}
    setLoading(false);
  }, []);

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // Since the original backend didn't actually process payments, we simulate it
      // Let's create an order ID
      const orderId = `ORD-${Date.now()}`;
      
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      sessionStorage.removeItem("checkout_cart");
      alert("Payment successful! Order ID: " + orderId);
      window.location.href = "/";
    } catch {
      alert("Payment failed");
      setProcessing(false);
    }
  };

  if (loading) return <div className="pt-32 text-center text-gray-500 font-medium">Loading checkout...</div>;

  return (
    <div className="pt-40 pb-32 px-6 bg-gray-50/30 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100">
        <h1 className="text-4xl font-black mb-10 text-gray-900 tracking-tight">Checkout</h1>

        {cart.length === 0 ? (
          <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 mb-8">
            <p className="text-orange-800 font-medium">
              No items in cart. <Link href="/" className="text-orange-600 font-bold hover:underline">Go back to shop</Link>
            </p>
          </div>
        ) : (
          <>
            <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
              <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
                Order Summary
                <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full text-gray-600 uppercase tracking-widest">{cart.length} ITEMS</span>
              </h3>
              <div className="space-y-3">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                    <span className="text-gray-600 font-medium">{item.name}</span>
                    <span className="font-bold text-gray-900">NGN {Number(item.price).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-300 flex justify-between items-center">
                <span className="text-gray-900 font-black text-xl">Total</span>
                <span className="text-2xl font-black text-orange-500">NGN {Number(total).toLocaleString()}</span>
              </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-5 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none transition-all focus:border-orange-500 focus:bg-white text-gray-900 font-medium"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none transition-all focus:border-orange-500 focus:bg-white text-gray-900 font-medium"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Shipping Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-5 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none transition-all focus:border-orange-500 focus:bg-white text-gray-900 font-medium"
                  placeholder="123 Luxury Ave, Victoria Island, Lagos"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-5 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none transition-all focus:border-orange-500 focus:bg-white text-gray-900 font-medium"
                  placeholder="+234 ..."
                />
              </div>

              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-xl font-black mb-6 text-gray-900 tracking-tight">Payment Details</h3>
                
                <div className="space-y-1.5 mb-6">
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-5 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none transition-all focus:border-orange-500 focus:bg-white text-gray-900 font-medium tracking-widest"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                       <span className="w-8 h-5 bg-blue-600 rounded-sm"></span>
                       <span className="w-8 h-5 bg-red-500 rounded-sm"></span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-5 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none transition-all focus:border-orange-500 focus:bg-white text-gray-900 font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">CVV</label>
                    <input
                      type="text"
                      required
                      placeholder="123"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full px-5 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none transition-all focus:border-orange-500 focus:bg-white text-gray-900 font-medium shadow-inner"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full py-4 bg-black text-white rounded-2xl font-black text-lg transition-all hover:bg-orange-500 shadow-2xl shadow-gray-200 active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed group"
                >
                  {processing ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin"></span>
                      Processing...
                    </span>
                  ) : (
                    "Complete Secure Payment"
                  )}
                </button>
              </div>
            </form>

            <div className="text-center mt-8">
              <Link href="/" className="text-gray-400 font-bold hover:text-orange-500 transition-colors flex items-center justify-center gap-2 text-sm uppercase tracking-widest">
                <span className="text-lg">←</span> Back to home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
