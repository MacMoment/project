import { products, categories, portfolioItems, teamMembers, testimonials } from '../models/data.js';

// Get all products
export const getAllProducts = (req, res) => {
  const { category, search, featured } = req.query;
  
  let filteredProducts = [...products];
  
  // Filter by category
  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }
  
  // Filter by search query
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }
  
  // Filter by featured
  if (featured === 'true') {
    filteredProducts = filteredProducts.filter(p => p.featured);
  }
  
  res.json({
    success: true,
    data: filteredProducts,
    total: filteredProducts.length,
  });
};

// Get single product by ID
export const getProductById = (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found',
    });
  }
  
  res.json({
    success: true,
    data: product,
  });
};

// Get all categories
export const getAllCategories = (req, res) => {
  res.json({
    success: true,
    data: categories,
  });
};

// Get all portfolio items
export const getAllPortfolioItems = (req, res) => {
  const { category } = req.query;
  
  let filteredItems = [...portfolioItems];
  
  if (category && category !== 'all') {
    filteredItems = filteredItems.filter(item => item.category === category);
  }
  
  res.json({
    success: true,
    data: filteredItems,
  });
};

// Get all team members
export const getAllTeamMembers = (req, res) => {
  res.json({
    success: true,
    data: teamMembers,
  });
};

// Get all testimonials
export const getAllTestimonials = (req, res) => {
  res.json({
    success: true,
    data: testimonials,
  });
};
