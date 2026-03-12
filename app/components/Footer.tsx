import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="col">
          <Image
            src="/image/logo_image.jpg"
            alt="Thaniablaq"
            className="footer-logo"
            width={56}
            height={56}
          />
          <h4>Thaniablaq</h4>
          <p>Premium-quality hair crafted for confidence and style.</p>
          <div className="social">
            <a href="#" aria-label="Instagram">
              <Image src="/image/instagram-fill.svg" alt="Instagram" width={28} height={28} />
            </a>
            <a href="#" aria-label="Facebook">
              <Image src="/image/facebook-circle-fill (1).svg" alt="Facebook" width={28} height={28} />
            </a>
            <a href="#" aria-label="TikTok">
              <Image src="/image/tiktok-line (1).svg" alt="TikTok" width={28} height={28} />
            </a>
            <a href="https://wa.me/2347082417100" aria-label="WhatsApp">
              <Image src="/image/whatsapp-fill.svg" alt="WhatsApp" width={28} height={28} />
            </a>
          </div>
        </div>
        <div className="col">
          <h4>Quick Links</h4>
          <Link href="/">Home</Link>
          <Link href="/#about">About</Link>
          <Link href="/#product">Products</Link>
          <Link href="/admin">Admin</Link>
        </div>
        <div className="col newsletter">
          <h4>Newsletter</h4>
          <p>Join our mailing list for offers and updates.</p>
          <div>
            <input id="footer-email" placeholder="Your email" />
            <button id="footer-join">Join</button>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", color: "#777", marginTop: "18px" }}>
        © 2026 Designed by KMONEY
      </div>
    </footer>
  );
}
