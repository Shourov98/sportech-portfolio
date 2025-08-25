"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function EdgeSoftOrbsTop({
  size = 260, // px diameter
  duration = 48, // seconds per lap
  intensity = 0.55, // overall opacity multiplier
  zIndex = 2147483000,
  blend = "screen",
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const half = size / 2; // Calculate half the size for positioning

  return createPortal(
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex }}
      aria-hidden="true"
    >
      {/* Orb A */}
      <div
        className="edge-orb edge-orb-soft"
        style={{
          "--orb-size": `${size}px`,
          "--orb-half": `${half}px`,
          "--orb-duration": `${duration}s`,
          "--orb-opacity": intensity,
          mixBlendMode: blend,
        }}
      />
      {/* Orb B (opposite phase) */}
      <div
        className="edge-orb edge-orb-soft edge-orb-b"
        style={{
          "--orb-size": `${size}px`,
          "--orb-half": `${half}px`,
          "--orb-duration": `${duration}s`,
          "--orb-opacity": intensity,
          mixBlendMode: blend,
        }}
      />

      <style jsx global>{`
        .edge-orb {
          position: absolute;
          top: 0;
          left: 0;
          width: var(--orb-size);
          height: var(--orb-size);
          border-radius: 9999px;
          will-change: transform;
          animation: edge-orbit var(--orb-duration) linear infinite both;
        }

        .edge-orb-soft {
          opacity: var(--orb-opacity, 0.55);
          background: radial-gradient(
            circle at 50% 50%,
            rgba(237, 249, 0, 0.35) 0%,
            rgba(237, 249, 0, 0.2) 40%,
            rgba(237, 249, 0, 0.08) 68%,
            rgba(237, 249, 0, 0) 82%
          );
          box-shadow: 0 0 28px 10px rgba(237, 249, 0, 0.1);
          filter: blur(0.8px) saturate(1);
        }

        .edge-orb-b {
          animation-delay: calc(var(--orb-duration) / -2);
        }

        /* KEY CHANGE: Position center of orb on screen edges */
        @keyframes edge-orbit {
          0% {
            transform: translate3d(
              calc(-1 * var(--orb-half)),
              calc(-1 * var(--orb-half)),
              0
            ); /* Top-Left: Half above, half left of screen */
          }
          25% {
            transform: translate3d(
              calc(100vw - var(--orb-half)),
              calc(-1 * var(--orb-half)),
              0
            ); /* Top-Right: Half above, half right of screen */
          }
          50% {
            transform: translate3d(
              calc(100vw - var(--orb-half)),
              calc(100vh - var(--orb-half)),
              0
            ); /* Bottom-Right: Half below, half right of screen */
          }
          75% {
            transform: translate3d(
              calc(-1 * var(--orb-half)),
              calc(100vh - var(--orb-half)),
              0
            ); /* Bottom-Left: Half below, half left of screen */
          }
          100% {
            transform: translate3d(
              calc(-1 * var(--orb-half)),
              calc(-1 * var(--orb-half)),
              0
            ); /* Back to Top-Left */
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .edge-orb {
            animation: none;
          }
        }
      `}</style>
    </div>,
    document.body
  );
}
