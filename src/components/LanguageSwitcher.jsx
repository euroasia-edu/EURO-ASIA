// src/components/LanguageSwitcher.jsx - IDENTIC cu ce aveai
import React, { useState, useRef, useEffect } from "react";

export default function LanguageSwitcher({ lang = "ro", currentPath = "/" }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const supportedLangs = [
    { code: "ro", flag: "🇷🇴" },
    { code: "en", flag: "🇬🇧" },
    { code: "it", flag: "🇮🇹" },
    { code: "es", flag: "🇪🇸" },
    { code: "pt", flag: "🇵🇹" },
    { code: "fr", flag: "🇫🇷" },
    { code: "de", flag: "🇩🇪" }
  ];

  const segments = currentPath.split("/").filter(Boolean);
  
  const getHrefForLang = (targetLang) => {
    let switchHref;
    if (segments.length === 0) {
      switchHref = `/${targetLang}`;
    } else if (["ro", "en", "it", "es", "pt", "fr", "de"].includes(segments[0])) {
      const newSegments = [...segments];
      newSegments[0] = targetLang;
      switchHref = "/" + newSegments.join("/");
    } else {
      switchHref = "/" + [targetLang, ...segments].join("/");
    }
    if (currentPath !== "/" && currentPath.endsWith("/") && !switchHref.endsWith("/")) {
      switchHref += "/";
    }
    return switchHref;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLangObj = supportedLangs.find(l => l.code === lang) || supportedLangs[0];

  return (
    <div className="lang-switcher-wrapper" ref={dropdownRef}>
      <button 
        className="main-lang-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="flag-icon">{currentLangObj.flag}</span>
        <span className="dropdown-arrow">▼</span>
      </button>

      {isOpen && (
        <div className="lang-dropdown">
          {supportedLangs.map(({ code, flag }) => (
            <a
              key={code}
              className={`lang-option ${lang === code ? 'active' : ''}`}
              href={getHrefForLang(code)}
              onClick={() => {setIsOpen(false);
              }}
            >
              <span className="flag-icon">{flag}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
