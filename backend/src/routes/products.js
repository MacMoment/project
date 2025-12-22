import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  getAllCategories,
  getAllPortfolioItems,
  getAllTeamMembers,
  getAllTestimonials,
} from '../controllers/productsController.js';

const router = Router();

// Products
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);

// Categories
router.get('/categories', getAllCategories);

// Portfolio
router.get('/portfolio', getAllPortfolioItems);

// Team
router.get('/team', getAllTeamMembers);

// Testimonials
router.get('/testimonials', getAllTestimonials);

export default router;
