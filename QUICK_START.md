# ⚡ Craftoss Quick Start Guide

## 🎯 Get Your App Running in 5 Minutes

### Step 1: Install Dependencies ✅ (Already Done!)

The necessary packages are already installed.

### Step 2: Set Up Resend for Emails (Required)

1. **Sign up for Resend** (Free tier available)
   - Go to: https://resend.com/signup
   - Verify your email

2. **Get Your API Key**
   - Dashboard → API Keys → Create API Key
   - Copy the key (starts with `re_...`)

3. **Create `.env` file** in project root:

```env
RESEND_API_KEY=re_your_actual_key_here
ADMIN_EMAIL=your-email@gmail.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Domain Setup** (Optional for production)
   - For testing: Use Resend's test domain (onboarding@resend.dev)
   - For production: Add and verify your domain in Resend

### Step 3: Run the App

```bash
npm run dev
```

Open: http://localhost:3000

## 🎨 Test Your Setup

### 1. Upload a Product

1. Go to: http://localhost:3000/products/upload
2. Fill in:
   - Name: "Beautiful Wall Art"
   - Category: "Decor"
   - Description: "Handcrafted wooden wall art"
   - Price: 2500
3. Drag & drop an image
4. Click "Publish Product"

### 2. View Products

1. Go to: http://localhost:3000/product
2. See your uploaded product!
3. Click on it to view details

### 3. Place a Test Order

1. On product details page, scroll to "Place Your Order"
2. Fill in your information:
   - Name: Your name
   - Email: Your email (you'll receive confirmation)
   - Phone: Your phone
3. Click "Place Order"
4. Check your email for confirmation!
5. Check admin email (from .env) for order notification!

## 🎉 Success Criteria

✅ Product upload works  
✅ Products display on gallery  
✅ Order form submits  
✅ You receive confirmation email  
✅ Admin receives order notification  

## 🚨 Common Issues

### "Failed to send email"

**Fix:** 
- Check RESEND_API_KEY in `.env` is correct
- Check ADMIN_EMAIL is valid
- Restart dev server: `Ctrl+C` then `npm run dev`

### "Cannot read property..."

**Fix:**
- Make sure `.env` file exists in root
- Restart dev server

### Images not showing

**Fix:**
- Use placeholder images initially
- Add real images to `public/` folder
- Or use external URLs (https://...)

## 🎯 Next Steps

### Optional Enhancements:

1. **Add Your Logo**
   - Replace `public/craftosslogo.png` with your logo

2. **Customize Colors**
   - Edit gradient colors in components
   - Current: Purple/Pink gradient

3. **Add More Products**
   - Go to `/products/upload` and add more!

4. **Setup UploadThing** (Optional - for cloud storage)
   - Sign up: https://uploadthing.com
   - Add credentials to `.env`:
   ```env
   UPLOADTHING_SECRET=sk_...
   UPLOADTHING_APP_ID=...
   ```

5. **Connect Database** (For production)
   - Replace in-memory store with PostgreSQL/MongoDB
   - File: `src/lib/products-store.ts`

## 📱 Key URLs

- **Home:** http://localhost:3000
- **Products:** http://localhost:3000/product
- **Upload:** http://localhost:3000/products/upload
- **API Products:** http://localhost:3000/api/products

## 💡 Pro Tips

1. **Test emails with your real email** first
2. **Use high-quality product images** for best results
3. **Fill in all product details** for professional look
4. **Test on mobile** - UI is fully responsive!
5. **Check spam folder** if emails don't arrive

## 🎨 Showcase to Clients

To impress clients:

1. Upload 5-10 products with beautiful images
2. Add detailed descriptions and materials
3. Mark some as "Featured"
4. Enable "Customizable" for relevant products
5. Test the full order flow
6. Show them the beautiful order emails!

## 🚀 Ready for Production?

1. Deploy to Vercel (easy):
   ```bash
   npm run build
   ```
   - Push to GitHub
   - Import in Vercel
   - Add environment variables
   - Deploy!

2. Verify domain in Resend for production emails

3. Consider adding payment integration (Stripe/Razorpay)

4. Connect to real database

---

**Need help?** Check `CRAFTOSS_SETUP.md` for detailed documentation!

Happy crafting! 🎨✨
