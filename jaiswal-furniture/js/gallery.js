/**
 * Jaiswal Furniture - Gallery & Lightbox Controller
 * Masonry filtering, Fullscreen lightbox with keyboard navigation
 */

document.addEventListener("DOMContentLoaded", () => {
  initGallery();
});

let currentGalleryFilter = "all";
let currentLightboxIndex = 0;
let filteredItems = [];

function initGallery() {
  const container = document.getElementById("jf-masonry-gallery");
  if (!container || !window.JF_DATA) return;

  filteredItems = [...window.JF_DATA.galleryItems];
  renderGalleryGrid();
  bindFilterTabs();
  initLightbox();
}

function bindFilterTabs() {
  document.querySelectorAll(".jf-gallery-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".jf-gallery-tab-btn").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const filter = btn.getAttribute("data-filter");
      currentGalleryFilter = filter;

      if (filter === "all") {
        filteredItems = [...window.JF_DATA.galleryItems];
      } else {
        filteredItems = window.JF_DATA.galleryItems.filter(item => item.category === filter);
      }

      renderGalleryGrid();
    });
  });
}

function renderGalleryGrid() {
  const container = document.getElementById("jf-masonry-gallery");
  if (!container) return;

  container.innerHTML = filteredItems.map((item, index) => `
    <div class="jf-gallery-card" onclick="openLightbox(${index})">
      <img src="${item.image}" alt="${item.title}" loading="lazy" class="jf-gallery-card-img">
      <div class="jf-gallery-overlay">
        <span class="jf-gallery-location">${item.location} • ${item.wood}</span>
        <h3 class="jf-gallery-card-title">${item.title}</h3>
      </div>
    </div>
  `).join("");
}

function initLightbox() {
  if (document.getElementById("jf-lightbox-modal")) return;

  const lbHTML = `
    <div id="jf-lightbox-modal" class="jf-lightbox-modal" aria-hidden="true" role="dialog">
      <div class="jf-lightbox-content">
        <button id="jf-close-lightbox" class="jf-lightbox-close" aria-label="Close lightbox">&times;</button>
        <button id="jf-prev-lightbox" class="jf-lightbox-nav jf-lightbox-prev" aria-label="Previous image">&#10094;</button>
        <button id="jf-next-lightbox" class="jf-lightbox-nav jf-lightbox-next" aria-label="Next image">&#10095;</button>

        <img id="jf-lightbox-img" src="" alt="" class="jf-lightbox-img">
        <div class="jf-lightbox-caption">
          <h3 id="jf-lightbox-title" class="jf-lightbox-title"></h3>
          <p id="jf-lightbox-desc" class="jf-lightbox-desc"></p>
          <div style="margin-top: 14px;">
            <a id="jf-lightbox-cta" href="custom-furniture.html" class="jf-btn jf-btn-sm jf-btn-gold">
              Commission Similar Bespoke Piece →
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", lbHTML);

  const modal = document.getElementById("jf-lightbox-modal");
  const closeBtn = document.getElementById("jf-close-lightbox");
  const prevBtn = document.getElementById("jf-prev-lightbox");
  const nextBtn = document.getElementById("jf-next-lightbox");

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  if (prevBtn) prevBtn.addEventListener("click", () => navigateLightbox(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => navigateLightbox(1));

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("is-open")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") navigateLightbox(-1);
    if (e.key === "ArrowRight") navigateLightbox(1);
  });
}

window.openLightbox = function(index) {
  currentLightboxIndex = index;
  updateLightboxContent();

  const modal = document.getElementById("jf-lightbox-modal");
  if (modal) {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
};

function navigateLightbox(direction) {
  currentLightboxIndex = (currentLightboxIndex + direction + filteredItems.length) % filteredItems.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const item = filteredItems[currentLightboxIndex];
  if (!item) return;

  const img = document.getElementById("jf-lightbox-img");
  const title = document.getElementById("jf-lightbox-title");
  const desc = document.getElementById("jf-lightbox-desc");

  if (img) {
    img.src = item.image;
    img.alt = item.title;
  }
  if (title) title.textContent = `${item.title} (${item.location})`;
  if (desc) desc.textContent = `${item.description} Handcrafted in ${item.wood}.`;
}
