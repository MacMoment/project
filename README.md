# Academy Studios

A React + TypeScript + Vite web application with a Node.js/Express backend API for an online asset store.

## Project Structure

```
project/
├── src/                 # Frontend React application
│   ├── components/      # Reusable UI components
│   ├── pages/          # Page components
│   ├── services/       # API service functions
│   ├── store/          # State management (Zustand)
│   └── types/          # TypeScript type definitions
├── backend/            # Backend Node.js/Express API
│   └── src/
│       ├── config/     # Configuration
│       ├── controllers/# Route handlers
│       ├── models/     # Data models
│       └── routes/     # API routes
└── neededinfo.md       # Production setup requirements
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. **Install frontend dependencies:**
   ```bash
   npm install
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

### Development

1. **Start the backend server:**
   ```bash
   cd backend
   npm start
   # Server runs on http://localhost:3001
   ```

2. **In a new terminal, start the frontend:**
   ```bash
   npm run dev
   # Frontend runs on http://localhost:5173
   ```

### Environment Variables

**Frontend** (`.env`):
```env
VITE_API_URL=http://localhost:3001/api
```

**Backend** (`backend/.env`):
```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/products` | List all products |
| GET | `/api/products/:id` | Get single product |
| GET | `/api/categories` | List categories |
| GET | `/api/portfolio` | List portfolio items |
| GET | `/api/team` | List team members |
| GET | `/api/testimonials` | List testimonials |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/orders` | Submit checkout order |
| POST | `/api/orders/custom` | Submit custom order request |

## Building for Production

**Frontend:**
```bash
npm run build
```

**Backend:**
```bash
cd backend
npm start
```

## Production Setup

See [neededinfo.md](./neededinfo.md) for complete production setup requirements including:
- Database configuration
- Payment gateway integration
- Email service setup
- File storage
- Hosting and deployment

---

## Original Vite Template Info

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
