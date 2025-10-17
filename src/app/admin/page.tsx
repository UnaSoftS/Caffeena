// app/page.tsx

'use client';

import { motion } from 'framer-motion';
import { AdminCard } from './components/AdminCard';

const stats = [
  {
    title: 'عدد الطلبات',
    value: '128',
    description: 'طلبات اليوم',
    color: 'bg-amber-100 text-amber-700',
  },
  {
    title: 'المبيعات',
    value: 'ر.س 1,250',
    description: 'إجمالي اليوم',
    color: 'bg-green-100 text-green-700',
  },
  {
    title: 'المنتجات',
    value: '42',
    description: 'المنتجات الفعّالة',
    color: 'bg-blue-100 text-blue-700',

  },

  {
    title: 'المنتجات',
    value: '42',
    description: 'المنتجات الفعّالة',
    color: 'bg-blue-100 text-blue-700',
  },
];

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800"><h2>Hello Admin</h2> 👋</h2>

      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
          >
            <AdminCard {...stat} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
