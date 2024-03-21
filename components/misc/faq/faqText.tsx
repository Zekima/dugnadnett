import React from "react";
import MarkdownIt from "markdown-it";

const FaqText = ({ strs }: { strs?: string }) => {
  if (!strs) return;
  const md = new MarkdownIt();
  return (
    <div className="max-w-96">
      <div dangerouslySetInnerHTML={{ __html: md.render(strs) }} />   
    </div>
  );
};

export default FaqText;