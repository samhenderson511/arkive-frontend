"use client";

import { useEffect, useState } from "react";

/**
 * Custom hook that returns a boolean indicating whether the page has been scrolled beyond a specified threshold.
 *
 * @param threshold - The threshold value to determine if the page has been scrolled beyond.
 * @returns A boolean value indicating whether the page has been scrolled beyond the threshold.
 */
export const useIsScrolled = (threshold: number) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return isScrolled;
};
