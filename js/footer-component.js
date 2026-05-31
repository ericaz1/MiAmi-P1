(function () {
  if (window.__miamiFooterMounted) return;
  window.__miamiFooterMounted = true;

  const root = document.getElementById("site-footer");
  if (!root) return;

  root.outerHTML = `
<footer class="bg-[#0b1d33] text-white pt-16 pb-8 px-6 border-t border-white/5" dir="rtl">
  <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center md:text-right">
    <!-- Column 1: Brand & Logo Info -->
    <div class="space-y-4 flex flex-col items-center md:items-start text-center md:text-right">
      <h3 class="font-accent-serif text-2xl text-gold-accent font-bold">מלון מיעמי אשדוד</h3>
      <p class="text-sm text-white/70 max-w-sm leading-relaxed">
        מלון בוטיק כשר למהדרין מול רצועת החוף המרהיבה של אשדוד. שילוב מושלם של יוקרה מודרנית, אווירה משפחתית חמה ומסורת.
      </p>
      <div class="flex gap-4 pt-4">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white/5 hover:bg-gold-accent hover:text-white transition-all flex items-center justify-center text-lg text-white/80">
          <i class="fa-brands fa-facebook-f"></i>
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white/5 hover:bg-gold-accent hover:text-white transition-all flex items-center justify-center text-lg text-white/80">
          <i class="fa-brands fa-instagram"></i>
        </a>
        <a href="https://wa.me/97288522085" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white/5 hover:bg-gold-accent hover:text-white transition-all flex items-center justify-center text-lg text-white/80">
          <i class="fa-brands fa-whatsapp"></i>
        </a>
      </div>
    </div>

    <!-- Column 2: Contact Info -->
    <div class="space-y-4 flex flex-col items-center md:items-start text-center md:text-right">
      <h4 class="text-lg font-bold text-white uppercase tracking-wider relative pb-2 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-12 after:h-0.5 after:bg-gold-accent">פרטי התקשרות</h4>
      <ul class="space-y-3 text-sm text-white/70 flex flex-col items-center md:items-start text-center md:text-right">
        <li class="flex items-center gap-2 justify-center md:justify-start">
          <span class="material-symbols-outlined text-gold-accent text-lg">location_on</span>
          <span>רחוב מקס נורדאו 24, אשדוד</span>
        </li>
        <li class="flex items-center gap-2 justify-center md:justify-start">
          <span class="material-symbols-outlined text-gold-accent text-lg">phone</span>
          <a href="tel:08-8522085" class="hover:text-gold-accent transition-colors">08-8522085</a>
        </li>
        <li class="flex items-center gap-2 justify-center md:justify-start">
          <span class="material-symbols-outlined text-gold-accent text-lg">mail</span>
          <a href="mailto:info@miamihotel.co.il" class="hover:text-gold-accent transition-colors">info@miamihotel.co.il</a>
        </li>
        <li class="flex items-center gap-2 justify-center md:justify-start">
          <span class="material-symbols-outlined text-gold-accent text-lg">verified</span>
          <span>כשרות למהדרין - הרב מחפוד</span>
        </li>
      </ul>
    </div>

    <!-- Column 3: Quick Links & Legal -->
    <div class="space-y-4 flex flex-col items-center md:items-start text-center md:text-right">
      <h4 class="text-lg font-bold text-white uppercase tracking-wider relative pb-2 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-12 after:h-0.5 after:bg-gold-accent">מידע ומסמכים</h4>
      <div class="flex flex-col gap-2 text-sm text-white/70 flex flex-col items-center md:items-start text-center md:text-right">
        <a href="about.html" class="hover:text-gold-accent transition-colors">אודות המלון</a>
        <a href="rooms.html" class="hover:text-gold-accent transition-colors">חדרים וסוויטות</a>
        <a href="terms.html" class="hover:text-gold-accent transition-colors">תנאי שימוש וביטולים</a>
        <a href="privacy.html" class="hover:text-gold-accent transition-colors">מדיניות פרטיות</a>
        <a href="accessibility.html" class="hover:text-gold-accent transition-colors">הצהרת נגישות</a>
      </div>
    </div>
  </div>

  <div class="max-w-7xl mx-auto pt-8 border-t border-white/10 text-center text-xs text-white/40 flex flex-col md:flex-row justify-between items-center gap-4">
    <p>© 2026 מלון מיעמי אשדוד. כל הזכויות שמורות.</p>
    <p>עיצוב ופיתוח ברמה הגבוהה ביותר מול הים התיכון.</p>
  </div>
</footer>
`;

  // Load accessibility widget dynamically
  const accScript = document.createElement("script");
  accScript.src = "js/accessibility-widget.js";
  accScript.defer = true;
  document.body.appendChild(accScript);
})();
