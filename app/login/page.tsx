import React from "react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main style={{ padding: "120px 20px", background: "linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ maxWidth: "450px", width: "100%", background: "white", padding: "50px 40px", borderRadius: "16px", boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)" }}>
        <h2 style={{ fontSize: "2rem", color: "#1a1a1a", marginBottom: "8px", fontWeight: 700, textAlign: "center" }}>Welcome Back</h2>
        <p style={{ color: "#666", textAlign: "center", fontSize: "0.95rem", marginBottom: "32px", lineHeight: "1.5" }}>Sign in to your Thaniablaq Hair account</p>

        <div style={{ marginBottom: "16px" }}>
          <input
            type="email"
            placeholder="Email Address"
            className="form-input"
            style={{ display: "block", width: "100%", padding: "13px 16px", borderRadius: "10px", border: "2px solid #e0e0e0", fontSize: "1rem", background: "#fafafa" }}
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <input
            type="password"
            placeholder="Password"
            className="form-input"
            style={{ display: "block", width: "100%", padding: "13px 16px", borderRadius: "10px", border: "2px solid #e0e0e0", fontSize: "1rem", background: "#fafafa" }}
          />
        </div>

        <button
          style={{ background: "linear-gradient(135deg, #ff8c00 0%, #ff7700 100%)", padding: "13px 28px", border: "none", borderRadius: "10px", fontWeight: "bold", fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.5px", color: "white", width: "100%", cursor: "pointer", marginTop: "8px", boxShadow: "0 4px 15px rgba(255, 140, 0, 0.3)" }}
        >
          Sign In
        </button>

        <p style={{ textAlign: "center", marginTop: "24px", color: "#666", fontSize: "0.95rem" }}>
          Don&apos;t have an account? <Link href="/#sign-up" style={{ color: "#ff8c00", textDecoration: "none", fontWeight: 600 }}>Create one here</Link>
        </p>
      </div>
    </main>
  );
}
