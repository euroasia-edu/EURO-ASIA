// src/components/LanguageSwitcher.jsx
import React from "react";

export default function LanguageSwitcher({ lang = "ro", currentPath = "/" }) {
  const segments = currentPath.split("/").filter(Boolean);
  const isRO = lang === "ro";
  const targetLang = isRO ? "en" : "ro";

  let switchHref;

  if (segments.length === 0) {
    // homepage
    switchHref = `/${targetLang}`;
  } else if (segments[0] === "ro" || segments[0] === "en") {
    // înlocuim prefixul limbii
    segments[0] = targetLang;
    switchHref = "/" + segments.join("/");
  } else {
    // nu există prefix de limbă → adăugăm
    switchHref = "/" + [targetLang, ...segments].join("/");
  }

  // păstrează trailing slash dacă exista
  if (currentPath !== "/" && currentPath.endsWith("/") && !switchHref.endsWith("/")) {
    switchHref += "/";
  }

return (
  <a
    className="lang-switcher"
    href={switchHref}
    onClick={() => {
      document.cookie = `lang=${targetLang}; path=/; max-age=31536000`;
    }}
  >
    {lang.toUpperCase()}
  </a>
);

}
