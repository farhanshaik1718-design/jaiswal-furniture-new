/**
 * Jaiswal Furniture - Product Detail Page Controller
 * Dynamic product rendering, Multi-image gallery, Swatches, Tabs & WhatsApp integration
 */

document.addEventListener("DOMContentLoaded", () => {
  initProductDetail();
});

let currentProduct = null;
let selectedFinish = null;
let selectedFabric = null;
let currentQuantity = 1;

function initProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id") || "aura-curved-sofa";

  const product = window.JF_DATA?.products.find(p => p.id === productId) || window.JF_DATA?.products[0];
  if (!product) return;

  currentProduct = product;
  selectedFinish = product.finishes && product.finishes[0] ? product.finishes[0].name : "Standard";
  selectedFabric = product.fabricOptions && product.fabricOptions[0] ? product.fabricOptions[0] : null;

  renderProductDetails(product);
  bindDetailInteractions(product);
  renderRelatedProducts(product);
}

function renderProductDetails(p) {
  // Update document title & meta
  document.title = `${p.name} | Jaiswal Furniture`;

  // Breadcrumbs
  const crumbCategory = document.getElementById("jf-pdp-crumb-cat");
  const crumbTitle = document.getElementById("jf-pdp-crumb-title");
  if (crumbCategory) crumbCategory.textContent = p.categoryLabel;
  if (crumbTitle) crumbTitle.textContent = p.name;

  // Media Gallery
  const mainImg = document.getElementById("jf-pdp-main-image");
  const thumbsWrap = document.getElementById("jf-pdp-thumbs");
  if (mainImg) {
    mainImg.src = p.image;
    mainImg.alt = p.name;
  }

  const galleryImages = p.gallery && p.gallery.length > 0 ? p.gallery : [p.image];
  if (thumbsWrap) {
    thumbsWrap.innerHTML = galleryImages.map((imgUrl, i) => `
      <button class="jf-pdp-thumb-btn ${i === 0 ? 'is-active' : ''}" data-src="${imgUrl}">
        <img src="${imgUrl}" alt="${p.name} View ${i + 1}" loading="lazy">
      </button>
    `).join("");

    // Thumbnail click
    thumbsWrap.querySelectorAll(".jf-pdp-thumb-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        thumbsWrap.querySelectorAll(".jf-pdp-thumb-btn").forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        mainImg.src = btn.getAttribute("data-src");
      });
    });
  }

  // Header & Info
  const badgeEl = document.getElementById("jf-pdp-badge");
  const titleEl = document.getElementById("jf-pdp-title");
  const starsEl = document.getElementById("jf-pdp-rating");
  const reviewsCountEl = document.getElementById("jf-pdp-reviews-count");
  const skuEl = document.getElementById("jf-pdp-sku");

  if (badgeEl) badgeEl.textContent = p.badge || p.woodType;
  if (titleEl) titleEl.textContent = p.name;
  if (starsEl) starsEl.textContent = `★ ${p.rating}`;
  if (reviewsCountEl) reviewsCountEl.textContent = `(${p.reviewsCount} customer reviews)`;
  if (skuEl) skuEl.textContent = `SKU: JF-${p.id.substring(0, 4).toUpperCase()}-2026`;

  // Pricing
  const priceEl = document.getElementById("jf-pdp-price");
  const origPriceEl = document.getElementById("jf-pdp-orig-price");
  const saveEl = document.getElementById("jf-pdp-save");

  if (priceEl) priceEl.textContent = JF_Cart.formatINR(p.price);
  if (origPriceEl) origPriceEl.textContent = JF_Cart.formatINR(p.originalPrice);
  if (saveEl) {
    const savePercent = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
    saveEl.textContent = `Save ${savePercent}% (Festive Special)`;
  }

  const leadEl = document.getElementById("jf-pdp-lead");
  if (leadEl) leadEl.textContent = p.shortDesc;

  // Finishes Swatches
  const finishSelectedText = document.getElementById("jf-pdp-finish-name");
  const swatchesList = document.getElementById("jf-pdp-swatches");
  if (finishSelectedText) finishSelectedText.textContent = selectedFinish;

  if (swatchesList && p.finishes) {
    swatchesList.innerHTML = p.finishes.map((f, i) => `
      <button class="jf-swatch-item ${i === 0 ? 'is-selected' : ''}" data-name="${f.name}">
        <span class="jf-swatch-dot" style="background-color: ${f.hex}"></span>
        <span>${f.name}</span>
      </button>
    `).join("");

    swatchesList.querySelectorAll(".jf-swatch-item").forEach(btn => {
      btn.addEventListener("click", () => {
        swatchesList.querySelectorAll(".jf-swatch-item").forEach(b => b.classList.remove("is-selected"));
        btn.classList.add("is-selected");
        selectedFinish = btn.getAttribute("data-name");
        if (finishSelectedText) finishSelectedText.textContent = selectedFinish;
        updateWhatsAppLink();
      });
    });
  }

  // Dimensions summary
  const dimEl = document.getElementById("jf-pdp-dimensions");
  if (dimEl) dimEl.textContent = p.dimensions;

  // Tabs Content
  const descTab = document.getElementById("jf-tab-description");
  if (descTab) {
    descTab.innerHTML = `
      <p style="font-size: 1.05rem; line-height: 1.8; margin-bottom: 20px;">${p.fullDesc}</p>
      <div style="background: var(--color-cream-100); padding: 20px; border-radius: var(--radius-md); border-left: 4px solid var(--color-gold-500);">
        <h4 style="font-size: 1.1rem; margin-bottom: 6px;">The Jaiswal Timber Guarantee</h4>
        <p style="font-size: 0.9rem; color: var(--color-text-muted);">
          Each log of ${p.woodType} is seasoned in vacuum kilns for 60 to 90 days to achieve an optimal moisture content of 8–10%, engineered specifically to endure varying Indian humidity levels without warping, cracking, or seasonal expansion.
        </p>
      </div>
    `;
  }

  const specsTable = document.getElementById("jf-tab-specs-tbody");
  if (specsTable && p.specs) {
    specsTable.innerHTML = Object.entries(p.specs).map(([key, val]) => `
      <tr>
        <th>${key}</th>
        <td>${val}</td>
      </tr>
    `).join("");
  }

  updateWhatsAppLink();
}

function bindDetailInteractions(p) {
  // Quantity controls
  const qtyInput = document.getElementById("jf-pdp-qty-input");
  const qtyDec = document.getElementById("jf-pdp-qty-dec");
  const qtyInc = document.getElementById("jf-pdp-qty-inc");

  if (qtyDec && qtyInc && qtyInput) {
    qtyDec.addEventListener("click", () => {
      if (currentQuantity > 1) {
        currentQuantity--;
        qtyInput.value = currentQuantity;
      }
    });

    qtyInc.addEventListener("click", () => {
      currentQuantity++;
      qtyInput.value = currentQuantity;
    });

    qtyInput.addEventListener("change", (e) => {
      const val = parseInt(e.target.value, 10);
      currentQuantity = isNaN(val) || val < 1 ? 1 : val;
      qtyInput.value = currentQuantity;
    });
  }

  // Add to cart button
  const addCartBtn = document.getElementById("jf-pdp-add-cart");
  if (addCartBtn) {
    addCartBtn.addEventListener("click", () => {
      if (window.JF_Cart) {
        window.JF_Cart.addItem(p.id, currentQuantity, selectedFinish, selectedFabric);
      }
    });
  }

  // Wishlist toggle button on PDP
  const wishBtn = document.getElementById("jf-pdp-wishlist");
  if (wishBtn) {
    const isWish = window.JF_Cart ? window.JF_Cart.isInWishlist(p.id) : false;
    wishBtn.classList.toggle("is-active", isWish);

    wishBtn.addEventListener("click", () => {
      const added = window.JF_Cart.toggleWishlist(p.id);
      wishBtn.classList.toggle("is-active", added);
    });
  }

  // Tab navigation
  document.querySelectorAll(".jf-pdp-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTabId = btn.getAttribute("data-tab");
      document.querySelectorAll(".jf-pdp-tab-btn").forEach(b => b.classList.remove("is-active"));
      document.querySelectorAll(".jf-tab-panel").forEach(p => p.classList.remove("is-active"));

      btn.classList.add("is-active");
      const targetPanel = document.getElementById(targetTabId);
      if (targetPanel) targetPanel.classList.add("is-active");
    });
  });
}

function updateWhatsAppLink() {
  const waBtn = document.getElementById("jf-pdp-whatsapp-btn");
  if (!waBtn || !currentProduct) return;

  const phone = window.JF_DATA?.brand?.whatsapp || "919820154890";
  const message = encodeURIComponent(
    `Hello Jaiswal Furniture! I am interested in the ${currentProduct.name} (Finish: ${selectedFinish || "Natural"}). Price: ₹${currentProduct.price}. Could you share delivery timelines for Mumbai/India?`
  );

  waBtn.href = `https://wa.me/${phone}?text=${message}`;
}

function renderRelatedProducts(p) {
  const relatedContainer = document.getElementById("jf-related-products-grid");
  if (!relatedContainer || !window.JF_DATA) return;

  const related = window.JF_DATA.products
    .filter(item => item.id !== p.id && (item.category === p.category || item.woodType === p.woodType))
    .slice(0, 4);

  relatedContainer.innerHTML = related.map(rel => `
    <article class="jf-product-card">
      <div class="jf-product-media">
        <img src="${rel.image}" alt="${rel.name}" loading="lazy" class="jf-product-img">
        <span class="jf-badge jf-product-badge-float">${rel.badge || rel.woodType}</span>
        <button class="jf-product-quick-view" onclick="openQuickView('${rel.id}')">Quick Preview</button>
      </div>
      <div class="jf-product-body">
        <span class="jf-product-category">${rel.categoryLabel}</span>
        <h3 class="jf-product-title">
          <a href="product-detail.html?id=${rel.id}">${rel.name}</a>
        </h3>
        <span class="jf-product-wood">${rel.woodType}</span>
        <div class="jf-product-foot">
          <div class="jf-pricing-wrap">
            <span class="jf-price-current">${JF_Cart.formatINR(rel.price)}</span>
            <span class="jf-price-original">${JF_Cart.formatINR(rel.originalPrice)}</span>
          </div>
          <button class="jf-add-cart-btn" onclick="JF_Cart.addItem('${rel.id}', 1)" title="Add to Cart">
            +
          </button>
        </div>
      </div>
    </article>
  `).join("");
}
