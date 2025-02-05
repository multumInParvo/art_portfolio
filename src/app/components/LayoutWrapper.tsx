"use client"

import type React from "react"
import ClientLayout from "./ClientLayout"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return <ClientLayout>{children}</ClientLayout>
}

