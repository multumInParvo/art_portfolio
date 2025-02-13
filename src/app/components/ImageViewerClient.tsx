"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { paintings } from "../data/paintings";
import gsap from "gsap";

export default function ImageViewerClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    const index = Number(searchParams.get("index") || 0);
    setCurrentIndex(index);
  }, [searchParams]);

  useEffect(() => {
    const updateImageHeight = () => {
      if (imageRef.current) {
        const img = imageRef.current.querySelector("img");
        if (img) {
          setImageHeight(img.offsetHeight);
        }
      }
    };

    updateImageHeight();
    window.addEventListener("resize", updateImageHeight);
    return () => window.removeEventListener("resize", updateImageHeight);
  }, []);

  const closeViewer = useCallback(() => {
    router.push("/");
  }, [router]);

  const navigate = useCallback((newDirection: number) => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = paintings.length - 1;
      if (newIndex >= paintings.length) newIndex = 0;
      return newIndex;
    });
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") navigate(-1);
      if (event.key === "ArrowRight") navigate(1);
      if (event.key === "Escape") closeViewer();
    },
    [navigate, closeViewer]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [currentIndex]);

  const currentPainting = paintings[currentIndex];

  return (
    <div className="fixed inset-y-0 right-0 left-64 bg-white dark:bg-gray-900 flex z-40">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeViewer}></div>
      <div className="relative z-10 flex w-full bg-white dark:bg-gray-900">
        <div className="w-24 h-full overflow-y-auto py-4">
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
                  width={80}
                  height={60}
                  className="object-cover w-full"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-end w-24">
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

        <div className="flex-1 h-full flex flex-col justify-center items-center p-6">
          <div ref={imageRef} className="relative flex flex-col items-center max-h-full">
            <div className="flex justify-center">
              <Image
                src={currentPainting.src || "/placeholder.svg"}
                alt={currentPainting.title}
                className="object-contain max-h-[calc(100vh-150px)] w-auto"
                width={2500}
                height={2500}
                priority
              />
            </div>
            <div className="self-start mt-5 font-nunito text-sm space-y-1">
              <h2>{currentPainting.title}</h2>
              <p>{currentPainting.year}</p>
              <p>oil on canvas</p>
              <p>{currentPainting.dimensions}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}