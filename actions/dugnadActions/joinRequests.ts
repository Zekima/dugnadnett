import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Router } from "lucide-react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";

export async function requestToJoin(dugnadId: number) {
  const user = await getCurrentUser();
  if (!user?.id) return;

  try {
    await db.participation.create({
      data: {
        status: "PENDING",
        userId: user.id,
        dugnadId: dugnadId,
      },
    });
  } catch (error) {
    console.error("Bruker kunne ikke delta i dugnad:", error);
    return { error: "Error ved deltakelsen av dugnad" };
  }
  revalidatePath(`/dugnad/${dugnadId}`);
  return { success: "Vellykket forespørsel" };
}

export async function removeJoinRequest(participationId: number) {
  const user = await getCurrentUser();
  if (!user?.id) return;

  try {
    const { dugnadId } = await db.participation.delete({
      where: {
        id: participationId
      }
    });
    revalidatePath(`/dugnad/${dugnadId}`);
  } catch (error) {
    console.error("Kunne ikke slette deltakelsen:", error);
    return;
  }
  


}

export async function getJoinRequest(dugnadId: number) {
  const user = await getCurrentUser();
  if (!user?.id) return;

  try {
    const joinRequest = await db.participation.findUnique({
      where: {
        userId_dugnadId: {
          userId: user.id,
          dugnadId: dugnadId,
        },
      },
    });
    return joinRequest;
  } catch {
    return false;
  }
}

export async function getJoinRequests(dugnadId: number) {
  const user = await getCurrentUser();
  if (!user?.id) return;

  try {
    const joinRequests = await db.participation.findMany({
      where: {
        status: "PENDING",
        dugnadId: dugnadId,
      },
      include: {
        user: true,
      },
    });

    const users = joinRequests.map(joinRequest => ({
      ...joinRequest.user,
      participationId: joinRequest.id,
    }));

    return users;
  } catch (error) {
    console.error(
      "Kunne ikke hente ut forespørsler for denne dugnaden:",
      error
    );
    return;
  }
}

export async function acceptJoinRequest(participationId: number) {
  try {
    const { dugnadId } = await db.participation.update({
      where: {
        id: participationId,
      },
      data: {
        status: "ACCEPTED",
      },
    });
    revalidatePath(`/dugnad/${dugnadId}`)
  } catch (error) {
    console.error("Kunne ikke akseptere forespørselen:", error);
    return { error: "Kunne ikke akseptere forespørselen" };
  }
}

export async function declineJoinRequest(participationId: number) {
  try {
    const { dugnadId } = await db.participation.update({
      where: {
        id: participationId,
      },
      data: {
        status: "DECLINED",
      },
    });
    revalidatePath(`/dugnad/${dugnadId}`)
  } catch (error) {
    console.error("Kunne ikke avslå forespørselen:", error);
    return { error: "Kunne ikke avslå forespørselen" };
  }
}
