'use server'


import { getUserByEmail, getUserById } from "@/data/user";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

import bcrypt from 'bcryptjs';
import { revalidatePath } from "next/cache";


export async function updateEmail(content: string) {
    const user = await getCurrentUser();
    if (!user?.id) return;


    const existingUser = await getUserByEmail(content)

    if (existingUser) return {message: "Email allerede i bruk!", success: false}

    try {
        await db.user.update({
            where: { id: user.id },
            data: {
                email: content
            }
        })
        revalidatePath("/innstillinger/bruker")

        return { message: "E-postadresse oppdatert!", success: true }
    } catch (e) {
        console.log("Kunne ikke oppdatere epost: ", e)
    }
}

const SECRET = process.env.AUTH_SECRET as string;

export async function updatePassword(oldPassword: string, newPassword: string) {
    const user = await getCurrentUser();
    if (!user?.id) return;
    const userInfo = await getUserById(user.id)
    if (!userInfo?.password) return;

    bcrypt.compare(oldPassword, userInfo.password, async function (err, res) {
        if (err) {
            console.log("feil")
            return { message: "Gammelt passord er ikke korrekt!", success: false }
        }
        if (res) {
            const hashedPassword = await bcrypt.hash(newPassword, 10)

            try {
                await db.user.update({
                    where: { id: user.id },
                    data: {
                        password: hashedPassword
                    }
                })

                return { message: "Passord oppdatert", success: true }
            } catch (e) {
                console.log("Kunne ikke oppdatere epost: ", e)
            }
        }
    })


}