import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { off } from "process";
import { getCurrentUser } from "@/lib/auth";

export const getUserOwnesDugnads = async () => {
  const user = await getCurrentUser();
  return db.dugnad.findMany({
    where: {
      ownerId: user?.id,
      status: "ACTIVE"
    },

    include: {
      categories: true,
      location: true,
    },
  });
};


export const getCompletedDugnads = async () => {
  const user = await getCurrentUser();
  return db.dugnad.findMany({
    where: {
      OR: [
        {
          participants: {
            some: {
              userId: user?.id,
              status: "ACCEPTED"
            }
          }
        },
        {
          ownerId: user?.id
        }
      ],
      status: "COMPLETED"
    },

    include: {
      categories: true,
      participants: true,
      location: true,
    },
  });
};



export const getUserParticpatesInDugnads = async () => {
  const user = await getCurrentUser();
  return db.dugnad.findMany({
    where: {
      participants: { some: { userId: user?.id, status: "ACCEPTED" } },
      status: "ACTIVE"
    },

    include: {
      categories: true,
      participants: true,
      location: true,
    },
  });
};

export const getDugnadParticipants = async (dugnadId: number) => {
  try {
    const participations = await db.participation.findMany({
      where: {
        dugnadId: dugnadId,
        status: "ACCEPTED",
      },
      include: {
        user: true,
      },
    });

    const users = participations.map(participant => ({
      ...participant.user,
      participationId: participant.id,
    }));

    return users;
  } catch (e) {
    console.error("Kunne ikke hente ut deltakere for denne dugnaden:", e);
  }
};

const ITEMS_PER_PAGE = 6;

//todo: area filter

function generateFilters(query: string, categories: string[]) {
  let filters = {
    title: {
      contains: query,
      mode: "insensitive",
    },
  };

  if (categories.length > 0) {
    const categoryFilters = categories.map((category) => ({
      categories: {
        some: {
          name: {
            equals: category,
          },
        },
      },
    }));

    //@ts-ignore
    filters["AND"] = categoryFilters;
  }

  return filters;
}

export const getFilteredDugnads = async (
  query: string,
  currentPage: number,
  sort: string,
  categories: string[]
) => {
  const sortBy = {
    publisert: "desc",
    eldste: "asc",
  };

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const filters = generateFilters(query, categories);

  try {
    return db.dugnad.findMany({
      //@ts-ignore
      where: { ...filters, status: "ACTIVE" },
      skip: offset,
      take: ITEMS_PER_PAGE,
      include: {
        categories: true,
      },
      orderBy: {
        //@ts-ignore
        createdAt: sortBy[sort] || "desc",
      },
    });
  } catch (error) {
    console.error("Feil ved uthenting av getFilteredDugnads: ", error);
  }
};

export async function getDugnadsPages(query: string, categories: string[]) {
  const whereComputed = generateFilters(query, categories);

  try {
    const count = await db.dugnad.count({
      //@ts-ignore
      where: {...whereComputed, status: "ACTIVE"},
    });

    return Math.ceil(count / ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Feil ved uthenting av getDugnadsPages: ", error);
  }
}

export async function getDugnadById(dugnadId: string) {
  try {
    const dugnad = await db.dugnad.findFirst({
      where: {
        id: parseInt(dugnadId),
      },
      include: {
        categories: true,
        location: true,
      },
    });
    return dugnad;
  } catch (error) {
    console.error("Kunne ikke finne dugnad:", error);
  }
  redirect(`/utforsk`);
}

export async function getOwnerByDugnadId(ownerId: string) {
  try {
    const dugnadOwner = await db.user.findFirst({
      where: {
        id: ownerId,
      },
    });
    return dugnadOwner;
  } catch (error) {
    console.error("Kunne ikke finne eier av dugnad:", error);
  }
  redirect(`/utforsk`);
}
