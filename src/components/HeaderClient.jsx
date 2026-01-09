import { useState, useEffect, useRef } from "react";
import "../styles/header.css";

export default function HeaderClient({ navButtons = [], lang = "ro" }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuBtnRef = useRef(null);
  const menuRef = useRef(null);

  // click în afara meniului => închide
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
          aria-label="Open menu"
        >
          ☰
        </button>

        {/* LOGO */}
        <div className="logo">
          <a href={lang === "ro" ? "/ro" : "/en"}>
            <img src="/logo.png" alt="EURO ASIA EDUCATION" />
          </a>
        </div>

        {/* DESKTOP NAV */}
        <nav className="header-nav">
          {navList.map(btn => (
            <a key={btn.href} href={btn.href}>
              {btn.text}
            </a>
          ))}
        </nav>

        {/* SWITCHER — DEZACTIVAT TEMPORAR */}

<a
  className="lang-switcher"
  href={lang === "ro" ? "/en" : "/ro"}
>
  {lang.toUpperCase()}
</a>

        {/* MOBILE DROPDOWN */}
        <div
          ref={menuRef}
          className={`mobile-dropdown ${menuOpen ? "open" : ""}`}
        >
          {navList.map(btn => (
            <a
              key={btn.href}
              href={btn.href}
              onClick={() => setMenuOpen(false)}
            >
              {btn.text}
            </a>
          ))}
        </div>

      </div>
    </header>
  );
}
