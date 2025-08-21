"use client";
import { useEffect, useRef } from "react";

/**
 * Responsive background built from your individual SVG files.
 * - Coordinates are EXACT for a 1440×1024 artboard.
 * - We compute a scale so the composition matches at any width.
 * - Everything is clipped to the hero and behind content.
 *
 * Put your SVGs in public/home/ exactly as named below.
 */
export default function HeroBackground() {
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current?.parentElement; // the <section> wrapper
    if (!el) return;

    const updateScale = () => {
      // Scale by the hero's current width vs the 1440px design width,
      // but don't upscale above 1 to keep the original design crisp.
      const s = Math.min(1, el.clientWidth / 1440);
      // Keep it readable on medium screens (floor ~0.68 feels right for 1024px)
      const clamped = Math.max(0.68, s);
      el.style.setProperty("--hero-scale", clamped);
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    window.addEventListener("orientationchange", updateScale);
    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", updateScale);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Centered & scaled artboard */}
      <div className="hero-artboard">
        {/* Right.svg */}
        <img
          src="/home/RightCircle.svg"
          alt=""
          className="absolute"
          style={{
            top: -147,
            left: 841,

            opacity: 1,
          }}
          draggable="false"
          decoding="async"
        />

        {/* UnionBottom.svg (bottomcircle in figma) */}
        <img
          src="/home/UnionBottom.svg"
          alt=""
          className="absolute"
          style={{
            top: 704,
            left: -155,
            rotate: "-10deg",
            opacity: 1,
          }}
          draggable="false"
          decoding="async"
        />

        {/* <img
          src="/home/RightCircle.svg"
          alt=""
          className="absolute"
          style={{
            top: -100,
            left: 850,
            rotate: "20deg",
          }}
          draggable="false"
          decoding="async"
        /> */}

        {/* bigRectangle.svg */}
        <img
          src="/home/bigRectangle.svg"
          alt=""
          className="absolute"
          style={{
            top: -285.87,
            left: -85,

            opacity: 1,
          }}
          draggable="false"
          decoding="async"
        />

        {/* bar.svg (thin vertical line + dot) */}
        <img
          src="/home/bar.svg"
          alt=""
          className="absolute"
          style={{
            top: 548,
            left: 1322,

            opacity: 1,
          }}
          draggable="false"
          decoding="async"
        />

        {/* spiral.svg (neon rounded stroke) */}
        <img
          src="/home/spiral.svg"
          alt=""
          className="absolute"
          style={{
            top: 629,
            left: 100,
            opacity: 1,
          }}
          draggable="false"
          decoding="async"
        />

        <img
          src="/home/globe.svg"
          alt=""
          className="absolute"
          style={{
            top: 484,
            left: 480,
            width: 509,
            height: 509,
            opacity: 10,
          }}
          draggable="false"
          decoding="async"
        />

        {/* bottomCircle.svg (496×496 group on the right) */}
        <img
          src="/home/bottomCircle.svg"
          alt=""
          className="absolute"
          style={{
            top: 726,
            right: -50,
            opacity: 1,
          }}
          draggable="false"
          decoding="async"
        />

        {/* vector.svg (four-curve cluster) */}
        <img
          src="/home/vector.svg"
          alt=""
          className="absolute"
          style={{ top: 884, left: 136, opacity: 1 }}
          draggable="false"
          decoding="async"
        />

        {/* StarWhite.svg */}
        <img
          src="/home/StarWhite.svg"
          alt=""
          className="absolute"
          style={{
            top: 419,
            left: 1296,

            opacity: 1,
          }}
          draggable="false"
          decoding="async"
        />
      </div>
    </div>
  );
}
