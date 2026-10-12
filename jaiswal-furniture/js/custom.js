/**
 * Jaiswal Furniture - Custom Furniture & Cost Estimator Controller
 * Live quote calculation, Drag-and-drop image preview & WhatsApp inquiry
 */

document.addEventListener("DOMContentLoaded", () => {
  initCustomEstimator();
  initFileUpload();
  initCustomFormSubmission();
});

function initCustomEstimator() {
  const typeSelect = document.getElementById("jf-custom-type");
  const woodSelect = document.getElementById("jf-custom-wood");
  const finishSelect = document.getElementById("jf-custom-finish");
  const lengthInput = document.getElementById("jf-custom-len");
  const widthInput = document.getElementById("jf-custom-wid");
  const heightInput = document.getElementById("jf-custom-hgt");

  const estimateDisplay = document.getElementById("jf-custom-estimate-val");

  const basePrices = {
    wardrobe: 45000,
    dining: 38000,
    bed: 36000,
    sofa: 42000,
    temple: 28000,
    wallunit: 32000,
    desk: 22000
  };

  const woodMultipliers = {
    sheesham: 1.0,
    teak: 1.35,
    walnut: 1.5,
    oak: 1.4
  };

  const finishAddons = {
    matt: 0,
    pu_gloss: 4000,
    brass_inlay: 7500,
    organic_oil: 2500
  };

  function calculateEstimate() {
    if (!typeSelect || !estimateDisplay) return;

    const type = typeSelect.value || "wardrobe";
    const wood = woodSelect ? woodSelect.value : "sheesham";
    const finish = finishSelect ? finishSelect.value : "matt";

    const base = basePrices[type] || 40000;
    const woodMultiplier = woodMultipliers[wood] || 1.0;
    const finishCost = finishAddons[finish] || 0;

    // Optional size scaling
    const len = parseFloat(lengthInput?.value) || 6;
    const sizeFactor = Math.max(0.8, len / 5);

    const rawEstimate = Math.round((base * woodMultiplier * sizeFactor) + finishCost);
    const low = Math.round(rawEstimate * 0.95);
    const high = Math.round(rawEstimate * 1.15);

    estimateDisplay.textContent = `${JF_Cart.formatINR(low)} – ${JF_Cart.formatINR(high)}`;
  }

  // Bind change events
  [typeSelect, woodSelect, finishSelect, lengthInput, widthInput, heightInput].forEach(el => {
    if (el) el.addEventListener("input", calculateEstimate);
  });

  calculateEstimate();
}

function initFileUpload() {
  const dropZone = document.getElementById("jf-upload-zone");
  const fileInput = document.getElementById("jf-file-input");
  const previewContainer = document.getElementById("jf-upload-preview-wrap");

  if (!dropZone || !fileInput) return;

  dropZone.addEventListener("click", () => fileInput.click());

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("is-dragover");
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("is-dragover");
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("is-dragover");
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  });

  function handleFile(file) {
    if (!file.type.startsWith("image/")) {
      if (window.JF_Cart) JF_Cart.showToast("File Error", "Please upload a valid image file (JPG, PNG).", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (previewContainer) {
        previewContainer.innerHTML = `
          <div class="jf-upload-preview">
            <img src="${e.target.result}" alt="Sketch preview" class="jf-preview-thumb">
            <div style="flex-grow: 1; text-align: left;">
              <strong style="font-size: 0.85rem; display:block;">${file.name}</strong>
              <span style="font-size: 0.75rem; color: var(--color-text-muted);">${(file.size / 1024).toFixed(1)} KB</span>
            </div>
            <button type="button" class="jf-clear-btn" style="color: #e53e3e;" onclick="document.getElementById('jf-upload-preview-wrap').innerHTML=''; document.getElementById('jf-file-input').value='';" title="Remove file">&times;</button>
          </div>
        `;
      }
    };
    reader.readAsDataURL(file);
  }
}

function initCustomFormSubmission() {
  const form = document.getElementById("jf-custom-enquiry-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("jf-custom-name")?.value.trim();
    const phone = document.getElementById("jf-custom-phone")?.value.trim();
    const type = document.getElementById("jf-custom-type")?.value;
    const wood = document.getElementById("jf-custom-wood")?.value;
    const estimate = document.getElementById("jf-custom-estimate-val")?.textContent;

    if (!name || !phone) {
      if (window.JF_Cart) JF_Cart.showToast("Required Fields", "Please enter your name and phone number.", "error");
      return;
    }

    // Success feedback
    if (window.JF_Cart) {
      JF_Cart.showToast(
        "Bespoke Enquiry Received! 📐",
        `Thank you ${name}. Our master craftsman will call you at ${phone} within 2 business hours.`,
        "success"
      );
    }

    // Also trigger direct WhatsApp option
    const brandPhone = window.JF_DATA?.brand?.whatsapp || "919820154890";
    const waMsg = encodeURIComponent(
      `Hello Jaiswal Furniture! I submitted a bespoke furniture enquiry on your website.\nName: ${name}\nPhone: ${phone}\nType: ${type}\nWood: ${wood}\nEstimated Ballpark: ${estimate}\nLooking forward to discussing 3D designs.`
    );

    const waBtn = document.getElementById("jf-custom-direct-wa");
    if (waBtn) {
      waBtn.href = `https://wa.me/${brandPhone}?text=${waMsg}`;
      waBtn.style.display = "inline-flex";
    }

    form.reset();
    document.getElementById("jf-upload-preview-wrap").innerHTML = "";
  });
}
