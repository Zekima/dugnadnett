import React from "react";
import Link from "next/link";

function seperateUrl(str: string): string[] {
  const urlPattern = new RegExp(
    /(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/
  );
  const match = str.match(urlPattern);
  if (match) {
    const index: number = match.index || 0;
    const before: string = str.substring(0, index);
    const url: string = match[0];
    const after: string = str.substring(index, str.length);
    return [before, url, after];
  } else {
    return [str, "", ""];
  }
}

const FaqStr = (str: string) => {
  if (!str) return;
  const strHolder: string[] = seperateUrl(str);

  if ((strHolder[1] = "")) {
    if (strHolder[1] == "") {
      return (
        <div>
          <p>{strHolder[0].toString()}</p>
        </div>
      );
    } else {
      return (
        <div>
          <p>      
            {strHolder[0].toString()} +
            <Link href={strHolder[1].toString()}>
              <a>{strHolder[1].toString()}</a>
            </Link>
            +{strHolder[2].toString()}
          </p>
        </div>
      );
    }
  }
};

export default FaqStr;
