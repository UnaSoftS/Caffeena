// app/products/page.tsx

'use client';

import { products as initialProducts } from '@/lib/mockData';
import { Table } from '../components/Table';

type Product = {
  name: string;
  price: number;      // السعر رقم فقط
  category: string;
  available: boolean;
};

// دالة لتنسيق السعر عند العرض
const formatPrice = (price: number): string =>
  new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 2,
  }).format(price);

export default function ProductsPage() {
  const headers = ['المنتج', 'السعر', 'التصنيف', 'متوفر'];

  // تجهيز البيانات للجدول
  const rows: string[][] = (initialProducts as Product[]).map((product) => [
    product.name,
    formatPrice(product.price),
    product.category,
    product.available ? '✅' : '❌',
  ]);

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">قائمة المنتجات</h2>
      <Table headers={headers} rows={rows} />
    </section>
  );
}
