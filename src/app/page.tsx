import { paintings } from '../app/data/paintings'
import Slider from '../app/components/Slider'

export default function Home() {
  return <Slider paintings={paintings} />
}