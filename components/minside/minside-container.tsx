import React from "react";
import { User } from "@/types";
import {
  getUserOwnesDugnads,
  getUserParticpatesInDugnads,
} from "@/actions/dugnadActions/getDugnads";
import { getCurrentUser } from "@/lib/auth";
import UtforskCard from "../utforsk/utforsk-card";
import Pagination from "@/components/pagination";
import MinSideHolder from "./minside-holder";



const MinsideContainer = async () => {
  const user = await getCurrentUser();
  const ownesDugnads = await getUserOwnesDugnads();
  const partDugnads = await getUserParticpatesInDugnads(); 

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-3xl font-bold mb-3 text-center">{user?.name} :</h1>
      <div className="flex flex-row">
        <div className="flex flex-col w-1/3">
          <h2 className="text-2xl font-bold mb-3 sm:pt-[100px] pt-[10px]">
            mine:
          </h2>
          <MinSideHolder dugnads={ownesDugnads} />
        </div>
        <div className="flex flex-col w-1/3">
          <h2 className="text-2xl font-bold mb-3 sm:pt-[100px] pt-[10px]">
            deltar i:
          </h2>
          <MinSideHolder dugnads={partDugnads} />
        </div>
      </div>
    </div>
  );
};

export default MinsideContainer;
