// Define the Painting type
export type Painting = {
    src: string;
    title: string;
    description: string;
    dimensions: string;
    year: number;
  };
  
  // Paintings array with the type annotation
  export const paintings: Painting[] = [
    {
      src: "/images/azaylerideau.webp",
      title: "Azay-le-Rideau",
      description: "The house with red doors",
      dimensions: "60 x 80 cm, oil on canvas",
      year: 2024
    },
    {
      src: "/images/campestre.webp",
      title: "Campestre",
      description: "Cheese and Milk",
      dimensions: "30 x 40 cm, oil on canvas",
      year: 2022
    },
    {
      src: "/images/sixpm.webp",
      title: "At 6PM",
      description: "Red Chicken",
      dimensions: "60 x 80 cm, oil on canvas",
      year: 2024
    },
    {
      src: "/images/campestre_2.webp",
      title: "Campestre 2",
      description: "Apples",
      dimensions: "30 x 40 cm, oil on canvas",
      year: 2022
    }
  ];