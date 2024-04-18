"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";


export const completeDugnad = async (dugnadId: number) => {
    try {
        await db.dugnad.update({
            where: {
                id: dugnadId
            },
            data: {
                status: "COMPLETED"
            }
        })
    } catch (e) {
        console.log("Kunne ikke markere dugnad som ferdig: ", e)
        return;
    }

    return redirect("/utforsk");
}   