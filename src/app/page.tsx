"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { paintings } from "./data/paintings"
import PaintingDisplay from "./components/PaintingDisplay"
import ThumbnailsPage from "./thumbnails/page"
import ImageViewerClient from "./components/ImageViewerClient"
import ContactPage from "./contact/page"
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const [view, setView] = useState<"main" | "thumbnails" | "imageViewer" | "contact">("main")
  const searchParams = useSearchParams()

  useEffect(() => {
    const index = searchParams.get("index")
    if (index) {
      setView("imageViewer")
    } else {
      setView("main")
    }
  }, [searchParams])

  return (
    <div className="flex min-h-screen">
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          {view === "main" && (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl mx-auto px-4 py-8"
            >
              {paintings.map((painting, index) => (
                <PaintingDisplay key={index} painting={painting} index={index} />
              ))}
            </motion.div>
          )}
          {view === "thumbnails" && (
            <motion.div
              key="thumbnails"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pt-16"
            >
              <ThumbnailsPage />
            </motion.div>
          )}
          {view === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ContactPage />
            </motion.div>
          )}
          {view === "imageViewer" && (
            <motion.div
              key="imageViewer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40" // Updated className
            >
              <ImageViewerClient />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

