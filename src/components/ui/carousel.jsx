"use client";
import { IconArrowNarrowRight, IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect, useCallback } from "react";

// Recordings open on a loading screen; skip it and loop from here instead.
const DEMO_START = 1.5;

// Cards size by width only; their height follows the content (16:9 demo + text), so nothing gets clipped.
// On short screens the card turns landscape: demo on the left, text on the right.
// Landscape width is also capped by height: the demo (56% wide, 16:9) must fit in 100dvh minus ~190px of chrome.
const SLIDE_WIDTH = "w-[min(84vw,400px)] sm:w-[min(60vw,460px)] short:w-[min(86vw,760px,calc((100dvh-190px)*3.17))]";

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
        className={`relative ${SLIDE_WIDTH} mx-[3vmin] sm:mx-[4vmin] z-10`}
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
          className={`relative flex flex-col short:flex-row overflow-hidden rounded-2xl bg-zinc-950 text-white shadow-2xl transition-opacity duration-500 ${
            isActive ? "opacity-100" : "opacity-50"
          }`}
          style={{
            transform: isActive ? "translate3d(calc(var(--x) / 40), calc(var(--y) / 40), 0)" : "none",
          }}
        >
          {/* Demo */}
          <div className="relative w-full short:w-[56%] aspect-video shrink-0 bg-zinc-900 overflow-hidden">
            <DemoVideo src={video} poster={poster} title={title} active={isActive} />
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em]">
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-red-500 animate-pulse" : "bg-zinc-500"}`} />
              {demoLabel}
            </span>
          </div>

          {/* Info */}
          <article
            className={`flex flex-1 min-w-0 flex-col gap-1.5 sm:gap-2 p-4 sm:p-5 text-left transition-opacity duration-500 ${
              isActive ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-semibold text-zinc-500 truncate">
              {kindLabel} · {tags.join(" · ")}
            </p>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight leading-tight">{title}</h2>
            <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed line-clamp-3">{description}</p>

            <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
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

// Wheel: one slide per gesture. A burst of wheel events (trackpad inertia) counts as one gesture
// until it goes quiet for WHEEL_QUIET ms, but a long continuous scroll may step again after WHEEL_MAX.
const WHEEL_THRESHOLD = 30;
const WHEEL_QUIET = 160;
const WHEEL_MAX = 650;
// Drag: pixels before a press becomes a drag, and the share of a slide's width needed to change slide.
const DRAG_START = 6;
const DRAG_SWITCH = 0.18;

export default function Carousel({ slides = [], demoLabel = "Demo" }) {
  const [current, setCurrent] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const rootRef = useRef(null);
  const drag = useRef({ id: null, startX: 0, startY: 0, active: false, moved: false });
  const count = slides.length;

  const step = useCallback(
    (dir) => setCurrent((c) => (c + dir + count) % count),
    [count]
  );

  const handlePreviousClick = () => step(-1);
  const handleNextClick = () => step(1);

  const handleSlideClick = (index) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  // Scroll wheel / trackpad, anywhere on the page while the carousel is mounted.
  useEffect(() => {
    if (count < 2) return;
    let acc = 0;
    let locked = false;
    let lockedAt = 0;
    let quietTimer;

    const onWheel = (e) => {
      if (e.ctrlKey) return; // pinch-zoom
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      clearTimeout(quietTimer);
      quietTimer = setTimeout(() => {
        locked = false;
        acc = 0;
      }, WHEEL_QUIET);

      if (locked && performance.now() - lockedAt < WHEEL_MAX) return;
      locked = false;
      acc += delta;
      if (Math.abs(acc) >= WHEEL_THRESHOLD) {
        step(acc > 0 ? 1 : -1);
        acc = 0;
        locked = true;
        lockedAt = performance.now();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      clearTimeout(quietTimer);
    };
  }, [count, step]);

  // Arrow keys.
  useEffect(() => {
    const onKey = (e) => {
      if (e.target instanceof HTMLElement && e.target.closest("input, textarea, [contenteditable]")) return;
      if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  // Drag (mouse) and swipe (touch): the track follows the pointer, then snaps.
  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { id: e.pointerId, startX: e.clientX, startY: e.clientY, active: false, moved: false };
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (d.id !== e.pointerId) return;
    const dx = e.clientX - d.startX;
    if (!d.active) {
      if (Math.abs(dx) < DRAG_START || Math.abs(dx) < Math.abs(e.clientY - d.startY)) return;
      d.active = true;
      d.moved = true;
      setIsDragging(true);
      rootRef.current?.setPointerCapture(e.pointerId);
    }
    setDragX(dx);
  };

  const endDrag = (e) => {
    const d = drag.current;
    if (d.id !== e.pointerId) return;
    if (d.active) {
      const width = rootRef.current?.offsetWidth || 1;
      const dx = e.clientX - d.startX;
      if (Math.abs(dx) > width * DRAG_SWITCH) step(dx < 0 ? 1 : -1);
    }
    drag.current = { ...d, id: null, active: false };
    setIsDragging(false);
    setDragX(0);
  };

  // A drag must not also count as a click on the card or its links.
  const onClickCapture = (e) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  const id = useId();

  if (!slides || slides.length === 0) return null;

  return (
    <div
      ref={rootRef}
      className={`relative ${SLIDE_WIDTH} mx-auto select-none touch-pan-y ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      aria-labelledby={`carousel-heading-${id}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={onClickCapture}
      onDragStart={(e) => e.preventDefault()}
    >
      <ul
        className={`flex w-max items-start mx-[-3vmin] sm:mx-[-4vmin] ${isDragging ? "" : "transition-transform duration-700 ease-out"}`}
        style={{
          transform: `translateX(calc(-${current * (100 / count)}% + ${dragX}px))`,
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
      <div className="relative flex justify-center items-center w-full mt-5 sm:mt-7 short:mt-4 z-30 cursor-default">
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
