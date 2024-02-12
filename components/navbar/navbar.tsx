"use client";

import { signOut, useSession } from "next-auth/react";
import UserImage from "@/components/user-image";
import Link from "next/link";
import { MdLogout, MdSettings, MdAccountCircle } from "react-icons/md";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBar = () => {
  const session = useSession();
  const user = session.data?.user;

  const userProfileHref = `/profil/${user?.id}`

  return (
    <div className="flex py-5 h-16 2xl:px-0 justify-between m-auto max-w-[1280px] items-center">
      <Link href="/">
        <h1 className="font-bold text-xl">DugnadNett</h1>
      </Link>
      {user ? (
        <>
          <div className="flex items-center">
            <p className="mr-3 font-medium">{user.name}</p>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center select-none">
                <UserImage user={user} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="" onCloseAutoFocus={(e) => e.preventDefault()}>
                <Link href={userProfileHref} passHref legacyBehavior>
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-200">
                    <MdAccountCircle className="mr-2 h-4 w-4" />
                    Profil
                  </DropdownMenuItem>
                </Link>
                <Link href="/innstillinger">
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-200">
                    <MdSettings className="mr-2 h-4 w-4" />
                    Innstillinger
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-200"
                  onClick={async () => {
                    await signOut();
                  }}
                >
                  <MdLogout className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      ) : (
        <Link href="/auth/login">Login/Register</Link>
      )}
    </div>
  );
};

export default NavBar;
