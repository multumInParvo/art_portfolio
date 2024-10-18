import { paintings } from '../app/data/paintings'
import Slider from '../app/components/Slider'

export default function Home() {
  return (
    <div className="h-full">
      <Slider paintings={paintings} />
    </div>
  );
}