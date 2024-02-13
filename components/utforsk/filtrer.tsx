import React from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { CiSearch } from "react-icons/ci";
import Image from "next/image";

export default function Filtrer() {
  return (
    <div className="gap-y-6 flex flex-col">
      <div className="relative">
        <CiSearch size={24} className="absolute right-2 bottom-2" />
        <Input placeholder="Søk i dugnader" className="bg-white" />
      </div>

      <div>
        <h1 className="font-bold">Kategorier</h1>
        <div className="flex gap-1 mt-2 flex-wrap">
          <Badge>Miljø</Badge>
          <Badge>Rengjøring</Badge>
          <Badge>Maling</Badge>
          <Badge>Innsamling</Badge>
          <Badge>Matlaging</Badge>
          <Badge>Reparasjon</Badge>
          <Badge>Idrett</Badge>
          <Badge>Transport</Badge>
        </div>
      </div>

      <div>
      <h1 className="font-bold">Område</h1>
      <Image src="/placeholdermap.png" width={812} height={947} alt="placeholder"  className="rounded-lg border border-black"/>
      <div className="relative">
        <CiSearch size={24} className="absolute right-2 bottom-2" />
        <Input placeholder="Søk etter sted eller addresse" className="bg-white mt-2" />
      </div>
      </div>
    </div>
  );
}