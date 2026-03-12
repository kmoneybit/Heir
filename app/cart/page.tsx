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
    <section className="cart-section" style={{ padding: "120px 40px 80px", maxWidth: "1000px", margin: "0 auto", minHeight: "70vh" }}>
      <h1 style={{ marginBottom: "20px", color: "black", fontSize: "2.5rem" }}>Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="cart-empty" style={{ textAlign: "center", padding: "40px", color: "gray" }}>
          <p>Your cart is empty</p>
          <Link href="/" style={{ color: "#ff8c00", textDecoration: "none" }}>
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <table className="cart-table" style={{ width: "100%", borderCollapse: "collapse", background: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", borderRadius: "8px", overflow: "hidden", marginBottom: "20px" }}>
            <thead style={{ background: "#222", color: "white" }}>
              <tr>
                <th style={{ padding: "15px", textAlign: "left" }}>Product</th>
                <th style={{ padding: "15px", textAlign: "left" }}>Price</th>
                <th style={{ padding: "15px", textAlign: "left" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "15px" }}>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <Image
                        src={item.image || "/image/product-img6.jpg"}
                        alt={item.name}
                        width={60}
                        height={60}
                        style={{ objectFit: "cover", borderRadius: "4px" }}
                      />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "15px" }}>₦{Number(item.price).toLocaleString()}</td>
                  <td style={{ padding: "15px" }}>
                    <button
                      onClick={() => removeFromCart(index)}
                      style={{ background: "#ff4d4d", color: "white", border: "none", padding: "8px 12px", borderRadius: "4px", cursor: "pointer" }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary" style={{ display: "flex", justifyContent: "flex-end", gap: "20px", marginBottom: "20px" }}>
            <div className="summary-box" style={{ background: "#f5f5f5", padding: "20px", borderRadius: "8px", minWidth: "250px" }}>
              <h3 style={{ margin: "0 0 10px 0", fontSize: "1rem", color: "#666" }}>Total Items: {cart.length}</h3>
              <h3 style={{ margin: "0 0 10px 0", fontSize: "1rem", color: "#666" }}>Total Price</h3>
              <div className="summary-total" style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#ff8c00" }}>
                ₦{Number(total).toLocaleString()}
              </div>
            </div>
          </div>

          <div className="cart-actions" style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
            <Link
              href="/"
              style={{ padding: "12px 24px", borderRadius: "6px", fontWeight: "bold", textDecoration: "none", background: "#ddd", color: "#222", textAlign: "center" }}
            >
              Continue Shopping
            </Link>
            <button
              onClick={handleCheckout}
              style={{ padding: "12px 24px", border: "none", borderRadius: "6px", fontSize: "1rem", fontWeight: "bold", cursor: "pointer", background: "#ff8c00", color: "white" }}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
}
