"use client";
import { IconArrowNarrowRight, IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";

// Recordings open on a loading screen; skip it and loop from here instead.
const DEMO_START = 1.5;

const SLIDE_SIZE =
  "w-[80vmin] h-[100vmin] sm:w-[56vmin] sm:h-[62vmin] md:w-[52vmin] md:h-[58vmin] sm:max-w-[480px] sm:max-h-[530px]";

// Muted looping demo. Only the active slide loads and plays; the rest show the poster.
const DemoVideo = ({ src, poster, title, active }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (active && !reduceMotion) {
      if (video.currentTime < DEMO_START) video.currentTime = DEMO_START;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active]);

  const restart = (e) => {
    e.currentTarget.currentTime = DEMO_START;
    e.currentTarget.play().catch(() => {});
  };

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover"
      src={src}
      poster={poster}
      muted
      playsInline
      preload={active ? "auto" : "none"}
      onEnded={restart}
      aria-label={title}
    />
  );
};

const Slide = ({ slide, index, current, handleSlideClick, demoLabel }) => {
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

  const { title, description, kindLabel, tags, video, poster, primary, secondary } = slide;
  const isActive = current === index;

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className={`relative flex flex-col ${SLIDE_SIZE} mx-[3vmin] sm:mx-[4vmin] z-10 cursor-pointer`}
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isActive ? "scale(1) rotateX(0deg)" : "scale(0.94) rotateX(8deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className={`absolute inset-0 flex flex-col overflow-hidden rounded-2xl bg-zinc-950 text-white shadow-2xl transition-opacity duration-500 ${
            isActive ? "opacity-100" : "opacity-50"
          }`}
          style={{
            transform: isActive ? "translate3d(calc(var(--x) / 40), calc(var(--y) / 40), 0)" : "none",
          }}
        >
          {/* Demo */}
          <div className="relative w-full aspect-video shrink-0 bg-zinc-900 overflow-hidden">
            <DemoVideo src={video} poster={poster} title={title} active={isActive} />
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em]">
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-red-500 animate-pulse" : "bg-zinc-500"}`} />
              {demoLabel}
            </span>
          </div>

          {/* Info */}
          <article
            className={`flex flex-1 min-h-0 flex-col gap-1.5 sm:gap-2 p-4 sm:p-5 text-left transition-opacity duration-500 ${
              isActive ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-semibold text-zinc-500 truncate">
              {kindLabel} · {tags.join(" · ")}
            </p>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight leading-tight">{title}</h2>
            <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed line-clamp-3">{description}</p>

            <div className="mt-auto flex items-center gap-2 pt-2">
              <a
                href={primary.href}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={isActive ? 0 : -1}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-zinc-200 active:scale-95 transition-all"
              >
                {primary.label}
                <IconArrowUpRight size={14} />
              </a>
              {secondary && (
                <a
                  href={secondary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={isActive ? 0 : -1}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 px-4 py-2 text-xs font-semibold text-white hover:border-white active:scale-95 transition-all"
                >
                  <IconBrandGithub size={14} />
                  {secondary.label}
                </a>
              )}
            </div>
          </article>
        </div>
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

export default function Carousel({ slides = [], demoLabel = "Demo" }) {
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
      className={`relative ${SLIDE_SIZE} mx-auto select-none`}
      aria-labelledby={`carousel-heading-${id}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <ul
        className="absolute flex mx-[-3vmin] sm:mx-[-4vmin] transition-transform duration-700 ease-out"
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
            demoLabel={demoLabel}
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
