"use client";

import React from "react";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  
    const onClick = (provider: string) => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
        })
    }
  
    return (
    <div className="flex items-center w-full gap-x-2">
      <Button size="lg" className="w-full" variant="outline" onClick={() => onClick("google")}>
        <FcGoogle size="22"></FcGoogle>
      </Button>
      <Button size="lg" className="w-full" variant="outline" onClick={() => onClick("github")}>
        <FaGithub size="22"></FaGithub>
      </Button>
    </div>
  );
};
