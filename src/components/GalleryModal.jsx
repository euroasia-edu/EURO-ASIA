import { useEffect, useState, useRef } from "react";

export default function GalleryModal({ images, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const [animating, setAnimating] = useState(false);
  const startX = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  const prev = () => {
    setAnimating(true);
    setTimeout(() => setIndex((index - 1 + images.length) % images.length), 150);
  };

  const next = () => {
    setAnimating(true);
    setTimeout(() => setIndex((index + 1) % images.length), 150);
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

  return (
    <div className="gallery-overlay" onClick={onClose}>
      <div
        className="gallery-modal"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img
          key={index}
          src={images[index]}
          className={`fade ${animating ? "fade-out" : "fade-in"}`}
          onAnimationEnd={() => setAnimating(false)}
        />
        <div className="indicator">{index + 1} / {images.length}</div>

        <button className="prev" onClick={prev}>‹</button>
        <button className="next" onClick={next}>›</button>
        <button className="close" onClick={onClose}>×</button>
      </div>
    </div>
  );
}
