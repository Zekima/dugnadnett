import React from "react";
import {z} from "zod";
import {User, Dugnad} from "@/types";
import {getCurrentUser} from "@/lib/auth";
import { getUserOwnesDugnads } from "@/actions/dugnadActions/getDugnads";

const MyDugnads =  async () => {
    const dugnads = await getUserOwnesDugnads(); 
    return (
        <div className="border-2 border-gray-300 rounded-md cursor-pointer">
           {dugnads?.map( (dugnad) =>  (
            <div key={dugnad.id} className=""> 
                <h2 className="">
                {dugnad?.title}                
                </h2>
                <p>
                    {dugnad?.info}  
                </p>
            </div>
            
           )
           )
           }
        </div>
    )
}

export default MyDugnads;


