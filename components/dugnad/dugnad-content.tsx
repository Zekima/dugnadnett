import React from "react";
import { Badge } from "@/components/ui/badge";
import { Mail, Plus, MapPin, Calendar, Share } from "lucide-react";
import RequestButton from "@/components/dugnad/request-button";
import { requestToJoin, getJoinRequest } from "@/actions/dugnadActions/joinRequests";
import { revalidatePath } from "next/cache";

const DugnadContent = async ({ dugnad }: any) => {
    const activeRequest = await getJoinRequest(dugnad.id)

    const onSubmit = async () => {
        'use server'
        await requestToJoin(dugnad.id)
    }

    return (
        <>
            <div className="flex justify-between">
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

                <div className="flex flex-col gap-2 text-sm">
                    <div className="flex gap-2 justify-end">
                        <p>Gullbringvegen 28, 3800 Bø</p>
                        <MapPin size={18} />
                    </div>
                    <div className="flex gap-2 justify-end">
                        <p>31.02.2024 16:30 </p> <Calendar size={18} />
                    </div>
                </div>
            </div>
            <div className="mt-5 flex gap-2 max-w-[380px]">
                <form action={onSubmit} className="text-white w-full font-medium rounded-lg flex">
                    <RequestButton activeRequest={activeRequest} />
                </form>

                <button className="p-2 justify-center items-center bg-gray-300 text-black w-full font-medium rounded-lg hover:bg-gray-400 flex gap-2">
                    <Share /> Del Dugnaden
                </button>
            </div>
            <p className="mt-4">{dugnad.info}</p>
        </>
    );
}

export default DugnadContent;