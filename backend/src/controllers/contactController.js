import { contactSubmissions } from '../models/data.js';

// Submit contact form
export const submitContactForm = (req, res) => {
  const { name, email, subject, message } = req.body;
  
  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      error: 'All fields are required: name, email, subject, message',
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
  
  // Create submission record
  const submission = {
    id: `contact_${Date.now()}`,
    name,
    email,
    subject,
    message,
    createdAt: new Date().toISOString(),
  };
  
  // Store submission (in-memory for development)
  // In production, this would be saved to a database and trigger an email notification
  contactSubmissions.push(submission);
  
  console.log('Contact form submission received:', submission);
  
  res.status(201).json({
    success: true,
    message: 'Thank you for your message. We will get back to you soon!',
    data: {
      id: submission.id,
    },
  });
};

// Get all contact submissions (admin only - for development)
export const getContactSubmissions = (req, res) => {
  res.json({
    success: true,
    data: contactSubmissions,
    total: contactSubmissions.length,
  });
};
