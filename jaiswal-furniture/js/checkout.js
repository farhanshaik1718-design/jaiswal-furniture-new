/**
 * Jaiswal Furniture - Cart & Checkout Controller
 * Coupons, Multi-step checkout, UPI simulation & Printable Order Receipt
 */

document.addEventListener("DOMContentLoaded", () => {
  initCheckoutPage();
});

let appliedDiscount = 0; // percentage
let appliedCouponCode = "";

function initCheckoutPage() {
  renderFullCart();
  bindCouponForm();
  bindCheckoutSteps();
  bindPaymentMethods();
  bindOrderPlacement();

  // Listen for cart changes from drawer or elsewhere
  window.addEventListener("jf_cart_updated", () => {
    renderFullCart();
  });

  // Check if ?step=checkout was passed
  const params = new URLSearchParams(window.location.search);
  if (params.get("step") === "checkout") {
    setTimeout(() => {
      const addressStep = document.getElementById("jf-step-address");
      if (addressStep) addressStep.scrollIntoView({ behavior: "smooth" });
    }, 200);
  }
}

function renderFullCart() {
  const container = document.getElementById("jf-full-cart-items");
  const subtotalEl = document.getElementById("jf-cart-subtotal");
  const discountRow = document.getElementById("jf-cart-discount-row");
  const discountAmtEl = document.getElementById("jf-cart-discount-amt");
  const shippingEl = document.getElementById("jf-cart-shipping");
  const grandTotalEl = document.getElementById("jf-cart-grand-total");
  const cartLayout = document.getElementById("jf-cart-layout");
  const emptyState = document.getElementById("jf-cart-empty-state");

  if (!container || !window.JF_Cart) return;

  const items = window.JF_Cart.getItems();
  const subtotal = window.JF_Cart.getCartSubtotal();

  if (items.length === 0) {
    if (cartLayout) cartLayout.style.display = "none";
    if (emptyState) emptyState.style.display = "block";
    return;
  }

  if (cartLayout) cartLayout.style.display = "grid";
  if (emptyState) emptyState.style.display = "none";

  // Render Item List
  container.innerHTML = items.map((item, index) => `
    <div class="jf-checkout-item" style="display: flex; gap: 16px; padding: 18px 0; border-bottom: 1px solid var(--color-border); align-items: center;">
      <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: var(--radius-md);">
      <div style="flex-grow: 1;">
        <h4 style="font-size: 1.05rem; font-family: var(--font-serif); margin-bottom: 4px;">
          <a href="product-detail.html?id=${item.id}">${item.name}</a>
        </h4>
        <span style="font-size: 0.8rem; color: var(--color-text-muted); display: block;">
          Wood: ${item.woodType} • Finish: ${item.finish}
        </span>
        <span style="font-size: 0.875rem; font-weight: 700; color: var(--color-walnut-900); margin-top: 4px; display: inline-block;">
          ${JF_Cart.formatINR(item.price)} each
        </span>
      </div>
      <div class="jf-qty-control">
        <button class="jf-qty-btn" onclick="JF_Cart.updateQuantity(${index}, ${item.quantity - 1})">−</button>
        <span class="jf-qty-num">${item.quantity}</span>
        <button class="jf-qty-btn" onclick="JF_Cart.updateQuantity(${index}, ${item.quantity + 1})">+</button>
      </div>
      <div style="text-align: right; min-width: 100px;">
        <strong style="font-size: 1.1rem; color: var(--color-walnut-900); display: block;">
          ${JF_Cart.formatINR(item.price * item.quantity)}
        </strong>
        <button onclick="JF_Cart.removeItem(${index})" style="color: #e53e3e; font-size: 0.75rem; text-decoration: underline; margin-top: 4px;">
          Remove
        </button>
      </div>
    </div>
  `).join("");

  // Calculate pricing breakdown
  const discountVal = appliedDiscount > 0 ? Math.round(subtotal * (appliedDiscount / 100)) : 0;
  const isFreeShipping = subtotal >= window.JF_Cart.FREE_SHIPPING_THRESHOLD;
  const shippingVal = isFreeShipping ? 0 : 1500;
  const grandTotal = Math.max(0, subtotal - discountVal + shippingVal);

  if (subtotalEl) subtotalEl.textContent = JF_Cart.formatINR(subtotal);

  if (discountRow && discountAmtEl) {
    if (discountVal > 0) {
      discountRow.style.display = "flex";
      discountAmtEl.textContent = `- ${JF_Cart.formatINR(discountVal)} (${appliedDiscount}% OFF)`;
    } else {
      discountRow.style.display = "none";
    }
  }

  if (shippingEl) {
    shippingEl.innerHTML = isFreeShipping ? `<span style="color: #2e7d32; font-weight: 700;">FREE</span>` : JF_Cart.formatINR(shippingVal);
  }

  if (grandTotalEl) grandTotalEl.textContent = JF_Cart.formatINR(grandTotal);
}

function bindCouponForm() {
  const form = document.getElementById("jf-coupon-form");
  const input = document.getElementById("jf-coupon-input");

  if (!form || !input) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const code = input.value.trim().toUpperCase();

    if (code === "JAISWAL10") {
      appliedDiscount = 10;
      appliedCouponCode = code;
      JF_Cart.showToast("Coupon Applied! 🎉", "10% festive discount applied to your order.", "success");
      renderFullCart();
    } else if (code === "WELCOME5") {
      appliedDiscount = 5;
      appliedCouponCode = code;
      JF_Cart.showToast("Coupon Applied! 🎁", "5% welcome discount applied to your order.", "success");
      renderFullCart();
    } else {
      JF_Cart.showToast("Invalid Coupon", "Please check the code. Try 'JAISWAL10' for 10% off.", "error");
    }
  });
}

function bindCheckoutSteps() {
  // Navigation between steps
  const toPaymentBtn = document.getElementById("jf-goto-payment-btn");
  if (toPaymentBtn) {
    toPaymentBtn.addEventListener("click", () => {
      const name = document.getElementById("jf-ship-name")?.value.trim();
      const phone = document.getElementById("jf-ship-phone")?.value.trim();
      const address = document.getElementById("jf-ship-address")?.value.trim();

      if (!name || !phone || !address) {
        JF_Cart.showToast("Missing Details", "Please fill in recipient name, mobile number, and delivery address.", "error");
        return;
      }

      document.getElementById("jf-step-payment")?.scrollIntoView({ behavior: "smooth" });
      JF_Cart.showToast("Address Saved", "Select your preferred payment method below.", "info");
    });
  }
}

function bindPaymentMethods() {
  const options = document.querySelectorAll(".jf-payment-option");
  const upiBox = document.getElementById("jf-upi-box");

  options.forEach(opt => {
    opt.addEventListener("click", () => {
      options.forEach(o => o.classList.remove("is-selected"));
      opt.classList.add("is-selected");

      const radio = opt.querySelector("input[type='radio']");
      if (radio) radio.checked = true;

      const method = radio ? radio.value : "";
      if (upiBox) {
        upiBox.style.display = method === "upi" ? "block" : "none";
      }
    });
  });
}

function bindOrderPlacement() {
  const placeOrderBtn = document.getElementById("jf-place-order-btn");
  if (!placeOrderBtn) return;

  placeOrderBtn.addEventListener("click", () => {
    const items = window.JF_Cart.getItems();
    if (items.length === 0) {
      JF_Cart.showToast("Cart Empty", "Please add furniture to your cart first.", "error");
      return;
    }

    const name = document.getElementById("jf-ship-name")?.value.trim() || "Valued Customer";
    const phone = document.getElementById("jf-ship-phone")?.value.trim() || "+91 98765 43210";
    const address = document.getElementById("jf-ship-address")?.value.trim() || "Mumbai, Maharashtra";
    const selectedPayMethod = document.querySelector("input[name='jf_payment_method']:checked")?.value || "cod";

    const orderId = `JF-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const subtotal = window.JF_Cart.getCartSubtotal();
    const discountVal = appliedDiscount > 0 ? Math.round(subtotal * (appliedDiscount / 100)) : 0;
    const finalAmount = Math.max(0, subtotal - discountVal);

    // Render Order Invoice Confirmation Modal
    showOrderInvoiceModal({
      orderId,
      name,
      phone,
      address,
      method: selectedPayMethod.toUpperCase(),
      items: [...items],
      subtotal,
      discountVal,
      finalAmount
    });

    // Clear cart
    window.JF_Cart.clearCart();
  });
}

function showOrderInvoiceModal(order) {
  let modal = document.getElementById("jf-invoice-modal");
  if (!modal) {
    const modalHTML = `
      <div id="jf-invoice-modal" class="jf-invoice-modal" aria-hidden="true">
        <div class="jf-invoice-card" id="jf-invoice-card-content">
          <!-- Content populated dynamically -->
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHTML);
    modal = document.getElementById("jf-invoice-modal");
  }

  const content = document.getElementById("jf-invoice-card-content");
  content.innerHTML = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="font-size: 3.5rem; line-height: 1;">🎉</div>
      <h2 style="font-size: 1.8rem; font-family: var(--font-serif); color: var(--color-walnut-900); margin-top: 8px;">
        Order Placed Successfully!
      </h2>
      <p style="font-size: 0.9rem; color: var(--color-text-muted);">
        Order #${order.orderId} • An SMS confirmation has been sent to ${order.phone}
      </p>
    </div>

    <div style="background: var(--color-cream-100); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 18px; margin-bottom: 24px;">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; font-size: 0.85rem;">
        <div><strong>Customer Name:</strong> ${order.name}</div>
        <div><strong>Payment Method:</strong> ${order.method}</div>
        <div><strong>Delivery Address:</strong> ${order.address}</div>
        <div><strong>Estimated Delivery:</strong> 7–10 Business Days (White Glove)</div>
      </div>
    </div>

    <h4 style="font-size: 1rem; font-family: var(--font-serif); margin-bottom: 12px;">Purchased Items:</h4>
    <div style="border-top: 1px solid var(--color-border); margin-bottom: 20px;">
      ${order.items.map(item => `
        <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--color-border); font-size: 0.875rem;">
          <div>
            <strong>${item.name}</strong> × ${item.quantity}
            <span style="display: block; font-size: 0.75rem; color: var(--color-text-muted);">${item.woodType} (${item.finish})</span>
          </div>
          <strong>${JF_Cart.formatINR(item.price * item.quantity)}</strong>
        </div>
      `).join("")}
    </div>

    <div style="text-align: right; margin-bottom: 28px;">
      <div style="font-size: 1.25rem; font-weight: 700; color: var(--color-walnut-900);">
        Total Amount: ${JF_Cart.formatINR(order.finalAmount)}
      </div>
      <span style="font-size: 0.75rem; color: var(--color-text-muted); display: block;">Inclusive of 18% GST and Free Assembly</span>
    </div>

    <div style="display: flex; gap: 12px; justify-content: flex-end;">
      <button class="jf-btn jf-btn-outline" onclick="window.print()">
        🖨️ Print Invoice Receipt
      </button>
      <a href="index.html" class="jf-btn jf-btn-primary" onclick="document.getElementById('jf-invoice-modal').classList.remove('is-open');">
        Continue Shopping →
      </a>
    </div>
  `;

  modal.classList.add("is-open");
  document.body.style.overflow = "hidden";
}
