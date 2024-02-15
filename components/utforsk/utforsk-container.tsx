import { getFilteredDugnads } from "@/actions/dugnadActions/getDugnads";
import UtforskCard from "@/components/utforsk/utforsk-card";
import React from "react";

const UtforskContainer = async ({
  query,
  currentPage,
  sort,
}: {
  query: string;
  sort: string,
  currentPage: number;
}) => {
  const dugnads = await getFilteredDugnads(query, currentPage, sort);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:grid-cols-3">
      {dugnads.map((dugnad) => (
        <UtforskCard key={dugnad.id} dugnad={dugnad} />
      ))}
    </div>
  );
};

export default UtforskContainer;
