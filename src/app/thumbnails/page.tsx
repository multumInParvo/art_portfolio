"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { paintings } from "../data/paintings"
import { useLanguage } from "../context/LanguageContext"
import en from "../translations/en.json"
import fr from "../translations/fr.json"
import { motion } from "framer-motion"

const ThumbnailsPage = () => {
  const { language } = useLanguage()
  const router = useRouter()
  const translations = language === "EN" ? en : fr

  const handleImageClick = (index: number) => {
    router.push(`/?index=${index}`, { scroll: false })
  }

  return (
    <div className="w-full flex flex-col items-start md:ml-[270px] max-w-[calc(100vw-288px)] px-2 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full md:gap-8"
      >
        {paintings.map((painting, index) => (
          <motion.div
            key={painting.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative w-full cursor-pointer transition-all duration-500 ease-in-out active:scale-[0.98]"
            onClick={() => handleImageClick(index)}
            role="button"
            aria-label={`View ${painting.title}`}
          >
            <div className="relative w-full overflow-hidden transition-transform-shadow duration-[900ms] md:group-hover:-translate-y-2 md:group-hover:shadow-[2px_5px_20px_2px_rgba(0,0,0,0.7)] dark:md:group-hover:shadow-[2px_10px_20px_2px_rgba(255,255,255,0.55)] z-10">
              <Image
                src={painting.src || "/placeholder.svg"}
                alt={painting.title}
                width={500}
                height={500}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={index < 4}
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2"
            >
              <h2 className="text-white text-sm md:text-lg font-bold truncate">{painting.title}</h2>
              <p className="text-gray-300 text-xs md:text-sm">
                {`${painting.dimensions}, ${translations.material}, ${painting.year}`}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default ThumbnailsPage

