"use client"
import React, { useState} from "react";
import {Faq} from"@/types";
const FaqCard = ({faq} : {faq?: Faq}) => {

    if (!faq) return

    const [extend, setExtend] = useState(false);

    function handleExtend() {
        setExtend(!extend);
    }

    return (
        <div>
            <div className="">
                <h2>
                    {faq.title}
                </h2>
                <button onClick={handleExtend}> {!extend ? '+' : '-' } </button>
            </div>
                {extend && (
                    <div> {faq.text} </div>
                    )}
                </div>
    )
}

export default FaqCard;