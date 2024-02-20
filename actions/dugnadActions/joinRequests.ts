import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

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

  return { success: "Vellykket forespørsel" };
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
    return;
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
    });
    return joinRequests;
  } catch (error) {
    console.error("Kunne ikke hente ut forespørsel for denne dugnaden:", error);
    return { error: "Error ved deltakelsen av dugnad" };
  }
}

export async function acceptJoinRequest(participationId: number) {
  try {
    await db.participation.update({
      where: {
        id: participationId,
      },
      data: {
        status: "ACCEPTED",
      },
    });
  } catch (error) {
    console.error("Kunne ikke akseptere forespørselen:", error);
    return { error: "Kunne ikke akseptere forespørselen" };
  }
}

export async function declineJoinRequest(participationId: number) {
  try {
    await db.participation.update({
      where: {
        id: participationId,
      },
      data: {
        status: "DECLINED",
      },
    });
  } catch (error) {
    console.error("Kunne ikke avslå forespørselen:", error);
    return { error: "Kunne ikke avslå forespørselen" };
  }
}
