// app/settings/page.tsx

'use client';

import { useState } from 'react';
import type { FormEvent, ReactNode, InputHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>, type: string) => {
    e.preventDefault();
    setSuccessMsg(`Successfully added ${type} ✅`);
    setTimeout(() => setSuccessMsg(null), 3000);
    (e.target as HTMLFormElement).reset(); // reset the form
  };

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800">Settings</h2>

      {successMsg && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 text-green-700 px-4 py-2 rounded-md text-sm"
        >
          {successMsg}
        </motion.div>
      )}

      {/* Add Customer */}
      <FormCard title="Add New Customer" onSubmit={(e) => handleSubmit(e, 'customer')}>
        <Input name="name" label="Name" />
        <Input name="email" label="Email Address" type="email" />
      </FormCard>

      {/* Add Employee */}
      <FormCard title="Add Employee" onSubmit={(e) => handleSubmit(e, 'employee')}>
        <Input name="name" label="Name" />
        <Input name="role" label="Role" />
      </FormCard>

      {/* Add Menu Item */}
      <FormCard title="Add Menu Item" onSubmit={(e) => handleSubmit(e, 'menu item')}>
        <Input name="item" label="Drink Name" />
        <Input name="price" label="Price" type="number" />
        <Input name="category" label="Category" />
        <Input name="image" label="Image" type="file" accept="image/*" />
      </FormCard>
    </section>
  );
}

// ✅ Reusable form card with unified styling
function FormCard({
  title,
  onSubmit,
  children,
}: {
  title: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}) {
  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={onSubmit}
      className="bg-white shadow rounded-lg p-6 space-y-4"
    >
      <h3 className="text-lg font-medium text-gray-700">{title}</h3>
      {children}
      <button
        type="submit"
        className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm"
      >
        Add
      </button>
    </motion.form>
  );
}

// ✅ Input field component
type InputProps = {
  name: string;
  label: string;
  type?: string;
} & InputHTMLAttributes<HTMLInputElement>;

function Input({ name, label, type = 'text', ...props }: InputProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm text-gray-600">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        required
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
        {...props}
      />
    </div>
  );
}
