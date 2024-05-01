'use server'

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

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
        revalidatePath('/innstillinger')
        revalidatePath(`/profil/${user.id}`)

        return {message: "Biografi oppdatert!", success: true}
    } catch (e) {
        console.log("Kunne ikke oppdatere bio: ", e)
    }
}

export async function updateSkills(listOfSkills: string[]) {
    const user = await getCurrentUser();
    if (!user?.id) return;    

    try {
        await db.user.update({
            where: {id: user.id},
            data: {
                skills: listOfSkills
            }
        })
        revalidatePath('/innstillinger')
        revalidatePath(`/profil/${user.id}`)

        return {message: "Ferdigheter oppdatert!", success: true}
    } catch (e) {
        console.log("Kunne ikke oppdatere ferdigheter: ", e)
    }

}
