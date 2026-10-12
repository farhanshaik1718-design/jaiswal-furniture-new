/**
 * Jaiswal Furniture - Global Site Controller
 * Header scroll, Mobile Drawer, Search Modal, WhatsApp Widget & Quick View
 */

document.addEventListener("DOMContentLoaded", () => {
  initStickyHeader();
  initMobileNav();
  initSearchModal();
  initWhatsAppWidget();
  initNewsletterForms();
  initQuickViewModal();
  highlightActiveNavLink();
});

/* ----------------------------------------------------
   1. STICKY HEADER & SCROLL BEHAVIOR
---------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector(".jf-header");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 25) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

/* ----------------------------------------------------
   2. MOBILE NAVIGATION DRAWER
---------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector(".jf-mobile-toggle");
  const navDrawer = document.querySelector(".jf-mobile-nav");
  const overlay = document.querySelector(".jf-mobile-overlay");

  if (!toggleBtn || !navDrawer) return;

  const openMobileNav = () => {
    navDrawer.classList.add("is-active");
    if (overlay) overlay.classList.add("is-active");
    document.body.style.overflow = "hidden";
    toggleBtn.setAttribute("aria-expanded", "true");
  };

  const closeMobileNav = () => {
    navDrawer.classList.remove("is-active");
    if (overlay) overlay.classList.remove("is-active");
    document.body.style.overflow = "";
    toggleBtn.setAttribute("aria-expanded", "false");
  };

  toggleBtn.addEventListener("click", () => {
    if (navDrawer.classList.contains("is-active")) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  if (overlay) {
    overlay.addEventListener("click", closeMobileNav);
  }

  // Close when clicking mobile links
  navDrawer.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMobileNav);
  });
}

/* ----------------------------------------------------
   3. GLOBAL SEARCH MODAL WITH LIVE AUTOCOMPLETE
---------------------------------------------------- */
function initSearchModal() {
  // Inject search modal if not present
  if (!document.getElementById("jf-search-modal")) {
    const modalHTML = `
      <div id="jf-search-modal" class="jf-search-modal" aria-hidden="true" role="dialog">
        <div class="jf-search-backdrop"></div>
        <div class="jf-search-box">
          <div class="jf-search-header">
            <div class="jf-search-input-wrap">
              <svg class="jf-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" id="jf-global-search-input" placeholder="Search solid wood sofas, teak beds, dining sets..." autocomplete="off">
              <button id="jf-clear-search" class="jf-clear-btn" style="display:none;" aria-label="Clear search">&times;</button>
            </div>
            <button id="jf-close-search" class="jf-icon-btn" aria-label="Close search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <div class="jf-search-body">
            <div class="jf-search-popular">
              <span class="jf-popular-label">Popular Searches:</span>
              <button class="jf-search-chip" data-term="Teak Dining">Teak Dining</button>
              <button class="jf-search-chip" data-term="Curved Sofa">Curved Sofa</button>
              <button class="jf-search-chip" data-term="Hydraulic Bed">Hydraulic Bed</button>
              <button class="jf-search-chip" data-term="Sheesham">Sheesham</button>
              <button class="jf-search-chip" data-term="Cane Chair">Cane Chair</button>
            </div>

            <div id="jf-search-results" class="jf-search-results">
              <p class="jf-search-hint">Type above to instantly explore products in our catalog.</p>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHTML);
  }

  const modal = document.getElementById("jf-search-modal");
  const input = document.getElementById("jf-global-search-input");
  const resultsContainer = document.getElementById("jf-search-results");
  const clearBtn = document.getElementById("jf-clear-search");
  const closeBtn = document.getElementById("jf-close-search");
  const backdrop = modal.querySelector(".jf-search-backdrop");

  const openSearch = () => {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    setTimeout(() => input.focus(), 80);
  };

  const closeSearch = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    input.value = "";
    if (clearBtn) clearBtn.style.display = "none";
    resultsContainer.innerHTML = '<p class="jf-search-hint">Type above to instantly explore products in our catalog.</p>';
  };

  document.querySelectorAll(".js-open-search").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openSearch();
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeSearch);
  if (backdrop) backdrop.addEventListener("click", closeSearch);

  // Clear button
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      input.value = "";
      clearBtn.style.display = "none";
      input.focus();
      renderSearchResults("");
    });
  }

  // Live input handler
  if (input) {
    input.addEventListener("input", (e) => {
      const q = e.target.value.trim();
      clearBtn.style.display = q ? "block" : "none";
      renderSearchResults(q);
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeSearch();
    });
  }

  // Popular search chips
  modal.querySelectorAll(".jf-search-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const term = chip.getAttribute("data-term");
      input.value = term;
      clearBtn.style.display = "block";
      renderSearchResults(term);
    });
  });

  function renderSearchResults(query) {
    if (!query || query.length < 2) {
      resultsContainer.innerHTML = '<p class="jf-search-hint">Type at least 2 characters to search.</p>';
      return;
    }

    const term = query.toLowerCase();
    const products = window.JF_DATA ? window.JF_DATA.products : [];
    const matches = products.filter(p => 
      p.name.toLowerCase().includes(term) ||
      p.categoryLabel.toLowerCase().includes(term) ||
      p.woodType.toLowerCase().includes(term) ||
      p.shortDesc.toLowerCase().includes(term)
    );

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div class="jf-no-results">
          <p>No furniture found matching "<strong>${query}</strong>".</p>
          <p class="jf-no-results-sub">Looking for something specific? We build custom furniture to any blueprint!</p>
          <a href="custom-furniture.html" class="jf-btn jf-btn-sm jf-btn-outline" onclick="document.getElementById('jf-search-modal').classList.remove('is-open')">Request Custom Build</a>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = `
      <div class="jf-search-results-list">
        <span class="jf-results-count">Found ${matches.length} matching piece${matches.length === 1 ? '' : 's'}:</span>
        ${matches.map(p => `
          <a href="product-detail.html?id=${p.id}" class="jf-search-result-item" onclick="document.getElementById('jf-search-modal').classList.remove('is-open'); document.body.style.overflow='';">
            <img src="${p.image}" alt="${p.name}" class="jf-search-result-thumb">
            <div class="jf-search-result-info">
              <span class="jf-search-result-cat">${p.categoryLabel} • ${p.woodType}</span>
              <h4 class="jf-search-result-name">${p.name}</h4>
              <div class="jf-search-result-pricing">
                <span class="jf-price-current">${JF_Cart.formatINR(p.price)}</span>
                <span class="jf-price-original">${JF_Cart.formatINR(p.originalPrice)}</span>
              </div>
            </div>
            <div class="jf-search-result-arrow">→</div>
          </a>
        `).join("")}
      </div>
    `;
  }
}

/* ----------------------------------------------------
   4. FLOATING WHATSAPP CHAT POPUP WIDGET
---------------------------------------------------- */
function initWhatsAppWidget() {
  if (document.getElementById("jf-whatsapp-widget")) return;

  const phone = window.JF_DATA?.brand?.whatsapp || "919820154890";

  const widgetHTML = `
    <div id="jf-whatsapp-widget" class="jf-whatsapp-widget">
      <!-- Chat Bubble Dialog -->
      <div id="jf-wa-bubble" class="jf-wa-bubble">
        <div class="jf-wa-header">
          <div class="jf-wa-avatar">
            <span>🪵</span>
            <span class="jf-wa-status-dot" title="Online"></span>
          </div>
          <div class="jf-wa-title-wrap">
            <span class="jf-wa-name">Jaiswal Concierge</span>
            <span class="jf-wa-status">Typically replies in 5 mins</span>
          </div>
          <button id="jf-close-wa" class="jf-wa-close-btn">&times;</button>
        </div>

        <div class="jf-wa-body">
          <div class="jf-wa-msg">
            <p>Namaste! 🙏 Welcome to Jaiswal Furniture.</p>
            <p>How can our design master assist you today?</p>
            <span class="jf-wa-time">Just now</span>
          </div>

          <div class="jf-wa-quick-options">
            <button class="jf-wa-chip" data-msg="Hi, I want a custom furniture quote for my home.">
              📐 Custom Quote
            </button>
            <button class="jf-wa-chip" data-msg="Hi! Can I book a visit to your Lower Parel showroom?">
              🏛️ Visit Showroom
            </button>
            <button class="jf-wa-chip" data-msg="Hello! I need assistance choosing solid wood dining tables.">
              🪑 Dining Advice
            </button>
          </div>
        </div>

        <div class="jf-wa-footer">
          <a id="jf-wa-direct-link" href="https://wa.me/${phone}?text=Hello%20Jaiswal%20Furniture!%20I%20would%20like%20to%20enquire%20about%20your%20solid%20wood%20collections." target="_blank" rel="noopener noreferrer" class="jf-wa-send-btn">
            Chat on WhatsApp
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
          </a>
        </div>
      </div>

      <!-- Floating Trigger Button -->
      <button id="jf-wa-trigger" class="jf-wa-trigger" aria-label="Open WhatsApp live chat">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
        </svg>
        <span class="jf-wa-badge-pulse"></span>
      </button>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", widgetHTML);

  const bubble = document.getElementById("jf-wa-bubble");
  const trigger = document.getElementById("jf-wa-trigger");
  const closeBtn = document.getElementById("jf-close-wa");
  const directLink = document.getElementById("jf-wa-direct-link");

  trigger.addEventListener("click", () => {
    bubble.classList.toggle("is-active");
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      bubble.classList.remove("is-active");
    });
  }

  // Quick chips update link text and open WhatsApp
  bubble.querySelectorAll(".jf-wa-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const msg = encodeURIComponent(chip.getAttribute("data-msg"));
      window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
      bubble.classList.remove("is-active");
    });
  });
}

/* ----------------------------------------------------
   5. NEWSLETTER FORMS
---------------------------------------------------- */
function initNewsletterForms() {
  document.querySelectorAll(".js-newsletter-form").forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type='email']");
      if (!input || !input.value) return;

      const email = input.value.trim();
      if (!/\S+@\S+\.\S+/.test(email)) {
        if (window.JF_Cart) JF_Cart.showToast("Invalid Email", "Please enter a valid email address.", "error");
        return;
      }

      input.value = "";
      if (window.JF_Cart) {
        JF_Cart.showToast(
          "Welcome to the Family! 🎁",
          "You've unlocked 10% off. Use coupon code 'JAISWAL10' at checkout.",
          "success"
        );
      }
    });
  });
}

/* ----------------------------------------------------
   6. QUICK VIEW MODAL
---------------------------------------------------- */
function initQuickViewModal() {
  if (!document.getElementById("jf-quickview-modal")) {
    const qvHTML = `
      <div id="jf-quickview-modal" class="jf-modal" aria-hidden="true" role="dialog">
        <div class="jf-modal-backdrop"></div>
        <div class="jf-modal-card">
          <button id="jf-close-qv" class="jf-modal-close-btn" aria-label="Close modal">&times;</button>
          <div id="jf-qv-content" class="jf-qv-grid">
            <!-- Rendered dynamically -->
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", qvHTML);
  }

  const modal = document.getElementById("jf-quickview-modal");
  const closeBtn = document.getElementById("jf-close-qv");
  const backdrop = modal.querySelector(".jf-modal-backdrop");

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });
}

// Global function to trigger quick view
window.openQuickView = function(productId) {
  const product = window.JF_DATA?.products.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById("jf-quickview-modal");
  const content = document.getElementById("jf-qv-content");
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="jf-qv-media">
      <img src="${product.image}" alt="${product.name}" class="jf-qv-main-img" id="jf-qv-img">
    </div>
    <div class="jf-qv-details">
      <div class="jf-qv-badge-row">
        <span class="jf-badge">${product.badge || "Pure Solid Wood"}</span>
        <span class="jf-qv-rating">★ ${product.rating} (${product.reviewsCount} reviews)</span>
      </div>
      <h3 class="jf-qv-title">${product.name}</h3>
      <div class="jf-qv-pricing">
        <span class="jf-price-current">${JF_Cart.formatINR(product.price)}</span>
        <span class="jf-price-original">${JF_Cart.formatINR(product.originalPrice)}</span>
        <span class="jf-discount-badge">Save ${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%</span>
      </div>
      <p class="jf-qv-desc">${product.shortDesc}</p>

      <div class="jf-qv-finishes">
        <label class="jf-swatch-label">Available Finishes:</label>
        <div class="jf-swatch-group">
          ${product.finishes.map((f, i) => `
            <button class="jf-swatch-btn ${i === 0 ? 'is-selected' : ''}" style="background-color: ${f.hex}" title="${f.name}" data-finish="${f.name}"></button>
          `).join("")}
        </div>
      </div>

      <div class="jf-qv-actions">
        <button class="jf-btn jf-btn-primary" onclick="JF_Cart.addItem('${product.id}', 1); document.getElementById('jf-quickview-modal').classList.remove('is-open'); document.body.style.overflow='';">
          Add to Cart • ${JF_Cart.formatINR(product.price)}
        </button>
        <a href="product-detail.html?id=${product.id}" class="jf-btn jf-btn-outline">
          Full Specifications & Gallery →
        </a>
      </div>

      <div class="jf-qv-perks">
        <span>🪵 ${product.woodType}</span>
        <span>🚚 Free Assembly</span>
        <span>🛡️ 10-Yr Guarantee</span>
      </div>
    </div>
  `;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

/* ----------------------------------------------------
   7. ACTIVE NAVIGATION LINK HIGHLIGHTER
---------------------------------------------------- */
function highlightActiveNavLink() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".jf-nav-link, .jf-mobile-nav-link").forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;

    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("is-current");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("is-current");
      link.removeAttribute("aria-current");
    }
  });
}
