import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/index.js';

// Import routes
import productsRoutes from './routes/products.js';
import contactRoutes from './routes/contact.js';
import ordersRoutes from './routes/orders.js';
import authRoutes from './routes/auth.js';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Academy Studios API is running',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

// API routes
app.use('/api', productsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/auth', authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: config.nodeEnv === 'development' ? err.message : 'Internal server error',
  });
});

// Helper function to truncate and pad strings for console output
const formatForBox = (str, maxLen) => {
  if (str.length > maxLen) {
    return str.slice(0, maxLen - 3) + '...';
  }
  return str.padEnd(maxLen);
};

// Start server
app.listen(config.port, () => {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║          Academy Studios Backend API                           ║
╠════════════════════════════════════════════════════════════════╣
║  Server running on port ${String(config.port).padEnd(37)}║
║  Environment: ${formatForBox(config.nodeEnv, 44)}║
║  CORS origin: ${formatForBox(config.corsOrigin, 44)}║
╚════════════════════════════════════════════════════════════════╝

Available endpoints:
  GET  /api/health          - Health check
  GET  /api/products        - List products (query: category, search, featured)
  GET  /api/products/:id    - Get single product
  GET  /api/categories      - List categories
  GET  /api/portfolio       - List portfolio items
  GET  /api/team            - List team members
  GET  /api/testimonials    - List testimonials
  POST /api/contact         - Submit contact form
  POST /api/orders          - Submit checkout order
  POST /api/orders/custom   - Submit custom order request
  POST /api/auth/signup     - Create account
  POST /api/auth/login      - Login with password
  POST /api/auth/2fa/verify - Verify 2FA code
  POST /api/auth/passkey/options - Passkey options
`);
});

export default app;
