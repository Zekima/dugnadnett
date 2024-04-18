"use client";
import React from "react";
import { ThreadMessages } from "@prisma/client";

const ThreadAnswersCard = ({ answers }: { answers: ThreadMessages }) => {
  if (!answers) return;

  return (
    <div className="flex flex-col">
      <h2>{answers.userId}</h2>
      <h3>{answers.text}</h3>
    </div>
  );
};

export default ThreadAnswersCard;
