import React from "react";
import markdownit from 'markdown-it';

const DugnadInfo = ({dugnadInfo} : any) => {
    const md = markdownit({
        html: true
    })
    return (
        <div className="mt-3 markdown flex flex-col gap-2" dangerouslySetInnerHTML={{ __html: md.render(dugnadInfo) }} />
    );
}

export default DugnadInfo;