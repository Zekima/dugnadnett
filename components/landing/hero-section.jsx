import "./hero-section.css";
import Image from "next/image";
import { FaPeopleCarry, FaSortAmountUp, FaStar } from "react-icons/fa";

const HeroSection = () => {
  return (
    <div className="max-w-[1300px] m-auto py-10 text-center">
      <div className="eclipse-background bg-cover sm:bg-auto">
        <h1 className="text-6xl font-bold mb-3 sm:pt-[100px] pt-[10px]">
          Bli med i fellesskapet, skap en forskjell.
        </h1>
        <h2 className="text-3xl">
          Oppdag og delta i lokale dugnader enkelt og effektivt.
        </h2>
        <div className="flex gap-2 m-auto justify-center pt-10 pb-[30px]">
          <button className="px-4 py-3 bg-green-500 font-medium rounded-lg text-white hover:bg-green-600">
            Utforsk Dugnader →
          </button>
          <button className="px-4 py-3 border-2 font-semibold border-green-500 rounded-lg text-green-500 hover:bg-green-100 hover:text-green-900">
            Registrer Deg for å Delta
          </button>
        </div>
      </div>
      <Image
        src="/hero.webp"
        width={1600}
        height={50}
        alt="dugnad"
        className="py-8"
        priority
      />

      <div className="features-grid py-8">
        <div className="feature bg-green-100">
          <FaPeopleCarry size="45" color="black" className="m-auto" />
          <p className="text-green-900">Samarbeidsverktøy for enkel organisering</p>
        </div>
        <div className="feature bg-green-100">
          <FaSortAmountUp size="45" color="black" className="m-auto" />
          <p className="text-green-900">Samarbeidsverktøy for enkel organisering</p>
        </div>
        <div className="feature bg-green-100">
          <FaStar size="45" color="black" className="m-auto" />
          <p className="text-green-900">Samarbeidsverktøy for enkel organisering</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
