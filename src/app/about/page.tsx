import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="flex flex-col items-left w-full ml-10">
      <h1 className="text-2xl mb-20">About</h1>
      <div className="flex flex-col w-full items-start p-0 gap-14">
        <p className="font-proxima max-w-2xl text-start leading-loose">
          Oleksandr Pryvalov (born 1987) spent his childhood in Mykolaiv, Ukraine, but his artistic passion grew in Argentina after immigrating there with his parents. 
          While exploring various interests in his youth, art, particularly drawing and painting, remained a constant. 
          As a self-taught artist, Pryvalov&apos;s fascination with capturing the world visually became a defining force in his life. 
          Finally, in France, he met the conditions to take oil painting to a serious level.
        </p>
        <Image
          src="/images/artist.webp"
          alt="Artist"
          width={364} 
          height={364} 
        />
      </div>
    </div>
  );
}
