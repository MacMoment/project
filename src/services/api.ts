import type { Product, Category, PortfolioItem, TeamMember, Testimonial } from '../types';
import type { AuthUser } from '../store/authStore';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// API Response types
interface ApiResponse<T> {
  success: boolean;
  data: T;
  total?: number;
  message?: string;
  error?: string;
}

// Generic fetch wrapper with error handling
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    throw new Error((data as { error?: string } | null)?.error || response.statusText || 'An error occurred');
  }

  return data as T;
}

// Products API
export const productsApi = {
  getAll: (params?: { category?: string; search?: string; featured?: boolean }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set('category', params.category);
    if (params?.search) searchParams.set('search', params.search);
    if (params?.featured) searchParams.set('featured', 'true');
    const query = searchParams.toString();
    return apiFetch<ApiResponse<Product[]>>(
      `/products${query ? `?${query}` : ''}`
    );
  },

  getById: (id: string) => {
    return apiFetch<ApiResponse<Product>>(`/products/${id}`);
  },
};

// Categories API
export const categoriesApi = {
  getAll: () => {
    return apiFetch<ApiResponse<Category[]>>('/categories');
  },
};

// Portfolio API
export const portfolioApi = {
  getAll: (category?: string) => {
    const query = category && category !== 'all' ? `?category=${category}` : '';
    return apiFetch<ApiResponse<PortfolioItem[]>>(`/portfolio${query}`);
  },
};

// Team API
export const teamApi = {
  getAll: () => {
    return apiFetch<ApiResponse<TeamMember[]>>('/team');
  },
};

// Testimonials API
export const testimonialsApi = {
  getAll: () => {
    return apiFetch<ApiResponse<Testimonial[]>>('/testimonials');
  },
};

// Contact API
export const contactApi = {
  submit: (data: { name: string; email: string; subject: string; message: string }) => {
    return apiFetch<{ success: boolean; message: string; data: { id: string } }>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Orders API
export const ordersApi = {
  submitCustomOrder: (data: {
    name: string;
    email: string;
    projectType: string;
    description: string;
    deadline?: string;
    budget: string;
  }) => {
    return apiFetch<{ success: boolean; message: string; data: { id: string } }>('/orders/custom', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  submitCheckout: (data: {
    email: string;
    firstName: string;
    lastName: string;
    items: { productId: string; quantity: number }[];
  }) => {
    return apiFetch<{
      success: boolean;
      message: string;
      data: { id: string; total: number; status: string };
    }>('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getById: (id: string) => {
    return apiFetch<{ success: boolean; data: unknown }>(`/orders/${id}`);
  },
};

// Health check
export const healthApi = {
  check: () => {
    return apiFetch<{ success: boolean; message: string; timestamp: string }>('/health');
  },
};

// Auth API
export const authApi = {
  signup: (data: { name: string; email: string; password: string; twoFactorMethod?: string }) => {
    return apiFetch<ApiResponse<{
      user: AuthUser;
      requiresTwoFactor: boolean;
      challengeId?: string;
      twoFactorHint?: string;
    }>>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  login: (data: { email: string; password: string; mode?: string }) => {
    return apiFetch<ApiResponse<{
      user: AuthUser;
      requiresTwoFactor: boolean;
      challengeId?: string;
      twoFactorHint?: string;
    }>>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  verifyTwoFactor: (data: { challengeId: string; code: string }) => {
    return apiFetch<ApiResponse<{ user: AuthUser }>>('/auth/2fa/verify', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  passkeyOptions: (data?: { email?: string }) => {
    return apiFetch<ApiResponse<{ passkeyEnabled: boolean; message: string }>>('/auth/passkey/options', {
      method: 'POST',
      body: JSON.stringify(data || {}),
    });
  },
};

export default {
  products: productsApi,
  categories: categoriesApi,
  portfolio: portfolioApi,
  team: teamApi,
  testimonials: testimonialsApi,
  contact: contactApi,
  orders: ordersApi,
  auth: authApi,
  health: healthApi,
};
