import React from "react";
import Sorter from "@/components/utforsk/sorter";
import Filtrer from '@/components/utforsk/filtrer'


const UtforskPage = () => {
  return (
    <div className="h-screen m-auto max-w-[1280px] flex flex-col sm:flex-row">
      <div className="w-full bg-gray-200 p-4 h-full md:w-1/4">
        <Filtrer/>
      </div>
      <div className="w-full bg-gray-100 p-4 h-full sm:w-3/4">
        <div className="float-right flex gap-2 items-center">
          <p>Sorter på</p>
            <Sorter/>
        </div>
      </div>
    </div>
  );
};

export default UtforskPage;
