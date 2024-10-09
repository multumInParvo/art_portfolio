import Slider from '../app/components/Slider'

const paintings = [
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
    dimensions: "60 x 80 cm inches, oil on canvas",
    year: 2024
  },
  {
    src: "/images/campestre_2.webp",
    title: "Campestre 2",
    description: "Apples",
    dimensions: "30 x 40 cm, oil on canvas",
    year: 2022
  }
  // Add more paintings here
]

export default function Home() {
  return (
    <Slider paintings={paintings} />
  )
}