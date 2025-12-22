# Production Setup Information Needed

This document outlines the information and resources needed for a full, production-ready deployment of the Academy Studios website.

## Table of Contents
1. [Database Configuration](#database-configuration)
2. [Payment Gateway](#payment-gateway)
3. [Email Service](#email-service)
4. [File Storage](#file-storage)
5. [Authentication](#authentication)
6. [Hosting & Deployment](#hosting--deployment)
7. [Domain & SSL](#domain--ssl)
8. [Environment Variables](#environment-variables)
9. [Third-Party Integrations](#third-party-integrations)
10. [Security Considerations](#security-considerations)

---

## Database Configuration

The current backend uses in-memory storage (data resets on server restart). For production, you need a persistent database.

### Required Information:
- [ ] **Database Type Choice**: PostgreSQL (recommended), MySQL, or MongoDB
- [ ] **Database Host**: Cloud provider (AWS RDS, Google Cloud SQL, Railway, PlanetScale, etc.)
- [ ] **Database Name**: e.g., `academy_studios_production`
- [ ] **Database Username**: Production database user
- [ ] **Database Password**: Strong, unique password
- [ ] **Connection String/URL**: Full database connection string

### Example Environment Variables:
```env
DATABASE_URL=postgresql://username:password@host:5432/database_name
# Or for MongoDB:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
```

### Recommended Schema Tables:
- `products` - Store inventory and product details
- `categories` - Product categories
- `orders` - Customer purchase orders
- `order_items` - Line items for each order
- `custom_orders` - Custom project requests
- `contact_submissions` - Contact form submissions
- `users` (optional) - For admin panel access

---

## Payment Gateway

The checkout currently simulates payment processing. For real payments:

### Required Information:
- [ ] **Payment Provider**: Stripe (recommended), PayPal, or Square
- [ ] **Account Type**: Business or individual merchant account
- [ ] **Business Registration**: Legal business entity information
- [ ] **Bank Account**: For receiving payouts

### Stripe Configuration (Recommended):
- [ ] **Stripe Account**: Sign up at https://stripe.com
- [ ] **Stripe Secret Key**: `sk_live_...` (for server-side)
- [ ] **Stripe Publishable Key**: `pk_live_...` (for client-side)
- [ ] **Stripe Webhook Secret**: `whsec_...` (for payment confirmations)
- [ ] **Webhook URL**: Configure to `https://yourdomain.com/api/webhooks/stripe`

### Environment Variables:
```env
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxx
```

### PayPal Alternative:
- [ ] **PayPal Business Account**
- [ ] **Client ID**
- [ ] **Client Secret**

---

## Email Service

For sending order confirmations, contact form notifications, and marketing emails:

### Required Information:
- [ ] **Email Service Provider**: SendGrid, Mailgun, AWS SES, or Resend
- [ ] **From Email Address**: e.g., `noreply@academystudios.com`
- [ ] **Support Email**: e.g., `support@academystudios.com`
- [ ] **Reply-To Email**: Where replies should go

### SendGrid Configuration (Recommended):
- [ ] **API Key**: `SG.xxxxx...`
- [ ] **Verified Sender Domain**: DNS verification required

### Environment Variables:
```env
# SendGrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=noreply@academystudios.com
EMAIL_FROM_NAME=Academy Studios
EMAIL_SUPPORT=support@academystudios.com

# Or SMTP (generic)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_username
SMTP_PASS=your_password
SMTP_SECURE=true
```

### Email Templates Needed:
- [ ] Order confirmation email
- [ ] Custom order request acknowledgment
- [ ] Contact form auto-reply
- [ ] Password reset (if authentication added)
- [ ] Newsletter subscription confirmation

---

## File Storage

For storing digital assets (product files customers download after purchase):

### Required Information:
- [ ] **Storage Provider**: AWS S3, Google Cloud Storage, Cloudinary, or DigitalOcean Spaces
- [ ] **Bucket Name**: e.g., `academy-studios-assets`
- [ ] **Region**: Choose closest to target audience

### AWS S3 Configuration:
- [ ] **AWS Access Key ID**
- [ ] **AWS Secret Access Key**
- [ ] **S3 Bucket Name**
- [ ] **S3 Region**
- [ ] **CloudFront Distribution** (optional, for CDN)

### Environment Variables:
```env
AWS_ACCESS_KEY_ID=AKIAxxxxxxxxxxxx
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxx
AWS_REGION=us-east-1
AWS_S3_BUCKET=academy-studios-assets
```

---

## Authentication

If admin panel or user accounts are needed:

### Required Information:
- [ ] **Auth Provider**: Custom (JWT), Auth0, Clerk, or NextAuth
- [ ] **Admin Email Addresses**: Who should have admin access
- [ ] **Session Duration**: How long users stay logged in

### JWT Configuration:
```env
JWT_SECRET=your-very-long-secret-key-at-least-32-characters
JWT_EXPIRES_IN=7d
```

### OAuth Providers (optional):
- [ ] **Google OAuth Client ID & Secret**
- [ ] **Discord OAuth Client ID & Secret**
- [ ] **GitHub OAuth Client ID & Secret**

---

## Hosting & Deployment

### Frontend (Static Site):
- [ ] **Hosting Platform**: Vercel (recommended), Netlify, or AWS CloudFront + S3
- [ ] **Build Command**: `npm run build`
- [ ] **Output Directory**: `dist`

### Backend (Node.js API):
- [ ] **Hosting Platform**: Railway (recommended), Render, Heroku, AWS EC2, or DigitalOcean
- [ ] **Node.js Version**: 18.x or 20.x LTS
- [ ] **Environment**: Production settings

### Environment Variables for Hosting:
```env
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://your-frontend-domain.com
```

### CI/CD:
- [ ] **GitHub Actions** or platform-specific deployment
- [ ] **Auto-deploy on push to main branch**

---

## Domain & SSL

### Required Information:
- [ ] **Domain Name**: e.g., `academystudios.com`
- [ ] **Domain Registrar**: Cloudflare, Namecheap, GoDaddy, etc.
- [ ] **SSL Certificate**: Usually automatic with hosting providers

### DNS Configuration:
- [ ] **A Record**: Point to server IP
- [ ] **CNAME**: For subdomains (api.academystudios.com)
- [ ] **MX Records**: For email
- [ ] **TXT Records**: For email verification (SPF, DKIM, DMARC)

---

## Environment Variables

### Complete Production .env Template:
```env
# Server
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://academystudios.com

# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Authentication
JWT_SECRET=your-very-long-secret-key-here
JWT_EXPIRES_IN=7d

# Payment (Stripe)
STRIPE_SECRET_KEY=sk_live_xxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxx

# Email (SendGrid)
SENDGRID_API_KEY=SG.xxxx
EMAIL_FROM=noreply@academystudios.com
EMAIL_FROM_NAME=Academy Studios

# File Storage (AWS S3)
AWS_ACCESS_KEY_ID=AKIAxxxx
AWS_SECRET_ACCESS_KEY=xxxx
AWS_REGION=us-east-1
AWS_S3_BUCKET=academy-studios-assets

# Logging & Monitoring (optional)
SENTRY_DSN=https://xxxx@sentry.io/xxxx
LOG_LEVEL=info
```

---

## Third-Party Integrations

### Analytics:
- [ ] **Google Analytics 4 ID**: `G-XXXXXXXXXX`
- [ ] **Plausible Analytics** (privacy-friendly alternative)

### Customer Support:
- [ ] **Discord Server Invite Link**: For community support
- [ ] **Help Desk**: Zendesk, Freshdesk, or Intercom

### Marketing:
- [ ] **Newsletter Service**: Mailchimp, ConvertKit, or Buttondown
- [ ] **Social Media Links**:
  - [ ] Discord
  - [ ] Twitter/X
  - [ ] YouTube
  - [ ] Instagram

---

## Security Considerations

### Required Actions:
- [ ] **Rate Limiting**: Implement API rate limiting to prevent abuse
- [ ] **Input Validation**: Sanitize all user inputs
- [ ] **HTTPS Only**: Ensure all traffic uses SSL
- [ ] **Secure Headers**: Already implemented with Helmet.js
- [ ] **Environment Secrets**: Never commit `.env` files to git
- [ ] **Database Backups**: Set up automated daily backups
- [ ] **Monitoring**: Set up uptime monitoring (UptimeRobot, Better Uptime)
- [ ] **Error Tracking**: Sentry or similar for production errors

### Compliance (if applicable):
- [ ] **GDPR**: Cookie consent, data deletion requests
- [ ] **Terms of Service**: Legal document for your store
- [ ] **Privacy Policy**: How customer data is handled
- [ ] **Refund Policy**: Digital goods refund policy

---

## Summary Checklist

### Critical (Required for Launch):
- [ ] Database configured and migrated
- [ ] Payment gateway integrated and tested
- [ ] Domain purchased and DNS configured
- [ ] SSL certificate active
- [ ] Frontend deployed to production
- [ ] Backend deployed to production
- [ ] Environment variables set on production servers

### Important (Recommended):
- [ ] Email service for transactional emails
- [ ] File storage for digital product downloads
- [ ] Analytics tracking
- [ ] Error monitoring

### Nice to Have:
- [ ] Admin dashboard
- [ ] User authentication
- [ ] Newsletter integration
- [ ] Customer support integration

---

## Contact for Setup Help

If you need assistance setting up any of these services, please provide:
1. Your preferred providers for each service
2. Budget constraints
3. Technical expertise level
4. Timeline for launch

This will help determine the best setup approach for your specific needs.
