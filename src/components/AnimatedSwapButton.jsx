"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

export default function AnimatedSwapButton({
  href,
  onClick,
  children = "Contact Us",
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
      inline-flex items-center justify-center gap-2
      rounded-2xl font-semibold text-black text-center leading-none
      whitespace-nowrap
      shadow-[0_8px_30px_rgba(0,0,0,0.25)]
      ${sizeCls} ${className}
    `,
    "aria-label": typeof children === "string" ? children : "button",
  };

  const Arrow = (
    <motion.span
      layout
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className={`grid size-6 place-items-center ${
        hovered ? "order-1" : "order-2"
      }`}
    >
      <MdOutlineKeyboardDoubleArrowRight size={24} className="text-[#262626]" />
    </motion.span>
  );

  const Label = (
    <motion.span
      layout
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className={`${hovered ? "order-2" : "order-1"} text-center`}
    >
      {children}
    </motion.span>
  );

  if (href) {
    // Note: className comes from commonProps; remove the extra className here so it doesn't get overridden
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
