"use client";

import { useState } from "react";
import Image from "next/image";

const roasts = [
  {
    key: "light",
    title: "LIGHT - ROASTED",
    description: `Light roasts provide the highest, most delicate flavors and can
    often be more acidic. Because there is less of a roasted flavor, the
    original flavor of the bean is easier to shine through.`,
    color: "text-orange-500",
    img: "/images/1.png",
  },
  {
    key: "medium",
    title: "MEDIUM - ROASTED",
    description: `Medium roasts provide a balance with deeper flavors, offering
    more body but still retaining the bean’s natural notes.`,
    color: "text-yellow-400",
    img: "/images/2.png",
  },
  {
    key: "dark",
    title: "DARK - ROASTED",
    description: `Dark roasts highlight bold, smoky flavors with less acidity,
    often giving a heavier mouthfeel and bittersweet finish.`,
    color: "text-red-500",
    img: "/images/3.png",
  },
  {
    key: "blend",
    title: "HOUSE BLEND",
    description: `Blends combine different beans or roast levels to create a
    unique profile that balances multiple taste notes.`,
    color: "text-green-500",
    img: "/images/3.png",
  },
];

export default function RoastSection() {
  const [active, setActive] = useState("light");
  const roast = roasts.find((r) => r.key === active)!;

  return (
    <section className="bg-gray-100 text-white py-16 px-6 md:px-20">
      {/* Tabs */}
      <div className="flex space-x-6 mb-8">
        {roasts.map((r) => (
          <button
            key={r.key}
            onClick={() => setActive(r.key)}
            className={`uppercase tracking-wider font-semibold  ${
              active === r.key ? "text-[#a06c4c] border-b-2 border-orange-500" : "text-gray-400"
            }`}
          >
            {r.key}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <h2 className={`text-2xl font-bold mb-4 ${roast.color}`}>{roast.title}</h2>
          <p className="text-gray-300 leading-relaxed">{roast.description}</p>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <Image
            src={roast.img}
            alt={roast.title}
            width={400}
            height={300}
            className="object-contain border border-gray-700 rounded-xl "
          />
        </div>
      </div>
    </section>
  );
}
