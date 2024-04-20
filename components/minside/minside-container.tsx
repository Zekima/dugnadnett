import React from "react";
import { User } from "@/types";
import {
  getCompletedDugnads,
  getUserOwnesDugnads,
  getUserParticpatesInDugnads,
} from "@/actions/dugnadActions/getDugnads";
import { getCurrentUser } from "@/lib/auth";
import UtforskCard from "../utforsk/utforsk-card";
import Pagination from "@/components/pagination";
import MinSideHolder from "./minside-holder";
import { Separator } from "../ui/separator";

const MinsideContainer = async () => {
  const user = await getCurrentUser();
  const ownedDugnads = await getUserOwnesDugnads();
  const activeDugnads = await getUserParticpatesInDugnads();
  const completedDugnads = await getCompletedDugnads();

  return (
    <div className="flex flex-col w-full mt-8 mx-5 xl:mx-0">
      <h1 className="text-2xl font-bold mb-6">
        {" "}
        Velkommen tilbake {user?.name}!
      </h1>
      <div className="flex gap-3 flex-col xl:flex-row ">
        <div className="flex flex-col w-full">
          <h2 className="text-xl mb-3">
            Aktive dugnader
            <Separator />
          </h2>
          {ownedDugnads.length == 0 ? (
            <p className="text-gray-600 text-sm">
              Du deltar for øyeblikket ikke i noen dugnader
            </p>
          ) : (
            <MinSideHolder dugnads={activeDugnads} />
          )}
        </div>
        <div className="flex flex-col w-full">
          <h2 className="text-xl mb-3">
            Mine dugnader
            <Separator />
          </h2>
          {ownedDugnads.length == 0 ? (
            <p className="text-gray-600 text-sm ">
              Start en ny dugnad for å se den her
            </p>
          ) : (
            <MinSideHolder dugnads={ownedDugnads} />
          )}
        </div>
        <div className="flex flex-col w-full">
          <h2 className="text-xl mb-3">
            Ferdige dugnader
            <Separator />
          </h2>
          <MinSideHolder dugnads={completedDugnads} />
        </div>
      </div>
    </div>
  );
};

export default MinsideContainer;
