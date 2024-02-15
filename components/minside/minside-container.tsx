import MinsideCard from "@/components/minside/minside-card";
import React from "react";
import { User } from "@/types"

const MinsideContainer = async () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:grid-cols-3">
            <MinsideCard />
        </div>
    )
}

export default MinsideContainer;