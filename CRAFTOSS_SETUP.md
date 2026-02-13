# 🎨 Craftoss - Premium E-Commerce Platform

## Overview

Craftoss is a beautiful, premium Next.js e-commerce application designed for showcasing and selling handcrafted products. It features a stunning UI, product uploads with images/videos, and email-based order management.

## ✨ Features

### For Customers
- 🛍️ **Premium Product Gallery** - Beautiful grid/list view with filtering and search
- 🔍 **Advanced Filtering** - Filter by category, price, and search products
- 🎨 **Product Details** - Detailed product pages with multiple images and videos
- 📦 **Easy Ordering** - Simple order form with email notifications
- ✉️ **Order Confirmation** - Automatic email confirmations for orders
- 🎨 **Customization Requests** - Request product customizations
- 📱 **Responsive Design** - Works perfectly on all devices

### For Admins
- 📤 **Product Upload** - Beautiful drag-and-drop interface for product uploads
- 🖼️ **Media Management** - Upload up to 10 images and 3 videos per product
- 📝 **Rich Product Info** - Add descriptions, materials, dimensions, pricing
- 🏷️ **Categorization** - Organize products by category
- ⭐ **Featured Products** - Mark products as featured
- ✨ **Customization Options** - Mark products as customizable
- 📧 **Order Notifications** - Receive beautifully formatted order emails

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A Resend account for email (free tier available)
- Optional: UploadThing account for cloud file storage

### Installation

1. **Clone and install dependencies**

```bash
cd craftosss
npm install
```

2. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Email Configuration (using Resend)
RESEND_API_KEY=your_resend_api_key_here

# Admin Email (where orders will be sent)
ADMIN_EMAIL=your-email@example.com

# UploadThing Configuration (optional, for cloud storage)
UPLOADTHING_SECRET=your_uploadthing_secret_here
UPLOADTHING_APP_ID=your_uploadthing_app_id_here

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. **Get API Keys**

#### Resend (for emails):
1. Sign up at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Verify your domain or use their testing domain

#### UploadThing (optional):
1. Sign up at [uploadthing.com](https://uploadthing.com)
2. Create a new app
3. Get your App ID and Secret

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
craftosss/
├── src/
│   ├── app/
│   │   ├── (admin)/
│   │   │   └── products/
│   │   │       └── upload/          # Product upload page
│   │   ├── (public)/
│   │   │   └── product/
│   │   │       ├── page.tsx         # Products gallery
│   │   │       └── [id]/page.tsx    # Product details
│   │   └── api/
│   │       ├── orders/              # Order API
│   │       ├── products/            # Products API
│   │       └── uploadthing/         # File upload API
│   ├── components/
│   │   ├── ui/                      # UI components (shadcn/ui)
│   │   └── OrderForm.tsx            # Order form component
│   ├── features/
│   │   └── products/
│   │       └── components/          # Product-related components
│   ├── lib/
│   │   ├── products-store.ts        # In-memory product store
│   │   └── uploadthing.ts           # UploadThing setup
│   └── types/
│       └── product.ts               # TypeScript types
└── public/                          # Static assets
```

## 🎯 Usage Guide

### For Admins - Uploading Products

1. Navigate to `/products/upload`
2. Fill in product details:
   - **Product Name** (required)
   - **Category** (required)
   - **Description** (required)
   - **Price** in ₹ (required)
   - **Stock Quantity**
   - **Dimensions**
   - **Materials** (add multiple)
3. Upload images (drag & drop or click to browse)
4. Optionally upload videos
5. Check customization/featured options
6. Click "Publish Product"

### For Customers - Placing Orders

1. Browse products at `/product`
2. Use filters to find what you want
3. Click on a product to see details
4. Fill in the order form:
   - Personal information
   - Shipping address
   - Quantity
   - Customization requests (if applicable)
   - Additional messages
5. Submit order
6. Receive confirmation email

## 📧 Email System

### Order Emails

When a customer places an order:

1. **Admin receives:**
   - Beautiful HTML email with order details
   - Customer information
   - Customization requests
   - Direct reply-to customer email

2. **Customer receives:**
   - Order confirmation
   - Order summary
   - Contact information
   - Customization confirmation

### Email Templates

The system includes beautifully designed HTML email templates with:
- Gradient headers
- Formatted order details
- Responsive design
- Professional branding

## 🎨 UI Components

The application uses **shadcn/ui** components for a premium look:

- **Button** - Multiple variants
- **Card** - Elegant containers
- **Input** - Form inputs
- **Textarea** - Multi-line inputs
- **Select** - Dropdown menus
- **Badge** - Category tags
- **Dialog** - Modals
- **Label** - Form labels

## 🔐 Data Storage

Currently using **in-memory storage** (`src/lib/products-store.ts`) for simplicity.

For production, replace with:
- **PostgreSQL** with Prisma
- **MongoDB** with Mongoose
- **Supabase**
- **Firebase**

Example migration to database:

```typescript
// Replace in-memory functions with database queries
export const getProducts = async () => {
  return await db.product.findMany();
};
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Environment Variables for Production

Make sure to set all environment variables in your hosting platform:

```env
RESEND_API_KEY=...
ADMIN_EMAIL=...
UPLOADTHING_SECRET=...
UPLOADTHING_APP_ID=...
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 🛠️ Customization

### Colors and Branding

Edit `src/styles/theme.css` for global styles.

Main color scheme:
- Purple: `#9333ea` to `#7e22ce`
- Pink: `#ec4899` to `#db2777`
- Blue: `#3b82f6`

### Categories

Add/remove categories in:
- `src/app/(admin)/products/upload/page.tsx`
- `src/features/products/components/ProductPage.tsx`

```typescript
const CATEGORIES = [
  "Decor",
  "Furniture",
  // Add your categories
];
```

### Email Templates

Customize emails in `src/app/api/orders/route.ts`

## 📱 Routes

### Public Routes
- `/` - Home page
- `/product` - Products gallery
- `/product/[id]` - Product details page
- `/about` - About page
- `/contact` - Contact page

### Admin Routes
- `/products/upload` - Upload products (admin only)

### API Routes
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `GET /api/products/[id]` - Get product by ID
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product
- `POST /api/orders` - Place order (sends emails)

## 🐛 Troubleshooting

### Emails not sending

1. Check Resend API key is correct
2. Verify domain in Resend dashboard
3. Check admin email is set in `.env`
4. Look at console logs for errors

### Images not displaying

1. Check file paths in public folder
2. Verify image URLs in product data
3. For cloud storage, check UploadThing credentials

### Build errors

1. Run `npm install` again
2. Delete `.next` folder and rebuild
3. Check TypeScript errors: `npm run build`

## 🤝 Support

For issues or questions:
1. Check this documentation
2. Review console logs for errors
3. Check API responses in Network tab

## 📄 License

This project is for the Craftoss application.

---

Built with ❤️ using Next.js 16, React 19, and Tailwind CSS 4
