import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col items-center md:ml-16 md:pr-16 md:max-w-3xl">
      <div className="w-full">
        <h1 className='text-2xl mb-2 mt-0 font-playfair md:text-3xl md:mb-10 border-b text-gray-800 dark:text-gray-100 dark:border-gray-700'>
          About
        </h1>
      </div>

      <div className="flex flex-col gap-8 md:gap-14 mt-6 md:flex-row">
        <div className="w-full">
          <p className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300 font-nunito">
            Oleksandr Pryvalov (born 1987) spent his childhood in Mykolaiv, Ukraine, but his artistic passion grew in Argentina after immigrating there with his parents.
            While exploring various interests in his youth, art, particularly drawing and painting, remained a constant.
            As a self-taught artist, Pryvalov&apos;s fascination with capturing the world visually became a defining force in his life.
            Finally, in France, he met the conditions to take oil painting to a serious level.
          </p>
        </div>

        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-[364px]">
            <Image
              src="/images/artist.webp"
              alt="Artist"
              width={364}
              height={364}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}