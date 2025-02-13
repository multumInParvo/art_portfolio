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
    <div className=" mb-10 flex flex-col">
      <div
        className="relative cursor-pointer flex flex-col items-center gap-4"
        onClick={handleClick}
        style={{ maxWidth: "1200px", width: "100%" }}
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
              objectPosition: "left", // Align content to the left
            }}
            priority
          />
        </div>

        {/* Information */}
        <div className="text-left w-full font-nunito text-sm space-y-1">
          <h2>{painting.title}</h2>
          <p>{painting.year}</p>
          <p>oil on canvas</p>
          <p>{painting.dimensions}</p>
        </div>
      </div>
    </div>
  )
}

export default PaintingDisplay

