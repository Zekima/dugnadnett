import "./hero-section.css";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="max-w-[1280px] m-auto py-10 text-center">
      <div className="eclipse-background bg-cover sm:bg-auto">
        <h1 className="text-6xl font-bold mb-3 sm:pt-[100px] pt-[10px]">
          Bli med i fellesskapet, skap en forskjell.
        </h1>
        <h2 className="text-3xl">
          Oppdag og delta i lokale dugnader enkelt og effektivt.
        </h2>
        <div className="flex gap-2 m-auto justify-center pt-10 pb-[30px]">
        <Link href="/utforsk"><button className="px-4 py-3 bg-green-500 font-medium rounded-md text-white hover:bg-green-600">
            Utforsk Dugnader →
          </button></Link>
          <Link href="/auth/register"><button className="px-4 outline-offset-[-2px] py-3 outline outline-2 font-semibold outline-green-500 rounded-md text-green-500 hover:bg-green-100 hover:text-green-900">
            Registrer Deg for å Delta
          </button></Link>
        </div>
      </div>
      <Image
        src="/hero.webp"
        width={1280}
        height={362}
        alt="dugnad"
        className="py-8"
        priority
      />


    </div>
  );
};

export default HeroSection;
