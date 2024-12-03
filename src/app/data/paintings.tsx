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
      src: "/images/unexpected_encounter_01.jpg",
      additionalImages: ['/images/unexpected_encounter_02.jpg', '/images/unexpected_encounter_03.jpg','/images/unexpected_encounter_04.jpg','/images/unexpected_encounter_05.jpg'],
      title: "An unexpected encounter",
      description: "owl and orchidea",
      dimensions: "60 x 80 cm",
      material: "oil on canvas",
      year: 2024
    },
    {
      src: "/images/azaylerideau_01.jpg",
      additionalImages: ['/images/azaylerideau_02.jpg', '/images/azaylerideau_03.jpg', '/images/azaylerideau_04.jpg'],
      title: "Azay-le-Rideau",
      description: "The house with red doors",
      dimensions: "60 x 80 cm",
      material: "oil on canvas",
      year: 2024
    },
    {
      src: "/images/campestre.webp",
      additionalImages: [],
      title: "Campestre",
      description: "Cheese and Milk",
      dimensions: "30 x 40 cm",
      material: "oil on canvas",
      year: 2022
    },
    {
      src: "/images/smoldering_promise_01.jpg",
      additionalImages: ['/images/smoldering_promise_02.jpg', '/images/smoldering_promise_03.jpg', '/images/smoldering_promise_04.jpg'],
      title: "Smoldering promise",
      description: "Candle, owl, plant",
      dimensions: "60 x 80 cm",
      material: "oil on canvas",
      year: 2024
    },
    {
      src: "/images/campestre_2.webp",
      additionalImages: [],
      title: "Campestre 2",
      description: "Apples",
      dimensions: "30 x 40 cm",
      material: "oil on canvas",
      year: 2022
    },
    {
      src: "/images/leaving_the_nest_01.jpg",
      additionalImages: ['/images/leaving_the_nest_02.jpg', '/images/leaving_the_nest_03.jpg', '/images/leaving_the_nest_04.jpg'],
      title: "Leaving the nest",
      description: "Red Chicken",
      dimensions: "60 x 80 cm",
      material: "oil on canvas",
      year: 2024
    }
  ];