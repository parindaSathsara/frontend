# React Frontend - Setup Guide

## Prerequisites
- Node.js 18+ and npm
- Running Laravel backend API at http://localhost:8000

## Installation Steps

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will run at http://localhost:3000

### 3. Build for Production
```bash
npm run build
```

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx
│   │   ├── ProductCard.jsx
│   │   ├── AlbumCard.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── AdminRoute.jsx
│   ├── pages/              # Page components
│   │   ├── HomePage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── AlbumsPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── customer/       # Customer pages
│   │   └── admin/          # Admin pages
│   ├── context/            # React Context providers
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── services/           # API services
│   │   └── api.js
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Features Implemented

### Customer Features
- ✅ User registration and authentication
- ✅ Browse products and albums
- ✅ Product filtering and search
- ✅ Add to cart functionality
- ✅ Wishlist management
- ✅ Checkout process
- ✅ Order history
- ✅ Product reviews

### Admin Features
- ✅ Admin dashboard with statistics
- ✅ Product management (CRUD)
- ✅ Album management (CRUD)
- ✅ Order management
- ✅ Customer management
- ✅ Inventory tracking

## Key Technologies

- **React 18** - UI library
- **React Router v6** - Routing
- **React Query** - Data fetching and caching
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Heroicons** - Icon library
- **Vite** - Build tool

## API Integration

The frontend communicates with the Laravel backend at `/api`. All API calls are configured in `src/services/api.js`.

Authentication tokens are stored in localStorage and automatically included in API requests.

## State Management

- **AuthContext** - Global authentication state
- **CartContext** - Shopping cart state
- **React Query** - Server state caching

## Styling

The project uses Tailwind CSS with custom configurations:
- Primary color: Pink/Rose palette
- Custom component classes defined in `index.css`
- Responsive design for mobile, tablet, and desktop

## Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8000/api
```

## Development Tips

1. The Vite proxy is configured to forward `/api` requests to the Laravel backend
2. Hot module replacement (HMR) is enabled for fast development
3. Use React Query DevTools for debugging API calls
4. Tailwind CSS IntelliSense extension recommended for VS Code

## Next Steps

1. Implement remaining page components (see pages/ folder for structure)
2. Add product image upload functionality
3. Integrate payment gateway
4. Add email notifications
5. Implement advanced search
6. Add product reviews and ratings
7. Optimize images and lazy loading
8. Add loading skeletons
9. Implement PWA features
10. Add analytics tracking
