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
      src: "/images/nothing_to_hide_01.webp",
      additionalImages: ['/images/nothing_to_hide_02.webp', '/images/nothing_to_hide_03.webp','/images/nothing_to_hide_04.webp','/images/nothing_to_hide_05.webp'],
      title: "Nothing to hide",
      description: "A still-life composition featuring a large pumpkin, a broccoli, an orange and a toucan figurine. The scene includes a rustic cloth background with embroidered patterns.",
      dimensions: "60 x 80 cm",
      material: "oil on canvas",
      year: 2024
    },
    {
      src: "/images/prickly_distance_01.webp",
      additionalImages: ['/images/prickly_distance_02.webp', '/images/prickly_distance_03.webp','/images/prickly_distance_04.webp','/images/prickly_distance_05.webp'],
      title: "Prickly distance",
      description: "A vibrant still-life scene with a red decorative fan, a potted cactus, and a small red owl figurine. The background includes intricate patterns.",
      dimensions: "60 x 80 cm",
      material: "oil on canvas",
      year: 2024
    },
    {
      src: "/images/unexpected_encounter_01.webp",
      additionalImages: ['/images/unexpected_encounter_02.webp', '/images/unexpected_encounter_03.webp','/images/unexpected_encounter_04.webp','/images/unexpected_encounter_05.webp'],
      title: "An unexpected encounter",
      description: "A miniature blue owl figurine sits beside a blooming orchid with deep pink flowers. The setting features a warm, textured background.",
      dimensions: "60 x 80 cm",
      material: "oil on canvas",
      year: 2024
    },
    {
      src: "/images/test.JPG",
      additionalImages: ['/images/leaving_the_nest_02.webp', '/images/leaving_the_nest_03.webp', '/images/leaving_the_nest_04.webp'],
      title: "Leaving the nest",
      description: "A red ceramic chicken figurine stands next to a bouquet of vibrant flowers in a glass jar. Sunlight casts dramatic shadows across the scene.",
      dimensions: "60 x 80 cm",
      material: "oil on canvas",
      year: 2024
    },
    {
      src: "/images/smoldering_promise_02.webp",
      additionalImages: ['/images/smoldering_promise_01.webp', '/images/smoldering_promise_03.webp', '/images/smoldering_promise_04.webp'],
      title: "Smoldering promise",
      description: "A blue ceramic owl sits alongside a candle in a rustic holder and a small vase containing dry grass. The composition rests on a polished wooden surface.",
      dimensions: "38 x 55 cm",
      material: "oil on canvas",
      year: 2024
    }
  ];