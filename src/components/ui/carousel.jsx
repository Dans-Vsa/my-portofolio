"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";

const Slide = ({ slide, index, current, handleSlideClick }) => {
  const slideRef = useRef(null);

  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef();

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, button, title, description, tags, link } = slide;

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[75vmin] h-[75vmin] sm:w-[54vmin] sm:h-[54vmin] md:w-[50vmin] md:h-[50vmin] sm:max-w-[480px] sm:max-h-[480px] mx-[3.5vmin] sm:mx-[4vmin] z-10 cursor-pointer"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.96) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#181924] rounded-lg sm:rounded-xl overflow-hidden transition-all duration-150 ease-out shadow-2xl"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          <img
            className="absolute inset-0 w-[120%] h-[120%] object-cover opacity-100 transition-opacity duration-600 ease-in-out"
            style={{
              opacity: current === index ? 1 : 0.45,
            }}
            alt={title}
            src={src}
            onLoad={imageLoaded}
            loading="eager"
            decoding="sync"
          />
          {current === index && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 transition-all duration-1000" />
          )}
        </div>

        <article
          className={`relative p-[3vmin] sm:p-[4vmin] flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out z-20 ${
            current === index ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
        >
          {tags && tags.length > 0 && (
            <p className="text-[9px] sm:text-[11px] uppercase tracking-[0.2em] font-medium text-zinc-300 drop-shadow-sm mb-1">
              {tags.join(' • ')}
            </p>
          )}

          <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white drop-shadow-md">
            {title}
          </h2>

          {description && (
            <p className="mt-1 sm:mt-1.5 text-[11px] sm:text-xs text-zinc-200/90 max-w-xs sm:max-w-sm mx-auto line-clamp-2 drop-shadow-sm font-normal leading-relaxed">
              {description}
            </p>
          )}

          <div className="flex justify-center mt-3 sm:mt-4">
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-4 py-1.5 sm:px-5 sm:py-2 text-[11px] sm:text-xs font-medium text-black bg-white hover:bg-zinc-100 rounded-lg shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>{button || "Explore Project"}</span>
              </a>
            ) : (
              <button
                type="button"
                className="px-4 py-1.5 sm:px-5 sm:py-2 text-[11px] sm:text-xs font-medium text-black bg-white hover:bg-zinc-100 rounded-lg shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>{button || "Explore Project"}</span>
              </button>
            )}
          </div>
        </article>
      </li>
    </div>
  );
};

const CarouselControl = ({ type, title, handleClick }) => {
  return (
    <button
      type="button"
      className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center mx-2 justify-center bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 rounded-full focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 shadow-sm cursor-pointer ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      aria-label={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="text-zinc-800" size={22} />
    </button>
  );
};

export default function Carousel({ slides = [] }) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const handleSlideClick = (index) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNextClick();
    } else if (diff < -45) {
      handlePreviousClick();
    }
  };

  const id = useId();

  if (!slides || slides.length === 0) return null;

  return (
    <div
      className="relative w-[75vmin] h-[75vmin] sm:w-[54vmin] sm:h-[54vmin] md:w-[50vmin] md:h-[50vmin] sm:max-w-[480px] sm:max-h-[480px] mx-auto select-none"
      aria-labelledby={`carousel-heading-${id}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <ul
        className="absolute flex mx-[-3.5vmin] sm:mx-[-4vmin] transition-transform duration-700 ease-out"
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>

      {/* Navigation Controls */}
      <div className="absolute flex justify-center items-center w-full top-[calc(100%+1.5rem)] z-30">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />

        <div className="flex items-center gap-1.5 px-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === current ? "w-6 bg-zinc-900" : "w-2 bg-zinc-300 hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>

        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </div>
    </div>
  );
}
