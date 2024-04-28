'use server'

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function updateBio(content: string) {
    const user = await getCurrentUser();
    if (!user?.id) return;    

    try {
        await db.user.update({
            where: {id: user.id},
            data: {
                bio: content
            }
        })
        return {message: "Biografi oppdatert!", success: true}
    } catch (e) {
        console.log("Kunne ikke oppdatere bio: ", e)
    }
}
