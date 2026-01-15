// ---------------------------------------------------------
// LANGUAGE SWITCHER — Quartz Agritech Expertise
// ---------------------------------------------------------

const langButtons = document.querySelectorAll(".lang");

// Detect browser language and map to EN / FR / DE
function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage || "en";
    const shortLang = browserLang.slice(0, 2).toLowerCase();

    if (shortLang === "fr") return "FR";
    if (shortLang === "de") return "DE";
    return "EN"; // default / fallback
}

// Load language on page load
document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("language");
    const initialLang = savedLang || detectBrowserLanguage();

    localStorage.setItem("language", initialLang);

    setActiveLanguage(initialLang);
    loadLanguage(initialLang);
});

// Handle language button clicks
langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const selectedLang = btn.getAttribute("data-lang");
        localStorage.setItem("language", selectedLang);
        setActiveLanguage(selectedLang);
        loadLanguage(selectedLang);
    });
});

// Highlight active language button
function setActiveLanguage(lang) {
    langButtons.forEach(btn => {
        const isActive = btn.getAttribute("data-lang") === lang;
        btn.classList.toggle("active", isActive);
    });
}

// Load translation file and update text
async function loadLanguage(lang) {
    const langCode = lang.toLowerCase(); // en, fr, de

    try {
        const response = await fetch(`lang/${langCode}.json`);
        const translations = await response.json();

        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (translations[key]) {
                el.textContent = translations[key];
            }
        });

    } catch (error) {
        console.warn(`⚠ Translation file for ${lang} not found or unreadable.`);
    }
}
