"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useCart();

  return (
    <header id="home">
      <div className="logoArea">
        <Image
          src="/image/logo_image.jpg"
          alt="Logo"
          width={40}
          height={40}
          className="logoImg"
        />
        <p className="subTitle">Thaniablaq</p>
      </div>
      <div
        className="hamburger"
        id="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      <nav className={`navLinks ${menuOpen ? "active" : ""}`}>
        <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link href="/#about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link href="https://wa.me/2347082417100" onClick={() => setMenuOpen(false)}>Contact</Link>
        <Link href="/#sign-up" onClick={() => setMenuOpen(false)}>Sign Up</Link>
        <Link href="/#login" onClick={() => setMenuOpen(false)}>Log In</Link>
        <Link href="/cart" onClick={() => setMenuOpen(false)}>
          Cart (<span id="cart-count">{cart.length}</span>)
        </Link>
      </nav>
    </header>
  );
}
