import React, { Suspense } from "react";
import {
  getDugnadById,
  getOwnerByDugnadId,
} from "@/actions/dugnadActions/getDugnads";
import UserImage from "@/components/user-image";
import DugnadTabs from '@/components/dugnad/dugnad-tabs'
import DugnadContent from "@/components/dugnad/dugnad-content"
import { FaStar } from "react-icons/fa";
import { getUserById } from "@/data/user";
import { getCurrentUser } from "@/lib/auth";
import { ProgressiveImage } from '@/components/progressive-image'


export default async function DugnadPage({
  params,
}: {
  params: { slug: string };
}) {
  const dugnad = await getDugnadById(params.slug);
  if (!dugnad) return;
  const dugnadOwner = await getOwnerByDugnadId(dugnad.ownerId);
  if (!dugnadOwner) return;
  const user = await getCurrentUser();

  const isOwner = dugnadOwner.id === user?.id

  return (
    <div className="max-w-[1280px] m-auto">
      <div className="flex h-[350px]">
        <div className="w-2/3 ">
          {dugnad.image ? (
            <ProgressiveImage
              low={`${dugnad.image}-500.webp`}
              high={`${dugnad.image}-900.webp`}
              alt={dugnad.title}
              className="w-full h-full object-cover"
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
      <div className="w-full h-fill flex lg:flex-row flex-col">
        <div className="lg:w-2/3 mt-5 xl:p-0 px-5 w-full min-h-[450px]">
          <DugnadContent dugnad={dugnad} isOwner={isOwner} />
        </div>

        <div className="lg:w-1/3 w-full min-h-[550px] p-5 gap-y-3 flex flex-col">
          <DugnadTabs dugnadId={dugnad.id} isOwner={isOwner} />
        </div>
      </div>
    </div>
  );
}
