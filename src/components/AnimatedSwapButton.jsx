"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/**
 * AnimatedSwapButton
 * - On hover: bg animates to hoverColor, the arrow chip slides to the front (left)
 * - On exit: everything reverses smoothly
 *
 * Props:
 *  - href?: string (renders <a> when provided; otherwise a <button>)
 *  - onClick?: () => void
 *  - children: label text (e.g., "Contact Us")
 *  - arrow: string | ReactNode (default: »)
 *  - baseColor: string (default: "#EDF900")
 *  - hoverColor: string (default: "#22c55e") // Tailwind green-500
 *  - size: "sm" | "md" | "lg" (padding + font-size)
 *  - className?: string (append more Tailwind utilities, e.g. "w-full")
 */
export default function AnimatedSwapButton({
  href,
  onClick,
  children = "Contact Us",
  arrow = "»",
  baseColor = "#EDF900",
  hoverColor = "#22c55e",
  size = "md",
  className = "",
  type = "button",
}) {
  const [hovered, setHovered] = useState(false);

  const sizeCls =
    size === "sm"
      ? "px-4 py-2 text-sm"
      : size === "lg"
      ? "px-7 py-3.5 text-base md:text-lg"
      : "px-6 py-3 text-sm md:text-base";

  const commonProps = {
    onHoverStart: () => setHovered(true),
    onHoverEnd: () => setHovered(false),
    whileTap: { scale: 0.98 },
    animate: { backgroundColor: hovered ? hoverColor : baseColor },
    transition: { type: "spring", stiffness: 260, damping: 26 },
    className: `
      inline-flex items-center rounded-2xl font-semibold text-black
      shadow-[0_8px_30px_rgba(0,0,0,0.25)]
      ${sizeCls} ${className}
    `,
    "aria-label": typeof children === "string" ? children : "button",
  };

  const Arrow = (
    <motion.span
      layout
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className={
        hovered
          ? "order-1 mr-2 grid size-6 place-items-center rounded-md bg-black/85 text-white"
          : "order-2 ml-2 grid size-6 place-items-center rounded-md bg-black/85 text-white"
      }
    >
      {arrow}
    </motion.span>
  );

  const Label = (
    <motion.span
      layout
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className={hovered ? "order-2" : "order-1"}
    >
      {children}
    </motion.span>
  );

  // Render <a> when href is provided; otherwise render <button>
  if (href) {
    return (
      <motion.a href={href} {...commonProps}>
        {Arrow}
        {Label}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} {...commonProps}>
      {Arrow}
      {Label}
    </motion.button>
  );
}
