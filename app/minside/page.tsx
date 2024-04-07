import React, {Suspense} from "react";
import MinsideContainer from "@/components/minside/minside-container";

const MinsidePage = async (
) => {
    return(
        <div className="h-full min-h-screen m-auto max-w-[1280px] flex flex-col sm:flex-row pb-16">
            <MinsideContainer />      
        </div>
    )
}

export default MinsidePage;