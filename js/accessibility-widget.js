(function () {
  if (window.__miamiAccessibilityMounted) return;
  window.__miamiAccessibilityMounted = true;

  // 1. Create and inject styles
  const styleEl = document.createElement("style");
  styleEl.textContent = `
    /* FAB Styling */
    .acc-fab {
      position: fixed;
      bottom: 6rem;
      left: 1.875rem;
      width: 3rem;
      height: 3rem;
      background-color: #1d70b8;
      color: #ffffff;
      border-radius: 9999px;
      border: 2px solid #ffffff;
      outline: 2px solid #1d70b8;
      box-shadow: 0 4px 12px rgba(29, 112, 184, 0.4);
      z-index: 9999;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
    }
    .acc-fab:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 16px rgba(29, 112, 184, 0.55);
    }
    .acc-fab .material-symbols-outlined {
      font-size: 1.75rem;
      font-variation-settings: 'wght' 600;
    }

    /* Backdrop Overlay */
    .acc-backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(2px);
      z-index: 100000;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }
    .acc-backdrop.is-open {
      opacity: 1;
      pointer-events: auto;
    }

    /* Drawer Styling */
    .acc-drawer {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      max-width: 350px;
      background-color: #ffffff;
      box-shadow: 5px 0 25px rgba(0, 0, 0, 0.15);
      z-index: 100001;
      display: flex;
      flex-direction: column;
      transform: translateX(-100%);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      direction: rtl;
    }
    .acc-drawer.is-open {
      transform: translateX(0);
    }

    /* Drawer Header */
    .acc-header {
      background-color: #1d70b8;
      color: #ffffff;
      padding: 1rem 1.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .acc-title {
      font-family: Assistant, sans-serif;
      font-size: 1.35rem;
      font-weight: 700;
      margin: 0;
    }
    .acc-close-btn {
      background: none;
      border: none;
      color: #ffffff;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 9999px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s ease;
    }
    .acc-close-btn:hover {
      background-color: rgba(255, 255, 255, 0.15);
    }
    .acc-close-btn .material-symbols-outlined {
      font-size: 1.5rem;
    }

    /* Drawer Body */
    .acc-body {
      flex: 1;
      overflow-y: auto;
      background-color: #ffffff;
    }
    
    /* Menu Row */
    .acc-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.95rem 1.25rem;
      border-bottom: 1px solid #f0eee9;
      transition: background-color 0.2s ease;
    }
    .acc-row:hover {
      background-color: #fbfbf9;
    }
    .acc-row-info {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      color: #1b1c19;
    }
    .acc-row-icon {
      color: #43474d;
      font-size: 1.35rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .acc-row-label {
      font-family: Assistant, sans-serif;
      font-size: 1.05rem;
      font-weight: 600;
    }

    /* Toggle Switch Styling */
    .acc-switch {
      position: relative;
      display: inline-block;
      width: 46px;
      height: 24px;
      margin: 0;
    }
    .acc-switch input {
      opacity: 0;
      width: 0;
      height: 0;
      position: absolute;
    }
    .acc-slider {
      position: absolute;
      cursor: pointer;
      inset: 0;
      background-color: #d1d5db;
      transition: background-color 0.2s ease;
      border-radius: 9999px;
    }
    .acc-slider:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: #ffffff;
      transition: transform 0.2s ease;
      border-radius: 9999px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.15);
    }
    .acc-switch input:checked + .acc-slider {
      background-color: #1d70b8;
    }
    .acc-switch input:checked + .acc-slider:before {
      transform: translateX(22px);
    }

    /* Drawer Footer */
    .acc-footer {
      padding: 1.25rem;
      background-color: #fbf9f4;
      border-top: 1px solid #e5dec9;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .acc-reset-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #d1cbbd;
      border-radius: 0.5rem;
      background-color: #ffffff;
      color: #1b1c19;
      font-family: Assistant, sans-serif;
      font-size: 0.95rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .acc-reset-btn:hover {
      background-color: #f0eee9;
      border-color: #e6af2e;
    }
    .acc-reset-btn .material-symbols-outlined {
      font-size: 1.15rem;
    }
    .acc-statement-link {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      color: #1d70b8;
      font-family: Assistant, sans-serif;
      font-size: 0.9rem;
      font-weight: 700;
      text-decoration: none;
      transition: color 0.2s ease;
    }
    .acc-statement-link:hover {
      color: #0b1d33;
      text-decoration: underline;
    }

    /* ==========================================
       Accessibility Feature Target Classes
       ========================================== */
    
    /* Keyboard Navigation Focus Indicator */
    body.acc-active-keyboard-nav *:focus {
      outline: 3px solid #ffbf47 !important;
      outline-offset: 2px !important;
      box-shadow: 0 0 0 4px #000000 !important;
    }

    /* Disable Animations & Transitions */
    body.acc-active-no-animations *,
    body.acc-active-no-animations *::before,
    body.acc-active-no-animations *::after {
      animation-duration: 0s !important;
      animation-delay: 0s !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0s !important;
      transition-delay: 0s !important;
      scroll-behavior: auto !important;
    }

    /* High Contrast Mode */
    body.acc-active-high-contrast {
      background-color: #000000 !important;
      background-image: none !important;
      color: #ffffff !important;
    }
    body.acc-active-high-contrast *:not(.acc-widget, .acc-widget *) {
      background-color: #000000 !important;
      color: #ffffff !important;
      border-color: #ffffff !important;
      box-shadow: none !important;
      text-shadow: none !important;
    }
    body.acc-active-high-contrast a:not(.acc-widget a) {
      color: #ffff00 !important;
      text-decoration: underline !important;
    }
    body.acc-active-high-contrast a:not(.acc-widget a):hover {
      color: #ffcc00 !important;
    }
    body.acc-active-high-contrast button:not(.acc-widget button),
    body.acc-active-high-contrast input:not(.acc-widget input),
    body.acc-active-high-contrast select:not(.acc-widget select),
    body.acc-active-high-contrast textarea:not(.acc-widget textarea) {
      background-color: #000000 !important;
      color: #ffffff !important;
      border: 2px solid #ffffff !important;
    }

    /* Font Scale (applied to HTML/root for rem scaling) */
    html.acc-scale-large {
      font-size: 118% !important;
    }
    html.acc-scale-small {
      font-size: 85% !important;
    }

    /* Readable Font */
    body.acc-active-readable-font *:not(.material-symbols-outlined, .fa, .fab, .fas, .acc-widget *) {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Assistant', sans-serif !important;
      font-weight: 500 !important;
    }

    /* Highlight Headings */
    body.acc-active-headings h1,
    body.acc-active-headings h2,
    body.acc-active-headings h3,
    body.acc-active-headings h4,
    body.acc-active-headings h5,
    body.acc-active-headings h6 {
      outline: 2px dashed #1d70b8 !important;
      outline-offset: 3px !important;
      background-color: rgba(29, 112, 184, 0.08) !important;
    }

    /* Highlight Links & Interactive elements */
    body.acc-active-links a:not(.acc-widget a),
    body.acc-active-links button:not(.acc-widget button) {
      outline: 2px dashed #25d366 !important;
      outline-offset: 3px !important;
      background-color: rgba(37, 211, 102, 0.08) !important;
      text-decoration: underline !important;
    }
  `;
  document.head.appendChild(styleEl);

  // 2. Create and inject Widget Elements
  const container = document.createElement("div");
  container.className = "acc-widget";
  container.innerHTML = `
    <!-- Floating Accessibility Button -->
    <button class="acc-fab" id="accFab" aria-label="תפריט נגישות" aria-expanded="false" aria-haspopup="true">
      <span class="material-symbols-outlined">accessibility_new</span>
    </button>

    <!-- Backdrop Overlay -->
    <div class="acc-backdrop" id="accBackdrop"></div>

    <!-- Accessibility Settings Drawer -->
    <div class="acc-drawer" id="accDrawer" aria-modal="true" role="dialog" aria-label="תפריט נגישות">
      <!-- Drawer Header -->
      <div class="acc-header">
        <h3 class="acc-title">תפריט נגישות</h3>
        <button class="acc-close-btn" id="accCloseBtn" aria-label="סגור תפריט נגישות">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <!-- Drawer Body (Toggles List) -->
      <div class="acc-body">
        
        <!-- ניווט מקלדת -->
        <div class="acc-row">
          <label class="acc-switch">
            <input type="checkbox" id="acc-toggle-keyboard">
            <span class="acc-slider"></span>
          </label>
          <div class="acc-row-info">
            <span class="material-symbols-outlined acc-row-icon">keyboard</span>
            <span class="acc-row-label">ניווט מקלדת</span>
          </div>
        </div>

        <!-- ביטול אנימציות / הבהובים -->
        <div class="acc-row">
          <label class="acc-switch">
            <input type="checkbox" id="acc-toggle-animations">
            <span class="acc-slider"></span>
          </label>
          <div class="acc-row-info">
            <span class="material-symbols-outlined acc-row-icon">motion_photos_off</span>
            <span class="acc-row-label">ביטול אנימציות / הבהובים</span>
          </div>
        </div>

        <!-- ניגודיות גבוהה (Contrast) -->
        <div class="acc-row">
          <label class="acc-switch">
            <input type="checkbox" id="acc-toggle-contrast">
            <span class="acc-slider"></span>
          </label>
          <div class="acc-row-info">
            <span class="material-symbols-outlined acc-row-icon">dark_mode</span>
            <span class="acc-row-label">Contrast</span>
          </div>
        </div>

        <!-- הגדלת טקסט -->
        <div class="acc-row">
          <label class="acc-switch">
            <input type="checkbox" id="acc-toggle-text-large">
            <span class="acc-slider"></span>
          </label>
          <div class="acc-row-info">
            <span class="material-symbols-outlined acc-row-icon">text_increase</span>
            <span class="acc-row-label">הגדלת טקסט</span>
          </div>
        </div>

        <!-- הקטנת טקסט -->
        <div class="acc-row">
          <label class="acc-switch">
            <input type="checkbox" id="acc-toggle-text-small">
            <span class="acc-slider"></span>
          </label>
          <div class="acc-row-info">
            <span class="material-symbols-outlined acc-row-icon">text_decrease</span>
            <span class="acc-row-label">הקטנת טקסט</span>
          </div>
        </div>

        <!-- גופן קריא -->
        <div class="acc-row">
          <label class="acc-switch">
            <input type="checkbox" id="acc-toggle-readable-font">
            <span class="acc-slider"></span>
          </label>
          <div class="acc-row-info">
            <span class="material-symbols-outlined acc-row-icon">text_fields</span>
            <span class="acc-row-label">גופן קריא</span>
          </div>
        </div>

        <!-- סימון כותרות -->
        <div class="acc-row">
          <label class="acc-switch">
            <input type="checkbox" id="acc-toggle-headings">
            <span class="acc-slider"></span>
          </label>
          <div class="acc-row-info">
            <span class="material-symbols-outlined acc-row-icon">title</span>
            <span class="acc-row-label">סימון כותרות</span>
          </div>
        </div>

        <!-- סימון קישורים ולחצנים -->
        <div class="acc-row">
          <label class="acc-switch">
            <input type="checkbox" id="acc-toggle-links">
            <span class="acc-slider"></span>
          </label>
          <div class="acc-row-info">
            <span class="material-symbols-outlined acc-row-icon">link</span>
            <span class="acc-row-label">סימון קישורים ולחצנים</span>
          </div>
        </div>

      </div>

      <!-- Drawer Footer -->
      <div class="acc-footer">
        <button class="acc-reset-btn" id="accResetBtn">
          <span>איפוס הגדרות</span>
          <span class="material-symbols-outlined">restart_alt</span>
        </button>
        <a href="accessibility.html" class="acc-statement-link">
          <span>הצהרת נגישות</span>
          <span class="material-symbols-outlined">description</span>
        </a>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  // 3. UI Interactions & DOM Elements
  const fab = document.getElementById("accFab");
  const backdrop = document.getElementById("accBackdrop");
  const drawer = document.getElementById("accDrawer");
  const closeBtn = document.getElementById("accCloseBtn");
  const resetBtn = document.getElementById("accResetBtn");

  // Toggle Accessibility Drawer
  function toggleDrawer(isOpen) {
    if (isOpen) {
      drawer.classList.add("is-open");
      backdrop.classList.add("is-open");
      fab.setAttribute("aria-expanded", "true");
      // Focus first checkbox for keyboard accessibility
      document.getElementById("acc-toggle-keyboard").focus();
    } else {
      drawer.classList.remove("is-open");
      backdrop.classList.remove("is-open");
      fab.setAttribute("aria-expanded", "false");
    }
  }

  fab.addEventListener("click", () => toggleDrawer(true));
  closeBtn.addEventListener("click", () => toggleDrawer(false));
  backdrop.addEventListener("click", () => toggleDrawer(false));
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) {
      toggleDrawer(false);
      fab.focus();
    }
  });

  // 4. Accessibility Settings State Management
  const toggles = {
    keyboard: {
      el: document.getElementById("acc-toggle-keyboard"),
      class: "acc-active-keyboard-nav",
      key: "acc-setting-keyboard"
    },
    animations: {
      el: document.getElementById("acc-toggle-animations"),
      class: "acc-active-no-animations",
      key: "acc-setting-animations"
    },
    contrast: {
      el: document.getElementById("acc-toggle-contrast"),
      class: "acc-active-high-contrast",
      key: "acc-setting-contrast"
    },
    readableFont: {
      el: document.getElementById("acc-toggle-readable-font"),
      class: "acc-active-readable-font",
      key: "acc-setting-readableFont"
    },
    headings: {
      el: document.getElementById("acc-toggle-headings"),
      class: "acc-active-headings",
      key: "acc-setting-headings"
    },
    links: {
      el: document.getElementById("acc-toggle-links"),
      class: "acc-active-links",
      key: "acc-setting-links"
    }
  };

  const textScaleToggles = {
    large: document.getElementById("acc-toggle-text-large"),
    small: document.getElementById("acc-toggle-text-small")
  };
  const TEXT_SCALE_KEY = "acc-setting-text-scale"; // values: 'large', 'small', 'normal'

  // Apply settings from LocalStorage on page load
  function initSettings() {
    // 1. Standard toggles
    Object.keys(toggles).forEach(key => {
      const toggle = toggles[key];
      const isEnabled = localStorage.getItem(toggle.key) === "true";
      toggle.el.checked = isEnabled;
      if (isEnabled) {
        document.body.classList.add(toggle.class);
      }
    });

    // 2. Text scale toggles
    const savedScale = localStorage.getItem(TEXT_SCALE_KEY);
    if (savedScale === "large") {
      textScaleToggles.large.checked = true;
      document.documentElement.classList.add("acc-scale-large");
    } else if (savedScale === "small") {
      textScaleToggles.small.checked = true;
      document.documentElement.classList.add("acc-scale-small");
    }
  }

  // Handle standard toggle changes
  Object.keys(toggles).forEach(key => {
    const toggle = toggles[key];
    toggle.el.addEventListener("change", (e) => {
      const isChecked = e.target.checked;
      localStorage.setItem(toggle.key, isChecked);
      if (isChecked) {
        document.body.classList.add(toggle.class);
      } else {
        document.body.classList.remove(toggle.class);
      }
    });
  });

  // Handle text scaling changes
  textScaleToggles.large.addEventListener("change", (e) => {
    if (e.target.checked) {
      textScaleToggles.small.checked = false;
      document.documentElement.classList.remove("acc-scale-small");
      document.documentElement.classList.add("acc-scale-large");
      localStorage.setItem(TEXT_SCALE_KEY, "large");
    } else {
      document.documentElement.classList.remove("acc-scale-large");
      localStorage.setItem(TEXT_SCALE_KEY, "normal");
    }
  });

  textScaleToggles.small.addEventListener("change", (e) => {
    if (e.target.checked) {
      textScaleToggles.large.checked = false;
      document.documentElement.classList.remove("acc-scale-large");
      document.documentElement.classList.add("acc-scale-small");
      localStorage.setItem(TEXT_SCALE_KEY, "small");
    } else {
      document.documentElement.classList.remove("acc-scale-small");
      localStorage.setItem(TEXT_SCALE_KEY, "normal");
    }
  });

  // Reset settings function
  function resetAllSettings() {
    // Reset standard toggles
    Object.keys(toggles).forEach(key => {
      const toggle = toggles[key];
      toggle.el.checked = false;
      document.body.classList.remove(toggle.class);
      localStorage.setItem(toggle.key, "false");
    });

    // Reset text scale toggles
    textScaleToggles.large.checked = false;
    textScaleToggles.small.checked = false;
    document.documentElement.classList.remove("acc-scale-large", "acc-scale-small");
    localStorage.setItem(TEXT_SCALE_KEY, "normal");
  }

  resetBtn.addEventListener("click", resetAllSettings);

  // Initialize
  initSettings();
})();
