"use client";

import React, { useState, useEffect } from "react";
import UtforskCard from "../utforsk/utforsk-card";
import ClientPagination from "../client-pagination";

const MinSideHolder = ({ dugnads }: { dugnads: any }) => {

  const AMOUNT_OF_DUGNADS_PER_PAGE = 3;

  const amountOfPages = Math.ceil(dugnads.length / AMOUNT_OF_DUGNADS_PER_PAGE);
  const [currentPage, setPage] = useState(1);
  const [currentDugnads, setDugnads] = useState(dugnads.slice(0, AMOUNT_OF_DUGNADS_PER_PAGE));

  useEffect(() => {
    setDugnads(dugnads.slice((currentPage - 1) * AMOUNT_OF_DUGNADS_PER_PAGE, currentPage * AMOUNT_OF_DUGNADS_PER_PAGE));
  }, [currentPage]);

  if (!dugnads || dugnads.length == 0) return;
  return (
    <div>
      <div className="grid grid-cols-1 gap-y-3">
        {currentDugnads.map((dugnad: any) => (
          <UtforskCard dugnad={dugnad} key={dugnad.id} />
        ))}
      </div>
      <ClientPagination
        totalPages={amountOfPages}
        currentPage={currentPage}
        setPage={setPage}
      />
    </div>
  );
};

export default MinSideHolder;
