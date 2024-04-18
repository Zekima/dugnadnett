import { FaPeopleCarry, FaSortAmountUp, FaStar } from "react-icons/fa";
import Image from "next/image";
import { BsFillGeoAltFill } from "react-icons/bs";
import Link from "next/link";

export default function CTASection() {
  return (
    <div className="pb-20">
      <div className="max-w-[1280px] m-auto text-center">
        <h2 className="text-3xl font-bold pb-12">
          Hvorfor <span className="bg-green-400">DugnadNett?</span>
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-3 gap-y-12 sm:grid-cols-3">
          <div className="flex flex-col items-center">
            <BsFillGeoAltFill size="80" />
            <h3 className="font-bold text-xl mt-2">Geotagget Lokasjoner</h3>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/icons/searchfilter.png"
              width={80}
              height={80}
              alt="Søk og filter ikon"
            />
            <h3 className="font-bold text-xl mt-2">Filtering og Søk</h3>
          </div>
          <div className="flex flex-col items-center">
            <FaStar size="80" />
            <h3 className="font-bold text-xl mt-2">Tilbakemeldinger</h3>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 px-5 py-10 mt-[120px] text-center flex justify-center">
        <img src="/norway.svg" className="hidden xl:block"></img>

        <div className="gap-3 flex justify-center my-5 flex-col">
          <h1 className="font-medium text-2xl mt-5">Jeg ønsker å</h1>
          <Link href={"/dugnad/opprett"}>
            <button className="bg-black rounded-md p-20 w-1/3 hover:bg-green-900 text-white font-bold text-lg w-full">
              Organisere Dugnad
            </button>
          </Link>
          <Link href={"/utforsk"}>
            <button className="bg-black rounded-md p-20 w-1/3 hover:bg-green-900 text-white font-bold text-lg w-full">
              Delta i Dugnader
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
