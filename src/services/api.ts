// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

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

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'An error occurred');
  }

  return data;
}

// Products API
export const productsApi = {
  getAll: (params?: { category?: string; search?: string; featured?: boolean }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set('category', params.category);
    if (params?.search) searchParams.set('search', params.search);
    if (params?.featured) searchParams.set('featured', 'true');
    const query = searchParams.toString();
    return apiFetch<{ success: boolean; data: unknown[]; total: number }>(
      `/products${query ? `?${query}` : ''}`
    );
  },

  getById: (id: string) => {
    return apiFetch<{ success: boolean; data: unknown }>(`/products/${id}`);
  },
};

// Categories API
export const categoriesApi = {
  getAll: () => {
    return apiFetch<{ success: boolean; data: unknown[] }>('/categories');
  },
};

// Portfolio API
export const portfolioApi = {
  getAll: (category?: string) => {
    const query = category && category !== 'all' ? `?category=${category}` : '';
    return apiFetch<{ success: boolean; data: unknown[] }>(`/portfolio${query}`);
  },
};

// Team API
export const teamApi = {
  getAll: () => {
    return apiFetch<{ success: boolean; data: unknown[] }>('/team');
  },
};

// Testimonials API
export const testimonialsApi = {
  getAll: () => {
    return apiFetch<{ success: boolean; data: unknown[] }>('/testimonials');
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

export default {
  products: productsApi,
  categories: categoriesApi,
  portfolio: portfolioApi,
  team: teamApi,
  testimonials: testimonialsApi,
  contact: contactApi,
  orders: ordersApi,
  health: healthApi,
};
