import Slider from '../app/components/Slider'

const paintings = [
  {
    src: "/images/azaylerideau.webp",
    title: "Levitation",
    description: "The house with red doors",
    dimensions: "60 x 68 inches, oil on canvas",
    year: 2024
  },
  {
    src: "/images/campestre.webp",
    title: "Camembert",
    description: "An abstract painting with warm colors",
    dimensions: "60 x 68 inches, oil on canvas",
    year: 2024
  },
  {
    src: "/images/sixpm.webp",
    title: "Levitation",
    description: "A jar with cheese",
    dimensions: "60 x 68 inches, oil on canvas",
    year: 2024
  },
  {
    src: "/images/campestre_2.webp",
    title: "Levitation",
    description: "Apples",
    dimensions: "60 x 68 inches, oil on canvas",
    year: 2024
  }
  // Add more paintings here
]

export default function Home() {
  return (
    <Slider paintings={paintings} />
  )
}