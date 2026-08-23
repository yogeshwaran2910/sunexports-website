/* ================================================================
   SUN EXPORTS — MAIN JS
   ================================================================ */

(function() {
  'use strict';

  // ------- Nav scroll -------
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 60) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ------- Mobile menu -------
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
      document.body.classList.remove('menu-open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ------- Scroll reveal -------
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // ------- Stat counter -------
  const stats = document.querySelectorAll('.stat .num');
  if ('IntersectionObserver' in window && stats.length) {
    const counter = (el) => {
      const text = el.textContent.trim();
      const match = text.match(/(\d+)/);
      if (!match) return;
      const target = parseInt(match[1], 10);
      const suffix = text.replace(match[1], '');
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const tick = () => {
        current = Math.min(target, current + step);
        el.textContent = current + suffix;
        if (current < target) requestAnimationFrame(tick);
      };
      tick();
    };
    const statIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counter(entry.target);
          statIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    stats.forEach(s => statIO.observe(s));
  }

  // ------- Language switcher (Google Translate) -------

const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

const getCookie = (name) => {
  const match = document.cookie.match(
    new RegExp('(^| )' + name + '=([^;]+)')
  );
  return match ? match[2] : null;
};

// Initialize Google Translate
window.googleTranslateElementInit = function () {
  new google.translate.TranslateElement(
    {
      pageLanguage: 'en',
      includedLanguages: 'en,ar,es,fr,de,ja,ko,pt,nl,zh-CN',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false
    },
    'google_translate_element'
  );
};

// Change language
function changeLanguage(lang) {

  // Save selected language
  localStorage.setItem('selectedLanguage', lang);

  // English = original page
  if (lang === 'en') {
    setCookie('googtrans', '', -1);
    setCookie('googtrans', '/en/en', -1);
    location.reload();
    return;
  }

  // Set Google Translate cookie
  setCookie('googtrans', `/en/${lang}`, 365);

  // Reload page so Google Translate applies the language
  location.reload();
}

window.changeLanguage = changeLanguage;


// Keep dropdown synced with selected language
const wireLangSelect = () => {

  const langSelect = document.getElementById('lang-select');

  if (!langSelect) return;

  const savedLanguage =
    localStorage.getItem('selectedLanguage') || 'en';

  if (
    [...langSelect.options].some(
      option => option.value === savedLanguage
    )
  ) {
    langSelect.value = savedLanguage;
  }
};

wireLangSelect();

  // ------- Google Sheets Form Submission -------
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby9WxOBFR42BgKrGi5SREtiqgTgtOi2_28PSNJc6Nb3Whonw7QSbTzE1V-sdjPtBQP1kA/exec";


document.querySelectorAll('form[data-google-sheet]').forEach(form => {

  if (form.dataset.googleSheetBound === "true") return;

  form.dataset.googleSheetBound = "true";

  form.addEventListener('submit', async function (e) {

    e.preventDefault();

    // ==========================================
    // 1. CHECK NORMAL REQUIRED FIELDS
    // ==========================================

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }


    // ==========================================
    // 2. CHECK REQUIRED CHECKBOX GROUPS
    // ==========================================

    // Grade Required
    const gradeCheckboxes = form.querySelectorAll(
      'input[name="grade"]'
    );

    if (
      gradeCheckboxes.length > 0 &&
      ![...gradeCheckboxes].some(cb => cb.checked)
    ) {

      alert("Please select at least one Grade Required option.");

      return;
    }


    // Form Required
    const formCheckboxes = form.querySelectorAll(
      'input[name="form_required"]'
    );

    if (
      formCheckboxes.length > 0 &&
      ![...formCheckboxes].some(cb => cb.checked)
    ) {

      alert("Please select at least one Form Required option.");

      return;
    }


    // Product Required
    const productCheckboxes = form.querySelectorAll(
      'input[name="product"]'
    );

    if (
      productCheckboxes.length > 0 &&
      ![...productCheckboxes].some(cb => cb.checked)
    ) {

      alert("Please select at least one product.");

      return;
    }


    // ==========================================
    // 3. GET SUBMIT BUTTON
    // ==========================================

    const submitButton =
      form.querySelector('button[type="submit"]');

    const originalButtonText =
      submitButton ? submitButton.textContent : "";


    if (submitButton) {

      submitButton.disabled = true;
      submitButton.textContent = "Sending...";

    }


    // ==========================================
    // 4. COLLECT FORM DATA
    // ==========================================

    const formData = new FormData(form);


    // ==========================================
    // 5. COUNTRY CODE + PHONE
    // ==========================================

    let countryCode =
      formData.get("country_code_select") || "";

    if (countryCode === "other") {

      countryCode =
        formData.get("custom_country_code") || "";

    }

    const phone =
      formData.get("phone") || "";

    const fullPhone =
      countryCode + " " + phone;


    // ==========================================
    // 6. GET ALL CHECKBOX VALUES
    // ==========================================

    const getCheckedValues = (name) => {

      return [...form.querySelectorAll(
        `input[name="${name}"]:checked`
      )]
      .map(input => input.value)
      .join(", ");

    };


    const gradeValues =
      getCheckedValues("grade");

    const formValues =
      getCheckedValues("form_required");

    const productValues =
      getCheckedValues("product");

// ==========================================
// 7. CREATE DATA OBJECT
// ==========================================

const data = {

  sheet: form.dataset.googleSheet,

  // ==========================================
  // COMMON FIELDS
  // ==========================================

  "Full Name":
    formData.get("name") || "",

  "Company Name":
    formData.get("company") || "",

  "Email":
    formData.get("email") || "",

  "Phone / WhatsApp":
    fullPhone,

  "Country":
    formData.get("country") || "",


  // ==========================================
  // CONTACT PAGE
  // ==========================================

  "Job Title / Role":
    formData.get("role") || "",

  "Website":
    formData.get("website") || "",

  "City / Port of Delivery":
    formData.get("port") || "",

  "How did you find us?":
    formData.get("source") || "",

  "Quantity Required":
    formData.get("quantity") || "",

  "Incoterms":
    formData.get("incoterms") || "",

  "Packaging":
    formData.get("packaging") || "",

  "Buyer Type":
    formData.get("buyer_type") || "",

  "Sample Required?":
    formData.get("sample") || "",


  // ==========================================
  // PRODUCT
  // ==========================================

  "Product(s) Required":
    productValues,


  // ==========================================
  // COCOPEAT GROW BAG
  // ==========================================

  "Slab Size Required":
    formData.get("slab_size") || "",

  "Planting Holes":
    formData.get("planting_holes") || "",

  "Crop":
    formData.get("crop") || "",


  // ==========================================
  // COIR PITH
  // ==========================================

  "Particle Grade":
    formData.get("grade") || "",

  "End Use":
    formData.get("enduse") || "",


  // ==========================================
  // OTHER PRODUCT FIELDS
  // ==========================================

  "Grade Required":
    gradeValues,

  "Form Required":
    formValues,

  "Volume per Order":
    formData.get("volume") || "",

  "Private-label Packaging":
    formData.get("private_label") || "",


  // ==========================================
  // MESSAGE
  // ==========================================

  "Message / Additional Requirements":
    formData.get("message") || "",

  "Message":
    formData.get("message") || ""

};


    // ==========================================
    // 8. SEND TO GOOGLE SHEETS
    // ==========================================

    try {

      await fetch(
        GOOGLE_SCRIPT_URL,
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type":
              "text/plain;charset=utf-8"
          },
          body: JSON.stringify(data)
        }
      );


      // ========================================
      // 9. ONLY AFTER SUBMISSION
      // SHOW SUCCESS
      // ========================================

      form.style.display = "none";


      const successEl =
        form.parentElement.querySelector(
          ".form-success"
        );


      if (successEl) {

  const name =
    formData.get("name") || "there";

  const email =
    formData.get("email") || "";

  const nameEl =
    successEl.querySelector(".success-name");

  const emailEl =
    successEl.querySelector(".success-email");

  if (nameEl) {
    nameEl.textContent = name;
  }

  if (emailEl) {
    emailEl.textContent = email;
  }

  // Hide form
  form.style.display = "none";

  // Show success message
  successEl.style.display = "block";
}


      alert(
        "Thank you! Your inquiry has been submitted successfully."
      );


      form.reset();


    } catch (error) {

      console.error(
        "Google Sheets submission error:",
        error
      );


      if (submitButton) {

        submitButton.disabled = false;

        submitButton.textContent =
          originalButtonText;

      }


      alert(
        "Sorry, there was a problem submitting your inquiry. Please try again."
      );

    }

  });

});

  // ------- FAQ accordion -------
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      } else {
        a.style.maxHeight = '0';
      }
    });
  });

  // ------- Active nav link -------
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  window.changeLanguage = changeLanguage;
})();
