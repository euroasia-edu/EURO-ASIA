import { useState, useEffect } from "react";
import GalleryModal from "./GalleryModal.jsx";

export default function GalleryGrid({ images = [] }) {
  const [active, setActive] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openGallery = (index) => {
    setActive(index);
    setIsOpen(true);
  };

  const closeGallery = () => {
    setIsOpen(false);
    setTimeout(() => setActive(null), 400);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('gallery-open');
    } else {
      document.body.classList.remove('gallery-open');
    }
    return () => document.body.classList.remove('gallery-open');
  }, [isOpen]);

  return (
    <>
      <div className="gallery-grid">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            onClick={() => openGallery(i)}
            onLoad={(e) => e.target.classList.add('loaded')} // ✨ Shimmer
            loading="lazy"
            alt={`Gallery image ${i + 1}`}
          />
        ))}
      </div>

      {active !== null && (
        <GalleryModal
          images={images}
          startIndex={active}
          isOpen={isOpen}
          onClose={closeGallery}
        />
      )}
    </>
  );
}
