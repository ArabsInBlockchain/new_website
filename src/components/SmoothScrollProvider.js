"use client";

import { ReactLenis } from 'lenis/react';

export default function SmoothScrollProvider({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothTouch: false }}>
      {children}
    </ReactLenis>
  );
}
