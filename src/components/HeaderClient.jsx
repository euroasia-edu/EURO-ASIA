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
      !menuRef.current?.contains(e.target) &&  // click AFARĂ
      !menuBtnRef.current?.contains(e.target)
    ) {
      setMenuOpen(false);
    }
  };
  document.addEventListener("mousedown", onClick);
  return () => document.removeEventListener("mousedown", onClick);
}, [menuOpen]);


  const navList = Array.isArray(navButtons) ? navButtons : navButtons[lang] || [];
{navList.map(btn => (
  <button
    key={btn.href}
    className="dropdown-link"
    onClick={() => {
      setTimeout(() => {
        setMenuOpen(false); 
      }, 500);
      window.location.href = btn.href; // navighează imediat
    }}
  >
    {btn.text}
  </button>
))}


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

        {/* DROPDOWN cu PORTAL */}
        {menuOpen && createPortal(
          <div
            ref={menuRef}
            className="mobile-dropdown open"
            onClick={e => e.stopPropagation()} // previne închiderea la click în meniu
          >
            {navList.map(btn => (
              <a key={btn.href} href={btn.href} onClick={() => setMenuOpen(true)}>
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
