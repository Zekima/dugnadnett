'use server'
import * as z from "zod";


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


export async function updatePassword(oldPassword: string, newPassword: string) {
    const user = await getCurrentUser();
    if (!user?.id) return;
    const userInfo = await getUserById(user.id)
    if (!userInfo?.password) return;

    if (!oldPassword || !newPassword) return {message: "Tomt felt!", success: false}

    if (newPassword.length < 6) {
        return { message: "Det nye passordet må være minst 6 tegn.", success: false };
    }

    try {
        const isValid = await bcrypt.compare(oldPassword, userInfo.password);
        if (!isValid) {
            return { message: "Gammelt passord er ikke korrekt!", success: false };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.user.update({
            where: { id: user.id },
            data: { password: hashedPassword }
        });

        return { message: "Passord oppdatert", success: true };
    } catch (error) {
        console.error("Error ved oppdatering av passord: ", error);
        return { message: "Kunne ikke oppdatere passord.", success: false };
    }
}