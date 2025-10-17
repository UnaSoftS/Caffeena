// app/admin/menu/page.tsx

'use client';

import { useState } from 'react';
import Image from 'next/image';
import coffeeData from '../../../lib/coffeeData'; // بياناتك من coffeeData
import { motion } from 'framer-motion';
import Link from 'next/link';

type coffeeData = {
  id: string;
  name: string;
  description: string;
  price: number | string;
  category: 'Hot' | 'Iced' | 'Desserts';
  image: string;
  isNew: boolean;
};

export default function AdminMenuPage() {
  const [menuItems, setMenuItems] = useState<coffeeData[]>(coffeeData as coffeeData[]);

  // حذف صنف
  const deleteItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  // تجميع الأصناف حسب الكاتيجوري
  const grouped = menuItems.reduce<Record<string, coffeeData[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const formatPrice = (price: number | string) => {
    if (typeof price === 'number' && Number.isFinite(price)) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price);
    }
    return String(price);
  };

  return (
    <section className="max-w-7xl mx-auto space-y-12 py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-[#372805]">Admin – Manage Menu</h2>

      {Object.keys(grouped).length === 0 ? (
        <p className="text-gray-600 text-center">No items available yet.</p>
      ) : (
        Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="space-y-6">
            {/* عنوان القسم */}
            <h3 className="text-2xl font-semibold text-amber-700 border-b pb-2">{category}</h3>

            {/* شبكة الكروت */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col rounded-xl border bg-white shadow hover:shadow-lg transition-shadow overflow-hidden"
                >
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={500}
                                    height={192}
                                    className="w-full h-48 object-cover"
                                  />  
                                  
                                  
                                  {item.isNew && (
                                    <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                      New
                                    </span>
                                  )}

                  {/* تفاصيل المنتج */}
                  <div className="flex flex-col justify-between flex-1 p-4">
                    <div>
                      <h4 className="text-lg font-semibold text-[#372805]">{item.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      <p className="text-md font-bold text-[#c69a35] mt-2">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* أزرار التحكم */}
                    <div className="mt-4 flex gap-4 text-sm">
                      <Link
                        href={`/admin/menu/${item.id}/edit`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))
      )}
    </section>
  );
}
