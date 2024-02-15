import React, { Suspense } from "react";
import Sorter from "@/components/utforsk/sorter";
import Filtrer from "@/components/utforsk/filtrer";
import UtforskContainer from "@/components/utforsk/utforsk-container";
import UtforskContainerSkeleton from "@/components/skeletons/utforsk-container-skeleton";

import { getDugnadsPages } from "@/actions/dugnadActions/getDugnads";

import Pagination from "@/components/pagination";

const UtforskPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    sort?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const sort = searchParams?.sort || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await getDugnadsPages(query);

  return (
    <div className="h-full m-auto max-w-[1280px] flex flex-col sm:flex-row">
      <div className="w-full min-h-screen hidden lg:block bg-gray-200 p-4 lg:w-1/4">
        <Filtrer />
      </div>
      <div className="w-full h-full min-h-screen bg-gray-100 p-4 lg:w-3/4">
        <div className="flex justify-between mb-3 gap-2 items-center">
          <button className="visible lg:invisible py-1 px-2 rounded-md text-sm bg-white border-2">
            Filtrer
          </button>
          <div className="flex gap-2 items-center">
            <p>Sorter på</p>
            <Sorter />
          </div>
        </div>

        <Suspense
          key={query + currentPage + sort}
          fallback={<UtforskContainerSkeleton />}
        >
          <UtforskContainer
            query={query}
            currentPage={currentPage}
            sort={sort}
          />
        </Suspense>
        {/* @ts-ignore */}
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default UtforskPage;
