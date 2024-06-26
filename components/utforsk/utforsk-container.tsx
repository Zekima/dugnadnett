import { getFilteredDugnads } from "@/actions/dugnadActions/getDugnads";
import UtforskCard from "@/components/utforsk/utforsk-card";
import React from "react";

const UtforskContainer = async ({
  query,
  currentPage,
  sort,
  categories,
}: {
  query: string;
  sort: string,
  currentPage: number;
  categories: string[]
}) => {
  const dugnads = await getFilteredDugnads(query, currentPage, sort, categories);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:grid-cols-2">
      {dugnads?.map((dugnad) => (
        //@ts-ignore
        <UtforskCard key={dugnad.id} dugnad={dugnad} />
      ))}
    </div>
  );
};

export default UtforskContainer;
