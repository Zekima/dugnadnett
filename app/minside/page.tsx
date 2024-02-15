import React, {Suspense} from "react";
import MinsideContainer from "@/components/minside/minside-container";




const MinsidePage = async (
) => {
//const user = await getCurrentUser();
    return(
        <div className="h-full m-auto max-w-[1280px] flex flex-col sm:flex-row">
            <MinsideContainer />      
        </div>
    )
}

export default MinsidePage;