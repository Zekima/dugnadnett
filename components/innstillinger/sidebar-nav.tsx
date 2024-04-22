'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode, Key } from "react";
import { UrlObject } from "url";

const SideBarNav = ({settingsNavItems} : any) => {

    const pathname = usePathname();

    return (
        <div className="flex flex-col max-w-[250px] w-full">
        {settingsNavItems.map((item: { path: string | UrlObject; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }, i: Key | null | undefined) => (
          <Link
            key={i}
            className={`${
              pathname === item.path ? "bg-gray-200" : "bg-muted"
            } w-full p-2 pl-6 rounded-md text-left hover:underline`}
            href={item.path}
          >
            {item.name}
          </Link>
        ))}
      </div>
    )
}

export default SideBarNav;