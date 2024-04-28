"use client";
import React, { useState } from "react";
import { useTransition } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { CardWrapper } from "./card-wrapper";
import { FormError } from "../form-error";
import { register } from "@/actions/register";
import { useToast } from "../ui/use-toast";
import { Check, X } from "lucide-react";

const RegisterForm = () => {
  const [error, setError] = useState("");
  const {toast} = useToast();

  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");

    startTransition(() => {
      register(values).then((data) => {
        if (data?.error) {
          setError(data.error);
          // toast({
          //   description: <div className='flex gap-3 items-center text-white font-medium'><X size={16} />{data.error}</div>,
          //   className: "bg-red-800 text-white border-none"
          // })
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Oprett bruker"
      backButtonLabel="Har du allerede en bruker?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Navn</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Ole Nordmann"
                      type="name"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="ole.nordmann@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passord</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <Button type="submit" disabled={isPending} className="w-full mt-2">
            Registrer
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
