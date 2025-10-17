// app/menu/[id]/page.tsx

'use client';

import { useParams } from 'next/navigation';
import { menuItems } from '@/lib/mockData';

export default function MenuItemPage() {
  const { id } = useParams();
  const item = menuItems.find((i) => i.id === id);

  if (!item) {
    return <p className="text-red-500">العنصر غير موجود.</p>;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">{item.name}</h2>
      <p className="text-gray-600">السعر: {item.price}</p>
      <p className="text-gray-600">الفئة: {item.category}</p>

      <button className="mt-4 text-sm text-amber-600 hover:underline" 
      onClick={() => history.back()}>
        ← العودة إلى القائمة
      </button>
    </section>
  );
}
