import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDugnadParticipants } from "@/actions/dugnadActions/getDugnads";
import React, { useState } from "react";
import { getJoinRequests } from "@/actions/dugnadActions/joinRequests";
import { Map } from "lucide-react";
import DeltakereNavigation from '@/components/dugnad/deltakere-navigation'
import { declineJoinRequest, acceptJoinRequest } from "@/actions/dugnadActions/joinRequests";
import DugnadMap from '@/components/maps/dugnadMap'


const DugnadTabs = async ({ dugnad, isOwner }: any) => {

    const participants = await getDugnadParticipants(dugnad.id);
    const joinRequests = await getJoinRequests(dugnad.id);

    const declineRequest = async (requestId: any) => {
        "use server"
        await declineJoinRequest(requestId)
    }

    const acceptRequest = async (requestId: any) => {
        "use server"
        await acceptJoinRequest(requestId)
    }

    return (
        <div className="flex gap-1 min-h-[35vw]">
            <Tabs defaultValue="deltakere" className="w-full">
                <TabsList className="grid w-full grid-cols-3 ">
                <TabsTrigger value="kart">Område</TabsTrigger>
                    <TabsTrigger value="deltakere">Deltakere</TabsTrigger>
                    <TabsTrigger value="chat">Gruppechat</TabsTrigger>
                </TabsList>
                    <TabsContent value="deltakere">
                        <DeltakereNavigation
                            isOwner={isOwner}
                            participants={participants}
                            joinRequests={joinRequests}
                            declineRequest={declineRequest}
                            acceptRequest={acceptRequest}
                        />
                    </TabsContent>
                    <TabsContent value="kart">
                    <div className="flex items-center gap-1.5 mt-2 bg-gray-200 p-3 rounded-md mb-2"><Map/> <p>{dugnad.location.address}</p></div>

                        <DugnadMap latitude={dugnad.location.latitude} longitude={dugnad.location.longitude}/>

                    </TabsContent>
            </Tabs>
        </div>
    );
}

export default DugnadTabs;



