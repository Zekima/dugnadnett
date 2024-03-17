import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDugnadParticipants } from "@/actions/dugnadActions/getDugnads";
import React, { useState } from "react";
import { getJoinRequests } from "@/actions/dugnadActions/joinRequests";
import { Map } from "lucide-react";
import DeltakereNavigation from '@/components/dugnad/deltakere-navigation'
import { declineJoinRequest, acceptJoinRequest } from "@/actions/dugnadActions/joinRequests";
import DugnadMap from '@/components/maps/dugnadMap'
import { getCurrentUser } from "@/lib/auth";
import DugnadAddress from '@/components/dugnad/dugnad-address'
import GroupChat from '@/components/dugnad/group-chat'


const DugnadTabs = async ({ dugnad, isOwner }: any) => {

    const participants = await getDugnadParticipants(dugnad.id);
    const joinRequests = await getJoinRequests(dugnad.id);
    const currentUser = await getCurrentUser();

    const declineRequest = async (requestId: number) => {
        "use server"
        await declineJoinRequest(requestId)
    }

    const acceptRequest = async (requestId: number) => {
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
                    <DugnadAddress address={dugnad.location.address} />
                    <DugnadMap latitude={dugnad.location.latitude} longitude={dugnad.location.longitude} />
                </TabsContent>
                <TabsContent value="chat">
                     <GroupChat userId={currentUser?.id} dugnadId={dugnad.id} />
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default DugnadTabs;



