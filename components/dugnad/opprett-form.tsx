"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import BadgeSelect from "@/components/utforsk/badge-select";
import { DugnadSchema } from "@/schemas/index";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import * as z from "zod";

import React from "react";
import { createDugnad } from "@/actions/dugnad";

const OprettForm = ({ categories }: any) => {
  const form = useForm<z.infer<typeof DugnadSchema>>({
    resolver: zodResolver(DugnadSchema),
    defaultValues: {
      title: "",
      area: "",
      date: "",
      info: "",
      categories: [],
      image: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof DugnadSchema>) => {
    const formData = new FormData();

    if (data.image) {
      // @ts-expect-error
      formData.append("image", data.image[0]);
    }

    formData.append("title", data.title);
    formData.append("area", data.area);
    formData.append("date", data.date);
    formData.append("info", data.info);
    formData.append("categories", JSON.stringify(data.categories));

    try {
      await createDugnad(formData);
    } catch (error) {
      console.error(error);
    }
  };

  const { errors } = form.formState;
  return (
    <div className="h-[85vh] flex items-center justify-center">
      <div className="w-[500px] p-6 bg-white rounded-lg">
        <h1 className="text-2xl py-4 font-semibold text-center">Lag Dugnad</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Tittel <FormMessage className="text-red-500" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Skriv inn tittel"
                      className="bg-white"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="image"
                    className="flex items-center gap-2"
                  >
                    Bilde <FormMessage className="text-red-500" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...form.register("image")}
                      type="file"
                      id="image"
                      name="image"
                      className="border-2 border-dotted "
                    ></Input>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Kategorier <FormMessage className="text-red-500" />
                  </FormLabel>
                  <FormControl>
                    <BadgeSelect {...field} categories={categories} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Område <FormMessage className="text-red-500" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Skriv inn område"
                      className="bg-white"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Dato <FormMessage className="text-red-500" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="info"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Beskrivelse <FormMessage className="text-red-500" />
                  </FormLabel>

                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Skriv inn beskrivelse"
                      className="bg-white"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="mt-4 w-full"
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Opprett Dugnad"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default OprettForm;
