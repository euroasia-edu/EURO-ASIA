import { useState, useRef, useEffect } from "react";

export default function ImageSlider({ 
  images = [], 
  serviceName, 
  fullscreen = false 
}) {
  const [index, setIndex] = useState(0);
  const [sliderImages, setSliderImages] = useState(images);
  const startX = useRef(null);

  // Încarcă automat images din i18n/ro/images.js dacă serviceName e dat
  useEffect(() => {
    if (serviceName && !images.length) {
      import('../i18n/ro/images.js')
        .then(module => {
          const serviceImages = module.default.services[serviceName] || [];
          setSliderImages(serviceImages);
        })
        .catch(() => {
          console.warn(`Images not found for service: ${serviceName}`);
          setSliderImages([]);
        });
    } else {
      setSliderImages(images);
    }
  }, [serviceName, images]);

  const prev = () =>
    setIndex((index - 1 + sliderImages.length) % sliderImages.length);

  const next = () =>
    setIndex((index + 1) % sliderImages.length);

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
    <div
      className={`slider ${fullscreen ? "fullscreen" : ""}`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="track"
        style={{
          transform: `translateX(-${index * 100}%)`
        }}
      >
        {sliderImages.map((src, i) => (
          <img src={src} key={i} draggable={false} alt={`Slide ${i + 1}`} />
        ))}
      </div>

      {sliderImages.length > 1 && (
        <>
          <button className="prev" onClick={prev}>‹</button>
          <button className="next" onClick={next}>›</button>
        </>
      )}
    </div>
  );
}
