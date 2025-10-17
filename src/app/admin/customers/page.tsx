// app/customers/page.tsx

'use client';

import { customers } from '@/lib/mockData';
import { motion } from 'framer-motion';

export default function CustomersPage() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">العملاء</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
        <table className="min-w-full text-right text-sm">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="py-2 px-3">الاسم</th>
              <th className="py-2 px-3">البريد الإلكتروني</th>
              <th className="py-2 px-3">عدد الطلبات</th>
              <th className="py-2 px-3">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <motion.tr
                key={customer.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b hover:bg-gray-50"
              >
                <td className="py-2 px-3">{customer.name}</td>
                <td className="py-2 px-3">{customer.email}</td>
                <td className="py-2 px-3">{customer.orders}</td>
                <td className="py-2 px-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      customer.active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {customer.active ? 'نشط' : 'غير نشط'}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
