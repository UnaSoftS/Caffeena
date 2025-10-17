"use client";

import { motion } from "framer-motion";
import { Home, Activity, Bike, } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f7f7fb] flex">
      {/* Sidebar */}
      <aside className="w-20 bg-purple-700 text-white flex flex-col items-center py-6 space-y-8">
        <Home />
        <Activity />
        <Bike />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 grid grid-cols-12 gap-6">
        {/* Overview */}
        <section className="col-span-8 bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold">Overview</h2>
          <div className="mt-4 h-40 flex items-center justify-center text-gray-400">
            📈 Chart Placeholder
          </div>
          <div className="mt-4 flex justify-between text-center">
            <div>
              <p className="text-xl font-bold">748 Hr</p>
              <p className="text-gray-500">Total Time</p>
            </div>
            <div>
              <p className="text-xl font-bold">9,178 St</p>
              <p className="text-gray-500">Total Steps</p>
            </div>
            <div>
              <p className="text-xl font-bold">9,200 St</p>
              <p className="text-gray-500">Target</p>
            </div>
          </div>
        </section>

        {/* Right Panel */}
        <aside className="col-span-4 bg-white rounded-2xl shadow p-6 space-y-4">
          <h3 className="font-semibold">Friends</h3>
          <ul className="space-y-2">
            <li className="flex items-center justify-between">
              <span>👤 Max Stone</span>
              <span className="text-sm text-gray-400">10m ago</span>
            </li>
            <li className="flex items-center justify-between">
              <span>👤 Grisha Jack</span>
              <span className="text-sm text-gray-400">12m ago</span>
            </li>
          </ul>
        </aside>

        {/* Activity Cards */}
        <section className="col-span-12 grid grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow p-6"
          >
            <h4 className="font-semibold">Bicycle Drill</h4>
            <p className="text-sm text-gray-400">Progress 45%</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow p-6"
          >
            <h4 className="font-semibold">Jogging Hero</h4>
            <p className="text-sm text-gray-400">Progress 13%</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow p-6"
          >
            <h4 className="font-semibold">Healthy Busy</h4>
            <p className="text-sm text-gray-400">Progress 90%</p>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
