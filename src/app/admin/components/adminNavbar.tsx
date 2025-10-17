// app/components/Topbar.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Topbar() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-semibold"
        >
          Hello, Admin
        </motion.h2>
        <p className="text-xs text-gray-500">Today is {new Date().toLocaleDateString()}</p>
      </div>

      <Link
        href="/menu"
        className="rounded-xl bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800"
      >
        Add New Project
      </Link>
    </div>
  );
}
