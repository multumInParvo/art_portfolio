"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { paintings } from "../data/paintings"
import { motion, AnimatePresence } from "framer-motion"

export default function ImageViewerClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentIndex, setCurrentIndex] = useState(0)
  const imageRef = useRef<HTMLDivElement>(null)
  const [imageHeight, setImageHeight] = useState(0)

  useEffect(() => {
    const index = Number(searchParams.get("index") || 0)
    setCurrentIndex(index)
  }, [searchParams])

  useEffect(() => {
    const updateImageHeight = () => {
      if (imageRef.current) {
        const img = imageRef.current.querySelector("img")
        if (img) {
          setImageHeight(img.offsetHeight)
        }
      }
    }

    updateImageHeight()
    window.addEventListener("resize", updateImageHeight)
    return () => window.removeEventListener("resize", updateImageHeight)
  }, [])

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
    <div className="fixed inset-y-0 right-0 left-64 bg-white dark:bg-gray-900 flex z-40">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeViewer}></div>
      <div className="relative z-10 flex w-full bg-white dark:bg-gray-900">
        {/* Thumbnails Section */}
        <div className="w-36 h-full overflow-y-auto border-r border-gray-200 dark:border-gray-800 py-4">
          <div className="space-y-2 px-2">
            {paintings.map((painting, index) => (
              <div
                key={index}
                className={`relative cursor-pointer transition-opacity hover:opacity-80 ${
                  index === currentIndex ? "ring-2 ring-black dark:ring-white" : ""
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                <Image
                  src={painting.src || "/placeholder.svg"}
                  alt={painting.title}
                  width={120}
                  height={90}
                  className="object-cover w-full aspect-[4/3]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex flex-col justify-end w-24 border-x border-gray-200 dark:border-gray-800">
          <div className="flex justify-center items-center space-x-2 py-4">
            <button
              onClick={() => navigate(-1)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={closeViewer}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Close viewer"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigate(1)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Main Image Display */}
        <div className="flex-1 h-full flex flex-col justify-center mb-4 mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
              className="flex flex-col justify-center w-full h-full"
            >
              {/* Image Container */}
              <div ref={imageRef} className="relative w-full flex-col max-h-full left-5">
                <Image
                  src={currentPainting.src || "/placeholder.svg"}
                  alt={currentPainting.title}
                  className="object-contain object-left-center max-h-[calc(100%-146px)] w-auto"
                  width={2500}
                  height={2500}
                  priority
                />
                {/* Text Container */}
                <div className="w-full mt-5">
                  <h2 className="text-xl font-semibold">{currentPainting.title}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{currentPainting.year}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">oil on canvas</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{currentPainting.dimensions}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

