import { db } from "@/lib/db";
import { off } from "process";

export const getDugnads = async () => {
  return db.dugnad.findMany({
    include: {
      categories: true,
    },
  });
};

const ITEMS_PER_PAGE = 9;

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

  let whereComputed = {
    title: {
      contains: query,
      mode: "insensitive" as const,
    },
  };

  if (categories.length > 0) {
    // @ts-expect-error
    whereComputed.categories = {
      some: {
        name: {
          in: categories,
        },
      },
    };
  }

  try {
    return db.dugnad.findMany({
      where: whereComputed,
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
    console.error("getFilteredDugnads Error: ", error);
  }
};

export async function getDugnadsPages(query: string) {
  try {
    const totalRecords = await db.dugnad.count({
      where: {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
    });

    const totalPages = Math.ceil(totalRecords / ITEMS_PER_PAGE);

    return totalPages;
  } catch (error) {
    console.error("getDugnadsPages Error: ", error);
  }
}
