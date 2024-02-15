import React from "react";
import { z } from "zod";
import { DugnadSchema } from "@/schemas";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

type DugnadType = z.infer<typeof DugnadSchema>;

const UtforskCard = ({ dugnad }: { dugnad?: DugnadType }) => {
  if (!dugnad) return

  return (
    <div className="border-2 border-gray-300 rounded-md cursor-pointer">
      <div className="h-40 relative select-none">
        {dugnad && dugnad.image ? (
          // eslint-disable-next-line
          <img
            className="rounded-t-sm"
            src={`${dugnad.image}-500.webp`}
            loading="lazy"
            alt=""
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        ) : (
          <div className="bg-green-200 w-full h-full"></div>
        )}
      </div>

      <div className="p-2">
        <p className="font-semibold text-sm mb-2">{dugnad.title}</p>

        <div className="gap-1 flex">
          {dugnad.categories.map((category) => (
            //@ts-ignore
            <Badge key={category.id}>{category.name}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UtforskCard;
