"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Two #EDF900 orbs that orbit along the inside screen edge,
 * rendered in a portal with ultra-high z-index so they glow over EVERYTHING.
 */
export default function EdgeGlowOrbsTop({
  size = 300, // px diameter of each orb
  duration = 48, // seconds per full lap (larger = slower)
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 2147483647 }} // max-ish; sits above any app/UI layers
      aria-hidden="true"
    >
      {/* Orb A */}
      <div
        className="edge-orb edge-orb-yellow edge-orb-a"
        style={{ "--orb-size": `${size}px`, "--orb-duration": `${duration}s` }}
      />
      {/* Orb B (opposite phase, same direction) */}
      <div
        className="edge-orb edge-orb-yellow edge-orb-b"
        style={{ "--orb-size": `${size}px`, "--orb-duration": `${duration}s` }}
      />

      <style jsx global>{`
        .edge-orb {
          position: absolute;
          top: 0;
          left: 0;
          width: var(--orb-size);
          height: var(--orb-size);
          border-radius: 9999px;
          will-change: transform, opacity, filter;
          animation: edge-orbit var(--orb-duration) linear infinite both;
        }
        /* Bright #EDF900 with additive glow over everything */
        .edge-orb-yellow {
          background: radial-gradient(
            circle at 50% 50%,
            rgba(237, 249, 0, 0.95) 0%,
            rgba(237, 249, 0, 0.55) 15%,
            rgba(237, 249, 0, 0.18) 25%,
            rgba(237, 249, 0, 0) 30%
          );
          mix-blend-mode: screen; /* sit above and brighten content */
          filter: blur(1px) saturate(1.15);
          box-shadow: 0 0 80px 30px rgba(237, 249, 0, 0.45),
            0 0 180px 90px rgba(237, 249, 0, 0.25);
        }
        /* B starts halfway around */
        .edge-orb-b {
          animation-delay: calc(var(--orb-duration) / -2);
        }

        /* inside-edge path (infinite) */
        @keyframes edge-orbit {
          0% {
            transform: translate3d(0, 0, 0);
          }
          25% {
            transform: translate3d(calc(100vw - var(--orb-size)), 0, 0);
          }
          50% {
            transform: translate3d(
              calc(100vw - var(--orb-size)),
              calc(100vh - var(--orb-size)),
              0
            );
          }
          75% {
            transform: translate3d(0, calc(100vh - var(--orb-size)), 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
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
