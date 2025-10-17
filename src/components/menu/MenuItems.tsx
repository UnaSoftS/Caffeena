'use client';
import { useState } from 'react';
import coffeeData from '../../lib/coffeeData';
import { motion } from 'framer-motion';
import FeaturesHeader from '@/components/header/featuresheader';
import Pagination from '@/components/menu/Pagination';
import SearchBar from '@/components/SearchBar';
const categories = ["All", "Hot", "Iced", "Special"];
export default function MenuItems() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  // فلترة العناصر حسب الكاتيجوري
  const filteredItems =
    activeCategory === "All"
      ? coffeeData
      : coffeeData.filter((item) => item.category === activeCategory);
  return (
    <div>
      {/* الهيدر */}
      <FeaturesHeader
        title="Menu"
        subtitle="Our Specialties"
        background='/images/image4.jpg'
      />

      <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[#372805] mb-6">
          Explore Our Menu
        </h2>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-[#c69a35] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
          <SearchBar/>  
        </div>

        {/* شبكة الكروت */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.slice(0,6).map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* صورة المنتج */}
                <img
                  src={item.image}
                  alt={item.name}
                  width={500}
                  height={192}
                  className="w-full h-48 object-cover" />
                
                {item.isNew && (
                  <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    New
                  </span>
                )}
              

              {/* تفاصيل المنتج */}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-[#372805] mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[#c69a35]">
                    {item.price}
                  </span>
                  <button className="px-3 py-1 text-sm bg-[#c69a35]
                   text-white rounded-full hover:bg-[#a37d29] transition-colors">
                    Order
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      </div>
  );
}