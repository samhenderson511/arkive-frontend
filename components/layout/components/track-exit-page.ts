"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { track } from "@vercel/analytics"

const TrackExitPage = () => {
  const pathname = usePathname()

  useEffect(() => {
    const handleRouteChange = () => {
      sessionStorage.setItem("lastVisited", pathname)
    }

    handleRouteChange()

    return () => {
      const lastVisited = sessionStorage.getItem("lastVisited")
      track("Exit", { lastVisited })
    }
  }, [pathname])

  return null
}

export default TrackExitPage
