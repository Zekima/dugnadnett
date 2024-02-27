import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDugnadParticipants } from "@/actions/dugnadActions/getDugnads";
import React from "react";

const DugnadTabs = async ({ dugnadId }: any) => {

    const participants = await getDugnadParticipants(dugnadId);

    return (
        <div className="flex gap-1">
            <Tabs defaultValue="deltakere" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="deltakere">Deltakere</TabsTrigger>
                    <TabsTrigger value="chat">Gruppechat</TabsTrigger>
                </TabsList>
                <TabsContent value="deltakere" className="min-h-[29vw] mb-20 flex justify-center items-center">
                    {participants && participants.length > 0 ? (
                        participants.map((participant) => (
                            <p key={participant.id}>{participant.name}</p>
                        ))
                    ) : (
                        <p>Ingen Deltakere</p>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default DugnadTabs;