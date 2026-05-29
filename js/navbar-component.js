(function () {
  if (window.__miamiNavbarMounted) return;
  window.__miamiNavbarMounted = true;

  const navbarMarkup = `
<header class="site-header">
  <div class="header-inner">
    <button id="mobile-menu-trigger" class="nav-toggle" aria-label="פתח תפריט" aria-expanded="false" type="button">
      <span class="material-symbols-outlined text-4xl">menu</span>
    </button>

    <a href="index.html" class="block hover:opacity-80 transition-opacity" aria-label="לוגו מלון מיאמי אשדוד">
      <img alt="Miami Hotel Ashdod Logo" class="h-12 w-auto object-contain"
           src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfln3QJRSEBXnYt6NuUoTj2Mh65AoHHSnkNuaP2pzC9qCJ7hqEDCINqVupupRQRa1UnU4IJ59SNMW7c-7FgxoJtcNG3wGvk-i3NvyNrnyV08LbLCrkBmS72-zulopyR40Fz-9ivXeJTVNHNx5tRfT1pFZbyyD2cdcHlPRU62MOel740wAwOJaiwSzInyoQ4mFrE5SW-BP2e5S4h522_djjniERn5Jqd-uH_Lvhu1W-pbSQhAWb6BM6-d7LBW7AMpjNu3NKKqsIHy_R"/>
    </a>

    <nav class="nav-desktop" aria-label="תפריט ראשי">
      <a href="contact.html">צור קשר</a>
      <a href="about.html">אודות</a>
      <a href="gallery.html">גלריה</a>
      <a href="events.html">כנסים ואירועים</a>
      <a href="shabbat.html">שבת חתן</a>
      <a href="rooms.html">חדרים</a>
    </nav>

    <a href="contact.html" class="header-cta">הזמינו עכשיו</a>
  </div>
</header>

<div class="announcement-bar">
  <p id="shabbat-announcement">כשרות הרב מחפוד | זמני כניסת שבת: טוען... | זמני יציאת שבת: טוען...</p>
</div>

<div id="mobile-menu-overlay" class="mobile-nav-overlay"></div>
<aside id="mobile-nav-drawer" class="mobile-nav-drawer" dir="rtl" aria-hidden="true">
  <div class="mobile-nav-drawer__head">
    <button id="mobile-menu-close" class="mobile-nav-drawer__close" aria-label="סגור תפריט" type="button">
      <span class="material-symbols-outlined text-3xl">close</span>
    </button>
    <a href="index.html">
      <img alt="Miami Hotel Ashdod Logo" class="h-12 w-auto object-contain"
           src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfln3QJRSEBXnYt6NuUoTj2Mh65AoHHSnkNuaP2pzC9qCJ7hqEDCINqVupupRQRa1UnU4IJ59SNMW7c-7FgxoJtcNG3wGvk-i3NvyNrnyV08LbLCrkBmS72-zulopyR40Fz-9ivXeJTVNHNx5tRfT1pFZbyyD2cdcHlPRU62MOel740wAwOJaiwSzInyoQ4mFrE5SW-BP2e5S4h522_djjniERn5Jqd-uH_Lvhu1W-pbSQhAWb6BM6-d7LBW7AMpjNu3NKKqsIHy_R"/>
    </a>
  </div>

  <nav class="mobile-nav-drawer__links" aria-label="תפריט מובייל">
    <a href="rooms.html">חדרים</a>
    <a href="shabbat.html">שבת חתן</a>
    <a href="events.html">כנסים ואירועים</a>
    <a href="gallery.html">גלריה</a>
    <a href="about.html">אודות</a>
    <a href="contact.html">צור קשר</a>
    <a href="contact.html" class="mobile-nav-drawer__cta">הזמינו עכשיו</a>
  </nav>
</aside>
`;

  const root = document.getElementById("site-navbar");
  if (!root) return;
  root.outerHTML = navbarMarkup;

  const page = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  const navLinks = document.querySelectorAll(".nav-desktop a, .mobile-nav-drawer__links a:not(.mobile-nav-drawer__cta)");
  navLinks.forEach((link) => {
    const href = (link.getAttribute("href") || "").toLowerCase();
    if (href === page) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });

  const trigger = document.getElementById("mobile-menu-trigger");
  const closeBtn = document.getElementById("mobile-menu-close");
  const drawer = document.getElementById("mobile-nav-drawer");
  const overlay = document.getElementById("mobile-menu-overlay");

  if (!trigger || !drawer || !overlay) return;

  function setOpen(isOpen) {
    drawer.classList.toggle("is-open", isOpen);
    overlay.classList.toggle("is-open", isOpen);
    drawer.setAttribute("aria-hidden", isOpen ? "false" : "true");
    document.body.style.overflow = isOpen ? "hidden" : "";
    trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }

  trigger.addEventListener("click", () => setOpen(true));
  if (closeBtn) closeBtn.addEventListener("click", () => setOpen(false));
  overlay.addEventListener("click", () => setOpen(false));

  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  // עדכון דינמי של זמני שבת מאתר Hebcal
  async function updateShabbatTimes() {
    const announcementEl = document.getElementById("shabbat-announcement");
    if (!announcementEl) return;

    try {
      const cached = localStorage.getItem("miami_shabbat_times_v2");
      const cachedTime = localStorage.getItem("miami_shabbat_cached_at_v2");
      const now = new Date();
      
      // שימוש בנתונים שמורים אם נשמרו ב-24 השעות האחרונות
      if (cached && cachedTime && (now - new Date(cachedTime) < 24 * 60 * 60 * 1000)) {
        const data = JSON.parse(cached);
        if (renderShabbatTimes(data)) return;
      }

      // קריאה ל-API של Hebcal עבור אשדוד (geonameid 295629) - שימוש בזמן ברירת המחדל המקומי של ישראל (40 דקות)
      const response = await fetch("https://www.hebcal.com/shabbat?cfg=json&geonameid=295629");
      if (!response.ok) throw new Error("API error");
      
      const data = await response.json();
      
      localStorage.setItem("miami_shabbat_times_v2", JSON.stringify(data));
      localStorage.setItem("miami_shabbat_cached_at_v2", now.toISOString());
      
      renderShabbatTimes(data);
    } catch (error) {
      console.warn("שגיאה בטעינת זמני השבת, משתמש בזמני ברירת מחדל:", error);
      announcementEl.textContent = "כשרות הרב מחפוד | זמני כניסת שבת: 19:10 | זמני יציאת שבת: 20:15";
    }
  }

  function renderShabbatTimes(data) {
    const announcementEl = document.getElementById("shabbat-announcement");
    if (!announcementEl || !data || !data.items) return false;

    let candleTime = "";
    let havdalahTime = "";

    data.items.forEach(item => {
      if (item.category === "candles" && item.title) {
        const match = item.title.match(/\d{2}:\d{2}/);
        if (match) candleTime = match[0];
      }
      if (item.category === "havdalah" && item.title) {
        const match = item.title.match(/\d{2}:\d{2}/);
        if (match) havdalahTime = match[0];
      }
    });

    if (candleTime && havdalahTime) {
      announcementEl.textContent = `כשרות הרב מחפוד | זמני כניסת שבת: ${candleTime} | זמני יציאת שבת: ${havdalahTime}`;
      return true;
    }
    return false;
  }

  // הפעלת העדכון
  updateShabbatTimes();
})();
