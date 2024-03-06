"use client"
import React, { useState } from "react";
import { Plus, Loader2 } from 'lucide-react'
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";


import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"



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
        return (
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <button className="p-2 justify-center disabled:opacity-75 items-center bg-red-800 disabled:hover:bg-red-800 text-white w-full font-medium rounded-lg hover:bg-red-900 flex gap-2">Forlat dugnad</button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Er du sikker?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Ved å forlate denne dugnaden vil du måtte sende en ny forespørsel for å delta igjen, uten garanti for godkjenning.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Avbryt</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <button onClick={() => handleLeave(activeRequest.id)} className="p-2 justify-center items-center bg-red-800 text-white font-medium rounded-lg hover:bg-red-900">Forlat</button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        )


        //<button className="p-2 justify-center disabled:opacity-75 items-center bg-red-800 disabled:hover:bg-red-800 text-white w-full font-medium rounded-lg hover:bg-red-900 flex gap-2" onClick={() => handleLeave(activeRequest.id)}>Forlat dugnad</button>;
    }

    return <button disabled className="p-2 justify-center disabled:opacity-75 items-center bg-green-800 disabled:hover:bg-green-800 text-white w-full font-medium rounded-lg hover:bg-green-900 flex gap-2">Forespørsel sendt</button>;
}

export default RequestButton;