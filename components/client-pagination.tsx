"use client";

import { generatePagination } from "@/lib/utils";
import clsx from "clsx";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";

const ClientPagination = ({
  totalPages,
  currentPage,
  setPage,
}: {
  totalPages: number;
  currentPage: number;
  setPage: (page: number) => void;
}) => {

  const handlePageChange = (val: number) => {
    setPage(currentPage + val);
  };

  const handlePageButtonClick = (val: number) => {
    setPage(val);
  };

  const allPages = generatePagination(currentPage, totalPages);

  if (Number(allPages) == 1 || 0) return;

  return (
    <>
      <div className="inline-flex w-full items-center justify-center my-10">
        <PaginationArrow
          direction="left"
          handlePageChange={handlePageChange}
          isDisabled={currentPage <= 1}
        />

        <div className="flex -space-x-px">
          {allPages.map((page, index) => {
            let position: "first" | "last" | "single" | "middle" | undefined;

            if (index === 0) position = "first";
            if (index === allPages.length - 1) position = "last";
            if (allPages.length === 1) position = "single";
            if (page === "...") position = "middle";

            return (
              <PaginationNumber
                key={page}
                handlePageButtonClick={handlePageButtonClick}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          handlePageChange={handlePageChange}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  );
};

function PaginationNumber({
  page,
  isActive,
  position,
  handlePageButtonClick,
}: {
  page: number | string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
  handlePageButtonClick: (val: number) => void;
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center text-sm border",
    {
      "rounded-l-md": position === "first" || position === "single",
      "rounded-r-md": position === "last" || position === "single",
      "z-10 bg-green-700 border-green-600 text-white": isActive,
      "hover:bg-gray-100": !isActive && position !== "middle",
      "text-gray-300": position === "middle",
    }
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <button
      className={className}
      onClick={() => handlePageButtonClick(Number(page))}
    >
      {page}
    </button>
  );
}

function PaginationArrow({
  direction,
  isDisabled,
  handlePageChange,
}: {
  direction: "left" | "right";
  isDisabled?: boolean;
  handlePageChange: (page: number) => void;
}) {
  const numb = direction === "left" ? -1 : +1;
  const className = clsx(
    "flex h-10 w-10 items-center justify-center rounded-md border",
    {
      "pointer-events-none text-gray-300": isDisabled,
      "hover:bg-gray-100": !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    }
  );

  const icon =
    direction === "left" ? (
      <ArrowLeft className="w-4" />
    ) : (
      <ArrowRight className="w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <button className={className} onClick={() => handlePageChange(numb)}>
      {icon}
    </button>
  );
}

export default ClientPagination;
