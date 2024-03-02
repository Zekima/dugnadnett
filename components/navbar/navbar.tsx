"use client";

import { signOut, useSession } from "next-auth/react";
import UserImage from "@/components/user-image";
import Link from "next/link";
import { Bell, MessageCircle, Menu } from "lucide-react";
import { MdLogout, MdSettings, MdAccountCircle } from "react-icons/md";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React, { useState, useEffect } from "react";

import { redirect, usePathname} from "next/navigation";

import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

const NavBar = () => {
  const pathname = usePathname();
  const session = useSession();
  const router = useRouter();
  const user = session.data?.user;

  const userProfileHref = `/profil/${user?.id}`;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-y-hidden")
    } else {
      document.body.classList.remove("overflow-y-hidden")
    }
  }, [isMenuOpen]);

  return (
    <div className="border-b-2 border-gray">
      <div className="flex py-5 h-16 px-5 2xl:px-0 justify-between m-auto max-w-[1280px] items-center">
        {user ? (
          <>
            <Link href="/" className="hidden lg:block">
              <h1 className="font-bold text-xl">DugnadNett</h1>
            </Link>
            <button
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={26} />
            </button>
            <div className="flex gap-4 hidden lg:flex">
              <Link href="/utforsk">
                <p>Utforsk</p>
              </Link>
              <Link href="/minside">
                <p>Min Side</p>
              </Link>
              <Link href="/dugnad/opprett">
                <p>Ny Dugnad</p>
              </Link>
            </div>

            <div
              className={`top-0 left-0 lg:hidden h-full  gap-3 absolute flex-col p-3 text-xl bg-green-200 w-2/6 z-10 ${
                isMenuOpen ? "flex" : "hidden"
              }`}
            >
              <X
                size={26}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="right-3 absolute cursor-pointer"
              />
              <div className="my-4"></div>
              <Link href="/utforsk">
                <p>Utforsk</p>
              </Link>
              <Link href="/minside">
                <p>Min Side</p>
              </Link>
              <Link href="/dugnad/opprett">
                <p>Ny Dugnad</p>
              </Link>
            </div>
            <div className="flex items-center gap-3.5">
              <MessageCircle size={26} />

              <Bell size={26} />

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center select-none relative">
                  <IoIosArrowDropdownCircle className="absolute right-0 bottom-0 bg-white rounded-xl" />
                  <UserImage user={user} size={40} />
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
                      await signOut({redirect: false});
                      router.push('/auth/login')
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
          <>
            <Link href="/">
              <h1 className="font-bold text-xl">DugnadNett</h1>
            </Link>
            <Link href="/auth/login">Login/Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
