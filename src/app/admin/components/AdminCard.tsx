// app/components/AdminCard.tsx
"use client";

import { motion } from "framer-motion";

type Props = {
  title: string;
  value: string;
  description: string;
  color: string; // tailwind classes like "bg-amber-100 text-amber-700"
  progress?: number; // 0..100 (optional)
};

export function AdminCard({ title, value, description, color, progress }: Props) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`rounded-2xl p-4 shadow-sm ring-1 ring-black/5 ${color}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium opacity-90">{title}</div>
          <div className="mt-1 text-2xl font-semibold">{value}</div>
          <div className="text-xs opacity-80">{description}</div>
        </div>
        {/* mini avatars blob */}
        <div className="flex -space-x-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-7 w-7 rounded-full bg-white/70 ring-2 ring-white" />
          ))}
        </div>
      </div>
      {typeof progress === "number" && (
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/50">
          <div className="h-2 rounded-full bg-black/40"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )} </motion.div>
  );
}
