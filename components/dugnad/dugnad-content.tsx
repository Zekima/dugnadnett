import React from "react";
import { Badge } from "@/components/ui/badge";
import {Calendar} from "lucide-react";
import RequestButton from "@/components/dugnad/request-button";
import {
  requestToJoin,
  getJoinRequest,
  removeJoinRequest,
} from "@/actions/dugnadActions/joinRequests";

import EditDugnadButton from "@/components/dugnad/edit-dugnad-button";
import DugnadInfo from "@/components/dugnad/dugnad-info";
import ShareButton from "@/components/dugnad/share-button";
import { deleteDugnad } from "@/actions/dugnadActions/deleteDugnad";
import { completeDugnad } from "@/actions/dugnadActions/completeDugnad";

const DugnadContent = async ({ dugnad, isOwner }: any) => {
  const activeRequest = await getJoinRequest(dugnad.id);

  const onJoin = async () => {
    "use server";
    await requestToJoin(dugnad.id);
  };

  const onLeave = async (participationId: number) => {
    "use server";
    await removeJoinRequest(participationId);
  };

  const handleComplete = async () => {
    "use server";
    await completeDugnad(dugnad.id);
  };

  const handleDelete = async () => {
    "use server";
    await deleteDugnad(dugnad.id);
  };

  const formattedDate = new Intl.DateTimeFormat("nb-NO", {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(dugnad.date));

  const dateString = formattedDate.replace("kl.", "-");

  return (
    <>
      <div className="flex justify-between md:flex-row flex-col gap-2">
        <div>
          <h1 className="text-2xl text-bold font-semibold">{dugnad?.title}</h1>
          <div className="mt-2 mb-0  gap-1 flex">
            {dugnad.categories.map((category: any) => (
              <Badge key={category.id}>{category.name}</Badge>
            ))}
          </div>
        </div>
        <div>
          <div className="flex gap-2 items-center mt-3 md:mt-0 text-sm font-medium p-4 bg-gray-200 justify-center rounded-md min-w-[175px] mr-3">
            <span>{dateString}</span>
            <Calendar size={16} />
          </div>
        </div>
      </div>
      {dugnad.status === "ACTIVE" ? (
        <div className="mt-5 flex gap-2 lg:max-w-[220px] w-full">
          {isOwner ? (
            <div className="text-white w-fit font-medium rounded-md flex">
              <EditDugnadButton
                handleDelete={handleDelete}
                handleComplete={handleComplete}
                dugnadId={dugnad.id}
              />
            </div>
          ) : (
            <div className="text-white w-full font-medium rounded-md flex">
              <RequestButton
                activeRequest={activeRequest}
                onLeave={onLeave}
                onJoin={onJoin}
              />
            </div>
          )}

          <div className="w-fit">
            <ShareButton />
          </div>
        </div>
      ) : (
        ""
      )}

      <DugnadInfo dugnadInfo={dugnad.info}></DugnadInfo>
    </>
  );
};

export default DugnadContent;
