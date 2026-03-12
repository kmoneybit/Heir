"use client";
import React, { useState, useEffect } from "react";
import { Product } from "../context/CartContext";

export default function AdminPage() {
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProducts();
  }, []);

  const handleCreate = async () => {
    if (!name || !price) {
      alert("Name and Price are required.");
      return;
    }

    const newProduct = {
      name,
      price: Number(price),
      image,
      colors: colors.split(",").map((c) => c.trim()).filter(Boolean),
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
    <div className="admin-panel" style={{ padding: "120px 40px 80px 40px", minHeight: "60vh", background: "#fff" }}>
      <h2>Admin — Manage Products</h2>
      <div className="admin-controls" style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
        <input
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }}
        />
        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }}
        />
        <input
          placeholder="Image path (e.g. /image/product-img6.jpg)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }}
        />
        <input
          placeholder="Colors (comma-separated)"
          value={colors}
          onChange={(e) => setColors(e.target.value)}
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }}
        />
        <button
          onClick={handleCreate}
          style={{ padding: "10px 14px", borderRadius: "6px", border: "none", background: "orange", color: "#000", fontWeight: "bold", cursor: "pointer" }}
        >
          Create Product
        </button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "12px" }}>
        <thead>
          <tr>
            <th style={{ padding: "8px", border: "1px solid #eee", textAlign: "left" }}>ID</th>
            <th style={{ padding: "8px", border: "1px solid #eee", textAlign: "left" }}>Name</th>
            <th style={{ padding: "8px", border: "1px solid #eee", textAlign: "left" }}>Price</th>
            <th style={{ padding: "8px", border: "1px solid #eee", textAlign: "left" }}>Colors</th>
            <th style={{ padding: "8px", border: "1px solid #eee", textAlign: "left" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px" }}>{p.id}</td>
              <td style={{ padding: "8px" }}>{p.name}</td>
              <td style={{ padding: "8px" }}>₦{Number(p.price).toLocaleString()}</td>
              <td style={{ padding: "8px" }}>{p.colors?.join(", ")}</td>
              <td style={{ padding: "8px" }}>
                <button
                  onClick={() => handleDelete(p.id)}
                  style={{ padding: "6px 8px", borderRadius: "6px", border: "none", background: "#ff4d4d", color: "#fff", cursor: "pointer" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan={5} style={{ padding: "8px", textAlign: "center" }}>
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
