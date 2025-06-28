"use client"

import { usePathname } from "next/navigation"
import { Footer } from "./footer"

export function FooterWrapper() {
  const pathname = usePathname()
  const showFooter = pathname !== "/chat"

  if (!showFooter) return null

  return <Footer />
} 