
import React from "react";
import { Edit } from "lucide-react";
import Link from "next/link";

const EditDugnadButton = ({dugnadId} : {dugnadId: number}) => {
    return (
        <Link href={`/dugnad/edit/${dugnadId}`} className="p-2 justify-center items-center bg-black text-white w-full font-medium rounded-lg hover:bg-gray-900 flex gap-2">
                <Edit /> Rediger
        </Link>
    );
}

export default EditDugnadButton;