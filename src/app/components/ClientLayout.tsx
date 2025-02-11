"use client"

import type React from "react"
import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import MobileDrawer from "./MobileDrawer"
import DesktopSidebar from "./DesktopSidebar"

type ClientLayoutProps = {
  children: ReactNode
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const pathname = usePathname()
  const isImageViewer = pathname === "/image-viewer"

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Navigation */}
      <MobileDrawer />

      {/* Sidebar for larger screens */}
      <DesktopSidebar />

      {/* Main Content */}
      <main className={`flex-1 ${isImageViewer ? "" : "p-5 md:p-8"} transition-all duration-300 md:ml-64`}>
        {children}
      </main>
    </div>
  )
}

export default ClientLayout

