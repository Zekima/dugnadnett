import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDugnadParticipants } from "@/actions/dugnadActions/getDugnads";
import React, { useState } from "react";
import { getJoinRequests } from "@/actions/dugnadActions/joinRequests";
import DeltakereNavigation from '@/components/dugnad/deltakere-navigation'
import { declineJoinRequest, acceptJoinRequest } from "@/actions/dugnadActions/joinRequests";


const DugnadTabs = async ({ dugnadId, isOwner }: any) => {

    const participants = await getDugnadParticipants(dugnadId);
    const joinRequests = await getJoinRequests(dugnadId);

    const declineRequest = async (requestId: any) => {
        "use server"
        await declineJoinRequest(requestId)
    }

    const acceptRequest = async (requestId: any) => {
        "use server"
        await acceptJoinRequest(requestId)
    }

    return (
        <div className="flex gap-1">
            <Tabs defaultValue="deltakere" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="deltakere">Deltakere</TabsTrigger>
                    <TabsTrigger value="chat">Gruppechat</TabsTrigger>
                </TabsList>
                <TabsContent value="deltakere" className="min-h-[29vw] mb-20">
                    <DeltakereNavigation
                        isOwner={isOwner}
                        participants={participants}
                        joinRequests={joinRequests}
                        declineRequest={declineRequest}
                        acceptRequest={acceptRequest}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default DugnadTabs;



