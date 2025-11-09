import React, { useState, useEffect } from "react";

const ImageCarousel = () => {
  const images = [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=400&fit=crop",
    "https://images.unsplash.com/photo-1555529669-2269763671c0?w=1200&h=400&fit=crop",
    "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1200&h=400&fit=crop",
    "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&h=400&fit=crop"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <button className="carousel-btn carousel-btn-prev" onClick={goToPrevious}>
          &#8249;
        </button>
        <div className="carousel-slide-container">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="carousel-image"
          />
        </div>
        <button className="carousel-btn carousel-btn-next" onClick={goToNext}>
          &#8250;
        </button>
      </div>
      <div className="carousel-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;


