"use client"

import React from 'react';
import { Share, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"

const ShareButton = () => {
    const { toast } = useToast()


    const handleShare = () => {
        navigator.clipboard.writeText(`${window.location}`)
        toast({
            className: "bg-green-800 border-none font-thin",
            description: <div className='flex gap-3 items-center text-white font-medium'><Check /> <p>Linken er kopiert til utklippstavlen</p></div>,
            duration: 1500,
        })
    }

    return (
        <button
            onClick={() => handleShare()}
            className="p-2 px-4 justify-center items-center bg-gray-300 text-black w-full font-medium rounded-md flex gap-2">
            <Share />
        </button>
    );
}

export default ShareButton;