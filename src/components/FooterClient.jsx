import React from "react";

export default function FooterClient({ lang = "ro" }) {
  const footerNav = {
    ro: [
      { text: "Servicii", href: "/ro/services" },
      { text: "Galerie", href: "/ro/gallery" },
      { text: "Contact", href: "/ro/contact" },
    ],
    en: [
      { text: "Services", href: "/en/services" },
      { text: "Gallery", href: "/en/gallery" },
      { text: "Contact", href: "/en/contact" },
    ],
  };

  const supportedLangs = ["ro", "en"]; // poți adăuga fr, de, it, es

  const handleLangChange = (e) => {
    const newLang = e.target.value;
    const pathParts = window.location.pathname.split("/").filter(Boolean);

    if (supportedLangs.includes(pathParts[0])) {
      pathParts[0] = newLang; // înlocuiește limba curentă
    } else {
      pathParts.unshift(newLang); // adaugă limba la început dacă nu există
    }

    window.location.href = "/" + pathParts.join("/");
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-left">
          <a href={`/${lang}`}>
            <img src="/logo.png" alt="EURO ASIA EDUCATION" className="footer-logo-desktop" />
            <img src="/favicon/android-chrome-192x192.png" alt="EURO ASIA EDUCATION" className="footer-logo-mobile" />
          </a>
        </div>

        <div className="footer-right">
          <label htmlFor="language-select">🌐</label>
          <select id="language-select" value={lang} onChange={handleLangChange}>
            {supportedLangs.map(l => (
              <option key={l} value={l}>
                {l.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      <nav className="footer-center">
        {footerNav[lang].map(link => (
          <a key={link.href} href={link.href}>{link.text}</a>
        ))}
      </nav>

      <div className="footer-policy-wrapper">
        <a href={`/${lang}/privacy`} className="footer-policy">Privacy Policy</a>
      </div>

      <div className="footer-copy">
        &copy; {new Date().getFullYear()} EURO ASIA EDUCATION. All rights reserved.
      </div>
    </footer>
  );
}
