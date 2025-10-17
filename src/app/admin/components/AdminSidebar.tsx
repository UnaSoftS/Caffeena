// components/Sidebar.tsx

'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FiHome, FiCoffee, FiUsers, FiSettings, FiShoppingCart, FiMenu } from 'react-icons/fi';


const navItems = [
  { label: 'Home', href: '/admin', icon: <FiHome /> },
  { label:'Products', href: '/admin/products', icon: <FiCoffee /> },
  { label: 'Orders', href: '/admin/orders', icon: <FiShoppingCart /> },
  { label: 'Customers', href: '/admin/customers', icon: <FiUsers /> },
  { label: 'Menu', href: '/admin/menu', icon: <FiCoffee /> }, // ✅ أضف هذا السطر
  { label: 'Setting', href: '/admin/settings', icon: <FiSettings /> },
];

export const AdminSidebar= () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  return (
    <>
      {/* زر إظهار/إخفاء القائمة */}
      <button
        className="absolute top-4 right-4 z-50 md:hidden text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiMenu />
      </button>

      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: isOpen ? 0 : -250 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className=" w-64 h-screen fixed top-0 right-0 z-40 p-6 md:relative md:translate-x-0"
      >
        <div className="text-2xl font-bold mb-8 text-center text-[#7c5f1a]">BinCastle☕<image></image></div>

        <nav className="space-y-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-6 p-6 rounded-lg transition-colors
                  ${isActive ? 'bg-amber-100 text-amber-600' : 'hover:bg-gray-100'}
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </motion.aside>
    </>
  );
};
