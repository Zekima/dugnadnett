import React from "react";
import {
  getDugnadById,
  getOwnerByDugnadId,
} from "@/actions/dugnadActions/getDugnads";
import UserImage from "@/components/user-image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FaStar } from "react-icons/fa";
import { Mail, Plus, MapPin, Calendar, Share } from "lucide-react";

export default async function DugnadPage({
  params,
}: {
  params: { slug: string };
}) {
  const dugnad = await getDugnadById(params.slug);
  if (!dugnad) return;
  const dugnadOwner = await getOwnerByDugnadId(dugnad.ownerId);
  if (!dugnadOwner) return;

  return (
    <div className="bg-white">
      <div className="max-w-[1280px] m-auto">
        <div className="flex h-[350px]">
          <div className="w-2/3">
            {dugnad.image ? (
              <img
                src={`${dugnad?.image}-900.webp`}
                className="w-full h-full object-cover"
                alt=""
              />
            ) : (
              <div className="bg-green-200 h-full w-full"></div>
            )}
          </div>
          <div className="w-1/3 bg-black flex flex-col items-center gap-3 justify-center">
            <div className="border-2 border-black rounded-full">
              <UserImage user={dugnadOwner} size={80}></UserImage>
            </div>

            <p className="font-bold text-white">{dugnadOwner?.name}</p>
            <div className="flex gap-1 flex-col">
              <div className="flex gap-1 justify-center items-center text-white">
                <FaStar color="yellow" /> <FaStar color="yellow" />{" "}
                <FaStar color="yellow" /> <FaStar color="yellow" />{" "}
                <FaStar color="gray" />{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 w-full min-h-[60vh] flex">
          <div className="w-2/3 p-5">
            <div className="flex justify-between">
              <div>
                <h1 className="text-2xl text-bold font-semibold">
                  {dugnad?.title}
                </h1>
                <div className="mt-2 mb-2 gap-1 flex">
                  {dugnad.categories.map((category) => (
                    <Badge key={category.id}>{category.name}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex gap-2 justify-end">
                  <p>Gullbringvegen 28, 3800 Bø</p>
                  <MapPin size={18} />
                </div>
                <div className="flex gap-2 justify-end">
                  <p>31.02.2024 16:30 </p> <Calendar size={18} />
                </div>
              </div>
            </div>
            <Tabs defaultValue="informasjon" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="informasjon">Informasjon</TabsTrigger>
                <TabsTrigger value="deltakere">Deltakere</TabsTrigger>
                <TabsTrigger value="chat">Gruppechat</TabsTrigger>
              </TabsList>
            </Tabs>
            <p className="mt-4">{dugnad.info}</p>
          </div>
          <div className="w-1/3 bg-gray-200 p-5 gap-y-3 flex flex-col">
            <div className="flex gap-1">
              <button className="p-2 bg-green-800 text-white justify-center items-center w-full font-medium rounded-lg hover:bg-green-900 flex gap-2">
                <Plus /> Be om å bli med
              </button>
              <button className="p-2 justify-center items-center bg-white text-black w-full font-medium rounded-lg hover:bg-gray-100 flex gap-2">
                <Share /> Del Dugnaden
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
