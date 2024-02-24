import React, {Suspense} from "react";
import AboutUsContainer from "@/components/misc/about-us/aboutus-container";

const AboutUsPage = async () => {
    return (
        <div className="h-full m-auto max-w-[1280px] flex flex-col sm:flex-row">
            <AboutUsContainer />
        </div>
    )
}

export default AboutUsPage;