import { Router } from 'express';
import {
  submitCustomOrder,
  submitCheckoutOrder,
  getCustomOrders,
  getOrders,
  getOrderById,
} from '../controllers/ordersController.js';

const router = Router();

// Custom orders
router.post('/custom', submitCustomOrder);
router.get('/custom', getCustomOrders); // Admin/development only

// Checkout orders
router.post('/', submitCheckoutOrder);
router.get('/', getOrders); // Admin/development only
router.get('/:id', getOrderById);

export default router;
