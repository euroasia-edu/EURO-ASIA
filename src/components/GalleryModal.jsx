import { useEffect, useState, useRef } from "react";

export default function GalleryModal({ images, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const [isOpen, setIsOpen] = useState(true); // ← NOU: pentru tranziție
  const trackRef = useRef(null);
  const startX = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  // ← NOU: închide cu tranziție smooth
  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => onClose(), 400); // sincron cu CSS transition
  };

  const prev = () => {
    setIndex((index - 1 + images.length) % images.length);
  };

  const next = () => {
    setIndex((index + 1) % images.length);
  };

  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (startX.current === null) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (diff > 50) next();
    if (diff < -50) prev();
    startX.current = null;
  };

  // ← NOU: disable scroll pe body
  useEffect(() => {
    document.body.classList.add('gallery-open');
    return () => document.body.classList.remove('gallery-open');
  }, []);

  return (
    <div className={`gallery-overlay ${isOpen ? 'open' : ''}`} onClick={closeModal}>
      <div
        className="gallery-modal"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="gallery-slider">
          <div
            className="gallery-track"
            ref={trackRef}
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((src, i) => (
              <img key={i} src={src} alt="" />
            ))}
          </div>
        </div>

        <div className="indicator">
          {index + 1} / {images.length}
        </div>

        <button className="prev" onClick={prev}>‹</button>
        <button className="next" onClick={next}>›</button>
        <button className="close" onClick={closeModal}>×</button>
      </div>
    </div>
  );
}
