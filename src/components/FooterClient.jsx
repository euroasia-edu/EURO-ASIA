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
    it: [
      { text: "Servizi", href: "/it/services" },
      { text: "Galleria", href: "/it/gallery" },
      { text: "Contatti", href: "/it/contact" },
    ],
    es: [
      { text: "Servicios", href: "/es/services" },
      { text: "Galería", href: "/es/gallery" },
      { text: "Contacto", href: "/es/contact" },
    ],
    pt: [
      { text: "Serviços", href: "/pt/services" },
      { text: "Galeria", href: "/pt/gallery" },
      { text: "Contato", href: "/pt/contact" },
    ],
    fr: [
      { text: "Services", href: "/fr/services" },
      { text: "Galerie", href: "/fr/gallery" },
      { text: "Contact", href: "/fr/contact" },
    ],
    de: [
      { text: "Dienste", href: "/de/services" },
      { text: "Galerie", href: "/de/gallery" },
      { text: "Kontakt", href: "/de/contact" },
    ]
  };

const footerPolicy = {
  privacy: {
    ro: "Politica de Confidențialitate",
    en: "Privacy Policy", 
    it: "Privacy Policy",
    es: "Política de Privacidad",
    pt: "Política de Privacidade",
    fr: "Politique de Confidentialité",
    de: "Datenschutzerklärung"
  },
  legal: { 
    ro: "Termeni și Condiții",
    en: "Legal Notice",
    it: "Informativa Legale", 
    es: "Aviso Legal",
    pt: "Aviso Legal", 
    fr: "Mentions Légales",
    de: "Rechtliche Hinweise"
  }
};


  const supportedLangs = ["ro", "en", "it", "es", "pt", "fr", "de"];

  const handleLangChange = (e) => {
    const newLang = e.target.value;
    const pathParts = window.location.pathname.split("/").filter(Boolean);

    if (supportedLangs.includes(pathParts[0])) {
      pathParts[0] = newLang;
    } else {
      pathParts.unshift(newLang);
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
        {footerNav[lang]?.map(link => (
          <a key={link.href} href={link.href}>{link.text}</a>
        )) || footerNav.ro.map(link => (
          <a key={link.href} href={link.href}>{link.text}</a>
        ))}
      </nav>

<div className="footer-policy-wrapper">
  <a href={`/${lang}/privacy`} className="footer-policy">
    {footerPolicy.privacy[lang] || footerPolicy.privacy.ro}
  </a>
  <span> | </span>
  <a href={`/${lang}/legal`} className="footer-policy">
    {footerPolicy.legal[lang] || footerPolicy.legal.ro}
  </a>
</div>


      <div className="footer-copy">
        &copy; {new Date().getFullYear()} EURO ASIA EDUCATION. All rights reserved.
      </div>
    </footer>
  );
}
