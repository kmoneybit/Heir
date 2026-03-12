"use client";
import React from "react";
import Image from "next/image";
import { Product, useCart } from "../context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const imgUrl = product.image || "/image/product-img6.jpg";

  return (
    <div className="product-card">
      <Image
        src={imgUrl}
        alt={product.name}
        width={300}
        height={300}
        className="product-img"
        style={{ width: "100%", height: "auto" }}
      />
      <h3>{product.name}</h3>
      <p>₦{Number(product.price).toLocaleString()}</p>
      <button className="add-cart-btn" onClick={() => addToCart(product)}>
        Add to cart
      </button>
      <p>colors</p>
      {product.colors && product.colors.map((c, i) => (
        <button
          key={i}
          className="colors-btn"
          style={{ backgroundColor: c }}
        ></button>
      ))}
    </div>
  );
}
