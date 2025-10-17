// lib/mockData.ts

export type Customer = {
  id: string;
  name: string;
  email: string;
  orders: number; // renamed from "Order"
  active: boolean;
};

export const customers: Customer[] = [
  { id: 'c001', name: 'Abdulrahman', email: 'abdul@example.com', orders: 12, active: true },
  { id: 'c002', name: 'Nora',        email: 'nora@example.com',  orders: 7,  active: true },
  { id: 'c003', name: 'Salman',      email: 'salman@example.com', orders: 0,  active: false },
];

export type OrderStatus = 'Preparing' | 'Ready' | 'Delivered';

export type Order = {
  id: string;
  customer: string;
  item: string;
  status: OrderStatus;
};

export const orders: Order[] = [
  { id: '001', customer: 'Abdullah', item: 'Espresso',   status: 'Preparing' },
  { id: '002', customer: 'Sarah',    item: 'Latte',      status: 'Ready' },
  { id: '003', customer: 'Khalid',   item: 'Cappuccino', status: 'Delivered' },
];

export type Product = {
  id: string;
  name: string;
  price: number; // SAR
  category: string;
  available: boolean;
};

export const products: Product[] = [
  { id: '1', name: 'Espresso',   price: 12, category: 'Black Coffee', available: true  },
  { id: '2', name: 'Cappuccino', price: 15, category: 'Milk Coffee',  available: true  },
  { id: '3', name: 'Latte',      price: 16, category: 'Milk Coffee',  available: false },
];

export type MenuItem = {
  id:number;
  name: string;
  price: number; // SAR
  category: string;
};

export const menuItems: MenuItem[] = [
  { id: 1, name: 'Espresso',   price: 12, category: 'Black Coffee'   },
  { id: 2, name: 'Americano',  price: 13, category: 'Black Coffee'   },
  { id: 3, name: 'Cappuccino', price: 15, category: 'Milk Coffee'    },
  { id: 4, name: 'Latte',      price: 16, category: 'Milk Coffee'    },
  { id: 5, name: 'Green Tea',  price: 10, category: 'Other Beverages'},
];
