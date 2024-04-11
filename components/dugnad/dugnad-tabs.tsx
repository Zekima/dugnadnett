import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDugnadParticipants } from "@/actions/dugnadActions/getDugnads";
import React, { useState } from "react";
import { getJoinRequests } from "@/actions/dugnadActions/joinRequests";
import { getJoinRequest } from "@/actions/dugnadActions/joinRequests";
import DeltakereNavigation from '@/components/dugnad/deltakere-navigation'
import { declineJoinRequest, acceptJoinRequest } from "@/actions/dugnadActions/joinRequests";
import DugnadMap from '@/components/maps/dugnadMap'
import { getCurrentUser } from "@/lib/auth";
import DugnadAddress from '@/components/dugnad/dugnad-address'
import GroupChat from '@/components/dugnad/group-chat'
import { Participation } from '@prisma/client';
import { getDugnadMessages } from "@/actions/dugnadActions/messages/getDugnadMessages";


const DugnadTabs = async ({ dugnad, isOwner }: any) => {
    
    const participants = await getDugnadParticipants(dugnad.id);
    const activeRequest = await getJoinRequest(dugnad.id) as Participation;
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
    const fetchDugnadMessages = async (page: number) => {
        "use server"
        const messages = await getDugnadMessages({ dugnadId: dugnad.id, page });

        return messages.map(msg => ({
            username: msg.owner.name,
            message: msg.message,
            ownerId: msg.ownerId,
            dugnadId: msg.dugnadId
        }));
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
                    {(activeRequest && activeRequest.status === "ACCEPTED" || isOwner) ? (
                        <GroupChat userId={currentUser?.id} dugnadId={dugnad.id} fetchDugnadMessages={fetchDugnadMessages} />
                    ) : (
                        <div className="h-[300px] flex items-center justify-center w-full text-center">
                            <p>Du har ikke tilgang til denne gruppechatten</p>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default DugnadTabs;



