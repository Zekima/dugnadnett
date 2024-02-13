
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";


const BadgeSelect = ({ value, onChange, categories }: any) => {

  const toggleSelection = (categoryName: string) => {
    const currentIndex = value.indexOf(categoryName);
    const newValue = [...value];

    if (currentIndex === -1) {
      newValue.push(categoryName);
    } else {
      newValue.splice(currentIndex, 1);
    }

    onChange(newValue);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(({ id, name }: any) => (
        <Badge
          key={id}
          onClick={() => toggleSelection(name)}
          className={`cursor-pointer hover:bg-grey-300 select-none ${
            value.includes(name)
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {name}
        </Badge>
      ))}
    </div>
  );
};

export default BadgeSelect;
