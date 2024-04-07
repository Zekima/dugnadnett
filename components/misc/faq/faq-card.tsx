"use client";
import React, { useState } from "react";
import { Faq } from "@/types";
import FaqText from "./faqText";
const FaqCard = ({ faq }: { faq?: Faq }) => {
  if (!faq) return;
  const [extend, setExtend] = useState(false);

  function handleExtend() {
    setExtend(!extend);
  }

  return (
    <div className="m-auto max-w-[1280px] flex-row py-10 ">
      <div className="flex flex-row text-center">
        <div className="m-auto max-w-[1280px] py-10 text-left">
          <h2 className="text-center text-lg font-bold">{faq.title}</h2>
        </div>
        <div className="min-w-100 grid grid-cols-3 gap-4">
          <button className="bg-green-200" onClick={handleExtend}>
            {" "}
            {!extend ? "⋁" : "⋀"}
          </button>
        </div>
      </div>
      <div className="m-auto max-w-[1280px] py-10 text-left">
        {extend && <FaqText strs={faq?.text} />}
      </div>
    </div>
  );
};

export default FaqCard;