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

  if (loading) return <div style={{ paddingTop: "120px", textAlign: "center" }}>Loading...</div>;

  return (
    <div style={{ paddingTop: "120px", paddingBottom: "80px", maxWidth: "600px", margin: "auto" }}>
      <div className="payment-container" style={{ padding: "40px", background: "white", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
        <h1 style={{ marginBottom: "20px" }}>Payment</h1>

        {cart.length === 0 ? (
          <div className="order-summary" style={{ background: "#f5f5f5", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
            <p>
              No items in cart. <Link href="/" style={{ color: "#ff8c00" }}>Go back to shop</Link>
            </p>
          </div>
        ) : (
          <>
            <div className="order-summary" style={{ background: "#f5f5f5", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
              <h3>Order Summary</h3>
              {cart.map((item, index) => (
                <div key={index} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #ddd" }}>
                  <span>{item.name} x1</span>
                  <span>₦{Number(item.price).toLocaleString()}</span>
                </div>
              ))}
              <div style={{ fontSize: "1.2rem", fontWeight: "bold", marginTop: "10px", textAlign: "right", color: "#ff8c00" }}>
                Total: ₦{Number(total).toLocaleString()}
              </div>
            </div>

            <form onSubmit={handlePayment}>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "6px" }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "6px" }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "6px" }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Phone</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "6px" }}
                />
              </div>

              <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>Payment Details</h3>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Card Number</label>
                <input
                  type="text"
                  required
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "6px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "20px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Expiry</label>
                  <input
                    type="text"
                    required
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "6px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>CVV</label>
                  <input
                    type="text"
                    required
                    placeholder="123"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "6px" }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={processing}
                style={{ width: "100%", padding: "12px", background: "#ff8c00", color: "white", border: "none", borderRadius: "6px", fontSize: "1rem", fontWeight: "bold", cursor: "pointer" }}
              >
                {processing ? "Processing..." : "Complete Payment"}
              </button>
            </form>

            <div style={{ textAlign: "center", marginTop: "15px" }}>
              <Link href="/" style={{ color: "#ff8c00", textDecoration: "none" }}>
                ← Back to home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
