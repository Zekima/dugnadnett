"use client";

import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import { Check } from "lucide-react";

type StatusType = {
  message: string;
  success: boolean;
};

const Bio = ({ initalBio, updateBio }: { initalBio: string, updateBio: (content: string) => Promise<StatusType | undefined> }) => {
  const [bio, setBio] = useState(initalBio);
  const handleBioChange = (event: any) => {
    setBio(event.target.value);
  };
  const { toast } = useToast()


  const handleUpdate = async () => {
    const bioStatus = await updateBio(bio)
    toast({
      description: <div className='flex gap-3 items-center text-white font-medium'><Check />{bioStatus?.message}</div>,
      className: "bg-green-800 text-white border-none"
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-medium">Biografi</h2>
      <textarea
        placeholder="Skriv en biografi"
        value={bio}
        onChange={handleBioChange}
        className="border border-gray-400 rounded-md p-2 resize-none max-w-[500px] h-[150px]"
      ></textarea>

      <button onClick={() => handleUpdate()} className="bg-green-700 text-white py-2 px-4 w-[100px] rounded-md hover:bg-green-800">
        Lagre
      </button>
    </div>
  );
};

export default Bio;
