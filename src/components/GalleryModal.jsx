import { useEffect, useState, useRef } from "react";

export default function GalleryModal({ images, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex);
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

  const prev = () =>
    setIndex((index - 1 + images.length) % images.length);

  const next = () =>
    setIndex((index + 1) % images.length);

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
        <img src={images[index]} />

        <button className="prev" onClick={prev}>‹</button>
        <button className="next" onClick={next}>›</button>
        <button className="close" onClick={onClose}>×</button>
      </div>
    </div>
  );
}
