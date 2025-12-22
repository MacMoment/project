export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
  rating: number;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  gridSize: 'small' | 'medium' | 'large';
}

export interface TeamMember {
  id: string;
  nickname: string;
  avatar: string;
  role: string;
  description: string;
  portfolioLink?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  content: string;
  rating: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  order: number;
}

export interface CustomOrderForm {
  projectType: string;
  description: string;
  deadline: string;
  budget: string;
  name: string;
  email: string;
  files?: File[];
}

export interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
}
