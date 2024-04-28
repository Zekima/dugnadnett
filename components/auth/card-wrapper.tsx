"use client";

import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

import { Header } from "./header";
import { Social } from './social'
import { BackButton } from "./back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="shadow-md w-[400px] bg-white">
      <CardHeader>
        <Header label={headerLabel}></Header>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref}>

        </BackButton>
      </CardFooter>
    </Card>
  );
};
