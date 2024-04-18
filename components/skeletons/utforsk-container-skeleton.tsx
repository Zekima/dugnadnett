import React from "react";

const UtforskContainerSkeleton = () => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:grid-cols-2">
      {Array.from({ length: 8 }, (_, index) => (
        <div key={index} className="border-2 border-gray-300 rounded-md cursor-pointer animate-pulse">
          <div className="h-48 bg-gray-200 rounded-t-sm"></div>
          <div className="p-2 space-y-2">
            <div className="h-4 bg-gray-200 rounded mb-3.5"></div>
            <div className="flex gap-1">
              {Array.from({ length: 3 }).map((_, index2) => (
                <div key={index2} className="h-5 bg-gray-200 rounded-full w-16"></div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UtforskContainerSkeleton;
