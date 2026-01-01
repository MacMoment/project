import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, Category, PortfolioItem } from '../types';
import { products as initialProducts, categories as initialCategories, portfolioItems as initialPortfolio } from '../data';

// User and Staff types
export interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'suspended';
  role: 'customer';
  createdAt: string;
  lastActive: string;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  role: 'admin' | 'moderator' | 'support';
  createdAt: string;
  lastActive: string;
}

export interface PaymentMethod {
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
}

export interface Purchase {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  productName: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  purchasedAt: string;
  paymentMethod: PaymentMethod;
}

export interface InvoiceItem {
  description: string;
  amount: number;
}

export interface Invoice {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  issuedAt: string;
  dueAt: string;
  items: InvoiceItem[];
}

interface AdminState {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Categories
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  reorderCategories: (categories: Category[]) => void;
  
  // Portfolio
  portfolioItems: PortfolioItem[];
  addPortfolioItem: (item: Omit<PortfolioItem, 'id'>) => void;
  updatePortfolioItem: (id: string, item: Partial<PortfolioItem>) => void;
  deletePortfolioItem: (id: string) => void;
  reorderPortfolio: (items: PortfolioItem[]) => void;
  
  // Users
  users: User[];
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  
  // Staff
  staff: Staff[];
  addStaff: (staff: Omit<Staff, 'id' | 'createdAt'>) => void;
  updateStaff: (id: string, staff: Partial<Staff>) => void;
  deleteStaff: (id: string) => void;

  // Purchases
  purchases: Purchase[];
  addPurchase: (purchase: Omit<Purchase, 'id'>) => void;

  // Invoices
  invoices: Invoice[];
  addInvoice: (invoice: Omit<Invoice, 'id'>) => void;
}

// Generate unique IDs using crypto for better uniqueness
const generateId = () => crypto.randomUUID ? crypto.randomUUID().split('-')[0] : Math.random().toString(36).substring(2, 9);

// Mock initial users
const initialUsers: User[] = [
  { id: '1', name: 'Alex Gaming', email: 'alex@gaming.com', status: 'active', role: 'customer', createdAt: '2024-10-15', lastActive: '2 min ago' },
  { id: '2', name: 'BuildMaster Pro', email: 'build@master.pro', status: 'active', role: 'customer', createdAt: '2024-11-01', lastActive: '5 min ago' },
  { id: '3', name: 'Creative Corp', email: 'info@creativecorp.com', status: 'active', role: 'customer', createdAt: '2024-09-20', lastActive: '12 min ago' },
  { id: '4', name: 'PixelCreator', email: 'pixel@creator.net', status: 'active', role: 'customer', createdAt: '2024-12-01', lastActive: '25 min ago' },
  { id: '5', name: 'ServerKing', email: 'admin@serverking.io', status: 'inactive', role: 'customer', createdAt: '2024-08-15', lastActive: '1 hour ago' },
];

// Mock initial staff
const initialStaff: Staff[] = [
  { id: '1', name: 'John Admin', email: 'john@academystudios.com', status: 'active', role: 'admin', createdAt: '2024-01-01', lastActive: 'Now' },
  { id: '2', name: 'Sarah Support', email: 'sarah@academystudios.com', status: 'active', role: 'support', createdAt: '2024-03-15', lastActive: '5 min ago' },
  { id: '3', name: 'Mike Moderator', email: 'mike@academystudios.com', status: 'active', role: 'moderator', createdAt: '2024-06-01', lastActive: '1 hour ago' },
];

const initialPurchases: Purchase[] = [
  {
    id: 'P-1001',
    customerId: '1',
    customerName: 'Alex Gaming',
    customerEmail: 'alex@gaming.com',
    productName: 'Modern Villa Pack',
    amount: 24.99,
    status: 'completed',
    purchasedAt: '2024-12-01',
    paymentMethod: { brand: 'Visa', last4: '4242', expMonth: 7, expYear: 2026 },
  },
  {
    id: 'P-1002',
    customerId: '2',
    customerName: 'BuildMaster Pro',
    customerEmail: 'build@master.pro',
    productName: 'Fantasy Castle Bundle',
    amount: 34.99,
    status: 'completed',
    purchasedAt: '2024-12-02',
    paymentMethod: { brand: 'Mastercard', last4: '1122', expMonth: 11, expYear: 2025 },
  },
  {
    id: 'P-1003',
    customerId: '3',
    customerName: 'Creative Corp',
    customerEmail: 'info@creativecorp.com',
    productName: 'Space Station Module',
    amount: 39.99,
    status: 'pending',
    purchasedAt: '2024-12-03',
    paymentMethod: { brand: 'Amex', last4: '9001', expMonth: 3, expYear: 2027 },
  },
];

const initialInvoices: Invoice[] = [
  {
    id: 'INV-5001',
    customerId: '1',
    customerName: 'Alex Gaming',
    customerEmail: 'alex@gaming.com',
    total: 149.0,
    status: 'sent',
    issuedAt: '2024-11-28',
    dueAt: '2024-12-15',
    items: [
      { description: 'Custom environment build (Phase 1)', amount: 99.0 },
      { description: 'Lighting pass add-on', amount: 50.0 },
    ],
  },
  {
    id: 'INV-5002',
    customerId: '2',
    customerName: 'BuildMaster Pro',
    customerEmail: 'build@master.pro',
    total: 220.0,
    status: 'paid',
    issuedAt: '2024-11-20',
    dueAt: '2024-12-05',
    items: [
      { description: 'Asset pack licensing', amount: 180.0 },
      { description: 'Priority support', amount: 40.0 },
    ],
  },
];

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      // Products
      products: initialProducts,
      addProduct: (product) => set((state) => ({
        products: [...state.products, { ...product, id: generateId() }],
      })),
      updateProduct: (id, product) => set((state) => ({
        products: state.products.map((p) => (p.id === id ? { ...p, ...product } : p)),
      })),
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      })),

      // Categories
      categories: initialCategories,
      addCategory: (category) => set((state) => ({
        categories: [...state.categories, { ...category, id: generateId() }],
      })),
      updateCategory: (id, category) => set((state) => ({
        categories: state.categories.map((c) => (c.id === id ? { ...c, ...category } : c)),
      })),
      deleteCategory: (id) => set((state) => ({
        categories: state.categories.filter((c) => c.id !== id),
      })),
      reorderCategories: (categories) => set({ categories }),

      // Portfolio
      portfolioItems: initialPortfolio,
      addPortfolioItem: (item) => set((state) => ({
        portfolioItems: [...state.portfolioItems, { ...item, id: generateId() }],
      })),
      updatePortfolioItem: (id, item) => set((state) => ({
        portfolioItems: state.portfolioItems.map((i) => (i.id === id ? { ...i, ...item } : i)),
      })),
      deletePortfolioItem: (id) => set((state) => ({
        portfolioItems: state.portfolioItems.filter((i) => i.id !== id),
      })),
      reorderPortfolio: (items) => set({ portfolioItems: items }),

      // Users
      users: initialUsers,
      addUser: (user) => set((state) => ({
        users: [...state.users, { ...user, id: generateId(), createdAt: new Date().toISOString().split('T')[0] }],
      })),
      updateUser: (id, user) => set((state) => ({
        users: state.users.map((u) => (u.id === id ? { ...u, ...user } : u)),
      })),
      deleteUser: (id) => set((state) => ({
        users: state.users.filter((u) => u.id !== id),
      })),

      // Staff
      staff: initialStaff,
      addStaff: (staff) => set((state) => ({
        staff: [...state.staff, { ...staff, id: generateId(), createdAt: new Date().toISOString().split('T')[0] }],
      })),
      updateStaff: (id, staff) => set((state) => ({
        staff: state.staff.map((s) => (s.id === id ? { ...s, ...staff } : s)),
      })),
      deleteStaff: (id) => set((state) => ({
        staff: state.staff.filter((s) => s.id !== id),
      })),

      // Purchases
      purchases: initialPurchases,
      addPurchase: (purchase) => set((state) => ({
        purchases: [...state.purchases, { ...purchase, id: generateId() }],
      })),

      // Invoices
      invoices: initialInvoices,
      addInvoice: (invoice) => set((state) => ({
        invoices: [...state.invoices, { ...invoice, id: generateId() }],
      })),
    }),
    {
      name: 'admin-storage',
    }
  )
);
