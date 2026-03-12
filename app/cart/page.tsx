"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((acc, item) => acc + Number(item.price), 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }
    sessionStorage.setItem("checkout_cart", JSON.stringify(cart));
    window.location.href = "/payment";
  };

  return (
    <section className="pt-40 pb-32 px-6 md:px-10 max-w-7xl mx-auto min-h-[70vh]">
      <h1 className="text-4xl md:text-6xl font-black mb-12 text-black tracking-tight">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
          <p className="text-gray-400 text-xl mb-6">Your cart is empty</p>
          <Link href="/" className="inline-block px-8 py-3 bg-orange-500 text-white rounded-lg no-underline font-bold transition-all hover:bg-[#ffb347] shadow-lg shadow-orange-100">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="overflow-x-auto rounded-2xl shadow-sm border border-gray-100 bg-white">
            <table className="w-full border-collapse">
              <thead className="bg-black text-white">
                <tr>
                  <th className="p-5 text-left font-bold uppercase tracking-wider text-sm">Product</th>
                  <th className="p-5 text-left font-bold uppercase tracking-wider text-sm">Price</th>
                  <th className="p-5 text-left font-bold uppercase tracking-wider text-sm">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cart.map((item, index) => (
                  <tr key={index} className="transition-colors hover:bg-gray-50/50">
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <Image
                          src={item.image || "/image/product-img6.jpg"}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-16 h-16 object-cover rounded-lg shadow-sm"
                        />
                        <span className="font-bold text-gray-900">{item.name}</span>
                      </div>
                    </td>
                    <td className="p-5 text-lg font-medium text-gray-700">NGN {Number(item.price).toLocaleString()}</td>
                    <td className="p-5">
                      <button
                        onClick={() => removeFromCart(index)}
                        className="bg-red-500 text-white border-none px-5 py-2 rounded-lg font-bold cursor-pointer transition-all hover:bg-red-600 active:scale-95 shadow-md shadow-red-100"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end pr-2">
            <div className="bg-gray-50 p-8 rounded-2xl min-w-[300px] border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 text-sm font-bold uppercase tracking-wider">Total Items</span>
                <span className="text-gray-900 font-bold">{cart.length}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-gray-900 font-bold text-lg">Total Price</span>
                <span className="text-3xl font-black text-orange-500">NGN {Number(total).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
            <Link
              href="/"
              className="px-10 py-4 rounded-xl font-bold no-underline bg-gray-100 text-gray-700 text-center transition-all hover:bg-gray-200"
            >
              Continue Shopping
            </Link>
            <button
              onClick={handleCheckout}
              className="px-10 py-4 bg-orange-500 text-black border-none rounded-xl font-black text-lg transition-all hover:bg-[#ffb347] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-orange-100"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
