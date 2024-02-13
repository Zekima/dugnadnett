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

import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoChatbubbleOutline } from "react-icons/io5";

const NavBar = () => {
  const session = useSession();
  const user = session.data?.user;

  const userProfileHref = `/profil/${user?.id}`;

  return (
    <div className="border-b-2 border-gray">
      <div className="flex py-5 h-16 px-5 2xl:px-0 justify-between m-auto max-w-[1280px] items-center">
        <Link href="/">
          <h1 className="font-bold text-xl">DugnadNett</h1>
        </Link>
        {user ? (
          <>
          <div className="flex gap-4">
          <Link href="/utforsk"><p>Utforsk</p></Link>
          <Link href="/minside"><p>Min Side</p></Link>
          <Link href="/nydugnad"><p>Ny Dugnad</p></Link>
          </div>
            <div className="flex items-center gap-3.5">
              <IoChatbubbleOutline size={26} />

              <IoNotificationsOutline size={26} />

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center select-none relative">
                  <IoIosArrowDropdownCircle className="absolute right-0 bottom-0 bg-white rounded-xl" />
                  <UserImage user={user} />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="bg-white"
                  onCloseAutoFocus={(e) => e.preventDefault()}
                >
                  <p className="mt-1 font-medium text-xs text-center w-36">
                    {user.name}
                  </p>
                  <DropdownMenuSeparator className="border border-muted" />
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
                  <DropdownMenuSeparator className="border border-muted" />
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-gray-200"
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
    </div>
  );
};

export default NavBar;
