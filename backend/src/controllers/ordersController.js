import { customOrders, orders, products } from '../models/data.js';

// Submit custom order request
export const submitCustomOrder = (req, res) => {
  const { name, email, projectType, description, deadline, budget } = req.body;
  
  // Validate required fields
  if (!name || !email || !projectType || !description || !budget) {
    return res.status(400).json({
      success: false,
      error: 'Required fields: name, email, projectType, description, budget',
    });
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email format',
    });
  }
  
  // Create custom order record
  const customOrder = {
    id: `custom_${Date.now()}`,
    name,
    email,
    projectType,
    description,
    deadline: deadline || null,
    budget,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  
  // Store order (in-memory for development)
  // In production, this would be saved to a database and trigger notifications
  customOrders.push(customOrder);
  
  console.log('Custom order received:', customOrder);
  
  res.status(201).json({
    success: true,
    message: 'Your custom order request has been submitted. We will contact you within 24-48 hours.',
    data: {
      id: customOrder.id,
    },
  });
};

// Submit checkout order
export const submitCheckoutOrder = (req, res) => {
  const { email, firstName, lastName, items } = req.body;
  
  // Validate required fields
  if (!email || !firstName || !lastName || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Required fields: email, firstName, lastName, items (array)',
    });
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email format',
    });
  }
  
  // Validate items and calculate total
  let total = 0;
  const orderItems = [];
  
  for (const item of items) {
    const product = products.find(p => p.id === item.productId);
    if (!product) {
      return res.status(400).json({
        success: false,
        error: `Product not found: ${item.productId}`,
      });
    }
    
    const quantity = parseInt(item.quantity, 10) || 1;
    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        error: 'Quantity must be at least 1',
      });
    }
    
    orderItems.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      subtotal: product.price * quantity,
    });
    
    total += product.price * quantity;
  }
  
  // Create order record
  const order = {
    id: `order_${Date.now()}`,
    email,
    firstName,
    lastName,
    items: orderItems,
    total,
    status: 'pending', // In production: would be updated after payment processing
    paymentStatus: 'pending', // In production: would be updated by payment webhook
    createdAt: new Date().toISOString(),
  };
  
  // Store order (in-memory for development)
  // In production: integrate with payment gateway (Stripe, PayPal, etc.)
  orders.push(order);
  
  console.log('Order received:', order);
  
  // In development, simulate successful payment
  order.status = 'completed';
  order.paymentStatus = 'paid';
  
  res.status(201).json({
    success: true,
    message: 'Order placed successfully!',
    data: {
      id: order.id,
      total: order.total,
      status: order.status,
    },
  });
};

// Get all custom orders (admin only - for development)
export const getCustomOrders = (req, res) => {
  res.json({
    success: true,
    data: customOrders,
    total: customOrders.length,
  });
};

// Get all orders (admin only - for development)
export const getOrders = (req, res) => {
  res.json({
    success: true,
    data: orders,
    total: orders.length,
  });
};

// Get order by ID
export const getOrderById = (req, res) => {
  const { id } = req.params;
  const order = orders.find(o => o.id === id);
  
  if (!order) {
    return res.status(404).json({
      success: false,
      error: 'Order not found',
    });
  }
  
  res.json({
    success: true,
    data: order,
  });
};
