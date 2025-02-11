"use client"

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col items-center md:max-w-3xl">
      <div className="w-full md:hidden">
        <h1 className="text-2xl mb-2 mt-0 font-nunito md:text-3xl md:mb-10 border-b dark:border-gray-700">About</h1>
      </div>

      <div className="flex flex-col gap-8 md:gap-14 mt-6 md:flex-row md:mt-0">
        <div className="w-full space-y-4">
          <p className="text-sm md:text-base font-semibold font-nunito">
            Born in 1987, Ukraine, raised in Argentina, and living in France.
          </p>
          <p className="text-sm md:text-base font-semibold font-nunito">
            Through my self-taught practice, I create theatrical still-life compositions that transform everyday
            objects—figurines, plants, and domestic items—into intimate narratives. By exploring the interplay of light,
            shadow, and a carefully curated, limited color palette to create harmonious color relationships, I aim to
            evoke curiosity and a quiet sense of mystery.
          </p>
          <p className="text-sm md:text-base font-semibold font-nunito">
            Working with layered oil paints, my work reflects themes of stillness, nostalgia, and connection. Rooted in
            my surroundings and personal experiences, I strive to reveal beauty in simplicity and invite viewers to
            pause, reflect, and discover their own interpretations within the quiet drama of everyday moments.
          </p>
        </div>
      </div>
    </div>
  )
}

