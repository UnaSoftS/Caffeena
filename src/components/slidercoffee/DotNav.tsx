// components/DotNav.tsx
"use client";
import { motion } from "framer-motion";

export default function DotNav({
  count,
  active,
  onJump,
}: {
  count: number;
  active: number;
  onJump: (i: number) => void;
}) {
  return (
    <div className="pointer-events-auto absolute inset-y-0 right-4 hidden md:flex items-center">
      <ul className="flex flex-col gap-3">
        {Array.from({ length: count }).map((_, i) => {
          const isActive = i === active;
          return (
            <li key={i}>
              <button
                aria-label={`Go to coffee ${i + 1}`}
                onClick={() => onJump(i)}
                className="relative w-4 h-4 rounded-full"
              >
                <span
                  className="absolute inset-0 rounded-full"
                  style={{
                    boxShadow: isActive ? "0 0 0 2px #222 inset" : "none",
                    background: isActive ? "#fff" : "#c9c9c9",
                  }}
                />
                <motion.span
                  layoutId="dot-ring"
                  className="absolute -inset-1 rounded-full border border-black/30"
                  style={{ display: isActive ? "block" : "none" }}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
