"use client";

import { RefObject, useEffect, useRef, useState } from "react";

export function useElementWidth<T extends HTMLElement>(): [number, RefObject<T | null>] {
  const [width, setWidth] = useState(0);
  const ComponentRef = useRef<T>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (ComponentRef.current) {
        setWidth(ComponentRef.current.offsetWidth);
      }
    };

    updateWidth();

    const handleResize = () => {
      window.requestAnimationFrame(updateWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [ComponentRef.current]);

  return [width, ComponentRef] as const;
}
