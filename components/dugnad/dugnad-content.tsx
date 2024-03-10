import React from "react";
import { Badge } from "@/components/ui/badge";
import { Mail, Plus, MapPin, Calendar, Share, Edit } from "lucide-react";
import RequestButton from "@/components/dugnad/request-button";
import { requestToJoin, getJoinRequest, removeJoinRequest } from "@/actions/dugnadActions/joinRequests";
import { revalidatePath } from "next/cache";
import EditDugnadButton from '@/components/dugnad/edit-dugnad-button'

const DugnadContent = async ({ dugnad, isOwner }: any) => {
    const activeRequest = await getJoinRequest(dugnad.id)

    const onJoin = async () => {
        'use server'
        await requestToJoin(dugnad.id)
    }

    const onLeave = async (participationId: number) => {
        'use server'
        await removeJoinRequest(participationId)
    }

    return (
        <>
            <div className="flex justify-between md:flex-row flex-col gap-2">
                <div>
                    <h1 className="text-2xl text-bold font-semibold">
                        {dugnad?.title}
                    </h1>
                    <div className="mt-2 mb-0  gap-1 flex">
                        {dugnad.categories.map((category: any) => (
                            <Badge key={category.id}>{category.name}</Badge>
                        ))}
                    </div>


                </div>
                <div>
                    <div className="flex gap-2 items-center mt-3 md:mt-0 text-sm font-medium p-4 bg-gray-300 justify-center rounded-md min-w-[175px]"><span>31. mars 16:30</span> <Calendar size={16} /></div>         
                </div>
            </div>
            <div className="mt-5 flex gap-2 lg:max-w-[380px] w-full">
                <div className="text-white w-full font-medium rounded-md flex">
                    {isOwner ?
                        <EditDugnadButton dugnadId={dugnad.id} /> : <RequestButton activeRequest={activeRequest} onLeave={onLeave} onJoin={onJoin} />
                    }
                </div>

                <button className="p-2 justify-center items-center bg-gray-300 text-black w-full font-medium rounded-md hover:bg-gray-400 flex gap-2">
                    <Share /> Del Dugnaden
                </button>
            </div>
            <p className="mt-4">{dugnad.info}</p>
        </>
    );
}

export default DugnadContent;