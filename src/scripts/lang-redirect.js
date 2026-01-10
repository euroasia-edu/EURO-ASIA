// src/scripts/lang-redirect.js
const lang = localStorage.getItem('lang') || navigator.language.startsWith('en') ? 'en' : 'ro';
if (window.location.pathname === '/') {
  window.location.replace(`/${lang}`);
}
