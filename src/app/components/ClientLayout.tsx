"use client"

import type React from "react"
import type { ReactNode } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import MobileDrawer from "./MobileDrawer"
import DesktopSidebar from "./DesktopSidebar"

type ClientLayoutProps = {
  children: ReactNode
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const index = searchParams.get("index")
  const isImageViewer = index !== null

  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${isImageViewer ? 'overflow-hidden' : ''}`}>
      {/* Mobile Navigation */}
      <MobileDrawer />

      {/* Sidebar for larger screens */}
      <DesktopSidebar />

      {/* Main Content */}
      <main 
        className={`flex-1 ${isImageViewer ? 'overflow-hidden' : 'p-5 md:p-8'} transition-all duration-300 md:mr-64`}
      >
        {children}
      </main>
    </div>
  )
}

export default ClientLayout