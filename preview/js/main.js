// Global translation dictionary
const TRANSLATIONS = {
  en: {
    title: "KRISHI SARATHI",
    subtitle: "An Explainable AI Agricultural Decision Support Platform",
    start_btn: "Start Analysis",
    demo_btn: "Run Guided Demo",
    soil_health: "Soil Health Records",
    rainfall: "Rainfall records",
    active_district: "Active District"
  },
  mr: {
    title: "कृषि सारथी",
    subtitle: "स्पष्टीकरणक्षम एआय कृषी निर्णय समर्थन प्रणाली",
    start_btn: "विश्लेषण सुरू करा",
    demo_btn: "डेमो मोड",
    soil_health: "मृदा आरोग्य नोंदी",
    rainfall: "पर्जन्य नोंदी",
    active_district: "सक्रिय जिल्हा"
  }
};

let currentLang = 'en';

window.toggleLanguage = function() {
  currentLang = currentLang === 'en' ? 'mr' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (TRANSLATIONS[currentLang][key]) {
      el.textContent = TRANSLATIONS[currentLang][key];
    }
  });
};

window.toggleTheme = function() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
};

// Simulation script for demo mode
window.runGuidedDemo = function() {
  localStorage.setItem('demo_district', 'Pune');
  localStorage.setItem('demo_n', '82');
  localStorage.setItem('demo_p', '48');
  localStorage.setItem('demo_k', '90');
  localStorage.setItem('demo_ph', '6.8');
  localStorage.setItem('demo_rain', '1100');
  window.location.href = 'consultation.html?demo=true';
};
