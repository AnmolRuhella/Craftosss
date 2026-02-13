# 🎨 Craftoss - Premium E-Commerce Platform

![Craftoss](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwind-css)

A beautiful, modern e-commerce platform for showcasing and selling handcrafted products. Built with the latest Next.js 16, React 19, and featuring a premium UI that will impress your clients.

## ✨ Key Features

🛍️ **Premium Product Gallery** - Stunning grid/list views with filtering  
📤 **Easy Product Upload** - Drag & drop images/videos  
📧 **Email Integration** - Automated order notifications  
🎨 **Beautiful UI** - Modern gradients and smooth animations  
📱 **Fully Responsive** - Perfect on all devices  
⚡ **Lightning Fast** - Optimized performance  
🔍 **Advanced Search** - Filter by category, price, and keywords  
✨ **Customization** - Mark products as customizable  

## 🚀 Quick Start

```bash
# 1. Install dependencies (already done!)
npm install

# 2. Create .env file with your email API key
RESEND_API_KEY=your_key_here
ADMIN_EMAIL=your-email@example.com

# 3. Run development server
npm run dev

# 4. Open http://localhost:3000
```

📖 **Full Setup Guide:** See [QUICK_START.md](./QUICK_START.md)

## 📸 Screenshots

### Product Gallery
Beautiful grid view with filtering, search, and category selection.

### Product Details
Detailed product pages with multiple images, videos, and order form.

### Product Upload
Premium admin interface for uploading products with drag & drop.

### Email Notifications
Professional order confirmations sent to both admin and customers.

## 🎯 What You Can Do

### For Customers:
- ✅ Browse products with advanced filtering
- ✅ View detailed product information
- ✅ Place orders with customization requests
- ✅ Receive email confirmations

### For Admins:
- ✅ Upload products with multiple images/videos
- ✅ Add detailed product information
- ✅ Manage categories and pricing
- ✅ Receive order notifications via email

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19 + Tailwind CSS 4
- **Components:** Radix UI + shadcn/ui
- **Email:** Resend
- **Forms:** React Hook Form + Zod
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **File Upload:** React Dropzone + UploadThing
- **TypeScript:** Full type safety

## 📁 Project Structure

```
craftosss/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── (admin)/           # Admin routes
│   │   ├── (public)/          # Public routes
│   │   └── api/               # API routes
│   ├── components/            # Reusable components
│   │   └── ui/                # UI components
│   ├── features/              # Feature modules
│   │   └── products/          # Product features
│   ├── lib/                   # Utilities
│   └── types/                 # TypeScript types
├── public/                    # Static assets
└── .env                       # Environment variables
```

## 🔐 Environment Variables

```env
# Required
RESEND_API_KEY=re_your_key_here
ADMIN_EMAIL=admin@example.com

# Optional (for cloud storage)
UPLOADTHING_SECRET=sk_...
UPLOADTHING_APP_ID=...

# Development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📱 Routes

### Public
- `/` - Home page
- `/product` - Products gallery
- `/product/[id]` - Product details
- `/about` - About page
- `/contact` - Contact page

### Admin
- `/products/upload` - Upload products

### API
- `GET/POST /api/products` - Products CRUD
- `POST /api/orders` - Place orders & send emails

## 🎨 Customization

### Colors
Main color scheme uses purple/pink gradients. Edit in components:
```css
from-purple-600 to-pink-600
```

### Categories
Update categories in:
- `src/app/(admin)/products/upload/page.tsx`
- `src/features/products/components/ProductPage.tsx`

### Email Templates
Customize in `src/app/api/orders/route.ts`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy!

### Build for Production

```bash
npm run build
npm start
```

## 📚 Documentation

- 📖 **Quick Start:** [QUICK_START.md](./QUICK_START.md) - Get running in 5 minutes
- 📘 **Full Setup:** [CRAFTOSS_SETUP.md](./CRAFTOSS_SETUP.md) - Complete documentation
- 🔧 **API Reference:** See inline comments in API routes

## ✅ Testing Checklist

- [ ] Upload a product with images
- [ ] View product in gallery
- [ ] Filter and search products
- [ ] Place a test order
- [ ] Verify order email (customer)
- [ ] Verify order email (admin)
- [ ] Test on mobile device

## 🎯 Roadmap

Future enhancements:
- 💳 Payment integration (Stripe/Razorpay)
- 🗄️ Database integration (PostgreSQL/MongoDB)
- 👤 User authentication
- 📊 Admin dashboard
- 🛒 Shopping cart
- ⭐ Product reviews
- 📦 Inventory management
- 📈 Analytics

## 🐛 Troubleshooting

**Emails not sending?**
- Check Resend API key
- Verify admin email
- Restart dev server

**Build errors?**
- Delete `.next` folder
- Run `npm install` again
- Check TypeScript errors

**Images not loading?**
- Verify file paths
- Check public folder
- Use external URLs

## 💡 Pro Tips

1. Use high-quality images (recommended: 1000x1000px)
2. Fill all product details for best results
3. Mark best products as "Featured"
4. Test email flow with real email addresses
5. Enable customization for made-to-order items

## 🤝 Contributing

This is a custom project for Craftoss. For questions or improvements, reach out to the development team.

## 📄 License

Private project for Craftoss.

---

**Built with ❤️ by the Craftoss Team**

Using Next.js 16, React 19, Tailwind CSS 4, and modern web technologies.

---

## 🎉 Get Started Now!

```bash
npm run dev
```

Then visit:
- **Products Gallery:** http://localhost:3000/product
- **Upload Product:** http://localhost:3000/products/upload

Happy crafting! ✨
