import { FaExclamationTriangle } from "react-icons/fa";

import React from "react";

export const FormError = ({ message }: any) => {
    if (!message) return null;
    return (
        <div className="bg-red-400/10 p-3 rounded-md flex items-center text-sm gap-x-2 text-red-500">
            <FaExclamationTriangle className="h-4 w-4"/>
            <p>{message}</p>
        </div>
    ) 
};
