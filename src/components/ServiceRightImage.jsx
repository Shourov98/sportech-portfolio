"use client";

import { useState } from "react";

/**
 * Shows an image with a graceful fallback if loading fails.
 * Keeps DOM event handlers in a Client Component.
 */
export default function ServiceRightImage({
  src,
  alt,
  className = "",
  fallback = "/service/placeholder.png",
}) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl ring-1 ring-white/10 bg-black/20 ${className}`}
    >
      <img
        src={imgSrc}
        alt={alt}
        className="block w-full h-auto"
        onError={() => setImgSrc(fallback)}
      />
    </div>
  );
}
