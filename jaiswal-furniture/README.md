# Jaiswal Furniture — Crafted Comfort for Every Home (Est. 1989)

A modern, responsive, multi-page website built for **Jaiswal Furniture**, showcasing handcrafted Indian solid wood furniture (Teakwood, Sheesham, and American Walnut).

Designed with a warm, elegant luxury aesthetic inspired by sculptural high-end furniture drops (walnut brown, cream linen, brushed gold, sage accents, *Playfair Display* serif headings, and *Plus Jakarta Sans* body text).

---

## 📁 Project Structure

```
jaiswal-furniture/
├── index.html                 # Homepage (Hero banner, categories, bestsellers, craftsmanship, reviews, newsletter)
├── shop.html                  # Catalog page (Filters by category, wood species, price slider, sort & quick view)
├── product-detail.html        # Dynamic Product Detail (Multi-angle gallery, swatches, dimensions, tabs, related items)
├── custom-furniture.html      # Bespoke Made-to-Order (4-step process, live ballpark estimator, sketch upload)
├── gallery.html               # Our Work Portfolio (Masonry layout, filter tabs, interactive fullscreen lightbox)
├── about.html                 # About Us (Founder story, 35-year heritage, workshop insights, values, stats counter)
├── contact.html               # Contact & Experience Centre (Address, showroom booking form, map, FAQ accordion)
├── cart.html                  # Dedicated Cart & Checkout (Items review, address form, UPI/COD, invoice modal)
├── README.md                  # Customization & Setup Guide
├── css/
│   ├── style.css              # Core design tokens, typography, header, footer, cart drawer, modal, toast
│   ├── home.css               # Homepage-specific hero, categories, stats, and testimonials
│   ├── shop.css               # Catalog filters, toolbar, price slider, and grid
│   ├── product.css            # Dynamic product gallery, swatches, dimension specs, tabs
│   └── custom.css             # Bespoke estimator, masonry gallery, lightbox, checkout steps
└── js/
    ├── data.js                # Central catalog data (18+ rich furniture items, prices in ₹ INR, specs, reviews)
    ├── cart.js                # Global cart & wishlist engine, slide-out drawer, toast notifications
    ├── main.js                # Sticky header, search modal with live autocomplete, WhatsApp widget, quick view
    ├── shop.js                # Catalog filtering, price range slider, sorting, URL parameter support
    ├── product-detail.js      # Dynamic product loading, image thumbnails, swatches, tabs, WhatsApp prefill
    ├── custom.js              # Bespoke cost estimator calculator, drag-and-drop file preview
    ├── gallery.js             # Filterable masonry gallery and interactive fullscreen lightbox modal
    └── checkout.js            # Multi-step checkout, coupon discounts (`JAISWAL10`), UPI simulator, printable receipt
```

---

## 🚀 How to Run the Website

Because this project is built using standard, clean, and modular **HTML5, CSS3, and JavaScript (ES6+)**, there is **no build step or complicated installation required**:

### Option 1: Direct Browser Launch
Simply double-click on `index.html` in your file explorer, or right-click `index.html` and choose **Open with > Google Chrome** (or your preferred browser).

### Option 2: Local HTTP Server (Recommended for smooth asset loading)
Open PowerShell or your terminal inside the project directory:

```powershell
cd C:\Users\farha\.gemini\antigravity\scratch\jaiswal-furniture
python -m http.server 8000
```
Then visit: `http://localhost:8000` in your browser.

Or using Node.js:
```powershell
npx serve .
```

---

## 🎨 Where to Customize the Brand, Colors & Content

### 1. How to Change Brand Colors & Typography
Open `css/style.css` and modify the CSS variables at the top of the file under `:root`:

```css
:root {
  /* Walnut Brown Palette */
  --color-walnut-900: #27170E;
  --color-walnut-800: #3D271D;

  /* Cream / Off-White */
  --color-cream-100: #FBF9F5;
  --color-cream-200: #F3EFEA;

  /* Accent Gold */
  --color-gold-500: #C5A059;
  --color-gold-400: #DFB76C;

  /* Muted Sage */
  --color-sage-500: #4A5D4E;

  /* Fonts */
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-sans: 'Plus Jakarta Sans', sans-serif;
}
```

### 2. How to Add or Edit Products & Prices
All products are stored centrally in `js/data.js` under `JF_DATA.products`. Each product looks like this:

```javascript
{
  id: "your-product-id",
  name: "Royal Teak Dining Table",
  category: "dining", // 'sofas', 'beds', 'dining', 'wardrobes', 'office', 'outdoor'
  categoryLabel: "Dining Sets",
  price: 54500, // Price in ₹ INR
  originalPrice: 65000,
  badge: "Best Seller",
  rating: 4.9,
  woodType: "Teak Wood",
  dimensions: "L 180cm × W 90cm × H 76cm",
  material: "100% Solid Seasoned CP Teak",
  finishes: [
    { name: "Natural Teak", hex: "#A56B38" },
    { name: "Rich Walnut", hex: "#3E261A" }
  ],
  image: "https://your-image-url.com/image.jpg",
  gallery: [ /* array of angle URLs */ ],
  shortDesc: "Summary description...",
  fullDesc: "Detailed description...",
  specs: { /* key-value dictionary */ }
}
```
Any product added here will automatically appear on `shop.html`, `index.html`, in the live search modal, and dynamically render its own full page at `product-detail.html?id=your-product-id`.

### 3. How to Change Logo & Brand Name
- **Brand Name**: Search and replace `Jaiswal Furniture` across the HTML files or edit the header logo text in each page.
- **Logo Emblem**: In the HTML headers, edit `<div class="jf-brand-emblem">J</div>` to your preferred letter, or replace it with an `<img>` tag:
  ```html
  <img src="assets/logo.svg" alt="Brand Logo" class="jf-brand-logo">
  ```

### 4. How to Update Phone, Address & WhatsApp Number
Open `js/data.js` and edit the `brand` block:

```javascript
brand: {
  name: "Jaiswal Furniture",
  phone: "+91 98201 54890",
  email: "concierge@jaiswalfurniture.com",
  whatsapp: "919820154890", // Numbers without '+' or spaces for wa.me links
  address: {
    line1: "Plot 42, Jaiswal Heritage Lane, Lower Parel West",
    city: "Mumbai",
    pincode: "400013"
  }
}
```

### 5. Promotional Coupon Codes
Coupons are handled in `js/checkout.js` inside `bindCouponForm()`:
- `JAISWAL10`: Gives 10% discount on the entire order
- `WELCOME5`: Gives 5% discount on the entire order
You can add more codes by adding an `else if (code === "YOURCODE") { appliedDiscount = 15; ... }`.

---

## ✨ Key Features Implemented

1. **Persistent Global Cart & Wishlist**: Works across all 8 pages using `localStorage`. Slide-out drawer with free shipping progress bar triggers from anywhere.
2. **Interactive Global Search Modal**: Autocomplete results matching products by name, wood type, or category with keyboard shortcuts.
3. **Floating WhatsApp Concierge Widget**: Pre-filled messages for instant custom quotes and showroom appointments.
4. **Custom Furniture Live Estimator**: Dynamic pricing formula estimating custom wood furniture investments based on type, dimensions, and finishes.
5. **Interactive Masonry Gallery & Lightbox**: Fullscreen modal with arrow keyboard controls and direct quote link.
6. **Checkout Flow & Printable Tax Invoice**: Simulated UPI QR scanner, Cash on Delivery, address verification, and printable order confirmation receipt.
