import { useEffect, useRef } from 'react';
import './InfiniteSpiral.css';

// InfiniteSpiral with smooth continuous physics (wheel, touch, drag)
// and original card proportion/fitting calculations.

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const modulo = (value, divisor) => ((value % divisor) + divisor) % divisor;
const smoothstep = (min, max, value) => {
  const x = clamp((value - min) / (max - min || 1), 0, 1);
  return x * x * (3 - 2 * x);
};

// Flywheel feel: input adds speed instead of jumping position, and friction bleeds it off.
// FRICTION is the decay rate per second (about a 1s coast), WHEEL_GAIN how far a scroll throws the wheel.
const FRICTION = 1.1;
const WHEEL_GAIN = 1.3;
const MAX_SPIN = 7; // cards per second

const InfiniteSpiral = ({
  items = [],
  speed = 0.55,
  direction = 'up',
  animationMode = 'scroll',
  radius = 200,
  cardWidth = 300,
  cardHeight = 190,
  verticalSpacing = 140,
  perspective = 1000,
  cardsPerTurn = 5,
  rotation = 0,
  cardTilt = 0,
  cardRadius = 24,
  centerScale = 1.15,
  edgeFade = 0.3,
  edgeBlur = 6,
  pauseOnHover = true,
  onActiveIndexChange,
  onStep,
  onCardClick,
  stepsPerCard = 4,
  // Idle drift: cards per second the spiral moves on its own after `idleDelay` ms without input (0 = off).
  idleSpeed = 0,
  idleDelay = 2500,
  hiddenCardId = null,
  className = '',
}) => {
  const rootRef = useRef(null);
  const cardRefs = useRef([]);
  const hiddenCardIdRef = useRef(hiddenCardId);
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const autoSpeedRef = useRef(0);
  const hoveredRef = useRef(false);
  const visibleRef = useRef(true);
  const draggingRef = useRef(false);
  const lastPointerYRef = useRef(0);
  const pointerStartXRef = useRef(0);
  const pointerStartYRef = useRef(0);
  const dragMovedRef = useRef(false);
  const lastActiveIndexRef = useRef(-1);
  const lastStepRef = useRef(null);
  const lastInteractionRef = useRef(0);
  const dragVelocityRef = useRef(0);
  const lastPointerTimeRef = useRef(0);

  useEffect(() => {
    hiddenCardIdRef.current = hiddenCardId;
  }, [hiddenCardId]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || items.length === 0) return;

    let frameId;
    let previousTime = performance.now();
    // Layout size (not getBoundingClientRect) so a CSS zoom on an ancestor doesn't skew the fit math.
    const measure = () => ({ width: root.clientWidth, height: root.clientHeight });
    let bounds = measure();
    lastInteractionRef.current = performance.now();
    const markInteraction = () => {
      lastInteractionRef.current = performance.now();
    };
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const scrollEnabled = animationMode === 'scroll' || animationMode === 'all';
    const scrollSpeedMultiplier = Math.max(speed, 0) / 0.55;

    const resizeObserver = new ResizeObserver(() => {
      bounds = measure();
    });
    resizeObserver.observe(root);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );
    intersectionObserver.observe(root);

    // Direct wheel handler
    const handleWheel = (e) => {
      if (!scrollEnabled || !visibleRef.current) return;
      markInteraction();
      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 32;
      else if (e.deltaMode === 2) delta *= 100;

      const stepDelta = clamp((delta * scrollSpeedMultiplier) / 400, -1.5, 1.5);
      if (reducedMotion.matches) {
        targetProgressRef.current += stepDelta;
        return;
      }
      // Coasting covers stepDelta * WHEEL_GAIN cards in total: v / FRICTION.
      autoSpeedRef.current = clamp(autoSpeedRef.current + stepDelta * FRICTION * WHEEL_GAIN, -MAX_SPIN, MAX_SPIN);
    };

    // Touch swipe handler for mobile
    let touchLastY = 0;
    let touchLastTime = 0;
    let touchVelocity = 0;
    const handleTouchStart = (e) => {
      if (!scrollEnabled || e.touches.length === 0) return;
      markInteraction();
      touchLastY = e.touches[0].clientY;
      touchLastTime = performance.now();
      touchVelocity = 0;
    };

    const handleTouchMove = (e) => {
      if (!scrollEnabled || e.touches.length === 0) return;
      markInteraction();
      const currentY = e.touches[0].clientY;
      const deltaY = touchLastY - currentY;
      touchLastY = currentY;
      const stepDelta = clamp((deltaY * scrollSpeedMultiplier) / 220, -1.2, 1.2);
      targetProgressRef.current += stepDelta;
      const now = performance.now();
      const dt = Math.max((now - touchLastTime) / 1000, 0.008);
      touchLastTime = now;
      touchVelocity = touchVelocity * 0.6 + (stepDelta / dt) * 0.4;
      autoSpeedRef.current = 0;
    };

    const handleTouchEnd = () => {
      if (!scrollEnabled || reducedMotion.matches) return;
      if (performance.now() - touchLastTime < 90) {
        autoSpeedRef.current = clamp(touchVelocity * 0.8, -MAX_SPIN, MAX_SPIN);
      }
      touchVelocity = 0;
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    const render = (time) => {
      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;

      const autoEnabled = animationMode === 'auto';
      const motionPaused = draggingRef.current || (pauseOnHover && hoveredRef.current);
      const directionMultiplier = direction === 'down' ? -1 : 1;
      const idle = idleSpeed > 0 && !autoEnabled && !draggingRef.current && time - lastInteractionRef.current > idleDelay;
      const cruiseSpeed = autoEnabled ? speed * directionMultiplier : idle ? idleSpeed : 0;
      const desiredAutoSpeed =
        visibleRef.current && !reducedMotion.matches && !motionPaused ? cruiseSpeed : 0;
      if (draggingRef.current) {
        // A hand on the wheel holds it; the pointer moves the spiral directly.
        autoSpeedRef.current = 0;
      } else {
        // Scripted auto mode snaps to speed; the flywheel coasts down with friction.
        const speedBlend = 1 - Math.exp(-delta * (autoEnabled ? 7 : FRICTION));
        autoSpeedRef.current += (desiredAutoSpeed - autoSpeedRef.current) * speedBlend;
      }
      targetProgressRef.current += autoSpeedRef.current * delta;
      // Faster than the idle cruise means someone set it spinning.
      const userSpin = draggingRef.current || Math.abs(autoSpeedRef.current) > Math.max(idleSpeed * 1.6, 0.3);

      const followBlend = 1 - Math.exp(-delta * (draggingRef.current ? 22 : 11));
      progressRef.current += (targetProgressRef.current - progressRef.current) * followBlend;

      const count = items.length;
      const half = count / 2;
      const width = Math.max(bounds.width, 1);
      const height = Math.max(bounds.height, 1);
      
      // Original card fitting calculations
      const fit = Math.min(1, width / (cardWidth * 2.8), height / (cardHeight * 2.35));
      const responsiveRadius = Math.min(radius, Math.max(72, width * 0.36)) * fit;
      const fadeStart = clamp(1 - edgeFade, 0, 0.98);
      const turnSize = Math.max(cardsPerTurn, 1);

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const item = items[index];
        if (hiddenCardIdRef.current && item && item.id === hiddenCardIdRef.current) {
          card.style.opacity = '0';
          card.style.pointerEvents = 'none';
          return;
        }
        let offset = index - progressRef.current;
        offset = modulo(offset + half, count) - half;

        const edge = Math.min(Math.abs(offset) / Math.max(half, 1), 1);
        const opacity = 1 - smoothstep(fadeStart, 1, edge);
        const focus = 1 - Math.min(Math.abs(offset) / Math.max(turnSize * 0.65, 1), 1);
        const scale = (1 + (centerScale - 1) * focus) * fit;
        const angle = offset * (360 / turnSize) + rotation;
        const angleRadians = (angle * Math.PI) / 180;
        const x = Math.sin(angleRadians) * responsiveRadius;
        const z = Math.cos(angleRadians) * responsiveRadius;
        const depthScale = clamp(perspective / Math.max(perspective - z, 1), 0.72, 1.45);
        const visualScale = scale * depthScale;
        const depth = (z / Math.max(responsiveRadius, 1) + 1) / 2;
        const blur = edgeBlur * smoothstep(0.35, 1, edge);

        card.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${offset * verticalSpacing * fit}px, 0) rotateZ(${cardTilt}deg) scale(${visualScale})`;
        card.style.opacity = opacity.toFixed(3);
        card.style.filter = blur > 0.01 ? `blur(${blur.toFixed(2)}px)` : 'none';
        card.style.zIndex = String(Math.round(depth * 100000) + index);
        card.style.pointerEvents = opacity > 0.25 ? 'auto' : 'none';
      });

      if (onActiveIndexChange) {
        // Round first, then wrap: wrapping first can round 4.6 of 5 cards up to 5, an index that does not exist.
        const activeIndex = modulo(Math.round(progressRef.current), count);
        if (activeIndex !== lastActiveIndexRef.current) {
          lastActiveIndexRef.current = activeIndex;
          onActiveIndexChange(activeIndex);
        }
      }

      if (onStep) {
        const stepIndex = Math.floor(progressRef.current * Math.max(stepsPerCard, 1));
        if (lastStepRef.current === null) {
          lastStepRef.current = stepIndex;
        } else if (stepIndex !== lastStepRef.current) {
          // Only tick for user-driven motion; the idle drift stays silent.
          if (Math.abs(stepIndex - lastStepRef.current) < 8 && (!idle || userSpin)) {
            onStep();
          }
          lastStepRef.current = stepIndex;
        }
      }

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [
    items,
    speed,
    direction,
    animationMode,
    radius,
    perspective,
    cardWidth,
    cardHeight,
    verticalSpacing,
    cardsPerTurn,
    rotation,
    cardTilt,
    centerScale,
    edgeFade,
    edgeBlur,
    pauseOnHover,
    onActiveIndexChange,
    onStep,
    idleSpeed,
    idleDelay,
    stepsPerCard,
  ]);

  const rootStyle = {
    perspective: `${perspective}px`,
    '--infinite-spiral-card-width': `${cardWidth}px`,
    '--infinite-spiral-card-height': `${cardHeight}px`,
    '--infinite-spiral-card-radius': `${cardRadius}px`,
    cursor: 'grab',
    touchAction: 'none',
    userSelect: 'none',
  };

  const stopDragging = (event) => {
    // Let go mid-swipe and the wheel keeps the throw.
    if (draggingRef.current && performance.now() - lastPointerTimeRef.current < 90) {
      autoSpeedRef.current = clamp(dragVelocityRef.current * 0.8, -MAX_SPIN, MAX_SPIN);
    }
    dragVelocityRef.current = 0;
    draggingRef.current = false;
    if (event && event.currentTarget) {
      if (typeof event.currentTarget.hasPointerCapture === 'function' && event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      event.currentTarget.style.cursor = 'grab';
    }
  };

  return (
    <div
      ref={rootRef}
      className={`infinite-spiral ${className}`.trim()}
      style={rootStyle}
      onMouseEnter={() => {
        hoveredRef.current = true;
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
      }}
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        pointerStartXRef.current = event.clientX;
        pointerStartYRef.current = event.clientY;
        lastPointerYRef.current = event.clientY;
        lastPointerTimeRef.current = performance.now();
        dragVelocityRef.current = 0;
        dragMovedRef.current = false;
        draggingRef.current = false;
        lastInteractionRef.current = performance.now();
        targetProgressRef.current = progressRef.current;
      }}
      onPointerMove={(event) => {
        if (event.buttons !== 1) return;
        const totalDist = Math.hypot(
          event.clientX - pointerStartXRef.current,
          event.clientY - pointerStartYRef.current
        );

        if (!draggingRef.current && totalDist > 5) {
          draggingRef.current = true;
          dragMovedRef.current = true;
          try {
            event.currentTarget.setPointerCapture(event.pointerId);
          } catch {
            // ignore if not supported
          }
          event.currentTarget.style.cursor = 'grabbing';
        }

        if (draggingRef.current) {
          const pointerDelta = event.clientY - lastPointerYRef.current;
          lastPointerYRef.current = event.clientY;
          const step = -pointerDelta / Math.max(verticalSpacing, 1);
          targetProgressRef.current += step;
          const now = performance.now();
          const dt = Math.max((now - lastPointerTimeRef.current) / 1000, 0.008);
          lastPointerTimeRef.current = now;
          dragVelocityRef.current = dragVelocityRef.current * 0.6 + (step / dt) * 0.4;
        }
      }}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onClickCapture={(event) => {
        if (dragMovedRef.current) {
          event.preventDefault();
          event.stopPropagation();
          dragMovedRef.current = false;
        }
      }}
    >
      <div className="infinite-spiral__stage" role="group" aria-label="Section preview spiral">
        {items.map((item, index) => {
          const Card = item.href ? 'a' : 'div';
          return (
            <Card
              key={item.id ?? index}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              className="infinite-spiral__item"
              style={{ width: cardWidth, height: cardHeight, borderRadius: cardRadius }}
              href={item.href}
              target={item.target}
              rel={item.target === '_blank' ? 'noreferrer' : undefined}
              role={item.href ? undefined : 'button'}
              tabIndex={0}
              onClick={(e) => {
                if (!dragMovedRef.current && onCardClick) {
                  e.stopPropagation();
                  onCardClick(item, index, e);
                }
              }}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !dragMovedRef.current && onCardClick) {
                  e.preventDefault();
                  onCardClick(item, index, e);
                }
              }}
            >
              {item.preview}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default InfiniteSpiral;
