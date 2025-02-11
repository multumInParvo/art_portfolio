"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { paintings } from "./data/paintings"
import PaintingDisplay from "./components/PaintingDisplay"
import ImageViewerClient from "./components/ImageViewerClient"
import ContactPage from "./contact/page"
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const [view, setView] = useState<"main" | "paintings" | "thumbnails" | "imageViewer" | "contact">("main")
  const searchParams = useSearchParams()

  useEffect(() => {
    const index = searchParams.get("index")
    const view = searchParams.get("view")
    if (index) {
      setView("imageViewer")
    } else if (view === "paintings") {
      setView("paintings")
    } else if (view === "thumbnails") {
      setView("thumbnails")
    } else if (view === "contact") {
      setView("contact")
    } else {
      setView("main")
    }
  }, [searchParams])

  return (
    <div className="flex min-h-screen overflow-hidden">
      <div className="flex-grow ml-64">
        <AnimatePresence mode="wait">
          {view === "main" && (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-[100vh] overflow-hidden"
            >
              <Image 
                src="/images/brushes.JPG" 
                alt="Brushes" 
                layout="fill" 
                objectFit="cover" 
                quality={100} 
                priority
                className="absolute inset-0"
              />
            </motion.div>
          )}
          {view === "paintings" && (
            <motion.div
              key="paintings"
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
              className="max-w-6xl mx-auto px-4 py-8"
            >
              {/* Add your thumbnails view component here */}
            </motion.div>
          )}
          {view === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-[100vh] overflow-hidden"
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
              className="fixed inset-0 z-40"
            >
              <ImageViewerClient />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}