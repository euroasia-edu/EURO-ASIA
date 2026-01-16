import { useState, useEffect, useRef } from "react";
import "../styles/header.css";
import LanguageSwitcher from "./LanguageSwitcher";
import { createPortal } from 'react-dom';

export default function HeaderClient({ navButtons = [], lang = "ro", currentPath = "/" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBtnRef = useRef(null);
  const menuRef = useRef(null);

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

  const navList = Array.isArray(navButtons) ? navButtons : navButtons[lang] || [];

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

        
        {/* OVERLAY - deja fixed, funcționează */}
        <div className={`mobile-overlay ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)}></div>

        {/* LOGO + LANGUAGE SWITCHER */}
        <div className="logo-wrapper">
          <div className="logo">
            <a href={lang === "ro" ? "/ro" : "/en"}>
              <img src="/logo.png" alt="EURO ASIA EDUCATION" />
            </a>
          </div>
          <div className="mobile-lang-switcher">
            <LanguageSwitcher lang={lang} currentPath={currentPath} />
          </div>
        </div>

        <nav className="header-nav">
          <div className="nav-links">
            {navList.map(btn => (
              <a key={btn.href} href={btn.href}>{btn.text}</a>
            ))}
          </div>
          <div className="desktop-lang-switcher">
            <LanguageSwitcher lang={lang} currentPath={currentPath} />
          </div>
        </nav>

        {/* DROPDOWN cu PORTAL - ȘTERGE DIV-UL VECHI */}
        {menuOpen && createPortal(
          <div
            ref={menuRef}
            className="mobile-dropdown open"
            onClick={e => e.stopPropagation()} // previne închiderea la click în meniu
          >
            {navList.map(btn => (
              <a key={btn.href} href={btn.href} onClick={() => setMenuOpen(false)}>
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
