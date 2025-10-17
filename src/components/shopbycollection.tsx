"use client";

import Image from "next/image";

/**
 * Pixel-accurate section inspired by the provided mock: "SHOP BY COLLECTIONS".
 * - Next.js + TailwindCSS
 * - No external assets required (inline SVG ornaments)
 * - Replace /public images below with your real product images to match the mock exactly
 */

export default function ShopByCollections() {
  const items: CollectionItem[] = [
    {
      title: "Premium Quality Bean",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt labore dolore magna.",
      src: "/images/1.png",
      alt: "Coffee beans and bag",
    },
    {
      title: "Cappuccino",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt labore dolore magna.",
      src: "/images/5.png",
      alt: "Cappuccino cup with latte art",
    },
    {
      title: "Ground Coffee",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt labore dolore magna.",
      src: "/collections/ground.png",
      alt: "Ground coffee bags",
    },
    {
      title: "Coffee Machines",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt labore dolore magna.",
      src: "/collections/machine.png",
      alt: "Espresso machine",
    },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#f5eee7] py-16 md:py-24">
      {/* Subtle botanical doodles (left & right) */}
      <BotanicalLeft className="pointer-events-none absolute left-0 top-6 hidden h-[260px] w-[220px] -translate-x-6 text-stone-300/40 md:block" />
      <BotanicalRight className="pointer-events-none absolute right-2 top-6 hidden h-[220px] w-[200px] text-stone-300/40 md:block" />

      {/* Title */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center font-serif text-2xl font-extrabold uppercase tracking-wider text-stone-900 md:text-3xl">
          Shop by Collections
        </h2>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <article key={it.title} className="text-center">
              <div className="mx-auto grid place-items-center">
                <div className="relative h-40 w-40 md:h-48 md:w-48">
                  {/* inner plate */}
                  <div className="absolute inset-3 rounded-full bg-white shadow-[0_3px_12px_rgba(0,0,0,0.06)]" />

                  {/* Wreath ring */}
                  <Wreath className="absolute inset-0 text-[#d8c4ad]" />

                  {/* Image (replace with your assets in /public/collections/) */}
                  <div className="absolute inset-0 grid place-items-center">
                    <Image
                      src={it.src}
                      alt={it.alt || it.title}
                      width={300}
                      height={300}
                      className="h-28 w-auto object-contain md:h-32"
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              <h3 className="mt-6 font-serif text-[15px] font-semibold text-stone-900">
                {it.title}
              </h3>
              <p className="mx-auto mt-2 max-w-[260px] text-[13px] leading-6 text-stone-600">
                {it.desc}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Torn paper bottom edge */}
      <TornEdge className="pointer-events-none absolute bottom-0 left-0 w-full text-white" />
    </section>
  );
}

/* ——— Types ——— */
interface CollectionItem {
  title: string;
  desc: string;
  src: string;
  alt?: string;
}

/* ——— Decorations ——— */
function Wreath({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        {/* broken circular strokes to mimic the organic wreath */}
        <circle cx="100" cy="100" r="86" strokeDasharray="10 18 6 22 8 20" />
        <circle
          cx="100"
          cy="100"
          r="78"
          strokeDasharray="14 20 8 18 6 26"
          opacity=".7"
        />
        {/* tiny leaf marks */}
        {new Array(12).fill(0).map((_, i) => {
          const a = (i * Math.PI * 2) / 12;
          const R = 86;
          const x = 100 + Math.cos(a) * R;
          const y = 100 + Math.sin(a) * R;
          return (
            <path key={i} d={`M ${x} ${y} l 6 -3 m -6 3 l 6 3`} opacity=".85" />
          );
        })}
      </g>
    </svg>
  );
}

function TornEdge({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 64"
      className={className}
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M0 24c80 24 
          160-24 240 0s160 24 240 0
          160-24 240 0
          160 24 240 0
          160-24 240 0 
          160 24 240 0v40H0z"
        fill="currentColor"
      />
    </svg>
  );
}
//   الاكواد القادمة اكواد الرسومات الموجوده في مربع الكوفي

function BotanicalLeft({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 280" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M20 260c40-60 60-110 56-170" />
        <path d="M36 190c-10-22 20-32 28-16 6 12-14 28-28 16z" />
        <path d="M56 150c-14-18 8-32 20-20 10 10-6 28-20 20z" />
        <path d="M40 110c-8-16 18-30 28-16 10 12-10 28-28 16z" />
      </g>
    </svg>
  );
}

function BotanicalRight({ className = "" }: { className?: string }) {
  return (
  
    <svg viewBox="0 0 200 280" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M180 260c-40-60-60-110-56-170" />
        <path d="M164 190c10-22-20-32-28-16-6 12 14 28 28 16z" />
        <path d="M144 150c14-18-8-32-20-20-10 10 6 28 20 20z" />
        <path d="M160 110c8-16-18-30-28-16-10 12 10 28 28 16z" />
      </g>
    </svg>
  );
}
