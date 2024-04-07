import React from "react";
import { User } from "@/types";
import {
  getUserOwnesDugnads,
  getUserParticpatesInDugnads,
} from "@/actions/dugnadActions/getDugnads";
import { getCurrentUser } from "@/lib/auth";
import UtforskCard from "../utforsk/utforsk-card";

const MinsideContainer = async () => {
  const ownesDugnads = await getUserOwnesDugnads();
  const partDugnads = await getUserParticpatesInDugnads();
  const user = await getCurrentUser();
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-3xl font-bold mb-3 text-center">{user?.name} :</h1>
      <div className="flex flex-row">
        <div className="flex flex-col w-1/3">
          <h2 className="text-2xl font-bold mb-3 sm:pt-[100px] pt-[10px]">
            mine:
          </h2>
          <div className="grid grid-cols-1">
            {ownesDugnads.map((dugnad) => (
              <UtforskCard dugnad={dugnad} key={dugnad.id} />
            ))}
          </div>
        </div>
        <div className="flex flex-col w-1/3">
          <h2 className="text-2xl font-bold mb-3 sm:pt-[100px] pt-[10px]">
            deltar i:
          </h2>
          <div className="grid grid-cols-1 gap-1">
            {partDugnads.map((dugnad) => (
              <UtforskCard dugnad={dugnad} key={dugnad.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinsideContainer;
