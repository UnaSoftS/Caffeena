// app/menu/[id]/edit/page.tsx

'use client';

import { useParams, useRouter } from 'next/navigation';
import { menuItems } from '@/lib/mockData';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function EditMenuItemPage() {
  const { id } = useParams();
  const router = useRouter();
  const item = menuItems.find((i) => i.id === id);

  const [name, setName] = useState(item?.name || '');
  const [price, setPrice] = useState(item?.price || '');
  const [category, setCategory] = useState(item?.category || '');
  const [success, setSuccess] = useState(false);

  if (!item) {
    return <p className="text-red-500">العنصر غير موجود.</p>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // لا حفظ فعلي، فقط محاكاة
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      router.push('/menu'); // العودة بعد التحديث
    }, 2000);
  };

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">تعديل المشروب</h2>

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 text-green-700 px-4 py-2 rounded-md text-sm"
        >
          ✅ تم التحديث بنجاح
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <label className="block text-sm text-gray-600">اسم المشروب</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">السعر</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            type="text"
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">الفئة</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            className="bg-amber-600 text-white px-4 py-2 rounded text-sm hover:bg-amber-700"
          >
            حفظ التغييرات
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="text-sm text-gray-600 hover:underline"
          >
            إلغاء
          </button>
        </div>
      </form>
    </section>
  );
}
