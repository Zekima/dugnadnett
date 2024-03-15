import MinsideCard from "@/components/minside/minside-card";
import React from "react";
import { User } from "@/types"
import { getUserOwnesDugnads, getUserParticpatesInDugnads } from "@/actions/dugnadActions/getDugnads";



const MinsideContainer = async () => {
    const ownesDugnads = await getUserOwnesDugnads();
    const partDugnads = await getUserParticpatesInDugnads();
    return (
        <div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:grid-cols-3">
                <h1 className="text-2xl font-bold mb-3 sm: pt-[40px] pt -[40px]">Username:</h1>
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-1 lg:grid-cols-2">
                    <h2 className="text-2xl font-bold mb-3 sm:pt-[100px] pt-[10px]">mine:</h2>
                    {ownesDugnads.map((dugnad) => (
                        <MinsideCard dugnad={dugnad} key={dugnad.id} /> 
                    )
                    )}
                
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-1 lg:grid-cols-2">
                    <h2 className="text-2xl font-bold mb-3 sm:pt-[100px] pt-[10px]">mine:</h2>
                    {partDugnads.map((dugnad) => (
                        <MinsideCard dugnad={dugnad} key={dugnad.id} /> 
                    )
                    )}
                
                </div>
                
            </div>
        </div>
    
    )
}

export default MinsideContainer;