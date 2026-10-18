import { useEffect, useRef, useState } from 'react';
import { motion as Motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

const wrap = (value, count) => ((value % count) + count) % count;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function ReelCard({ item, index, count, position, travel, active, onOpen }) {
  const offset = useTransform(position, value => wrap(index - value + count / 2, count) - count / 2);
  const distance = useTransform(offset, value => Math.abs(value));
  // Neighbouring cards collapse into shallow shelves behind the identity and actions.
  const y = useTransform(offset, value => {
    const depth = Math.abs(value);
    return -Math.sign(value) * (Math.min(depth, 1) * travel + Math.max(depth - 1, 0) * 42);
  });
  const rotateX = useTransform(offset, value => -clamp(value, -1, 1) * 65);
  const scale = useTransform(distance, [0, 1, 2, 2.5], [1, 0.84, 0.8, 0.76]);
  const scaleY = useTransform(distance, [0, 0.4, 1], [1, 0.95, 0.32]);
  const transform = useTransform(() =>
    `translateY(${y.get()}px) rotateX(${rotateX.get()}deg) scale(${scale.get()}, ${scale.get() * scaleY.get()})`
  );
  const opacity = useTransform(distance, [0, 1, 2, 2.4, 2.5], [1, 1, 0.42, 0, 0]);
  const contentOpacity = useTransform(distance, [0, 0.45, 0.85, 1], [1, 0.72, 0.12, 0]);
  const backgroundColor = useTransform(distance, [0, 0.7, 1], ['#ffffff', '#eeeeee', '#e8e8e8']);
  const zIndex = useTransform(distance, value => Math.round(30 - value * 10));

  return (
    <Motion.button
      type="button"
      className="mobile-card"
      style={{ transform, opacity, backgroundColor, zIndex, pointerEvents: active ? 'auto' : 'none' }}
      tabIndex={active ? 0 : -1}
      aria-hidden={!active}
      aria-label={item.openLabel ?? `Open ${item.label} section`}
      onClick={event => onOpen(item, index, event)}
    >
      <Motion.div className="mobile-card__content" style={{ opacity: contentOpacity }}>
        {item.preview}
      </Motion.div>
    </Motion.button>
  );
}

// `idleInterval` (ms): advance one card on its own this often while the visitor isn't touching the reel (0 = off).
const MobileCardStage = ({ items = [], activeIndex = 0, onChange, onStep, onCardClick, idleInterval = 0 }) => {
  const stageRef = useRef(null);
  const gesture = useRef(null);
  const suppressClick = useRef(false);
  const snapTimer = useRef(null);
  const emittedIndex = useRef(activeIndex);
  const callbacks = useRef({ onChange, onStep });
  const lastInteraction = useRef(0);
  const autoStepping = useRef(false);
  const reducedMotion = useReducedMotion();
  const target = useMotionValue(activeIndex);
  const spring = useSpring(target, { stiffness: 230, damping: 30, mass: 0.8 });
  const position = reducedMotion ? target : spring;
  const [travel, setTravel] = useState(300);
  const count = items.length;

  useEffect(() => { callbacks.current = { onChange, onStep }; }, [onChange, onStep]);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setTravel(entry.contentRect.height * 0.375));
    observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!count) return;
    return position.on('change', value => {
      const next = wrap(Math.round(value), count);
      if (next !== emittedIndex.current) {
        emittedIndex.current = next;
        callbacks.current.onChange?.(next);
        if (!autoStepping.current) callbacks.current.onStep?.();
      }
    });
  }, [position, count]);

  // Dot navigation uses the nearest equivalent index so the reel also loops at its ends.
  useEffect(() => {
    if (!count || activeIndex === emittedIndex.current) return;
    clearTimeout(snapTimer.current);
    emittedIndex.current = activeIndex;
    const current = target.get();
    const nearest = current + wrap(activeIndex - current + count / 2, count) - count / 2;
    target.set(nearest);
  }, [activeIndex, count, target]);

  // Idle auto-advance: silent, paused while a gesture is in progress or with reduced motion.
  useEffect(() => {
    if (!idleInterval || !count || reducedMotion) return;
    lastInteraction.current = performance.now();
    const id = setInterval(() => {
      if (gesture.current || document.hidden) return;
      if (performance.now() - lastInteraction.current < idleInterval) return;
      autoStepping.current = true;
      target.set(Math.round(target.get()) + 1);
      lastInteraction.current = performance.now();
      setTimeout(() => {
        autoStepping.current = false;
      }, 900);
    }, 500);
    return () => clearInterval(id);
  }, [idleInterval, count, reducedMotion, target]);

  useEffect(() => {
    const stage = stageRef.current;
    const onWheel = event => {
      event.preventDefault();
      if (!count) return;
      lastInteraction.current = performance.now();
      clearTimeout(snapTimer.current);
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? stage.clientHeight : 1;
      const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      target.set(target.get() + clamp(delta * unit / (travel * 1.25), -0.8, 0.8));
      snapTimer.current = setTimeout(() => target.set(Math.round(target.get())), 140);
    };
    stage.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      stage.removeEventListener('wheel', onWheel);
      clearTimeout(snapTimer.current);
    };
  }, [target, travel, count]);

  const endGesture = (event, cancelled = false) => {
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    if (!cancelled) {
      const delta = event.clientY - start.y;
      const elapsed = Math.max(performance.now() - start.time, 1);
      const momentum = elapsed < 350 ? clamp(delta / elapsed * 0.2, -0.45, 0.45) : 0;
      target.set(Math.round(target.get() + momentum));
    } else {
      target.set(Math.round(target.get()));
    }
    gesture.current = null;
    if (stageRef.current.hasPointerCapture(event.pointerId)) stageRef.current.releasePointerCapture(event.pointerId);
  };

  return (
    <div
      ref={stageRef}
      className="mobile-card-stage"
      aria-roledescription="carousel"
      aria-label="Portfolio sections"
      onPointerDown={event => {
        if (!event.isPrimary || event.button !== 0) return;
        lastInteraction.current = performance.now();
        clearTimeout(snapTimer.current);
        suppressClick.current = false;
        gesture.current = { id: event.pointerId, y: event.clientY, position: target.get(), time: performance.now() };
      }}
      onPointerMove={event => {
        const start = gesture.current;
        if (!start || start.id !== event.pointerId) return;
        const delta = event.clientY - start.y;
        if (Math.abs(delta) > 8) {
          suppressClick.current = true;
          stageRef.current.setPointerCapture(event.pointerId);
          target.set(start.position + delta / travel);
        }
      }}
      onPointerUp={event => endGesture(event)}
      onPointerCancel={event => endGesture(event, true)}
      onKeyDown={event => {
        if (!count || !['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'].includes(event.key)) return;
        event.preventDefault();
        lastInteraction.current = performance.now();
        clearTimeout(snapTimer.current);
        target.set(Math.round(target.get()) + (['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1));
      }}
    >
      <div className="mobile-card-stage__origin">
        {items.map((item, index) => (
          <ReelCard
            key={item.id}
            item={item}
            index={index}
            count={count}
            position={position}
            travel={travel}
            active={index === activeIndex}
            onOpen={(selected, selectedIndex, event) => {
              if (!suppressClick.current && Math.abs(position.get() - Math.round(position.get())) < 0.08) {
                onCardClick?.(selected, selectedIndex, event);
              }
              suppressClick.current = false;
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileCardStage;
