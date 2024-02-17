import React from "react";
import {z} from "zod";
import {User, Dugnad} from "@/types";
import {getCurrentUser} from "@/lib/auth";
import { getUserOwnesDugnads } from "@/actions/dugnadActions/getDugnads";
import Link from "next/link"; // leg til link til dugnaden når dugnad siden er lagd

const MyDugnads =  async () => {
    const dugnads = await getUserOwnesDugnads(); 
    return (
        <div className="border-2 border-gray-300 rounded-md cursor-pointer">
           {dugnads?.map( (dugnad) =>  (
            <div key={dugnad.id} className=""> 
                <h2 className="">
                    {dugnad?.title}                
                </h2>
                <div>
                <p>{dugnad?.info.substring(0,200) + "..."}  </p>
                </div>
                <div >
                   {dugnad.image ? <img src={`${dugnad.image}-500.webp`} height="100" width="100" /> : "" }
                </div>
            </div>
            
           )
           )
           }
        </div>
    )
}

export default MyDugnads;


