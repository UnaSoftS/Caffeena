// app/orders/page.tsx

'use client';

import { useState } from 'react';
import { orders as initialOrders } from '@/lib/mockData';
   
import { motion } from 'framer-motion';

type OrderStatus = 'Preparing' | 'Ready' | 'Delivered';

type Order = {
  id: string;
  customer: string;
  item: string;
  status: OrderStatus | string; // to allow legacy Arabic statuses in mockData
};

// Optional mapping if mockData still has Arabic statuses
const statusMap: Record<string, OrderStatus> = {
  'قيد التحضير': 'Preparing',
  'جاهز': 'Ready',
  'تم التوصيل': 'Delivered',
};

const statusStyles: Record<OrderStatus, string> = {
  Preparing: 'bg-yellow-100 text-yellow-700',
  Ready: 'bg-green-100 text-green-700',
  Delivered: 'bg-gray-200 text-gray-700',
};

const statusCycle: OrderStatus[] = ['Preparing', 'Ready', 'Delivered'];

export default function OrdersPage() {
  // Normalize any Arabic statuses to English once at load
  const [orders, setOrders] = useState<Order[]>(
    (initialOrders as Order[]).map((o) => ({
      ...o,
      status: (statusMap[o.status] ?? o.status) as OrderStatus,
    }))
  );

  const updateStatus = (id: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? {
              ...order,
              status:
                statusCycle[
                  (statusCycle.indexOf(order.status as OrderStatus) + 1) %
                    statusCycle.length
                ],
            }
          : order
      )
    );
  };

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Current Orders</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-gray-600 border-b text-left">
              <th className="py-2 px-3">Order ID</th>
              <th className="py-2 px-3">Customer</th>
              <th className="py-2 px-3">Drink</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">Update</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b hover:bg-gray-50 text-left"
              >
                <td className="py-2 px-3">{order.id}</td>
                <td className="py-2 px-3">{order.customer}</td>
                <td className="py-2 px-3">{order.item}</td>
                <td className="py-2 px-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      statusStyles[order.status as OrderStatus]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-2 px-3">
                  <button
                    onClick={() => updateStatus(order.id)}
                    className="text-sm text-amber-600 hover:underline"
                  >
                    Update Status
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
