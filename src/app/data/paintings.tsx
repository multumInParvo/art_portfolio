// Define the Painting type
export type Painting = {
    src: string;
    additionalImages: string[];
    title: string;
    description: string;
    dimensions: string;
    material: string;
    year: number;
  };
  
  // Paintings array with the type annotation
  export const paintings: Painting[] = [
    {
      src: "/images/prickly_distance_01.webp",
      additionalImages: ['/images/prickly_distance_02.webp', '/images/prickly_distance_03.webp','/images/prickly_distance_04.webp','/images/prickly_distance_05.webp'],
      title: "Prickly Distance",
      description: "owl and cactus",
      dimensions: "60 x 80 cm",
      material: "oil on canvas",
      year: 2024
    },
    {
      src: "/images/unexpected_encounter_01.webp",
      additionalImages: ['/images/unexpected_encounter_02.webp', '/images/unexpected_encounter_03.webp','/images/unexpected_encounter_04.webp','/images/unexpected_encounter_05.webp'],
      title: "An unexpected encounter",
      description: "owl and orchidea",
      dimensions: "60 x 80 cm",
      material: "oil on canvas",
      year: 2024
    },
    {
      src: "/images/leaving_the_nest_01.webp",
      additionalImages: ['/images/leaving_the_nest_02.webp', '/images/leaving_the_nest_03.webp', '/images/leaving_the_nest_04.webp'],
      title: "Leaving the nest",
      description: "Red Chicken",
      dimensions: "60 x 80 cm",
      material: "oil on canvas",
      year: 2024
    },
    {
      src: "/images/smoldering_promise_02.webp",
      additionalImages: ['/images/smoldering_promise_01.webp', '/images/smoldering_promise_03.webp', '/images/smoldering_promise_04.webp'],
      title: "Smoldering promise",
      description: "Candle, owl, plant",
      dimensions: "60 x 80 cm",
      material: "oil on canvas",
      year: 2024
    }
  ];