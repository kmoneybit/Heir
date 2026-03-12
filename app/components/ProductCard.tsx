"use client";
import React from "react";
import Image from "next/image";
import { Product, useCart } from "../context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const imgUrl = product.image || "/image/product-img6.jpg";

  return (
    <div className="bg-white p-5 rounded-2xl text-center shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <Image
        src={imgUrl}
        alt={product.name}
        width={300}
        height={300}
        className="w-full aspect-square object-cover rounded-xl mb-4"
      />
      <h3 className="text-lg font-black mb-1.5 text-gray-900 tracking-tight">{product.name}</h3>
      <p className="font-bold mb-4 text-orange-600 text-lg">NGN {Number(product.price).toLocaleString()}</p>
      <button 
        className="bg-black w-full max-w-[180px] text-white py-3.5 border-none rounded-xl mb-6 cursor-pointer transition-all duration-300 hover:bg-orange-500 hover:shadow-xl hover:shadow-orange-100 active:scale-95 font-bold" 
        onClick={() => addToCart(product)}
      >
        Add to cart
      </button>
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">colors</p>
      <div className="flex justify-center gap-2 flex-wrap">
        {product.colors && product.colors.map((c, i) => (
          <button
            key={i}
            className="w-7.5 h-7.5 rounded-full border-none cursor-pointer transition-all duration-300 hover:scale-120 shadow-sm border border-gray-100"
            style={{ backgroundColor: c }}
          ></button>
        ))}
      </div>
    </div>
  );
}
