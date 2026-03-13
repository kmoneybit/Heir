"use client";
import React, { useState, useEffect } from "react";
import { Product } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [colors, setColors] = useState("");

  const loadProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadProducts();
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div className="pt-40 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const handleCreate = async () => {
    if (!name || !price) {
      alert("Name and Price are required.");
      return;
    }

    const newProduct = {
      name,
      price: Number(price),
      image,
      colors: colors.split(",").map((c: string) => c.trim()).filter(Boolean),
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (res.ok) {
        setName("");
        setPrice("");
        setImage("");
        setColors("");
        loadProducts();
      } else {
        alert("Failed to create product");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: number | string) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        loadProducts();
      } else {
        alert("Failed to delete product");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="pt-40 pb-32 px-6 md:px-10 max-w-7xl mx-auto min-h-screen bg-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
        <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight">Inventory</h2>
        <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] bg-gray-50 px-6 py-3 rounded-full border border-gray-100 shadow-sm">
           <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
           Live Inventory Status
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 mb-12 shadow-inner">
        <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
           Add New Product
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <input
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border-2 border-gray-100 bg-white outline-none transition-all focus:border-orange-500 text-gray-900 font-medium"
          />
          <input
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border-2 border-gray-100 bg-white outline-none transition-all focus:border-orange-500 text-gray-900 font-medium"
          />
          <input
            placeholder="Image path (/image/...)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border-2 border-gray-100 bg-white outline-none transition-all focus:border-orange-500 text-gray-900 font-medium lg:col-span-1"
          />
          <input
            placeholder="Colors (e.g. #000, #fff)"
            value={colors}
            onChange={(e) => setColors(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border-2 border-gray-100 bg-white outline-none transition-all focus:border-orange-500 text-gray-900 font-medium"
          />
          <button
            onClick={handleCreate}
            className="w-full bg-orange-500 text-black py-3 rounded-xl font-black text-lg transition-all hover:bg-[#ffb347] active:scale-95 shadow-lg shadow-orange-100"
          >
            Create
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-black text-white">
              <th className="p-5 text-left font-bold uppercase tracking-wider text-xs">ID</th>
              <th className="p-5 text-left font-bold uppercase tracking-wider text-xs">Product Details</th>
              <th className="p-5 text-left font-bold uppercase tracking-wider text-xs">Price</th>
              <th className="p-5 text-left font-bold uppercase tracking-wider text-xs">Colors</th>
              <th className="p-5 text-left font-bold uppercase tracking-wider text-xs whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
            {products.map((p: Product) => (
              <tr key={p.id} className="transition-colors hover:bg-gray-50/50">
                <td className="p-5 text-gray-400 font-mono text-sm">#{p.id}</td>
                <td className="p-5">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                         {/* eslint-disable-next-line @next/next/no-img-element */}
                         <img src={p.image || "/image/product-img6.jpg"} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-bold text-gray-900">{p.name}</span>
                   </div>
                </td>
                <td className="p-5 font-black text-gray-800 tracking-tight">NGN {Number(p.price).toLocaleString()}</td>
                <td className="p-5">
                   <div className="flex gap-1.5 flex-wrap">
                      {p.colors?.map((c: string, i: number) => (
                         <span key={i} className="w-4 h-4 rounded-full border border-gray-200 shadow-sm" style={{ backgroundColor: c }}></span>
                      ))}
                      {(!p.colors || p.colors.length === 0) && <span className="text-gray-400 italic text-sm">None</span>}
                   </div>
                </td>
                <td className="p-5">
                  <button
                    onClick={() => handleDelete(p.id!)}
                    className="px-5 py-2 bg-red-50 text-red-500 rounded-lg font-bold border border-red-100 transition-all hover:bg-red-500 hover:text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="p-20 text-center text-gray-400 font-medium">
                  <div className="flex flex-col items-center gap-2">
                     <span className="text-4xl">📦</span>
                     No products found in inventory
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
