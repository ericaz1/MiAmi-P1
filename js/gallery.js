(function () {
  // 1. פונקציית סינון הגלריה המקורית
  function filterGallery(category) {
    const items = document.querySelectorAll('.gallery-item');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach((btn) => {
      btn.classList.remove('active');
      const onclick = btn.getAttribute('onclick') || '';
      if (onclick.includes("'" + category + "'")) {
        btn.classList.add('active');
      }
    });

    items.forEach((item) => {
      if (category === 'all' || item.getAttribute('data-category') === category) {
        item.style.display = 'block';
        requestAnimationFrame(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        });
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  }

  window.filterGallery = filterGallery;

  // 2. מימוש מנגנון ה-Lightbox (תצוגת תמונות מוגדלות)
  document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll('.gallery-item');
    if (items.length === 0) return;

    // הוספת סמן יד (Cursor Pointer) לכל פריטי הגלריה
    items.forEach(item => {
      item.classList.add('cursor-pointer');
    });

    // יצירת אלמנט ה-Lightbox והזרקתו ל-DOM
    const lightboxHtml = `
      <div id="gallery-lightbox" class="fixed inset-0 z-50 flex flex-col justify-between bg-black/90 backdrop-blur-md opacity-0 pointer-events-none transition-opacity duration-300 select-none text-white" dir="rtl">
        <!-- סרגל עליון: כותרות וכפתור סגירה -->
        <div class="flex justify-between items-center w-full max-w-6xl mx-auto p-6 z-10">
          <div class="flex flex-col text-right">
            <span id="lightbox-category" class="text-gold-accent font-label-meta text-xs uppercase tracking-wider mb-1"></span>
            <h3 id="lightbox-title" class="text-white font-headline-card text-lg font-bold"></h3>
          </div>
          <button id="lightbox-close" class="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors flex items-center justify-center" aria-label="סגור">
            <span class="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        <!-- אזור תצוגה מרכזי: תמונה וחצי ניווט -->
        <div class="relative flex-grow flex items-center justify-center w-full max-w-5xl mx-auto my-auto p-4">
          <!-- כפתור הקודם (שמאל) -->
          <button id="lightbox-prev" class="absolute left-4 z-10 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 p-3.5 rounded-full transition-all flex items-center justify-center transform active:scale-95" aria-label="הקודם">
            <span class="material-symbols-outlined text-3xl">arrow_back</span>
          </button>

          <!-- התמונה עצמה -->
          <img id="lightbox-img" class="max-w-full max-h-[68vh] md:max-h-[72vh] object-contain rounded-lg shadow-2xl transition-all duration-300 transform scale-95 opacity-0" src="" alt="">

          <!-- כפתור הבא (ימין) -->
          <button id="lightbox-next" class="absolute right-4 z-10 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 p-3.5 rounded-full transition-all flex items-center justify-center transform active:scale-95" aria-label="הבא">
            <span class="material-symbols-outlined text-3xl">arrow_forward</span>
          </button>
        </div>

        <!-- סרגל תחתון: מונה תמונות -->
        <div class="text-center font-label-meta text-white/60 p-6 z-10 text-sm">
          <span id="lightbox-index"></span>
        </div>
      </div>
    `;

    const template = document.createElement('div');
    template.innerHTML = lightboxHtml.trim();
    const lightboxEl = template.firstChild;
    document.body.appendChild(lightboxEl);

    // שליפת אלמנטים פנימיים
    const lightboxImg = lightboxEl.querySelector('#lightbox-img');
    const lightboxCategory = lightboxEl.querySelector('#lightbox-category');
    const lightboxTitle = lightboxEl.querySelector('#lightbox-title');
    const lightboxIndex = lightboxEl.querySelector('#lightbox-index');
    const closeBtn = lightboxEl.querySelector('#lightbox-close');
    const prevBtn = lightboxEl.querySelector('#lightbox-prev');
    const nextBtn = lightboxEl.querySelector('#lightbox-next');

    let currentVisibleItems = [];
    let currentIndex = -1;

    // פונקציה לעדכון רשימת התמונות המוצגות כעת (בהתאם לסינון)
    function updateVisibleItems() {
      currentVisibleItems = Array.from(document.querySelectorAll('.gallery-item')).filter(
        item => getComputedStyle(item).display !== 'none'
      );
    }

    // פונקציה להצגת תמונה ספציפית בתוך ה-Lightbox
    function showImage(index) {
      if (index < 0 || index >= currentVisibleItems.length) return;
      currentIndex = index;

      const activeItem = currentVisibleItems[currentIndex];
      const img = activeItem.querySelector('img');
      const categorySpan = activeItem.querySelector('.gallery-overlay span');
      const titleH3 = activeItem.querySelector('.gallery-overlay h3');

      // אנימציית מעבר חלקה לתמונה הבאה/הקודמת
      lightboxImg.classList.add('opacity-0', 'scale-95');

      setTimeout(() => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || "";
        lightboxCategory.textContent = categorySpan ? categorySpan.textContent : "";
        lightboxTitle.textContent = titleH3 ? titleH3.textContent : "";
        lightboxIndex.textContent = `${currentIndex + 1} מתוך ${currentVisibleItems.length}`;

        lightboxImg.onload = () => {
          lightboxImg.classList.remove('opacity-0', 'scale-95');
        };
      }, 150);
    }

    // פונקציה לפתיחת ה-Lightbox
    function openLightbox(item) {
      updateVisibleItems();
      const index = currentVisibleItems.indexOf(item);
      if (index === -1) return;

      lightboxEl.classList.remove('pointer-events-none');
      lightboxEl.classList.add('opacity-100');
      document.body.style.overflow = 'hidden'; // מניעת גלילה של הדף ברקע

      showImage(index);
    }

    // פונקציה לסגירת ה-Lightbox
    function closeLightbox() {
      lightboxEl.classList.add('pointer-events-none');
      lightboxEl.classList.remove('opacity-100');
      document.body.style.overflow = ''; // החזרת גלילה
      
      setTimeout(() => {
        lightboxImg.src = "";
      }, 300);
    }

    // חיבור מאזיני אירועים לפריטים בגלריה
    items.forEach(item => {
      item.addEventListener('click', () => {
        openLightbox(item);
      });
    });

    // כפתורי הניווט
    closeBtn.addEventListener('click', closeLightbox);
    
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      let newIndex = currentIndex - 1;
      if (newIndex < 0) newIndex = currentVisibleItems.length - 1; // מחזורי
      showImage(newIndex);
    });

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      let newIndex = currentIndex + 1;
      if (newIndex >= currentVisibleItems.length) newIndex = 0; // מחזורי
      showImage(newIndex);
    });

    // סגירה בלחיצה על הרקע הכהה
    lightboxEl.addEventListener('click', (e) => {
      if (e.target === lightboxEl || e.target.id === 'lightbox-img-container') {
        closeLightbox();
      }
    });

    // ניווט באמצעות המקלדת (חצים ו-Escape)
    document.addEventListener('keydown', (e) => {
      if (!lightboxEl.classList.contains('opacity-100')) return;

      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        // חץ שמאלה: בגלריה תמונות, חץ שמאלה הולך לתמונה הקודמת
        prevBtn.click();
      } else if (e.key === 'ArrowRight') {
        // חץ ימינה: הולך לתמונה הבאה
        nextBtn.click();
      }
    });
  });
})();
