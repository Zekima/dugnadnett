"use client"
import React from "react";
import { Plus, Loader2 } from 'lucide-react'
import { useFormStatus } from "react-dom";


const RequestButton = ({activeRequest}: any) => {
    const formStatus = useFormStatus();
    const isDisabled = formStatus.pending || activeRequest;

    const buttonContent = () => {
        if (formStatus.pending) {
            return <Loader2 className="animate-spin" />
        } else if (!activeRequest) {
            return "Be om å bli med"
        } else {
            return "Forespørsel sendt";
        }
    }

    return (
        <button type="submit"
            disabled={isDisabled}
            className="p-2 justify-center disabled:opacity-75 items-center bg-green-800 disabled:hover:bg-green-800 text-white w-full font-medium rounded-lg hover:bg-green-900 flex gap-2"
        >
            {buttonContent()}

        </button>
    );
}

export default RequestButton;