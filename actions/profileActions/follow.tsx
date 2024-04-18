"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function followUser({
  userId,
  followedUserId,
}: {
  userId: string;
  followedUserId: string;
}) {
  try {
    const user = await db.user.update({
      where: { id: userId },
      data: {
        following: {
          connect: { id: followedUserId },
        },
      },
    });
    revalidatePath(`/profil/${followedUserId}`)
    return user;
  } catch (error) {
    console.error("Kunne ikke følge bruker :", error);
    throw error;
  }
}

export async function unfollowUser({
  userId,
  followedUserId,
}: {
  userId: string;
  followedUserId: string;
}) {
  try {
    const user = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        following: {
          disconnect: {
            id: followedUserId,
          },
        },
      },
    });
    revalidatePath(`/profil/${followedUserId}`)
    return user;
  } catch (error) {
    console.error("Kunne ikke slutte å følge bruker:", error);
    throw error;
  }
}

export async function checkIfUserFollows({
  userId,
  followedUserId,
}: {
  userId: string;
  followedUserId: string;
}) {
  const count = await db.user.count({
    where: {
      id: userId,
      following: {
        some: {
          id: followedUserId,
        },
      },
    },
  });

  return count > 0;
}


export async function getFollowers({userId} : {userId: string}) {
    try {
      const user = await db.user.findUnique({
        where: {
          id: userId
        },
        include: {
          followers: true
        }
      });
  
      if (user) {
        return user.followers;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Kunne ikke hente ut følgere", error);
      throw error;
    }
  }
