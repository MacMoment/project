import { Router } from 'express';
import {
  submitContactForm,
  getContactSubmissions,
} from '../controllers/contactController.js';

const router = Router();

// Submit contact form
router.post('/', submitContactForm);

// Get all submissions (admin/development only)
router.get('/', getContactSubmissions);

export default router;
