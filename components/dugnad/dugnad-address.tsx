import React from "react";
import { Map } from "lucide-react";

const DugnadAddress = ({address}: any) => {
    return (
        <div className="flex items-center gap-1.5 mt-2 bg-gray-200 p-3 rounded-md mb-2"><Map /> <p>{address}</p></div>
    );
}

export default DugnadAddress;