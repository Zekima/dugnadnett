"use client"
import React, {useState, useEffect} from "react"
import UtforskCard from "../utforsk/utforsk-card"
import MinsidePagnation from "./minside-pagnation"
import { Dugnad } from "@prisma/client"



const MinSideHolder = ({dugnads} : {dugnads : any}) => {
    const amountOfPages = Math.ceil(dugnads.length / 3)
    const [currentPage, setPage] = useState(1);
    const [currentDugnads, setDugnads] = useState(dugnads.slice(0, 3));

    useEffect(() => {
        setDugnads(dugnads.slice((currentPage - 1) * 3, currentPage * 3));
    }, [currentPage])

    if ( !dugnads || dugnads.length == 0) return;
    return (
        <div>
            <div className="grid grid-cols-1">
            {currentDugnads.map((dugnad : any) => (
              <UtforskCard dugnad={dugnad} key={dugnad.id} />
            ))}
          </div>
          <MinsidePagnation totalPages={amountOfPages} currentPage={currentPage} setPage={setPage}/>
          </div>

    )

 }

 export default MinSideHolder;