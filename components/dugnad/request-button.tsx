"use client"
import React, { useState } from "react";
import { Plus, Loader2 } from 'lucide-react'
import { useFormStatus } from "react-dom";


const RequestButton = ({ activeRequest, onLeave, onJoin }: any) => {
    const [isPending, setIsPending] = useState(false);

    const handleJoin = async () => {
        setIsPending(true);
        await onJoin()
        setIsPending(false);
    }

    const handleLeave = async (participationId: number) => {
        setIsPending(true);
        await onLeave(participationId)
        setIsPending(false);
    }

    if (isPending && activeRequest?.status === "ACCEPTED") {
        return <button disabled className="p-2 justify-center disabled:opacity-75 items-center bg-red-800 disabled:hover:bg-red-800 text-white w-full font-medium rounded-lg hover:bg-red-900 flex gap-2"><Loader2 className="animate-spin" /></button>;
    }

    if (isPending) {
        return <button disabled className="p-2 justify-center disabled:opacity-75 items-center bg-green-800 disabled:hover:bg-green-800 text-white w-full font-medium rounded-lg hover:bg-green-900 flex gap-2"><Loader2 className="animate-spin" /></button>;
    }

    if (!activeRequest) {
        return <button className="p-2 justify-center disabled:opacity-75 items-center bg-green-800 disabled:hover:bg-green-800 text-white w-full font-medium rounded-lg hover:bg-green-900 flex gap-2" onClick={() => handleJoin()}>Be om å bli med</button>;
    }

    if (activeRequest && activeRequest.status === "ACCEPTED") {
        return <button className="p-2 justify-center disabled:opacity-75 items-center bg-red-800 disabled:hover:bg-red-800 text-white w-full font-medium rounded-lg hover:bg-red-900 flex gap-2" onClick={() => handleLeave(activeRequest.id)}>Forlat dugnad</button>;
    }

    return <button disabled className="p-2 justify-center disabled:opacity-75 items-center bg-green-800 disabled:hover:bg-green-800 text-white w-full font-medium rounded-lg hover:bg-green-900 flex gap-2">Forespørsel sendt</button>;
}

export default RequestButton;