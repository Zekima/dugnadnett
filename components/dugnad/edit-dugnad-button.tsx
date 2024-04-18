"use client";
import React from "react";
import { Edit, Trash, Check, Router } from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

const EditDugnadButton = ({
  dugnadId,
  handleDelete,
  handleComplete,
}: {
  dugnadId: number;
  handleDelete: () => void;
  handleComplete: () => void;
}) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2 px-4 justify-center items-center bg-black text-white w-full font-medium rounded-md hover:bg-gray-900 flex gap-2">
        {" "}
        <Edit />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white" align="start">
        <DropdownMenuItem
          className="cursor-pointer hover:bg-gray-200 flex gap-2"
          onClick={() => router.push(`/dugnad/edit/${dugnadId}`)}
        >
          <Edit />
          Rediger
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="cursor-pointer hover:bg-gray-200 text-red-800"
        >
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="flex gap-2 items-center">
                <Trash />
                Slett Dugnad
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Er du sikker?</AlertDialogTitle>
                <AlertDialogDescription>
                  Denne handlingen kan ikke angres. Sletting av dugnaden vil
                  fjerne all tilknyttet informasjon og data permanent.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Avbryt</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <button
                    onClick={() => handleDelete()}
                    className="p-2 justify-center items-center bg-red-800 text-white font-medium rounded-md hover:bg-red-900"
                  >
                    Slett
                  </button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="cursor-pointer hover:bg-gray-200 flex gap-2 text-green-800"
        >
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="flex gap-2 items-center">
                <Check />
                Marker som ferdig
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Er du sikker?</AlertDialogTitle>
                <AlertDialogDescription>
                  Denne handlingen kan ikke angres.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Avbryt</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <button
                    onClick={() => handleComplete()}
                    className="p-2 justify-center items-center text-white font-medium rounded-md"
                  >
                    Marker som ferdig
                  </button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditDugnadButton;
