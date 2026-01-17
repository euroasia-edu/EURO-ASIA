// src/components/HeaderClient.jsx
import { useState, useEffect, useRef } from "react";
import "../styles/header.css";
import LanguageSwitcher from "./LanguageSwitcher";
import { createPortal } from 'react-dom';

export default function HeaderClient({ lang = "ro", currentPath = "/" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navList, setNavList] = useState([]);
  const menuBtnRef = useRef(null);
  const menuRef = useRef(null);

  // Încarcă nav dinamic pentru TOATE limbile
  useEffect(() => {
    const loadNav = async () => {
      try {
        const module = await import(`../i18n/${lang}/nav.js`);
        setNavList(module.default.nav);
      } catch {
        // Fallback RO
        try {
          const fallback = await import('../i18n/ro/nav.js');
          setNavList(fallback.default.nav);
        } catch {
          // Hardcoded fallback
          setNavList([
            { href: `/${lang}/`, text: "Acasă" },
            { href: `/${lang}/services`, text: "Servicii" },
            { href: `/${lang}/gallery`, text: "Galerie" },
            { href: `/${lang}/contact`, text: "Contact" }
          ]);
        }
      }
    };

    loadNav();
  }, [lang]);

  // Click outside pentru închidere meniu
  useEffect(() => {
    const onClick = (e) => {
      if (
        menuOpen &&
        !menuRef.current?.contains(e.target) &&
        !menuBtnRef.current?.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="header-container">
        {/* MOBILE: buton meniu */}
        <button
          ref={menuBtnRef}
          className="menu-btn"
          onClick={() => setMenuOpen(v => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Închide meniul" : "Deschide meniul"}
        >
          {/* Golește conținutul - folosim ::before/::after */}
        </button>

        {/* OVERLAY */}
        <div 
          className={`mobile-overlay ${menuOpen ? "open" : ""}`} 
          onClick={() => setMenuOpen(false)}
        ></div>

        {/* LOGO + LANGUAGE SWITCHER */}
        <div className="logo-wrapper">
          <div className="logo">
            <a href={`/${lang}`}>
              <img src="/logo.png" alt="EURO ASIA EDUCATION" />
            </a>
          </div>
          <div className="mobile-lang-switcher">
            <LanguageSwitcher lang={lang} currentPath={currentPath} />
          </div>
        </div>

        {/* DESKTOP NAV */}
        <nav className="header-nav">
          <div className="nav-links">
            {navList.map(btn => (
              <a 
                key={btn.href} 
                href={btn.href}
                className="nav-link"
              >
                {btn.text}
              </a>
            ))}
          </div>
          <div className="desktop-lang-switcher">
            <LanguageSwitcher lang={lang} currentPath={currentPath} />
          </div>
        </nav>

        {/* MOBILE DROPDOWN cu PORTAL */}
        {menuOpen && createPortal(
          <div
            ref={menuRef}
            className="mobile-dropdown open"
            onClick={e => e.stopPropagation()}
          >
            {navList.map(btn => (
              <a 
                key={btn.href} 
                href={btn.href} 
                className="mobile-nav-link"
                onClick={() => setMenuOpen(false)}
              >
                {btn.text}
              </a>
            ))}
          </div>,
          document.body
        )}
      </div>
    </header>
  );
}
