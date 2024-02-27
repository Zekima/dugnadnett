'use client'

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Mail, Plus, MapPin, Calendar, Share } from "lucide-react";

const DugnadContent = ({ dugnad }: any) => {

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
            <div className="mt-5 flex gap-2">
                <form className="p-2 bg-green-800 text-white justify-center items-center w-full font-medium rounded-lg hover:bg-green-900 flex">
                    <button type="submit" className="flex gap-2">
                        <Plus /> Be om å bli med
                    </button>
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