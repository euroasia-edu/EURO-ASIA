import { useState, useRef } from "react";

export default function ImageSlider({ images = [], fullscreen = false }) {
  const [index, setIndex] = useState(0);
  const startX = useRef(null);

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
        {images.map((src, i) => (
          <img src={src} key={i} draggable={false} />
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button className="prev" onClick={prev}>‹</button>
          <button className="next" onClick={next}>›</button>
        </>
      )}
    </div>
  );
}
