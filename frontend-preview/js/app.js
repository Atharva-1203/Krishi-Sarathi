document.addEventListener("DOMContentLoaded", () => {
  // 1. Clock Updates
  const timeEl = document.getElementById("header-time");
  const dateEl = document.getElementById("header-date");
  
  const updateClock = () => {
    const d = new Date();
    if (timeEl) timeEl.textContent = d.toLocaleTimeString();
    if (dateEl) dateEl.textContent = d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  };
  updateClock();
  setInterval(updateClock, 1000);

  // 2. Theme Toggles
  const themeBtn = document.getElementById("theme-toggle-btn");
  const savedTheme = localStorage.getItem("preview-theme") || "dark";
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const isDark = document.documentElement.classList.toggle("dark");
      localStorage.setItem("preview-theme", isDark ? "dark" : "light");
    });
  }

  // 3. Language Toggles
  const langSel = document.getElementById("lang-select-box");
  const savedLang = localStorage.getItem("preview-lang") || "en";
  document.body.classList.remove("lang-en", "lang-mr");
  document.body.classList.add("lang-" + savedLang);
  if (langSel) {
    langSel.value = savedLang;
    langSel.addEventListener("change", (e) => {
      const lang = e.target.value;
      document.body.classList.remove("lang-en", "lang-mr");
      document.body.classList.add("lang-" + lang);
      localStorage.setItem("preview-lang", lang);
    });
  }
});
