// Define the Painting type
export type Painting = {
    src: string;
    title: string;
    description: string;
    dimensions: string;
    material: string;
    year: number;
  };
  
  // Paintings array with the type annotation
  export const paintings: Painting[] = [
    {
      src: "/images/azaylerideau.webp",
      title: "Azay-le-Rideau",
      description: "The house with red doors",
      dimensions: "60 x 80 cm",
      material: "oil on canvas",
      year: 2024
    },
    {
      src: "/images/campestre.webp",
      title: "Campestre",
      description: "Cheese and Milk",
      dimensions: "30 x 40 cm",
      material: "oil on canvas",
      year: 2022
    },
    {
      src: "/images/smoldering_promise_of_life.webp",
      title: "Smoldering promise of life",
      description: "Candle, owl, plant",
      dimensions: "60 x 80 cm",
      material: "oil on canvas",
      year: 2024
    },
    {
      src: "/images/campestre_2.webp",
      title: "Campestre 2",
      description: "Apples",
      dimensions: "30 x 40 cm",
      material: "oil on canvas",
      year: 2022
    },
    {
      src: "/images/leaving_the_nest.webp",
      title: "Leaving the nest",
      description: "Red Chicken",
      dimensions: "60 x 80 cm",
      material: "oil on canvas",
      year: 2024
    }
  ];