import { useState } from "react";

/**
 * Renders a partner logo at a consistent *visual* size.
 *
 * Logo files arrive in every proportion — wide wordmarks, square badges — so a
 * fixed height makes square marks tiny and a fixed width makes wordmarks huge.
 * Instead each logo gets the same area: height = sqrt(area / aspect), capped
 * by the box it sits in.
 */
export function LogoImg({ src, alt, area = 2400, maxWidth = 150, maxHeight = 56, className = "", style }) {
  const [size, setSize] = useState(null);

  const onLoad = (event) => {
    const { naturalWidth: w, naturalHeight: h } = event.currentTarget;
    if (!w || !h) return;
    const aspect = w / h;
    let height = Math.sqrt(area / aspect);
    let width = height * aspect;
    if (width > maxWidth) {
      width = maxWidth;
      height = width / aspect;
    }
    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspect;
    }
    setSize({ width: Math.round(width), height: Math.round(height) });
  };

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={onLoad}
      className={`object-contain ${className}`}
      style={{ ...(size ?? { height: 24, width: "auto" }), ...style }}
    />
  );
}
