# The Hen House - Western Boutique E-commerce

A modern full-stack e-commerce website for a western-style fashion boutique built with Next.js 14, TypeScript, and MongoDB.

## Features

- 🏪 **Western Boutique Theme** - Earth tone colors (sage, tan, cream, rust, brown)
- 👗 **Product Management** - Full CRUD operations for products
- 🛒 **Shopping Cart** - Persistent cart with session management
- 💳 **Stripe Payments** - Secure payment processing
- 🔐 **User Authentication** - Register, login, and user profiles
- 👨‍💼 **Admin Dashboard** - Product management interface
- 📱 **Responsive Design** - Mobile-first approach
- 🔍 **Product Search** - Real-time search functionality
- 🖼️ **Image Optimization** - Next.js Image component
- 📧 **Newsletter Signup** - Email collection
- 📍 **Contact Page** - Store information and contact form

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **Styling**: Tailwind CSS with custom theme
- **Icons**: Lucide React

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd the-hen-house
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file with:
   ```env
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000

   MONGODB_URI=mongodb://localhost:27017/the-hen-house

   STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
   STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
   STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

   JWT_SECRET=your-jwt-secret-here
   ```

4. **Set up MongoDB**
   
   Make sure MongoDB is running locally or update the connection string for your database.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── admin/             # Admin dashboard
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout process
│   ├── products/          # Product pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   ├── Newsletter.tsx
│   ├── HeroSection.tsx
│   └── Providers.tsx
├── lib/                   # Utility libraries
│   ├── mongodb.ts
│   ├── stripe.ts
│   └── auth.ts
└── models/                # MongoDB schemas
    ├── Product.ts
    ├── User.ts
    ├── Order.ts
    └── Cart.ts
```

## Database Models

- **Product**: name, description, price, images, category, sizes, stock, featured
- **User**: name, email, password, role (user/admin)
- **Order**: user, items, total, shippingAddress, paymentIntentId, status
- **Cart**: user/sessionId, items (product, quantity)

## API Routes

- `GET/POST /api/products` - Product CRUD
- `GET/PUT/DELETE /api/products/[id]` - Individual product operations
- `GET/POST/PUT/DELETE /api/cart` - Cart management
- `POST /api/checkout` - Payment processing
- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth handlers

## Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.