"use client"

import { useEffect, useState } from "react"

export const useIsScrolled = (threshold: number) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(scrollY > threshold)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [threshold])

  return isScrolled
}
