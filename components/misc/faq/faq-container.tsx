import React from "react";
import {Faq} from "@/types";
import FaqCard from "./faq-card";

const faqs : Faq[] = [
     {
        id: 1,
        title: 'q1',
        text : 'dddddddddddddddddddd ddddddddddddddd'
    },
    {
        id: 2,
        title: 'q2',
        text : 'dddddddddddddddddddd ddddddddddddddd'
    },
    {
        id: 3,
        title: 'q3',
        text : 'dddddddddddddddddddd ddddddddddddddd'
    },
]

const FaqContainer = () => {
    

    return (
        <div className="">
            <div className="">
                <h1 className="text-6xl font-bold mb-3 sm:pt-[100px] pt-[10px]">FAQS</h1>
            </div>
            <div className="flex flex-col">
                {faqs.map((faq) => (
                    <FaqCard faq = {faq} key = {faq.id}/>
                ))

                }
            </div>
        </div>
    )
}

export default FaqContainer;