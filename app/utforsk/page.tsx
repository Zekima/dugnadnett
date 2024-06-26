import React, { Suspense } from "react";
import Sorter from "@/components/utforsk/sorter";
import Filtrer from "@/components/utforsk/filtrer";
import UtforskContainer from "@/components/utforsk/utforsk-container";
import UtforskContainerSkeleton from "@/components/skeletons/utforsk-container-skeleton";

import { getDugnadsPages } from "@/actions/dugnadActions/getDugnads";

import Pagination from "@/components/pagination";
import { getCategories } from "@/actions/category";
import MobileFiltrer from '@/components/utforsk/mobile-filtrer'

const UtforskPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    sort?: string;
    page?: string;
    categories?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const sort = searchParams?.sort || "";
  const currentPage = Number(searchParams?.page) || 1;

  const categoryParams = searchParams?.categories ? searchParams.categories.split(',') : [];

  const categories = await getCategories();
  const totalPages = await getDugnadsPages(query, categoryParams);

  return (
    <div className="h-full m-auto max-w-[1280px] flex flex-col sm:flex-row px-5 xl:px-0">
      <div className="w-full min-h-screen hidden lg:block mt-5 mr-8 lg:w-1/4">

        <Filtrer categories={categories} categoryParams={categoryParams} />
      </div>
      <div className="w-full h-full min-h-screen mt-5 lg:w-3/4">
        <div className="flex justify-between mb-3 gap-2 items-center">
          <div className="w-[250px] h-fit hidden lg:block">

            <Pagination totalPages={totalPages as number} />
          </div>


          <div className="visible lg:invisible">
            <MobileFiltrer categories={categories} categoryParams={categoryParams} />
          </div>
          <div className="flex gap-2 items-center">
            <p>Sorter på</p>
            <Sorter />
          </div>
        </div>

        <Suspense
          key={query + currentPage + sort + categoryParams}
          fallback={<UtforskContainerSkeleton />}
        >
          <UtforskContainer
            query={query}
            currentPage={currentPage}
            sort={sort}
            categories={categoryParams}
          />
        </Suspense>
        <div className="visible lg:invisible mt-8 mb-12">
        <Pagination totalPages={totalPages as number} />
          </div>
      </div>
    </div>
  );
};

export default UtforskPage;
