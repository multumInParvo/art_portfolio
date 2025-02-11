import Image from "next/image"
import type { Painting } from "../data/paintings"
import type React from "react"
import { useRouter } from "next/navigation"

interface PaintingDisplayProps {
  painting: Painting
  index: number
}

const PaintingDisplay: React.FC<PaintingDisplayProps> = ({ painting, index }) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/?index=${index}`)
  }

  return (
    <div className="mb-16 flex flex-col items-start">
      <div
        className="relative cursor-pointer flex flex-col items-center gap-6"
        onClick={handleClick}
        style={{ maxWidth: "800px", width: "100%" }}
      >
        {/* Image */}
        <div
          className="relative w-full"
          style={{
            aspectRatio: "4 / 3", // Maintain a 4:3 aspect ratio
            minWidth: "380px", // Minimum width for responsiveness
            minHeight: "285px", // Proportional to 4:3 ratio at min-width
          }}
        >
          <Image
            src={painting.src || "/placeholder.svg"}
            alt={painting.title}
            fill
            style={{
              objectFit: "contain",
              objectPosition: "left center", // Align content to the left
            }}
            priority
          />
        </div>

        {/* Information */}
        <div className="text-left w-full">
          <h2 className="text-xl mb-2">{painting.title}</h2>
          <p className="text-gray-600">{painting.year}</p>
          <p className="text-gray-600">oil on canvas</p>
          <p className="text-gray-600">{painting.dimensions}</p>
        </div>
      </div>
    </div>
  )
}

export default PaintingDisplay

