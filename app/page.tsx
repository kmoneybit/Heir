"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { Product } from "./context/CartContext";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [teamVisible, setTeamVisible] = useState(false);
  const [method, setMethod] = useState("email");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        setProducts(data);
      } catch {
        // Fallback
        setProducts([
          {
            id: 1,
            name: "Sample Straight",
            price: 2999,
            image: "/image/product-img6.jpg",
            colors: ["#000", "#8b4513"],
          },
          {
            id: 2,
            name: "Sample Curls",
            price: 3999,
            image: "/image/product-img6.jpg",
            colors: ["#000"],
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <main>
      {/* HERO SECTION */}
      <section className="heroSection">
        <div className="hero-text">
          <h1 style={{ fontSize: "60px" }}>Welcome To Thaniablaq Hair</h1>
          <p>Premium quality hair for confident, beautiful women</p>
          <Link className="btn-shop" href="#product">
            Shop Now
          </Link>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about-section">
        <h2>About Us</h2>
        <p>
          At Thaniablaq, we are passionate about providing premium-quality hair
          that reflects elegance, confidence, and timeless beauty. Hair is more
          than a style — it is an expression of personality and confidence. We
          carefully select the finest collections to enhance natural beauty. Our
          products are soft, durable, and easy to maintain for long-lasting
          satisfaction. Whether you prefer sleek straight styles, glamorous
          curls, or natural textures, we deliver hair that helps you look and
          feel your best.
        </p>
      </section>

      <h1
        id="product"
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          color: "orange",
        }}
      >
        PRODUCTS
      </h1>
      <section className="products">
        {loading ? (
          <p style={{ color: "#666" }}>Loading products...</p>
        ) : products.length === 0 ? (
          <p style={{ color: "#666" }}>No products available.</p>
        ) : (
          products.map((p) => <ProductCard key={p.id} product={p} />)
        )}
      </section>

      {/* SIGN UP */}
      <section id="sign-up" className="auth-section sign-up">
        <div className="auth-container">
          <div className="auth-card">
            <h2 className="auth-title">Create Account</h2>
            <p className="auth-subtitle">Join our community for exclusive offers</p>

            <div className="method-selector">
              <label className="method-label">
                <input
                  type="radio"
                  name="method"
                  value="email"
                  checked={method === "email"}
                  onChange={() => setMethod("email")}
                />
                <span>Email</span>
              </label>
              <label className="method-label">
                <input
                  type="radio"
                  name="method"
                  value="phone"
                  checked={method === "phone"}
                  onChange={() => setMethod("phone")}
                />
                <span>Phone</span>
              </label>
            </div>

            {method === "email" && (
              <div id="email-block" className="form-block">
                <div className="form-group">
                  <input type="email" placeholder="Email Address" className="form-input" />
                </div>
                <div className="form-group">
                  <input type="password" placeholder="Password" className="form-input" />
                </div>
                <button className="btn-primary btn-full">Create Account</button>
              </div>
            )}

            {method === "phone" && (
              <div id="phone-block" className="form-block">
                <div className="form-group">
                  <input
                    type="tel"
                    placeholder="Phone number (e.g. +15551234567)"
                    className="form-input"
                  />
                </div>
                <button className="btn-primary btn-full">
                  Send Verification Code
                </button>
              </div>
            )}

            <p className="auth-link">
              Already have an account? <Link href="#login">Sign in here</Link>
            </p>
          </div>
        </div>
      </section>

      {/* LOGIN (homepage) */}
      <section id="login" className="auth-section login-section">
        <div className="auth-container">
          <div className="auth-card">
            <h2 className="auth-title">Sign In</h2>
            <p className="auth-subtitle">Welcome back to Thaniablaq Hair</p>

            <div className="form-group">
              <input type="email" placeholder="Email Address" className="form-input" />
            </div>
            <div className="form-group">
              <input type="password" placeholder="Password" className="form-input" />
            </div>

            <button className="login_button btn-primary btn-full">Sign In</button>

            <p className="auth-link">
              <Link href="#sign-up">Don&apos;t have an account? Sign up</Link>
            </p>
            <p style={{ textAlign: "center", marginTop: "16px", fontSize: "0.9rem", color: "#999" }}>
              <Link href="/login" className="auth-link-secondary">
                Or open full login page
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section id="team" className="team-section">
        <div className="team-container">
          <h2 className="team-title">Meet Our Team</h2>
          <button
            id="team-toggle"
            className="team-toggle-btn"
            onClick={() => setTeamVisible(!teamVisible)}
          >
            {teamVisible ? "Hide Team" : "Show Team"}
          </button>

          {teamVisible && (
            <div id="team-content" className="team-content">
              <div className="team-grid">
                <div className="team-member">
                  <div className="team-avatar">KM</div>
                  <h3>KMONEY</h3>
                  <p>Founder & Designer</p>
                  <p className="team-bio">
                    Creative mind behind Thaniablaq Hair&apos;s vision and design.
                  </p>
                </div>
                <div className="team-member">
                  <div className="team-avatar">TH</div>
                  <h3>Thaniablaq</h3>
                  <p>Brand Owner</p>
                  <p className="team-bio">
                    Passionate about premium quality and customer satisfaction.
                  </p>
                </div>
                <div className="team-member">
                  <div className="team-avatar">CM</div>
                  <h3>Community Manager</h3>
                  <p>Customer Relations</p>
                  <p className="team-bio">
                    Dedicated to providing exceptional customer support and
                    engagement.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
