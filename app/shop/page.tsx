"use client";
import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { Product } from "../context/CartContext";

const PLACEHOLDER_PRODUCTS: Product[] = [
  { id: 1, name: "Premium Straight Hair", price: 45000, image: "/image/product-img6.jpg", colors: ["#000", "#1a1a1a"] },
  { id: 2, name: "Luxury Body Wave", price: 55000, image: "/image/product-img6.jpg", colors: ["#000"] },
  { id: 3, name: "Classic Curls", price: 48000, image: "/image/product-img6.jpg", colors: ["#000", "#8b4513"] },
  { id: 4, name: "Deep Wave Bundle", price: 62000, image: "/image/product-img6.jpg", colors: ["#000"] },
  { id: 5, name: "Frontal Lace Wig", price: 85000, image: "/image/product-img6.jpg", colors: ["#000", "#1a1a1a"] },
  { id: 6, name: "Closure Hair Piece", price: 35000, image: "/image/product-img6.jpg", colors: ["#000"] },
  { id: 7, name: "Kinky Straight", price: 50000, image: "/image/product-img6.jpg", colors: ["#000", "#8b4513"] },
  { id: 8, name: "Bohemian Curls", price: 58000, image: "/image/product-img6.jpg", colors: ["#000"] },
];

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = PLACEHOLDER_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="pt-40 pb-32 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-3 text-center text-gray-900 tracking-tight">Our Collection</h1>
        <p className="text-center text-gray-500 mb-12 text-lg">Premium quality hair for every style and occasion.</p>

        <div className="mb-12 flex justify-center">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-[500px] px-6 py-3.5 rounded-full border-2 border-gray-100 bg-gray-50 text-base outline-none transition-all duration-300 focus:border-orange-500 focus:bg-white shadow-sm focus:shadow-md"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center mt-20 py-20 border-2 border-dashed border-gray-100 rounded-3xl">
            <p className="text-gray-400 text-xl font-medium">No products found matching your search.</p>
            <button onClick={() => setSearchTerm("")} className="mt-4 text-orange-500 font-bold hover:underline">Clear search</button>
          </div>
        )}
      </div>
    </main>
  );
}
