/**
 * Jaiswal Furniture - Global Cart, Wishlist & Drawer Manager
 * Persisted with localStorage, Toast notifications & Free Shipping progress
 */

const JF_Cart = {
  CART_KEY: "jf_cart_items_v1",
  WISHLIST_KEY: "jf_wishlist_items_v1",
  FREE_SHIPPING_THRESHOLD: 40000, // ₹40,000 for free white-glove assembly

  getItems() {
    try {
      const data = localStorage.getItem(this.CART_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveItems(items) {
    try {
      localStorage.setItem(this.CART_KEY, JSON.stringify(items));
      this.updateHeaderBadges();
      this.renderCartDrawer();
      // Dispatch custom event for checkout or listeners
      window.dispatchEvent(new CustomEvent("jf_cart_updated", { detail: { items } }));
    } catch (e) {
      console.error("Cart save error", e);
    }
  },

  getWishlist() {
    try {
      const data = localStorage.getItem(this.WISHLIST_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveWishlist(items) {
    try {
      localStorage.setItem(this.WISHLIST_KEY, JSON.stringify(items));
      this.updateHeaderBadges();
      window.dispatchEvent(new CustomEvent("jf_wishlist_updated", { detail: { items } }));
    } catch (e) {
      console.error("Wishlist save error", e);
    }
  },

  addItem(productId, quantity = 1, finish = null, fabric = null) {
    const product = window.JF_DATA.products.find(p => p.id === productId);
    if (!product) return false;

    const items = this.getItems();
    const chosenFinish = finish || (product.finishes && product.finishes[0] ? product.finishes[0].name : "Standard");
    const chosenFabric = fabric || (product.fabricOptions && product.fabricOptions[0] ? product.fabricOptions[0] : "Standard");

    const existingIndex = items.findIndex(
      item => item.id === productId && item.finish === chosenFinish && item.fabric === chosenFabric
    );

    if (existingIndex > -1) {
      items[existingIndex].quantity += quantity;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        woodType: product.woodType,
        finish: chosenFinish,
        fabric: chosenFabric,
        quantity: quantity
      });
    }

    this.saveItems(items);
    this.showToast("Added to Cart", `${product.name} (${chosenFinish}) is in your cart.`, "success");
    this.openCartDrawer();
    return true;
  },

  removeItem(index) {
    const items = this.getItems();
    if (index >= 0 && index < items.length) {
      const removed = items.splice(index, 1)[0];
      this.saveItems(items);
      this.showToast("Removed from Cart", `${removed.name} removed.`, "info");
    }
  },

  updateQuantity(index, quantity) {
    const items = this.getItems();
    if (items[index]) {
      if (quantity <= 0) {
        this.removeItem(index);
      } else {
        items[index].quantity = quantity;
        this.saveItems(items);
      }
    }
  },

  clearCart() {
    this.saveItems([]);
  },

  getCartSubtotal() {
    return this.getItems().reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  getCartCount() {
    return this.getItems().reduce((sum, item) => sum + item.quantity, 0);
  },

  toggleWishlist(productId) {
    const product = window.JF_DATA.products.find(p => p.id === productId);
    if (!product) return false;

    let wishlist = this.getWishlist();
    const index = wishlist.indexOf(productId);

    if (index > -1) {
      wishlist.splice(index, 1);
      this.saveWishlist(wishlist);
      this.showToast("Wishlist Updated", `${product.name} removed from your wishlist.`, "info");
      return false;
    } else {
      wishlist.push(productId);
      this.saveWishlist(wishlist);
      this.showToast("Saved to Wishlist", `${product.name} added to your favorites.`, "success");
      return true;
    }
  },

  isInWishlist(productId) {
    return this.getWishlist().includes(productId);
  },

  formatINR(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  },

  // UI Drawer & Modal Injection
  initUI() {
    this.injectDrawerAndToasts();
    this.updateHeaderBadges();
    this.renderCartDrawer();
    this.bindEvents();
  },

  injectDrawerAndToasts() {
    if (document.getElementById("jf-cart-drawer")) return;

    const drawerHTML = `
      <div id="jf-cart-drawer-overlay" class="jf-drawer-overlay"></div>
      <aside id="jf-cart-drawer" class="jf-cart-drawer" aria-label="Shopping Cart Drawer">
        <div class="jf-drawer-header">
          <div class="jf-drawer-title-wrap">
            <h3 class="jf-drawer-title">Your Cart</h3>
            <span id="jf-drawer-item-count" class="jf-drawer-badge">0 items</span>
          </div>
          <button id="jf-close-cart-btn" class="jf-icon-btn" aria-label="Close cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div id="jf-free-shipping-bar" class="jf-free-shipping-card">
          <div class="jf-free-shipping-label" id="jf-free-shipping-text">
            Add ₹40,000 for Free White-Glove Installation
          </div>
          <div class="jf-progress-track">
            <div id="jf-free-shipping-fill" class="jf-progress-fill" style="width: 0%"></div>
          </div>
        </div>

        <div id="jf-drawer-items" class="jf-drawer-body">
          <!-- Items rendered dynamically -->
        </div>

        <div id="jf-drawer-footer" class="jf-drawer-footer">
          <div class="jf-drawer-subtotal-row">
            <span>Subtotal (Inclusive of GST)</span>
            <span id="jf-drawer-subtotal-amt" class="jf-drawer-subtotal">₹0</span>
          </div>
          <p class="jf-drawer-tax-note">Pan-India delivery with skilled installation</p>
          <div class="jf-drawer-actions">
            <a href="cart.html" class="jf-btn jf-btn-outline jf-btn-block">View Full Cart & Offers</a>
            <a href="cart.html?step=checkout" class="jf-btn jf-btn-primary jf-btn-block">
              Proceed to Checkout
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
          <div class="jf-drawer-perks">
            <span>🛡️ 10-Yr Warranty</span>
            <span>🪵 100% Solid Wood</span>
            <span>🚚 Safe Transit</span>
          </div>
        </div>
      </aside>

      <div id="jf-toast-container" class="jf-toast-container" aria-live="polite"></div>
    `;

    document.body.insertAdjacentHTML("beforeend", drawerHTML);
  },

  bindEvents() {
    const overlay = document.getElementById("jf-cart-drawer-overlay");
    const closeBtn = document.getElementById("jf-close-cart-btn");

    if (overlay) overlay.addEventListener("click", () => this.closeCartDrawer());
    if (closeBtn) closeBtn.addEventListener("click", () => this.closeCartDrawer());

    // Trigger cart from header icon buttons
    document.querySelectorAll(".js-open-cart").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.openCartDrawer();
      });
    });

    // Escape key closes drawer
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeCartDrawer();
      }
    });
  },

  openCartDrawer() {
    const drawer = document.getElementById("jf-cart-drawer");
    const overlay = document.getElementById("jf-cart-drawer-overlay");
    if (drawer && overlay) {
      drawer.classList.add("is-open");
      overlay.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
  },

  closeCartDrawer() {
    const drawer = document.getElementById("jf-cart-drawer");
    const overlay = document.getElementById("jf-cart-drawer-overlay");
    if (drawer && overlay) {
      drawer.classList.remove("is-open");
      overlay.classList.remove("is-open");
      document.body.style.overflow = "";
    }
  },

  renderCartDrawer() {
    const container = document.getElementById("jf-drawer-items");
    const countBadge = document.getElementById("jf-drawer-item-count");
    const subtotalAmt = document.getElementById("jf-drawer-subtotal-amt");
    const footer = document.getElementById("jf-drawer-footer");
    const shippingText = document.getElementById("jf-free-shipping-text");
    const shippingFill = document.getElementById("jf-free-shipping-fill");

    if (!container) return;

    const items = this.getItems();
    const count = this.getCartCount();
    const subtotal = this.getCartSubtotal();

    if (countBadge) countBadge.textContent = `${count} ${count === 1 ? 'item' : 'items'}`;
    if (subtotalAmt) subtotalAmt.textContent = this.formatINR(subtotal);

    // Free shipping threshold calculations
    if (shippingText && shippingFill) {
      const remaining = this.FREE_SHIPPING_THRESHOLD - subtotal;
      const progressPercent = Math.min(100, Math.round((subtotal / this.FREE_SHIPPING_THRESHOLD) * 100));
      shippingFill.style.width = `${progressPercent}%`;

      if (subtotal === 0) {
        shippingText.innerHTML = `Add <strong>₹40,000</strong> for <strong>Free Delivery & Installation</strong>`;
      } else if (remaining > 0) {
        shippingText.innerHTML = `Add <strong>${this.formatINR(remaining)}</strong> more for <strong>Free Delivery & White-Glove Installation</strong>!`;
      } else {
        shippingText.innerHTML = `🎉 <strong>Congratulations!</strong> You've unlocked <strong>Free Delivery & Assembly</strong>`;
      }
    }

    if (items.length === 0) {
      container.innerHTML = `
        <div class="jf-drawer-empty">
          <div class="jf-empty-icon">🛋️</div>
          <h4>Your cart is empty</h4>
          <p>Discover our heirloom solid wood collections and craft your dream home.</p>
          <a href="shop.html" class="jf-btn jf-btn-primary" onclick="JF_Cart.closeCartDrawer()">Explore Catalog</a>
        </div>
      `;
      if (footer) footer.style.display = "none";
      return;
    }

    if (footer) footer.style.display = "block";

    container.innerHTML = items.map((item, index) => `
      <div class="jf-cart-item" data-index="${index}">
        <div class="jf-cart-item-img-wrap">
          <img src="${item.image}" alt="${item.name}" loading="lazy" class="jf-cart-item-img">
        </div>
        <div class="jf-cart-item-info">
          <div class="jf-cart-item-title-row">
            <h4 class="jf-cart-item-title">
              <a href="product-detail.html?id=${item.id}">${item.name}</a>
            </h4>
            <button class="jf-cart-item-remove" onclick="JF_Cart.removeItem(${index})" title="Remove item">
              &times;
            </button>
          </div>
          <div class="jf-cart-item-meta">
            <span>${item.woodType}</span> • <span>${item.finish}</span>
          </div>
          <div class="jf-cart-item-footer">
            <div class="jf-qty-control">
              <button class="jf-qty-btn" onclick="JF_Cart.updateQuantity(${index}, ${item.quantity - 1})" aria-label="Decrease quantity">−</button>
              <span class="jf-qty-num">${item.quantity}</span>
              <button class="jf-qty-btn" onclick="JF_Cart.updateQuantity(${index}, ${item.quantity + 1})" aria-label="Increase quantity">+</button>
            </div>
            <div class="jf-cart-item-pricing">
              <span class="jf-cart-item-price">${this.formatINR(item.price * item.quantity)}</span>
              ${item.quantity > 1 ? `<span class="jf-cart-item-unit">(${this.formatINR(item.price)} each)</span>` : ''}
            </div>
          </div>
        </div>
      </div>
    `).join("");
  },

  updateHeaderBadges() {
    const cartCount = this.getCartCount();
    const wishlistCount = this.getWishlist().length;

    document.querySelectorAll(".js-cart-count").forEach(el => {
      el.textContent = cartCount;
      el.style.display = cartCount > 0 ? "inline-flex" : "none";
    });

    document.querySelectorAll(".js-wishlist-count").forEach(el => {
      el.textContent = wishlistCount;
      el.style.display = wishlistCount > 0 ? "inline-flex" : "none";
    });
  },

  showToast(title, message, type = "success") {
    const container = document.getElementById("jf-toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `jf-toast jf-toast-${type}`;
    
    let icon = "✓";
    if (type === "info") icon = "ℹ";
    if (type === "error") icon = "✕";

    toast.innerHTML = `
      <div class="jf-toast-icon">${icon}</div>
      <div class="jf-toast-content">
        <h5 class="jf-toast-title">${title}</h5>
        <p class="jf-toast-msg">${message}</p>
      </div>
      <button class="jf-toast-close" aria-label="Close alert">&times;</button>
    `;

    container.appendChild(toast);

    toast.querySelector(".jf-toast-close").addEventListener("click", () => {
      toast.remove();
    });

    setTimeout(() => {
      toast.classList.add("jf-toast-fadeout");
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }
};

// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  JF_Cart.initUI();
});

if (typeof window !== "undefined") {
  window.JF_Cart = JF_Cart;
}
