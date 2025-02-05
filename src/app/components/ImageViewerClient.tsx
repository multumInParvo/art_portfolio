"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { paintings } from "../data/paintings"
import { motion, AnimatePresence } from "framer-motion"

export default function ImageViewerClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const index = Number(searchParams.get("index") || 0)
    setCurrentIndex(index)
  }, [searchParams])

  const closeViewer = useCallback(() => {
    router.push("/")
  }, [router])

  const navigate = useCallback((newDirection: number) => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection
      if (newIndex < 0) newIndex = paintings.length - 1
      if (newIndex >= paintings.length) newIndex = 0
      return newIndex
    })
  }, [])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") navigate(-1)
      if (event.key === "ArrowRight") navigate(1)
      if (event.key === "Escape") closeViewer()
    },
    [navigate, closeViewer],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const currentPainting = paintings[currentIndex]

  return (
    <div className="fixed inset-y-0 right-0 w-[calc(100%-16rem)] bg-white dark:bg-gray-900 flex flex-col">
      <button
        onClick={closeViewer}
        className="absolute top-4 right-4 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-label="Close viewer"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="h-full flex flex-col items-center justify-center py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="flex flex-col items-start"
          >
            {/* Image Container */}
            <div className="bg-gray-100 dark:bg-gray-800 p-8">
              <div className="relative">
                <Image
                  src={currentPainting.src || "/placeholder.svg"}
                  alt={currentPainting.title}
                  width={800}
                  height={600}
                  style={{
                    width: "auto",
                    height: "auto",
                    maxHeight: "calc(100vh - 280px)",
                    objectFit: "contain",
                  }}
                  priority
                />
              </div>
            </div>

            {/* Painting Information - Now Properly Aligned with the Left Edge */}
            <div className="mt-3 max-w-[800px]">
              <h2 className="text-xl font-semibold">{currentPainting.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">{currentPainting.year}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">oil on canvas</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{currentPainting.dimensions}</p>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-6 flex items-center justify-between w-full max-w-2xl px-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate(1)}
                className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
