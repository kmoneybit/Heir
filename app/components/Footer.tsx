import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-24 pb-12 px-6 border-t border-white/5 mx-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
        {/* Brand Column */}
        <div>
          <div className="flex items-center gap-2.5 mb-5">
            <Image
              src="/image/logo_image.jpg"
              alt="Thaniablaq"
              width={45}
              height={45}
              className="rounded-lg !w-[45px] !h-[45px] object-cover"
            />
            <h3 className="text-2xl m-0 tracking-wide font-bold">Thaniablaq</h3>
          </div>
          <p className="text-[#aaa] leading-[1.8] text-[0.95rem] mb-[30px]">
            Premium-quality hair crafted for confidence and style. Discover the collection that defines you.
          </p>
          <div className="flex gap-5">
            <a href="#" aria-label="Instagram" className="opacity-70 hover:opacity-100 hover:-translate-y-1 transition-all duration-300">
              <Image src="/image/instagram-fill.svg" alt="" width={24} height={24} className="invert w-6 h-6 inline-block" />
            </a>
            <a href="#" aria-label="Facebook" className="opacity-70 hover:opacity-100 hover:-translate-y-1 transition-all duration-300">
              <Image src="/image/facebook-circle-fill (1).svg" alt="" width={24} height={24} className="invert w-6 h-6 inline-block" />
            </a>
            <a href="#" aria-label="TikTok" className="opacity-70 hover:opacity-100 hover:-translate-y-1 transition-all duration-300">
              <Image src="/image/tiktok-line (1).svg" alt="" width={24} height={24} className="invert w-6 h-6 inline-block" />
            </a>
            <a href="https://wa.me/2347082417100" aria-label="WhatsApp" className="opacity-70 hover:opacity-100 hover:-translate-y-1 transition-all duration-300">
              <Image src="/image/whatsapp-fill.svg" alt="" width={24} height={24} className="invert w-6 h-6 inline-block" />
            </a>
          </div>
        </div>

        {/* Shop Column */}
        <div>
          <h4 className="text-white text-[1.1rem] mb-[25px] font-semibold border-l-4 border-orange-500 pl-4 uppercase tracking-wide">Shop Collection</h4>
          <ul className="list-none p-0 m-0">
            <li className="mb-3">
              <Link href="/shop" className="text-[#888] no-underline transition-all duration-300 hover:text-orange-500 hover:pl-1">
                Featured Items
              </Link>
            </li>
            <li className="mb-3">
              <Link href="/shop" className="text-[#888] no-underline transition-all duration-300 hover:text-orange-500 hover:pl-1">
                New Arrivals
              </Link>
            </li>
            <li className="mb-3">
              <Link href="/contact" className="text-[#888] no-underline transition-all duration-300 hover:text-orange-500 hover:pl-1">
                Wholesale Inquiry
              </Link>
            </li>
            <li className="mb-3">
              <Link href="/contact" className="text-[#888] no-underline transition-all duration-300 hover:text-orange-500 hover:pl-1">
                Track Your Order
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Column */}
        <div>
          <h4 className="text-white text-[1.1rem] mb-[25px] font-semibold border-l-4 border-orange-500 pl-4 uppercase tracking-wide">Company</h4>
          <ul className="list-none p-0 m-0">
            <li className="mb-3">
              <Link href="/about" className="text-[#888] no-underline transition-all duration-300 hover:text-orange-500 hover:pl-1">
                Our Story
              </Link>
            </li>
            <li className="mb-3">
              <Link href="/about" className="text-[#888] no-underline transition-all duration-300 hover:text-orange-500 hover:pl-1">
                Meet The Team
              </Link>
            </li>
            <li className="mb-3">
              <Link href="/contact" className="text-[#888] no-underline transition-all duration-300 hover:text-orange-500 hover:pl-1">
                Contact Us
              </Link>
            </li>
            <li className="mb-3">
              <Link href="/admin" className="text-[#888] no-underline transition-all duration-300 hover:text-orange-500 hover:pl-1">
                Manage Store
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div>
          <h4 className="text-white text-[1.1rem] mb-[25px] font-semibold border-l-4 border-orange-500 pl-4 uppercase tracking-wide">Newsletter</h4>
          <p className="text-[#888] text-[0.9rem] mb-5">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <div className="relative">
            <input
              placeholder="Email address"
              className="w-full py-3 px-4 bg-[#222] border border-[#333] rounded-md text-white outline-none focus:border-orange-500 transition-colors"
            />
            <button className="absolute right-1 top-1 bottom-1 px-4 bg-orange-500 border-none rounded font-bold cursor-pointer hover:bg-[#ffb347] hover:-translate-y-0.5 transition-all duration-150 text-black">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mt-20 mx-auto border-t border-white/10 pt-8 flex justify-between flex-wrap gap-6 text-[#666] text-sm font-medium">
        <div>&copy; 2026 Thaniablaq Hair. All Rights Reserved.</div>
        <div className="flex gap-5">
          <span className="cursor-pointer hover:text-[#888] transition-colors">Privacy Policy</span>
          <span className="cursor-pointer hover:text-[#888] transition-colors">Terms of Service</span>
          <span className="cursor-pointer hover:text-[#888] transition-colors">Designed by KMONEY</span>
        </div>
      </div>
    </footer>
  );
}
