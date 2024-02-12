import { FaCheckCircle } from "react-icons/fa";

import React from "react";

export const FormSuccess = ({ message }: any) => {
    if (!message) return null;
    return (
        <div className="bg-green-400/10 p-3 rounded-md flex items-center text-sm gap-x-2 text-green-500">
            <FaCheckCircle className="h-4 w-4"/>
            <p>{message}</p>
        </div>
    ) 
};
