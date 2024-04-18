import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { off } from "process";
import { getCurrentUser } from "@/lib/auth";
import { ThreadMessages } from "@prisma/client";

export const getThreadsByDugnadid = async (dugId: number) => {
   if (!dugId) return;
    return db.thread.findMany({
        where : {
           dugnadId : dugId,
        },orderBy:{
            title: 'desc',
        }
    }
    )
}


export const getThreadMessagesByThreadId = async (threadId: number) => {
    if (!threadId) return;
    return db.threadMessages.findMany({
        where : {
            threadId : threadId,
        }
    })
}

export const getThreadMsgOwner = async (msg : ThreadMessages) => { 
    if (!msg) return;
    return db.user.findUnique({
        where : {
            id : msg.userId
        }
    })

}

export const sendThreadMessage = async (msg : string, threadId : number, userId : string) => {
    if (!msg || !threadId || !userId) return;
    return db.threadMessages.create({
        data : {
            text : msg,
            threadId : threadId,
            userId : userId
        }
    })
}