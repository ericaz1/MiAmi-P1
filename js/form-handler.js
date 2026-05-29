(function () {
  // 1. קריאת פרמטרים מכתובת העמוד וסימון הנושא המתאים
  document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get("type");
    const guests = urlParams.get("guests");

    const eventTypeSelect = document.getElementById("event_type");
    if (eventTypeSelect && type) {
      if (type === "vacation") {
        eventTypeSelect.value = "חופשה משפחתית";
      } else if (type === "shabbat") {
        eventTypeSelect.value = "שבת חתן";
      } else if (type === "events") {
        eventTypeSelect.value = "אירוע עסקי";
      } else if (type === "other") {
        eventTypeSelect.value = "אחר";
      }
    }

    const guestsInput = document.getElementById("guests");
    if (guestsInput && guests) {
      guestsInput.value = guests;
    }
  });

  // 2. האזנה לשליחת הטופס בדף צור קשר
  const contactForm = document.querySelector("main form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault(); // מניעת רענון הדף הדיפולטיבי

    let isValid = true;

    // שליפת האלמנטים
    const fullNameInput = document.getElementById("full_name");
    const phoneInput = document.getElementById("phone");

    // איתחול שגיאות קודמות
    if (fullNameInput) clearError(fullNameInput);
    if (phoneInput) clearError(phoneInput);

    // בדיקת שם מלא
    if (fullNameInput) {
      const nameValue = fullNameInput.value.trim();
      if (nameValue === "") {
        showError(fullNameInput, "נא להזין שם מלא");
        isValid = false;
      } else if (nameValue.length < 2) {
        showError(fullNameInput, "השם חייב להכיל לפחות 2 תווים");
        isValid = false;
      }
    }

    // בדיקת טלפון
    if (phoneInput) {
      const phoneValue = phoneInput.value.trim();
      const phoneRegex = /^(05\d|0[23489])-?\d{7}$/; // פורמט טלפון ישראלי
      if (phoneValue === "") {
        showError(phoneInput, "נא להזין מספר טלפון ליצירת קשר");
        isValid = false;
      } else if (!phoneRegex.test(phoneValue)) {
        showError(phoneInput, "נא להזין מספר טלפון ישראלי תקין (לדוגמה: 050-0000000)");
        isValid = false;
      }
    }

    // אם הכל תקין - הצג מודאל הצלחה ואפס את הטופס
    if (isValid) {
      showSuccessModal();
      contactForm.reset();
    }
  });

  // פונקציה להצגת שגיאה מתחת לשדה
  function showError(inputEl, message) {
    clearError(inputEl);
    inputEl.classList.add("border-error");
    inputEl.classList.remove("border-sand-dark");

    const errorEl = document.createElement("p");
    errorEl.className = "text-error text-xs mt-1 form-error-msg font-medium";
    errorEl.textContent = message;

    inputEl.parentNode.appendChild(errorEl);
  }

  // פונקציה לניקוי שגיאה
  function clearError(inputEl) {
    inputEl.classList.remove("border-error");
    inputEl.classList.add("border-sand-dark");

    const existingError = inputEl.parentNode.querySelector(".form-error-msg");
    if (existingError) {
      existingError.remove();
    }
  }

  // יצירה והצגה של פופ-אפ תודה רבה יוקרתי
  function showSuccessModal() {
    const modalOverlay = document.createElement("div");
    modalOverlay.className =
      "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md transition-opacity duration-300 opacity-0";

    modalOverlay.innerHTML = `
      <div class="bg-white rounded-2xl border border-sand-dark p-8 md:p-12 max-w-md w-full mx-4 shadow-2xl transform scale-95 transition-all duration-300 relative text-center" dir="rtl">
        <div class="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-status-emerald animate-pulse">
          <span class="material-symbols-outlined text-4xl" style="font-variation-settings: 'FILL' 1;">check_circle</span>
        </div>
        <h3 class="font-accent-serif text-2xl text-primary mb-3 font-bold">הפנייה נשלחה בהצלחה!</h3>
        <p class="font-body-main text-on-surface-variant mb-8 text-base">
          תודה רבה שהשארתם פרטים. נציג של מלון מיאמי אשדוד יחזור אליכם בהקדם האפשרי.
        </p>
        <button id="close-success-modal" class="w-full bg-gold-accent text-white font-bold py-3.5 rounded-lg shadow-md hover:opacity-90 transition-opacity">
          סגור
        </button>
      </div>
    `;

    document.body.appendChild(modalOverlay);

    // תזמון פתיחה חלקה
    setTimeout(() => {
      modalOverlay.classList.remove("opacity-0");
      modalOverlay.querySelector(".transform").classList.remove("scale-95");
    }, 10);

    // האזנה לסגירה
    const closeBtn = modalOverlay.querySelector("#close-success-modal");
    closeBtn.addEventListener("click", () => {
      modalOverlay.classList.add("opacity-0");
      modalOverlay.querySelector(".transform").classList.add("scale-95");
      setTimeout(() => {
        modalOverlay.remove();
      }, 300);
    });
  }
})();
