import { useState } from "react";
import GalleryModal from "./GalleryModal.jsx";

export default function GalleryGrid({ images = [] }) {
  const [active, setActive] = useState(null);

  return (
    <>
      <div className="gallery-grid">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            onClick={() => setActive(i)}
            loading="lazy"
          />
        ))}
      </div>

      {active !== null && (
        <GalleryModal
          images={images}
          startIndex={active}
          onClose={() => setActive(null)}
        />
      )}
    </>
  );
}
