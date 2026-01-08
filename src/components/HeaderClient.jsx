import { useState, useEffect, useRef } from "react";

export default function HeaderClient({ navButtons, lang, currentLang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef();
  const menuRef = useRef();

  // Închide dropdown dacă dai click în afara
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="site-header">
      <div className="header-container">
        {/* ================= Mobile controls ================= */}
        <div className="left-controls">
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>

        <div className="logo">
          <a href={lang === "ro" ? "/ro" : "/en"}>
            <img src="/logo.png" alt="EURO ASIA EDUCATION" />
          </a>
        </div>


        {/* ================= Desktop nav ================= */}
        <nav
          className={`header-nav ${menuOpen ? "open" : ""}`}
          ref={menuRef}
        >
          {navButtons[lang].map(btn => (
            <a key={btn.href} href={btn.href}>{btn.text}</a>
          ))}
        </nav>

        {/* ================= Lang switcher ================= */}
        <div className="lang-switcher" ref={langRef}>
          <div
            className="current-lang"
            onClick={() => setLangOpen(!langOpen)}
          >
            {currentLang.toUpperCase()}
          </div>
          <div className={`lang-dropdown ${langOpen ? "open" : ""}`}>
            {["ro", "en"].filter(l => l !== currentLang).map((l) => (
              <a key={l} href={l === "ro" ? "/ro" : "/en"}>{l.toUpperCase()}</a>
            ))}
          </div>
        </div>
        {/* ================= Mobile dropdown ================= */}
        <div className={`mobile-dropdown ${menuOpen ? "open" : ""}`} ref={menuRef}>
          {navButtons[lang].map(btn => (
            <a key={btn.href} href={btn.href} onClick={() => setMenuOpen(false)}>
              {btn.text}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
