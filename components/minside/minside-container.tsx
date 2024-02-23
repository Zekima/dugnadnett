import MinsideCard from "@/components/minside/minside-card";
import React from "react";
import { User } from "@/types"
import { getUserOwnesDugnads, getUserParticpatesInDugnads } from "@/actions/dugnadActions/getDugnads";



const MinsideContainer = async () => {
    const ownesDugnads = await getUserOwnesDugnads();
    const partDugnads = await getUserParticpatesInDugnads();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:grid-cols-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:grid-cols-3">
            {ownesDugnads.map((dugnad) => (
                <MinsideCard dugnad={dugnad} key={dugnad.id} /> 
            )
            )}
            
        </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:grid-cols-3">
         {partDugnads.map((dugnad) => (
             <MinsideCard dugnad={dugnad} key={dugnad.id}/> 
         )
         )}
         
            </div>
        </div>
        
    )
}

export default MinsideContainer;