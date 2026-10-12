/**
 * Jaiswal Furniture - Shop Catalog Controller
 * Filtering, Search, Price Slider, Sorting & URL Params
 */

document.addEventListener("DOMContentLoaded", () => {
  initShop();
});

let currentFilters = {
  category: "all",
  wood: "all",
  maxPrice: 80000,
  sort: "featured",
  search: ""
};

function initShop() {
  // Parse URL search params (e.g. ?category=sofas)
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get("category");
  const searchParam = urlParams.get("q");

  if (catParam) currentFilters.category = catParam;
  if (searchParam) currentFilters.search = searchParam;

  bindFilterControls();
  renderProducts();
}

function bindFilterControls() {
  // Category radio/checkboxes
  document.querySelectorAll('input[name="jf_cat_filter"]').forEach(input => {
    if (input.value === currentFilters.category) input.checked = true;
    input.addEventListener("change", (e) => {
      currentFilters.category = e.target.value;
      renderProducts();
    });
  });

  // Wood Species filter
  document.querySelectorAll('input[name="jf_wood_filter"]').forEach(input => {
    input.addEventListener("change", (e) => {
      currentFilters.wood = e.target.value;
      renderProducts();
    });
  });

  // Price Slider
  const priceSlider = document.getElementById("jf-price-range");
  const priceDisplay = document.getElementById("jf-price-range-val");
  if (priceSlider && priceDisplay) {
    priceSlider.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10);
      currentFilters.maxPrice = val;
      priceDisplay.textContent = JF_Cart.formatINR(val);
      renderProducts();
    });
  }

  // Sort dropdown
  const sortSelect = document.getElementById("jf-sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentFilters.sort = e.target.value;
      renderProducts();
    });
  }

  // Reset Filters
  const resetBtn = document.getElementById("jf-reset-filters");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      resetAllFilters();
    });
  }

  // Mobile Filter Drawer
  const filterBtn = document.getElementById("jf-open-mobile-filter");
  const filterSidebar = document.querySelector(".jf-filter-sidebar");
  if (filterBtn && filterSidebar) {
    filterBtn.addEventListener("click", () => {
      filterSidebar.classList.toggle("is-open");
    });
  }
}

function resetAllFilters() {
  currentFilters = {
    category: "all",
    wood: "all",
    maxPrice: 80000,
    sort: "featured",
    search: ""
  };

  const allCat = document.querySelector('input[name="jf_cat_filter"][value="all"]');
  if (allCat) allCat.checked = true;

  const allWood = document.querySelector('input[name="jf_wood_filter"][value="all"]');
  if (allWood) allWood.checked = true;

  const priceSlider = document.getElementById("jf-price-range");
  const priceDisplay = document.getElementById("jf-price-range-val");
  if (priceSlider && priceDisplay) {
    priceSlider.value = 80000;
    priceDisplay.textContent = JF_Cart.formatINR(80000);
  }

  renderProducts();
}

function renderProducts() {
  const container = document.getElementById("jf-shop-products-grid");
  const countDisplay = document.getElementById("jf-shop-count");
  const chipsContainer = document.getElementById("jf-active-chips");

  if (!container || !window.JF_DATA) return;

  let items = [...window.JF_DATA.products];

  // Category filter
  if (currentFilters.category !== "all") {
    items = items.filter(p => p.category === currentFilters.category);
  }

  // Wood filter
  if (currentFilters.wood !== "all") {
    items = items.filter(p => p.woodType.toLowerCase().includes(currentFilters.wood.toLowerCase()));
  }

  // Price filter
  items = items.filter(p => p.price <= currentFilters.maxPrice);

  // Search keyword filter
  if (currentFilters.search) {
    const s = currentFilters.search.toLowerCase();
    items = items.filter(p =>
      p.name.toLowerCase().includes(s) ||
      p.categoryLabel.toLowerCase().includes(s) ||
      p.woodType.toLowerCase().includes(s)
    );
  }

  // Sorting
  if (currentFilters.sort === "price-low") {
    items.sort((a, b) => a.price - b.price);
  } else if (currentFilters.sort === "price-high") {
    items.sort((a, b) => b.price - a.price);
  } else if (currentFilters.sort === "rating") {
    items.sort((a, b) => b.rating - a.rating);
  }

  // Update counts
  if (countDisplay) {
    countDisplay.textContent = `${items.length} ${items.length === 1 ? 'Design' : 'Designs'} Found`;
  }

  // Render Active Filter Chips
  if (chipsContainer) {
    renderFilterChips(chipsContainer);
  }

  // Empty State
  if (items.length === 0) {
    container.innerHTML = `
      <div class="jf-shop-empty" style="grid-column: 1 / -1;">
        <div class="jf-shop-empty-icon">🪵</div>
        <h3>No matching handcrafted pieces found</h3>
        <p style="color: var(--color-text-muted); margin-top: 6px; margin-bottom: 20px;">
          Try adjusting your price range or clearing category filters.
        </p>
        <button class="jf-btn jf-btn-primary" onclick="resetAllFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  // Render Grid
  container.innerHTML = items.map(p => {
    const isWishlisted = window.JF_Cart ? window.JF_Cart.isInWishlist(p.id) : false;
    return `
      <article class="jf-product-card">
        <div class="jf-product-media">
          <img src="${p.image}" alt="${p.name}" loading="lazy" class="jf-product-img">
          <span class="jf-badge jf-product-badge-float">${p.badge || p.woodType}</span>
          <button class="jf-wishlist-toggle ${isWishlisted ? 'is-active' : ''}" 
                  onclick="handleWishlistClick(this, '${p.id}')" 
                  aria-label="Save to Wishlist" title="Save to Wishlist">
            ♥
          </button>
          <button class="jf-product-quick-view" onclick="openQuickView('${p.id}')">
            Quick Preview
          </button>
        </div>
        <div class="jf-product-body">
          <span class="jf-product-category">${p.categoryLabel}</span>
          <h3 class="jf-product-title">
            <a href="product-detail.html?id=${p.id}">${p.name}</a>
          </h3>
          <span class="jf-product-wood">${p.woodType} • ★ ${p.rating}</span>
          <div class="jf-product-foot">
            <div class="jf-pricing-wrap">
              <span class="jf-price-current">${JF_Cart.formatINR(p.price)}</span>
              <span class="jf-price-original">${JF_Cart.formatINR(p.originalPrice)}</span>
            </div>
            <button class="jf-add-cart-btn" onclick="JF_Cart.addItem('${p.id}', 1)" title="Add to Cart" aria-label="Add ${p.name} to Cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function renderFilterChips(container) {
  const chips = [];

  if (currentFilters.category !== "all") {
    chips.push({ label: `Category: ${currentFilters.category.toUpperCase()}`, key: "category" });
  }
  if (currentFilters.wood !== "all") {
    chips.push({ label: `Wood: ${currentFilters.wood}`, key: "wood" });
  }
  if (currentFilters.maxPrice < 80000) {
    chips.push({ label: `Under ${JF_Cart.formatINR(currentFilters.maxPrice)}`, key: "price" });
  }
  if (currentFilters.search) {
    chips.push({ label: `Keyword: "${currentFilters.search}"`, key: "search" });
  }

  if (chips.length === 0) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = `
    ${chips.map(chip => `
      <span class="jf-filter-chip">
        ${chip.label}
        <span class="jf-chip-remove" onclick="removeFilterChip('${chip.key}')">&times;</span>
      </span>
    `).join("")}
    <button class="jf-reset-filters-btn" onclick="resetAllFilters()">Clear All</button>
  `;
}

function removeFilterChip(key) {
  if (key === "category") {
    currentFilters.category = "all";
    const radio = document.querySelector('input[name="jf_cat_filter"][value="all"]');
    if (radio) radio.checked = true;
  } else if (key === "wood") {
    currentFilters.wood = "all";
    const radio = document.querySelector('input[name="jf_wood_filter"][value="all"]');
    if (radio) radio.checked = true;
  } else if (key === "price") {
    currentFilters.maxPrice = 80000;
    const priceSlider = document.getElementById("jf-price-range");
    const priceDisplay = document.getElementById("jf-price-range-val");
    if (priceSlider) priceSlider.value = 80000;
    if (priceDisplay) priceDisplay.textContent = JF_Cart.formatINR(80000);
  } else if (key === "search") {
    currentFilters.search = "";
  }
  renderProducts();
}

function handleWishlistClick(btn, productId) {
  if (!window.JF_Cart) return;
  const isAdded = window.JF_Cart.toggleWishlist(productId);
  btn.classList.toggle("is-active", isAdded);
}
