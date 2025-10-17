// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import Image from "next/image";

// const footerLinks = [
//   { label: "Privacy", href: "/privacy" },
//   { label: "Terms", href: "/terms" },
//   { label: "Support", href: "/support" },
//   { label: "Contact", href: "/contact" },
// ];

// // ✅ متغيرات الحركة بعد التعديل لتفادي الخطأ
// const footerVariants = {
//   hidden: { y: 80, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       duration: 0.6,
//       ease: "easeOut" as const,
//     },
//   },
// };

// const linkHoverEffect = {
//   whileHover: { scale: 1.05 },
// };

// export default function Footer() {
//   const year = new Date().getFullYear();

//   return (
//     <motion.footer
//       variants={footerVariants}
//       initial="hidden"
//       animate="visible"
//       className="w-full bg-gray-100 shadow-inner z-40"
//       aria-label="Footer"
//     >
//       <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-6 text-gray-700">
//         {/* Logo + حقوق */}
//         <div className="flex flex-col items-center md:items-start text-center md:text-left">
//           <Link href="/" aria-label="Homepage">
//             <Image
//               src="/images/logo.png"
//               alt="Company Logo"
//               width={70}
//               height={70}
//               priority
//             />
//           </Link>
//           <p className="text-sm text-gray-500 mt-2">
//             &copy; {year} All rights reserved.
//           </p>
//         </div>

//         {/* روابط التنقل */}
//         <nav aria-label="Footer Navigation">
//           <ul className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm font-medium">
//             {footerLinks.map(({ label, href }) => (
//               <motion.li key={label} {...linkHoverEffect}>
//                 <Link
//                   href={href}
//                   className="hover:text-blue-600 transition duration-300"
//                 >
//                   {label}
//                 </Link>
//               </motion.li>
//             ))}
//           </ul>
//         </nav>
//       </div>
//     </motion.footer>
//   );
// }

"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";

/**
 * Pixel-accurate, responsive footer inspired by the provided screenshot.
 * TailwindCSS required. Drop this component into your Next.js (App Router) project
 * and place <Footer /> inside your root layout or page.
 */
export default function Footer() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "");
    // TODO: send `email` to your newsletter API endpoint
    console.log("Newsletter submit:", email);
    setSubmitted(true);
  };

  return (
    <footer className="bg-[#f5eee7] text-stone-700 border-t border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Top 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left: Orders & Returns */}
          <section aria-labelledby="orders-returns">
            <h3
              id="orders-returns"
              className="text-stone-900 font-serif text-lg tracking-wide uppercase"
            >
              Orders and returns
            </h3>
            <ul className="mt-6 space-y-3 text-base">
              {[
                { label: "Help and advice", href: "#" },
                { label: "Shipping & Returns", href: "#" },
                { label: "Terms and conditions", href: "#" },
                { label: "Refund Policy", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-stone-900 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Middle: Newsletter */}
          <section aria-labelledby="newsletter" className="md:text-center">
            <h3
              id="newsletter"
              className="text-stone-900 font-serif text-lg tracking-wide uppercase"
            >
              Sign up now and get 10% off
            </h3>
            <p className="mt-2 italic text-stone-600">
              Sign up for newsletter to receive special offers and exclusive news about Botanica products
            </p>

            <form
              onSubmit={onSubmit}
              className="mt-6 mx-auto max-w-2xl flex items-center gap-3"
              noValidate
            >
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="ENTER YOUR EMAIL"
                className="flex-1 rounded-full border-2 border-dashed border-stone-300 bg-white/70 px-6 py-3 text-sm tracking-widest uppercase placeholder:text-stone-400 outline-none focus:border-stone-500"
              />
              <button
                type="submit"
                className="rounded-full bg-[#643828] text-white px-8 py-3 text-sm font-semibold tracking-widest uppercase shadow-sm hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-400"
                aria-label="Subscribe"
              >
                Subscribe
              </button>
            </form>
            {submitted && (
              <p className="mt-3 text-sm text-green-700">
                Thanks for subscribing! Please check your inbox.
              </p>
            )}

            {/* Social icons */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <SocialCircle label="Facebook" href="#">
                <Facebook className="h-4 w-4" aria-hidden="true" />
              </SocialCircle>
              <SocialCircle label="Twitter" href="#">
                <Twitter className="h-4 w-4" aria-hidden="true" />
              </SocialCircle>
            
              {/* Remove Pinterest as it is not available */}
              <SocialCircle label="Instagram" href="#">
                <Instagram className="h-4 w-4" aria-hidden="true" />
              </SocialCircle>
            </div>
          </section>

          {/* Right: My Account */}
          <section aria-labelledby="my-account" className="md:text-right">
            <h3
              id="my-account"
              className="text-stone-900 font-serif text-lg tracking-wide uppercase"
            >
              My account
            </h3>
            <ul className="mt-6 space-y-3 text-base">
              {[
                { label: "Login", href: "#" },
                { label: "Register Account", href: "#" },
                { label: "My Wishlist", href: "#" },
                { label: "My Compare", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-stone-900 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Divider */}
        <hr className="mt-14 border-stone-200" />

        {/* Bottom bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
          <p className="text-sm text-stone-600 mx-auto md:mx-0 order-2 md:order-1">
            Copyright © 2025 BinCastle
          </p>
{/* هنا قمنا بعمل تعليق على الدفع وتحت  functiotn  الخاصة بها  */}
          {/* <div className="order-1 md:order-2 flex items-center gap-4 md:ml-auto">
            <PaymentVisa />
            <PaymentMastercard />
            <PaymentMaestro />
            <PaymentPayPal />
            <PaymentDiscover /> */}
          </div>
        </div>
      
    </footer>
  );
}

/* ——— UI bits ——— */
function SocialCircle({
  children,
  label,
  href,
}: {
  children: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full bg-stone-800 text-white shadow-sm transition hover:bg-stone-700"
    >
      {children}
    </Link>
  );
}

/* ——— Minimal, crisp payment marks (inline SVG so no external assets needed) ——— */
function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-8 rounded-md border border-stone-300 bg-white px-2 grid place-items-center shadow-sm">
      {children}
    </div>
  );
}

function PaymentVisa() {
  return (
    <Shell>
      <span className="text-[10px] font-bold tracking-widest text-stone-800">VISA</span>
    </Shell>
  );
}

function PaymentMastercard() {
  return (
    <Shell>
      <svg viewBox="0 0 48 16" className="h-3.5" aria-label="Mastercard">
        <circle cx="20" cy="8" r="6" fill="#e63946" />
        <circle cx="28" cy="8" r="6" fill="#ff9f1c" />
      </svg>
    </Shell>
  );
}

function PaymentMaestro() {
  return (
    <Shell>
      <svg viewBox="0 0 48 16" className="h-3.5" aria-label="Maestro">
        <circle cx="18" cy="8" r="6" fill="#0066cc" />
        <circle cx="30" cy="8" r="6" fill="#e60023" />
      </svg>
    </Shell>
  );
}

function PaymentPayPal() {
  return (
    <Shell>
      <span className="text-[10px] font-semibold text-stone-800">PayPal</span>
    </Shell>
  );
}

function PaymentDiscover() {
  return (
    <Shell>
      <span className="text-[10px] font-semibold text-stone-800">DISCOVER</span>
    </Shell>
  );
}
/* ——— Decorations ——— */
function Wreath({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        {/* broken circular strokes to mimic the organic wreath */}
        <circle cx="100" cy="100" r="86" strokeDasharray="10 18 6 22 8 20" />
        <circle cx="100" cy="100" r="78" strokeDasharray="14 20 8 18 6 26" opacity=".7" />
        {/* tiny leaf marks */}
        {new Array(12).fill(0).map((_, i) => {
          const a = (i * Math.PI * 2) / 12;
          const R = 86;
          const x = 100 + Math.cos(a) * R;
          const y = 100 + Math.sin(a) * R;
          return (
            <path
              key={i}
              d={`M ${x} ${y} l 6 -3 m -6 3 l 6 3`}
              opacity=".85"
            />
          );
        })}
      </g>
    </svg>
  );
}
