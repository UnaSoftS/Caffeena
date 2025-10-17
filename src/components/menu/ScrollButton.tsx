// components/ScrollButton.tsx
"use client";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ScrollButton({
  isLast,
  onClick,
}: {
  isLast: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="pointer-events-auto fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-xl border border-black/10 bg-white/90 backdrop-blur shadow"
      aria-label={isLast ? "Scroll to top" : "Scroll to next"}
    >
      {isLast ? <ChevronUp /> : <ChevronDown />}
    </button>
  );
}
