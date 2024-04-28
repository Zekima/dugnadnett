'use client'

import React from "react";
import { Map } from "lucide-react";
import { Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"

const DugnadAddress = ({address}: any) => {
    const { toast } = useToast()


    const handleShare = () => {
        navigator.clipboard.writeText(`${address}`)
        toast({
            className: "bg-green-800 border-none",
            description: <div className='flex gap-3 items-center text-white font-medium'><Check /> <p>Adressen er kopiert til utklippstavlen</p></div>,
            duration: 1500,
        })
    }
    return (
        <div onClick={() => handleShare()} className="flex items-center gap-1.5 mt-2 bg-gray-200 p-3 rounded-md mb-2 cursor-pointer"><Map /> <p>{address}</p></div>
    );
}

export default DugnadAddress;