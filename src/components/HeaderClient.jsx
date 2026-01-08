import { useState, useEffect, useRef } from "react";

export default function HeaderClient({ navButtons = [], lang = "ro", currentLang = "ro" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const menuDesktopRef = useRef();
  const menuMobileRef = useRef();
  const langRef = useRef();

  // Închide dropdown dacă dai click în afara
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
      if (menuDesktopRef.current && !menuDesktopRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
      if (menuMobileRef.current && !menuMobileRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Siguranță pentru navButtons
  const navList = Array.isArray(navButtons) ? navButtons : navButtons[lang] || [];

  return (
    <header className="site-header">
      <div className="header-container">

        {/* ================= Mobile controls ================= */}
        <div className="left-controls">
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>

        {/* Logo */}
        <div className="logo">
          <a href={currentLang === "ro" ? "/ro" : "/en"}>
            <img src="/logo.png" alt="EURO ASIA EDUCATION" />
          </a>
        </div>

        {/* ================= Desktop nav ================= */}
        <nav className="header-nav" ref={menuDesktopRef}>
          {navList.map(btn => (
            <a key={btn.href} href={btn.href}>{btn.text}</a>
          ))}
        </nav>

        {/* ================= Lang switcher (temporar dezactivat) ================= */}
        <div className="lang-switcher" ref={langRef}>
          <div className="current-lang" onClick={() => setLangOpen(!langOpen)}>
            {currentLang.toUpperCase()}
          </div>

          {/*
          <div className={`lang-dropdown ${langOpen ? "open" : ""}`}>
            {["ro","en"].filter(l => l !== currentLang).map((l) => {
              const href = l === "ro" ? "/ro" : "/en";
              return <a key={l} href={href}>{l.toUpperCase()}</a>;
            })}
          </div>
          */}
        </div>

        {/* ================= Mobile dropdown ================= */}
        <div className={`mobile-dropdown ${menuOpen ? "open" : ""}`} ref={menuMobileRef}>
          {navList.map(btn => (
            <a key={btn.href} href={btn.href} onClick={() => setMenuOpen(false)}>{btn.text}</a>
          ))}
        </div>

      </div>
    </header>
  );
}
