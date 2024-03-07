"use client";
import React, { useState } from "react";
import { Faq } from "@/types";
const FaqCard = ({ faq }: { faq?: Faq }) => {
  const [extend, setExtend] = useState(false);

  function handleExtend() {
    setExtend(!extend);
  }

  if (!faq) return;

  return (
    <div className="flex-basis-0.5 flex-column flex-gap-5 place-items-center justify-center">
      <div className="flex-gap-10 flex flex-row ">
        <h2 className="text-lg font-bold">{faq.title}</h2>
        <button className="" onClick={handleExtend}>
          {" "}
          {!extend ? "+" : "-"}{" "}
        </button>
      </div>
      {extend && <p className="mb-2 text-lg"> {faq.text} </p>}
    </div>
  );
};

export default FaqCard;
