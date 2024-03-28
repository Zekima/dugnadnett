"use server"
import { db } from "@/lib/db";

interface getDugnadMessagesProps {
    dugnadId: number,
    page: number,
}

export const getDugnadMessages = async ({ dugnadId, page }: getDugnadMessagesProps) => {
    const limit = 25;
    const offset = (page - 1) * limit;

    try {
        const messages = await db.dugMessages.findMany({
            where: {
                dugnadId: dugnadId,
            },
            take: limit,
            skip: offset,
            orderBy: {
                postedAt: "desc",
            },
            include: {
                owner: true,
            }
        });
        return messages;
    } catch (error) {
        console.error("Klarte ikke laste inn dugnad meldinger:", error);
        throw error;
    }
}